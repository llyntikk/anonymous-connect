import { motion } from "framer-motion";
import { Wallet, MessageSquare, Eye, Link2, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { LinkCard } from "@/components/shared/LinkCard";
import { useNavigate } from "react-router-dom";
import type { Link, UserStats } from "@/types";

// Mock data
const mockStats: UserStats = {
  balance: 12500,
  totalMessages: 156,
  totalViews: 2340,
  activeLinks: 4,
  pendingWithdrawal: 0,
};

const mockLinks: Link[] = [
  {
    id: "1",
    userId: "1",
    name: "Моя основная ссылка",
    slug: "my-link",
    url: "https://anon.me/my-link",
    messagesCount: 89,
    viewsCount: 1200,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    name: "Для Instagram",
    slug: "instagram",
    url: "https://anon.me/instagram",
    messagesCount: 45,
    viewsCount: 890,
    isActive: true,
    createdAt: new Date(),
  },
];

export function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Привет, Алексей! 👋"
        subtitle="Твоя статистика за сегодня"
        showNotifications
        notificationCount={3}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard
            title="Баланс"
            value={`${mockStats.balance.toLocaleString()} ₽`}
            icon={Wallet}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Сообщения"
            value={mockStats.totalMessages}
            icon={MessageSquare}
            subtitle="+8 новых"
          />
          <StatCard
            title="Просмотры"
            value={mockStats.totalViews.toLocaleString()}
            icon={Eye}
            trend={{ value: 24, isPositive: true }}
          />
          <StatCard
            title="Активных ссылок"
            value={mockStats.activeLinks}
            icon={Link2}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <Button
            onClick={() => navigate("/user/links/create")}
            className="flex-1 h-12 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Новая ссылка
          </Button>
          <Button
            onClick={() => navigate("/user/balance")}
            variant="secondary"
            className="flex-1 h-12"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Вывести
          </Button>
        </motion.div>

        {/* Recent Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Твои ссылки</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/user/links")}
              className="text-primary"
            >
              Все
            </Button>
          </div>
          <div className="space-y-3">
            {mockLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <LinkCard
                  link={link}
                  onClick={() => navigate(`/user/links/${link.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* New Messages Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/user/messages")}
          className="glass-card p-4 border-primary/30 cursor-pointer hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                3 новых сообщения
              </h3>
              <p className="text-sm text-muted-foreground">
                Нажми, чтобы прочитать
              </p>
            </div>
            <div className="badge-count">3</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
