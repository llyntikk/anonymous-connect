import { motion } from "framer-motion";
import { Link2, Copy, Check, Eye, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/shared/PageHeader";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CreateLink() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedUrl = `https://anon.me/${slug || "your-link"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    toast.success("Ссылка скопирована!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSlugChange = (value: string) => {
    const sanitized = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
    setSlug(sanitized);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Новая ссылка"
        showBack
      />

      <div className="px-4 py-6 space-y-6">
        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">Твоя ссылка</p>
          <p className="text-lg font-medium text-foreground break-all">
            {generatedUrl}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="mt-4"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Скопировано
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Копировать
              </>
            )}
          </Button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Название ссылки</Label>
            <Input
              id="name"
              placeholder="Например: Для Instagram"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Уникальный адрес</Label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center bg-secondary rounded-lg px-3">
                <span className="text-sm text-muted-foreground">anon.me/</span>
                <Input
                  id="slug"
                  placeholder="your-link"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="border-0 bg-transparent px-0 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Настройки приватности</h3>

          <div
            className={cn(
              "flex items-center justify-between p-3 rounded-xl transition-colors",
              isPublic ? "bg-primary/10" : "bg-secondary"
            )}
          >
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Globe className="w-5 h-5 text-primary" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">
                  {isPublic ? "Публичная" : "Приватная"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPublic
                    ? "Любой может отправить сообщение"
                    : "Доступ только по прямой ссылке"}
                </p>
              </div>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button className="w-full h-12 text-base" disabled={!name || !slug}>
            Создать ссылку
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
