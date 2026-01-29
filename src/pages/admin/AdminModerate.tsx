import { motion } from "framer-motion";
import { Check, X, Eye, AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ModerateMessage {
  id: string;
  content: string;
  senderAnonymousId: string;
  recipientUsername: string;
  createdAt: Date;
  isReported: boolean;
}

const mockMessages: ModerateMessage[] = [
  {
    id: "1",
    content: "Привет! Это очень важное сообщение для тебя 😊",
    senderAnonymousId: "anon_abc123",
    recipientUsername: "alexey_dev",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    isReported: false,
  },
  {
    id: "2",
    content: "Подозрительный контент, который нужно проверить...",
    senderAnonymousId: "anon_xyz789",
    recipientUsername: "maria_design",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    isReported: true,
  },
  {
    id: "3",
    content: "Обычное дружеское сообщение, ничего особенного",
    senderAnonymousId: "anon_def456",
    recipientUsername: "ivan_user",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    isReported: false,
  },
];

export function AdminModerate() {
  const [messages, setMessages] = useState(mockMessages);

  const handleApprove = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Сообщение одобрено");
  };

  const handleReject = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Сообщение отклонено");
  };

  const handleRevealSender = (id: string) => {
    toast.info("Отправитель: @hidden_user_123");
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Модерация"
        subtitle={`${messages.length} сообщений в очереди`}
      />

      <div className="px-4 lg:px-6 py-6 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <p className="text-lg font-semibold text-foreground">Всё проверено!</p>
            <p className="text-muted-foreground">Нет сообщений для модерации</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "glass-card p-4",
                  message.isReported && "border-warning/30"
                )}
              >
                {message.isReported && (
                  <div className="flex items-center gap-2 text-warning mb-3 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Жалоба от пользователя</span>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground">
                        От: {message.senderAnonymousId}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-sm text-muted-foreground">
                        @{message.recipientUsername}
                      </span>
                    </div>
                    <p className="text-foreground">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.createdAt.toLocaleString("ru-RU")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleApprove(message.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Одобрить
                  </Button>
                  <Button
                    onClick={() => handleReject(message.id)}
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Отклонить
                  </Button>
                  <Button
                    onClick={() => handleRevealSender(message.id)}
                    variant="secondary"
                    size="icon"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
