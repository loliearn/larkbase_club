import Link from "next/link";
import { Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Template {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
  authorAvatar?: string;
  category: string;
  collectCount?: number;
}

interface TemplateCardProps {
  template: Template;
  compact?: boolean;
}

export function TemplateCard({ template, compact }: TemplateCardProps) {
  return (
    <Link href={`/template?id=${template.id}`} className="block">
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <span className="text-4xl font-bold text-primary/30">
              {template.title.slice(0, 2)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
              查看详情
            </Badge>
          </div>
        </div>

        <CardContent className={compact ? "p-3" : "p-4"}>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {template.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-primary">
                {template.price === 0 ? "免费" : `¥${template.price}`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{template.author}</span>
            </div>
          </div>
          {template.collectCount !== undefined && (
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{template.collectCount}人收藏</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

// Mock data
export const mockTemplates: Template[] = [
  {
    id: "ec-crm",
    title: "电商CRM系统",
    thumbnail: "",
    price: 299,
    author: "李四",
    category: "销售管理",
    collectCount: 28,
  },
  {
    id: "manufacturing-mes",
    title: "制造业MES系统",
    thumbnail: "",
    price: 599,
    author: "张明",
    category: "生产制造",
    collectCount: 45,
  },
  {
    id: "chain-store",
    title: "连锁门店督导系统",
    thumbnail: "",
    price: 0,
    author: "王强",
    category: "运营管理",
    collectCount: 12,
  },
  {
    id: "customer-pool",
    title: "客户池管理",
    thumbnail: "",
    price: 199,
    author: "赵丽",
    category: "销售管理",
    collectCount: 8,
  },
];
