import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import { UserLayout } from "@/layouts/UserLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// User Pages
import { UserDashboard } from "@/pages/user/UserDashboard";
import { UserLinks } from "@/pages/user/UserLinks";
import { CreateLink } from "@/pages/user/CreateLink";
import { UserMessages } from "@/pages/user/UserMessages";
import { UserBalance } from "@/pages/user/UserBalance";

// Admin Pages
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import { AdminModerate } from "@/pages/admin/AdminModerate";
import { AdminFinance } from "@/pages/admin/AdminFinance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="links" element={<UserLinks />} />
            <Route path="links/create" element={<CreateLink />} />
            <Route path="messages" element={<UserMessages />} />
            <Route path="balance" element={<UserBalance />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="moderate" element={<AdminModerate />} />
            <Route path="finance" element={<AdminFinance />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
