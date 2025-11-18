import React, { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { askAI, askAIWithFile } from "../../slice/chat";
import { v4 as uuidv4 } from 'uuid';
import chatbotImg from "../images/Lingo.png";
import { useChatbot } from "../../contexts/ChatbotContext";

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  const renderContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${isUser
          ? "bg-blue-600 text-white rounded-br-lg"
          : "bg-gray-100 text-gray-800 rounded-bl-lg"
          }`}
      >
        <div
          className="text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: renderContent(content) }}
        ></div>
      </div>
    </div>
  );
};

export default function Chatbot() {
  const { isOpen, setIsOpen } = useChatbot();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { messageResponse, loading, error } = useSelector((state) => state.chat);

  const userId = useSelector((state) => state.authentication?.user?.id);
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    if (userId) {
      setConversationId(userId)
    }
    setConversationId(uuidv4())
  }, []);

  console.log("conversationId", conversationId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content: `Hi! I can understand many languages. How can I help you?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messageResponse) {
      const botMessage = {
        id: Date.now(),
        type: "bot",
        content: messageResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  }, [messageResponse]);

  useEffect(() => {
    if (error) {
      const errorMessage = {
        id: Date.now(),
        type: "bot",
        content: `Sorry, I encountered an error: ${error.message || "Please try again later."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  }, [error]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !attachedFile) return;

    const messageToSend = inputValue || `Analyzing file: ${attachedFile?.name}`;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: attachedFile ? `${inputValue}\n📎 ${attachedFile.name}` : inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentFile = attachedFile;
    setInputValue("");
    setAttachedFile(null);

    try {
      if (currentFile) {
        await dispatch(askAIWithFile({ file: currentFile, userId: conversationId, message: messageToSend })).unwrap();
      } else {
        await dispatch(askAI({ userId: conversationId, message: messageToSend })).unwrap();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachedFile(file);
      event.target.value = null;
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          // Thêm cursor-pointer
          className="text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group relative transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Open AI Chatbot"
        >
          <img src={chatbotImg} alt="AI Bot" className="w-20 h-15" />
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          className="w-96 h-[400px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200"
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #172554 100%)'
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center text-white px-5 py-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-15 h-15 rounded-lg flex items-center justify-center p-1">
                <img src={chatbotImg} alt="LexiBot" className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Chat with Lingo</h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              // Thêm cursor-pointer
              className="text-gray-300 hover:text-white hover:bg-white/20 rounded-full p-2 cursor-pointer"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white pt-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.type}
                content={message.content}
              />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="text-center text-xs text-gray-400 mb-2">
              Powered by <span className="font-semibold text-gray-500">Lingo</span> — AI may occasionally make mistakes.
            </div>

            {/* File Preview */}
            {attachedFile && (
              <div className="mb-2 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <Paperclip size={16} className="text-blue-600" />
                <span className="text-sm text-blue-700 flex-1 truncate">{attachedFile.name}</span>
                <button
                  onClick={handleRemoveFile}
                  // Thêm cursor-pointer
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  title="Remove file"
                >
                  <XCircle size={18} />
                </button>
              </div>
            )}

            <div className="relative flex items-center">
              {/* File Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                // Thêm cursor-pointer
                className="text-gray-400 hover:text-blue-600 p-2 rounded-full absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
                title="Upload file"
                disabled={loading}
              >
                <Paperclip size={20} />
              </button>

              {/* Text Input */}
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows="1"
                style={{ overflowY: "hidden" }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                disabled={loading}
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={(!inputValue.trim() && !attachedFile) || loading}
                // Thêm cursor-pointer
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-9 h-9 rounded-full flex items-center justify-center ml-1 cursor-pointer"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}