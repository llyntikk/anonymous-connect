import { motion } from "framer-motion";
import { User as UserIcon, MoreVertical, Ban, Wallet, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface UserCardProps {
  user: User;
  onClick?: () => void;
  className?: string;
}

export function UserCard({ user, onClick, className }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        "glass-card p-4 cursor-pointer transition-all duration-200",
        user.isBlocked && "opacity-60",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-primary" />
              </div>
            )}
            {!user.isBlocked && <span className="badge-online absolute -bottom-0.5 -right-0.5" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {user.displayName}
              </h3>
              {user.role !== "user" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {user.role === "admin" ? "Админ" : "Супер"}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              {user.balance.toLocaleString()} ₽
            </p>
            <p className="text-xs text-muted-foreground">Баланс</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Wallet className="w-4 h-4 mr-2" />
                Изменить баланс
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="w-4 h-4 mr-2" />
                Сообщения
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Ban className="w-4 h-4 mr-2" />
                {user.isBlocked ? "Разблокировать" : "Заблокировать"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
