import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Gift, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    userId: "1",
    type: "earning",
    amount: 150,
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    description: "Просмотр рекламы",
  },
  {
    id: "2",
    userId: "1",
    type: "referral",
    amount: 500,
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    description: "Реферальный бонус",
  },
  {
    id: "3",
    userId: "1",
    type: "withdrawal",
    amount: -2000,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    description: "Вывод на карту",
  },
  {
    id: "4",
    userId: "1",
    type: "bonus",
    amount: 1000,
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    description: "Бонус за активность",
  },
];

const transactionIcons = {
  earning: TrendingUp,
  withdrawal: ArrowUpRight,
  bonus: Gift,
  referral: Users,
};

const transactionColors = {
  earning: "text-success",
  withdrawal: "text-destructive",
  bonus: "text-warning",
  referral: "text-primary",
};

export function UserBalance() {
  const balance = 12500;
  const pendingWithdrawal = 2000;

  return (
    <div className="min-h-screen">
      <PageHeader title="Баланс" />

      <div className="px-4 py-6 space-y-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Доступно к выводу</p>
            <p className="text-4xl font-bold text-foreground">
              {balance.toLocaleString()} ₽
            </p>
            {pendingWithdrawal > 0 && (
              <p className="text-sm text-warning mt-2">
                В ожидании: {pendingWithdrawal.toLocaleString()} ₽
              </p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Button className="flex-1 h-12">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Вывести
          </Button>
          <Button variant="secondary" className="flex-1 h-12">
            <Gift className="w-4 h-4 mr-2" />
            Бонусы
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard
            title="Рефералы"
            value="12"
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Заработано"
            value="45 000 ₽"
            icon={TrendingUp}
            variant="success"
          />
        </motion.div>

        {/* Transaction History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            История операций
          </h2>
          <div className="space-y-2">
            {mockTransactions.map((tx, index) => {
              const Icon = transactionIcons[tx.type];
              const colorClass = transactionColors[tx.type];

              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center bg-secondary",
                      colorClass
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {tx.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "font-semibold",
                        tx.amount > 0 ? "text-success" : "text-foreground"
                      )}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {tx.amount.toLocaleString()} ₽
                    </p>
                    {tx.status === "pending" && (
                      <span className="text-xs text-warning">В ожидании</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
