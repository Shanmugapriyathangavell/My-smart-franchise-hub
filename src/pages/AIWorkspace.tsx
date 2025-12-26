import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Mic, Lightbulb, TrendingUp, FileText, Sparkles } from "lucide-react";
import aiIcon from "@/assets/ai-icon.png";

const AIWorkspace = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with task summaries, project predictions, workflow automation, and much more. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");

  const quickPrompts = [
    { icon: FileText, text: "Summarize my tasks for today" },
    { icon: TrendingUp, text: "Predict project completion dates" },
    { icon: Lightbulb, text: "Suggest workflow optimizations" },
    { icon: Sparkles, text: "Generate weekly report" },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: "user", content: input },
      { 
        role: "assistant", 
        content: "I understand you need help with that. Based on your current projects and task distribution, here are my recommendations..." 
      }
    ]);
    setInput("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            AI Workspace
          </h1>
          <p className="text-muted-foreground">Your intelligent assistant for workflow automation and insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-4">
            <GlassCard hover={false} className="h-[500px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-accent-foreground font-medium text-sm">
                        JD
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask AI anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                <div className="flex flex-col gap-2">
                  <Button size="icon" onClick={handleSend} className="bg-gradient-primary text-primary-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Workflow Builder */}
            <GlassCard hover={false}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Workflow Builder
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create automated workflows by dragging and connecting blocks
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-move hover:border-primary transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs font-medium">New Lead</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-move hover:border-primary transition-colors">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-xs font-medium">AI Analysis</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-move hover:border-primary transition-colors">
                    <div className="w-8 h-8 bg-success/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Send className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-xs font-medium">Send Email</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-move hover:border-primary transition-colors">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-xs font-medium">Update CRM</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Prompts */}
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold mb-4">Quick Prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInput(prompt.text)}
                  >
                    <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{prompt.text}</span>
                  </Button>
                ))}
              </div>
            </GlassCard>

            {/* AI Recommendations */}
            <GlassCard hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">Recommendations</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Automate Reports</p>
                  <p className="text-xs text-muted-foreground">
                    Save 5 hours/week by automating weekly reports
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Task Redistribution</p>
                  <p className="text-xs text-muted-foreground">
                    Reassign 3 tasks for 18% faster completion
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Team Expansion</p>
                  <p className="text-xs text-muted-foreground">
                    Consider hiring 1 developer based on workload
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIWorkspace;
