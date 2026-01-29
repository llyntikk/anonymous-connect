import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Wallet,
  TrendingUp,
  AlertCircle,
  Activity,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { useNavigate } from "react-router-dom";
import type { AdminStats } from "@/types";

const mockStats: AdminStats = {
  usersOnline: 342,
  totalUsers: 15680,
  messagesDay: 2847,
  revenue: 156000,
  pendingWithdrawals: 23,
  pendingModeration: 12,
};

const systemAlerts = [
  { id: 1, type: "warning", message: "12 сообщений ожидают модерации" },
  { id: 2, type: "info", message: "Пик активности: 342 пользователя онлайн" },
  { id: 3, type: "success", message: "Все системы работают стабильно" },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Дашборд"
        subtitle="Обзор системы"
      />

      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20"
        >
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm text-foreground">
            <span className="font-bold text-primary">{mockStats.usersOnline}</span> пользователей онлайн
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-foreground">
            <span className="font-bold text-primary">{mockStats.messagesDay}</span> сообщений сегодня
          </span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <StatCard
            title="Всего пользователей"
            value={mockStats.totalUsers.toLocaleString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Сообщений за день"
            value={mockStats.messagesDay.toLocaleString()}
            icon={MessageSquare}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Выручка (день)"
            value={`${(mockStats.revenue / 1000).toFixed(0)}K ₽`}
            icon={Wallet}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Рост (неделя)"
            value="+24%"
            icon={TrendingUp}
            variant="success"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pending Moderation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/admin/moderate")}
            className="glass-card p-5 cursor-pointer hover:border-warning/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Модерация</h3>
                  <p className="text-sm text-muted-foreground">
                    Ожидает проверки
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-warning">
                {mockStats.pendingModeration}
              </span>
            </div>
          </motion.div>

          {/* Pending Withdrawals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/admin/finance")}
            className="glass-card p-5 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Заявки на вывод</h3>
                  <p className="text-sm text-muted-foreground">
                    Ожидают обработки
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">
                {mockStats.pendingWithdrawals}
              </span>
            </div>
          </motion.div>
        </div>

        {/* System Alerts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Системные уведомления
          </h2>
          <div className="space-y-2">
            {systemAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  alert.type === "warning"
                    ? "bg-warning/10 border border-warning/20"
                    : alert.type === "success"
                    ? "bg-success/10 border border-success/20"
                    : "bg-secondary"
                }`}
              >
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{alert.message}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
