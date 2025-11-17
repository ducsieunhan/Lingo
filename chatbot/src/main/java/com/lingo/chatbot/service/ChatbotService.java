package com.lingo.chatbot.service;

import com.lingo.chatbot.httpClient.NotifyClient;
import com.lingo.chatbot.model.ChatRequest;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.memory.repository.jdbc.JdbcChatMemoryRepository;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@FieldDefaults(level= AccessLevel.PRIVATE)
public class ChatbotService {
    final ChatClient chatClient;
    final JdbcChatMemoryRepository jdbcChatMemoryRepository;
    final ChatMemory chatMemory;
    final NotifyClient notifyClient;
//    final JdbcTemplate jdbcTemplate;
String systemPrompt = """
You are the official AI assistant of an English-learning platform specializing in TOEIC and IELTS preparation.
You act as a friendly, professional, and knowledgeable tutor who helps users understand the exams, improve their English skills,
and navigate the website’s learning features such as practice tests, study tools, AI evaluations, and progress tracking.
You do not mention anything related to coding, system architecture, or technical implementation; instead, you focus entirely on providing clear explanations,
helpful study guidance, and accurate information about the platform’s services. When users request practice, you can create authentic TOEIC or IELTS 
exercises for any skill. When evaluating their responses, you always provide an estimated score or band with reasoning, corrections when applicable, a brief explanation of mistakes,
and practical improvement tips. Your communication style is concise, friendly, and easy to understand, responding in short paragraphs with direct value. At the end of replies, 
you may ask a short clarifying question only when more context is needed.
""";


    public ChatbotService(ChatClient.Builder chatClient, JdbcChatMemoryRepository jdbcChatMemoryRepository, ChatMemory chatMemoryInit, NotifyClient notifyClient) {
        this.chatMemory=chatMemoryInit;
        this.jdbcChatMemoryRepository = jdbcChatMemoryRepository;
        this.notifyClient=notifyClient;
//        this.jdbcTemplate= jdbcTemplate;

//        ChatMemoryRepository chatMemoryRepository = JdbcChatMemoryRepository.builder()
//                .jdbcTemplate(jdbcTemplate)
//                .dialect(new MysqlChatMemoryRepositoryDialect())
//                .build();

        ChatMemory chatMemory= MessageWindowChatMemory.builder()
                .chatMemoryRepository(jdbcChatMemoryRepository)
                .maxMessages(36)
                .build();


        this.chatClient = chatClient
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .build();
    }

    public String chat(ChatRequest request){
        String conversationId = request.getUserId();

        SystemMessage systemMessage= new SystemMessage(this.systemPrompt);
        UserMessage userMessage = new UserMessage(request.getMessage());
        Prompt prompt = new Prompt(systemMessage, userMessage);

        return chatClient
                .prompt(prompt)
                .tools(new ApplicationProvidedService(notifyClient))
                .advisors(advisorSpec -> advisorSpec.param(
                        ChatMemory.CONVERSATION_ID, conversationId
                ))
                .call()
                .content();
    }

    public String chatWithMedia(MultipartFile file, String message, String userId){
        Media media =  Media.builder()
                .mimeType(MimeTypeUtils.parseMimeType(file.getContentType()))
                .data(file.getResource())
                .build();
        ChatOptions chatOptions = ChatOptions.builder()
                .temperature(0D)
                .build();
        return chatClient
                .prompt()
                .advisors(advisorSpec -> advisorSpec.param(
                        ChatMemory.CONVERSATION_ID, String.valueOf(userId)
                        )
                )
                .system(this.systemPrompt)
                .user(promptUserSpec ->
                        promptUserSpec
                                .media(media)
                                .text(message))
                .call().content();
    }

    public List<Message> getConversationMessage(String conversationsId){
        return chatMemory.get(conversationsId);
    }
}