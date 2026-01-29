import { motion } from "framer-motion";
import { Home, Link2, MessageSquare, Wallet, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  icon: typeof Home;
  label: string;
  badge?: number;
}

const userNavItems: NavItem[] = [
  { path: "/user", icon: Home, label: "Главная" },
  { path: "/user/links", icon: Link2, label: "Ссылки" },
  { path: "/user/messages", icon: MessageSquare, label: "Сообщения", badge: 3 },
  { path: "/user/balance", icon: Wallet, label: "Баланс" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {userNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center p-2 min-w-[64px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors",
                  isActive ? "bg-primary/10" : "bg-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.badge && item.badge > 0 && (
                  <span className="badge-count absolute -top-1 -right-1 text-[10px]">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span
                className={cn(
                  "text-[10px] mt-1 transition-colors",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
