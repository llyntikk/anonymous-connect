import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Wallet,
  Send,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  icon: typeof LayoutDashboard;
  label: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { path: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { path: "/admin/users", icon: Users, label: "Пользователи" },
  { path: "/admin/moderate", icon: MessageSquare, label: "Модерация", badge: 12 },
  { path: "/admin/finance", icon: Wallet, label: "Финансы", badge: 5 },
  { path: "/admin/broadcast", icon: Send, label: "Рассылки" },
  { path: "/admin/settings", icon: Settings, label: "Настройки" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-sidebar-foreground">AnonMsgr</h1>
          <p className="text-xs text-muted-foreground">Админ-панель</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "nav-item",
                  isActive && "active"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="badge-count">{item.badge}</span>
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="nav-item w-full text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </motion.aside>
  );
}
