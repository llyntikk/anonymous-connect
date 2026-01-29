import { motion } from "framer-motion";
import { Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
import { MessageCard } from "@/components/shared/MessageCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Dialog } from "@/types";

const mockDialogs: Dialog[] = [
  {
    id: "1",
    anonymousId: "abc123def",
    linkId: "1",
    lastMessage: "Привет! Хотел сказать, что ты очень классный 😊",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
    messagesCount: 5,
  },
  {
    id: "2",
    anonymousId: "xyz789qwe",
    linkId: "1",
    lastMessage: "Какой твой любимый фильм?",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 1,
    messagesCount: 3,
  },
  {
    id: "3",
    anonymousId: "mno456pqr",
    linkId: "2",
    lastMessage: "Спасибо за контент, очень нравится!",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    messagesCount: 8,
  },
  {
    id: "4",
    anonymousId: "stu123vwx",
    linkId: "1",
    lastMessage: "Давно хотел тебе написать...",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    messagesCount: 12,
  },
];

export function UserMessages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDialogs = mockDialogs.filter((dialog) =>
    dialog.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = mockDialogs.reduce((acc, d) => acc + d.unreadCount, 0);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Сообщения"
        subtitle={totalUnread > 0 ? `${totalUnread} непрочитанных` : "Все прочитано"}
      />

      <div className="px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск сообщений..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-0"
          />
        </div>

        {/* Dialogs List */}
        <div className="space-y-1">
          {filteredDialogs.map((dialog, index) => (
            <motion.div
              key={dialog.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MessageCard
                dialog={dialog}
                onClick={() => navigate(`/user/messages/${dialog.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {filteredDialogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Сообщения не найдены</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
