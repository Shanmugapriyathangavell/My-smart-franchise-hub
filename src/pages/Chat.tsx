import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic, Search, MoreVertical, Brain } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("team-general");
  const [message, setMessage] = useState("");

  const conversations = [
    { id: "team-general", name: "Team General", lastMessage: "Great work today!", unread: 3, online: true },
    { id: "project-alpha", name: "Project Alpha", lastMessage: "Meeting at 3 PM", unread: 0, online: false },
    { id: "sarah", name: "Sarah Johnson", lastMessage: "Thanks for the update", unread: 1, online: true },
    { id: "john", name: "John Smith", lastMessage: "See you tomorrow", unread: 0, online: true },
    { id: "mike", name: "Mike Chen", lastMessage: "File uploaded", unread: 0, online: false },
  ];

  const messages = {
    "team-general": [
      { id: 1, sender: "Sarah Johnson", content: "Morning team! Ready for today's sprint?", time: "09:15 AM", avatar: "SJ" },
      { id: 2, sender: "You", content: "Absolutely! Let's crush it.", time: "09:17 AM", isCurrentUser: true },
      { id: 3, sender: "John Smith", content: "I've finished the API integration", time: "09:20 AM", avatar: "JS" },
      { id: 4, sender: "Mike Chen", content: "Great work John! Moving to testing phase.", time: "09:22 AM", avatar: "MC" },
      { id: 5, sender: "You", content: "Perfect timing. I'll review the changes.", time: "09:25 AM", isCurrentUser: true },
    ]
  };

  const aiSuggestions = [
    "Summarize this conversation",
    "Create action items from chat",
    "Schedule a follow-up meeting"
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    // Handle sending message
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] animate-fade-in">
        <GlassCard hover={false} className="h-full p-0 flex overflow-hidden">
          {/* Sidebar - Conversations List */}
          <div className="w-80 border-r border-border/50 flex flex-col">
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedUser(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                      selectedUser === conv.id
                        ? "bg-primary/10"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                          {conv.name.substring(0, 2).toUpperCase()}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium truncate">{conv.name}</p>
                          {conv.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  TG
                </div>
                <div>
                  <h3 className="font-semibold">Team General</h3>
                  <p className="text-sm text-muted-foreground">8 members · 4 online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {(messages[selectedUser as keyof typeof messages] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.isCurrentUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium text-xs flex-shrink-0">
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`max-w-[70%] ${msg.isCurrentUser ? "items-end" : ""}`}>
                      {!msg.isCurrentUser && (
                        <p className="text-sm font-medium mb-1">{msg.sender}</p>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          msg.isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button variant="outline" size="icon">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSend} className="bg-gradient-primary text-primary-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Summary */}
          <div className="w-72 border-l border-border/50 p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Quick Actions</p>
                {aiSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Chat Summary</p>
                <p className="text-xs text-muted-foreground">
                  Team discussed API integration completion and moving to testing phase. 
                  Action items identified for code review.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
