import { motion } from "framer-motion";
import { Check, X, Wallet, TrendingUp, ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WithdrawalRequest {
  id: string;
  username: string;
  displayName: string;
  amount: number;
  method: string;
  details: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}

const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: "1",
    username: "alexey_dev",
    displayName: "Алексей",
    amount: 5000,
    method: "Карта",
    details: "**** 4242",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "pending",
  },
  {
    id: "2",
    username: "maria_design",
    displayName: "Мария",
    amount: 2500,
    method: "ЮMoney",
    details: "410011****",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    status: "pending",
  },
  {
    id: "3",
    username: "ivan_user",
    displayName: "Иван",
    amount: 10000,
    method: "Карта",
    details: "**** 1234",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "pending",
  },
];

export function AdminFinance() {
  const [requests, setRequests] = useState(mockWithdrawals);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const totalPending = pendingRequests.reduce((acc, r) => acc + r.amount, 0);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
    );
    toast.success("Заявка одобрена");
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r))
    );
    toast.success("Заявка отклонена");
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Финансы"
        subtitle="Управление выплатами"
      />

      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title="К выплате"
            value={`${(totalPending / 1000).toFixed(1)}K ₽`}
            icon={ArrowUpRight}
            variant="primary"
          />
          <StatCard
            title="Заявок"
            value={pendingRequests.length}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Выплачено (день)"
            value="45K ₽"
            icon={Wallet}
            variant="success"
          />
          <StatCard
            title="Комиссия"
            value="5%"
            icon={TrendingUp}
          />
        </div>

        {/* Pending Requests */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Заявки на вывод
          </h2>
          <div className="space-y-3">
            {pendingRequests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 glass-card"
              >
                <Check className="w-12 h-12 text-success mx-auto mb-3" />
                <p className="text-foreground font-medium">Нет заявок</p>
                <p className="text-muted-foreground text-sm">
                  Все заявки обработаны
                </p>
              </motion.div>
            ) : (
              pendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {request.displayName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{request.username}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        {request.amount.toLocaleString()} ₽
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.method}: {request.details}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Одобрить
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
