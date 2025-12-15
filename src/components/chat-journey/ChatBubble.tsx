import { memo } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Sparkles, User } from "lucide-react";
import edumateLogo from "../../../public/favicon.ico";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
  onEdit?: () => void;
  canEdit?: boolean;
}

const ChatBubbleComponent = ({ message, isUser, isTyping, onEdit, canEdit }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "w-full py-6 px-4 md:px-6 transition-all duration-300",
      "animate-fade-in"
    )}>
      <div className="max-w-3xl mx-auto">
        <div className={cn(
          "flex gap-4",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          {/* Enhanced Avatar */}
          <div className="flex-shrink-0 pt-1">
            {isUser ? (
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-card to-primary/5 border-2 border-border/50 flex items-center justify-center shadow-md backdrop-blur-sm overflow-hidden">
                  <User className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full ring-2 ring-background" />
              </div>
            ) : (
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-card to-primary/5 border-2 border-border/50 flex items-center justify-center shadow-md backdrop-blur-sm overflow-hidden">
                  <img src={edumateLogo} alt="Edumate" className="w-6 h-6 object-contain" />
                </div>
                {/* AI indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Message Content */}
          <div className={cn(
            "flex-1 min-w-0",
            isUser ? "flex flex-col items-end" : ""
          )}>
            {/* Enhanced Sender Label */}
            <div className={cn(
              "flex items-center gap-2 mb-2",
              isUser ? "flex-row-reverse" : "flex-row"
            )}>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wide",
                isUser ? "text-primary" : "text-accent"
              )}>
                {isUser ? "You" : "Edumate AI"}
              </span>
              {/* {!isUser && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                  AI
                </span>
              )} */}
            </div>

            {/* Message Bubble */}
            {isTyping ? (
              <div className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl rounded-tl-md border border-border/30 shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" />
              </div>
            ) : (
              <div 
                className={cn(
                  "inline-block max-w-[90%] md:max-w-[85%] transition-all duration-300",
                  isUser 
                    ? "bg-gradient-to-br from-primary via-primary-light to-primary text-white rounded-2xl rounded-tr-md px-5 py-3.5 shadow-lg shadow-primary/20" 
                    : "bg-gradient-to-br from-card to-primary/5 text-foreground rounded-2xl rounded-tl-md px-5 py-3.5 border border-border/50 shadow-md backdrop-blur-lg",
                  canEdit && "cursor-pointer group hover:shadow-xl hover:scale-[1.02] relative"
                )}
                onClick={canEdit ? onEdit : undefined}
              >
                <div className={cn(
                  "text-[15px] leading-relaxed",
                  "prose prose-base max-w-none",
                  "prose-p:my-2.5 prose-p:first:mt-0 prose-p:last:mb-0",
                  "prose-strong:font-bold",
                  "prose-headings:font-display prose-headings:font-bold",
                  "prose-ul:my-2 prose-ol:my-2",
                  "prose-li:my-1",
                  isUser 
                    ? "prose-p:text-white prose-strong:text-white prose-headings:text-white prose-li:text-white" 
                    : "prose-p:text-foreground prose-strong:text-foreground prose-headings:text-foreground prose-li:text-foreground"
                )}>
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
                
                {canEdit && (
                  <div className={cn(
                    "absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                    isUser ? "right-3 -bottom-8" : "left-3 -bottom-8"
                  )}>
                    <div className={cn(
                      "whitespace-nowrap text-xs font-semibold px-2 py-1 rounded shadow",
                      isUser ? "bg-primary text-white" : "bg-card text-foreground border border-border/30"
                    )}>
                      Click to edit
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Message timestamp (optional) */}
            {!isTyping && (
              <div className={cn(
                "mt-1.5 text-[11px] text-muted-foreground/60",
                isUser ? "text-right" : "text-left"
              )}>
                Just now
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatBubble = memo(ChatBubbleComponent);