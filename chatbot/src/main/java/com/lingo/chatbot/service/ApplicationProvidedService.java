package com.lingo.chatbot.service;

import com.lingo.chatbot.httpClient.NotifyClient;
import com.lingo.common_library.dto.ReqNotificationPost;
import com.lingo.common_library.dto.ResNotification;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationProvidedService {
    NotifyClient notifyClient;

    @Tool(name = "notifyUser", description = "Notify user when user require")
    public ResNotification notifyUserByChatbot(ReqNotificationPost request){
        return this.notifyClient.createNotification(request).getBody();
    }

}
