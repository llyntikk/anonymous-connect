import { motion } from "framer-motion";
import { Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserCard } from "@/components/shared/UserCard";
import { useState } from "react";
import type { User } from "@/types";

const mockUsers: User[] = [
  {
    id: "1",
    telegramId: "123456",
    username: "alexey_dev",
    displayName: "Алексей Разработчик",
    balance: 15600,
    createdAt: new Date(),
    isBlocked: false,
    role: "user",
  },
  {
    id: "2",
    telegramId: "789012",
    username: "maria_design",
    displayName: "Мария Дизайнер",
    balance: 8900,
    createdAt: new Date(),
    isBlocked: false,
    role: "user",
  },
  {
    id: "3",
    telegramId: "345678",
    username: "ivan_admin",
    displayName: "Иван Админов",
    balance: 0,
    createdAt: new Date(),
    isBlocked: false,
    role: "admin",
  },
  {
    id: "4",
    telegramId: "901234",
    username: "blocked_user",
    displayName: "Заблокированный",
    balance: 500,
    createdAt: new Date(),
    isBlocked: true,
    role: "user",
  },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Пользователи"
        subtitle={`${mockUsers.length} всего`}
      />

      <div className="px-4 lg:px-6 py-6 space-y-4">
        {/* Search & Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск пользователей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-0"
            />
          </div>
          <Button variant="secondary" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <UserCard user={user} />
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Пользователи не найдены</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
