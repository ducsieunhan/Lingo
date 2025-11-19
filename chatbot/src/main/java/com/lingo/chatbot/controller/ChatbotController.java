package com.lingo.chatbot.controller;

import com.lingo.chatbot.model.ChatRequest;
import com.lingo.chatbot.service.ChatbotService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.ai.chat.messages.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {
    final ChatbotService chatbotService;

    @PostMapping("/askAI")
    public ResponseEntity<String> chat(@RequestBody ChatRequest chatRequest){
        return ResponseEntity.ok(chatbotService.chat(chatRequest));
    }

    @PostMapping("/chat-with-media")
    public ResponseEntity<String> chatWithMedia(@RequestParam("file")MultipartFile file,
                                @RequestParam("message") String message,
                                @RequestParam("userId") String userId               ){
        return ResponseEntity.ok(chatbotService.chatWithMedia(file,message,userId));
    }

    @GetMapping("/conversation/{id}")
    public ResponseEntity<List<Message>> getConversationMessages(@PathVariable("id") String id){
        return ResponseEntity.ok(chatbotService.getConversationMessage(id));
    }

}
