import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dialog } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface MessageCardProps {
  dialog: Dialog;
  onClick?: () => void;
  className?: string;
}

export function MessageCard({ dialog, onClick, className }: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-secondary/50 rounded-xl",
        dialog.unreadCount > 0 && "bg-primary/5",
        className
      )}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        {dialog.unreadCount > 0 && (
          <span className="badge-count absolute -top-1 -right-1">
            {dialog.unreadCount > 9 ? "9+" : dialog.unreadCount}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate">
            Аноним #{dialog.anonymousId.slice(0, 6)}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Clock className="w-3 h-3" />
            <span className="text-xs">
              {formatDistanceToNow(dialog.lastMessageAt, {
                addSuffix: true,
                locale: ru,
              })}
            </span>
          </div>
        </div>
        <p
          className={cn(
            "text-sm truncate mt-0.5",
            dialog.unreadCount > 0
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          )}
        >
          {dialog.lastMessage}
        </p>
      </div>
    </motion.div>
  );
}
