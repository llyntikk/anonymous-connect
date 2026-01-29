import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
import { LinkCard } from "@/components/shared/LinkCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Link } from "@/types";

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
  {
    id: "3",
    userId: "1",
    name: "Для TikTok",
    slug: "tiktok",
    url: "https://anon.me/tiktok",
    messagesCount: 22,
    viewsCount: 250,
    isActive: false,
    createdAt: new Date(),
  },
];

export function UserLinks() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = mockLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Мои ссылки"
        subtitle={`${mockLinks.length} ссылок`}
        rightAction={
          <Button
            size="icon"
            onClick={() => navigate("/user/links/create")}
          >
            <Plus className="w-5 h-5" />
          </Button>
        }
      />

      <div className="px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск ссылок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-0"
          />
        </div>

        {/* Links List */}
        <div className="space-y-3">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <LinkCard
                link={link}
                onClick={() => navigate(`/user/links/${link.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">Ссылки не найдены</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
