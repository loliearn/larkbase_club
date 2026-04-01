import Link from "next/link";
import { Star, MapPin, Clock, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Expert {
  id: string;
  name: string;
  avatar: string;
  level: "认证行家" | "金牌行家" | "战略行家" | "初级行家";
  rating: number;
  reviewCount: number;
  city: string;
  years: number;
  skills: string[];
  hourlyRate: number;
  caseCount: number;
  intro?: string;
}

const levelVariant: Record<Expert["level"], "default" | "secondary" | "outline"> = {
  "认证行家": "default",
  "金牌行家": "secondary",
  "战略行家": "outline",
  "初级行家": "outline",
};

const levelColor: Record<Expert["level"], string> = {
  "认证行家": "bg-primary/10 text-primary border-primary/20",
  "金牌行家": "bg-[var(--gold-badge)] text-[var(--gold-badge-foreground)] border-[var(--gold-badge)]",
  "战略行家": "bg-[var(--purple-badge)] text-[var(--purple-badge-foreground)] border-[var(--purple-badge)]",
  "初级行家": "bg-muted text-muted-foreground border-transparent",
};

interface ExpertCardProps {
  expert: Expert;
  showIntro?: boolean;
  showCity?: boolean;
  compact?: boolean;
}

export function ExpertCard({
  expert,
  showIntro,
  showCity = true,
  compact,
}: ExpertCardProps) {
  return (
    <Link href={`/expert?id=${expert.id}`} className="block">
      <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className={compact ? "p-4" : "p-5"}>
          {/* Header */}
          <div className="flex gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-14 w-14 rounded-xl grayscale transition-all duration-300 group-hover:grayscale-0">
                <AvatarImage src={expert.avatar} alt={expert.name} />
                <AvatarFallback className="rounded-xl bg-muted text-lg font-semibold">
                  {expert.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <span className="text-[10px] font-bold">
                  {expert.name.slice(0, 1)}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">
                  {expert.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 h-5 border ${levelColor[expert.level]}`}
                >
                  {expert.level === "金牌行家" && "🏅 "}
                  {expert.level}
                </Badge>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{expert.rating}</span>
                <span>({expert.reviewCount}评价)</span>
              </div>
            </div>
          </div>

          {/* Tags & Meta */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {showCity && (
              <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                <MapPin className="h-2.5 w-2.5" />
                {expert.city}
              </span>
            )}
            <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              <Clock className="h-2.5 w-2.5" />
              {expert.years}年
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              <Briefcase className="h-2.5 w-2.5" />
              {expert.caseCount}个案例
            </span>
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {expert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded bg-accent text-accent-foreground"
              >
                {skill}
              </span>
            ))}
            {expert.skills.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{expert.skills.length - 3}
              </span>
            )}
          </div>

          {/* Intro */}
          {showIntro && expert.intro && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {expert.intro}
            </p>
          )}

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">
                ¥{expert.hourlyRate}
              </span>
              <span className="text-xs text-muted-foreground">/时</span>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              查看详情
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Mock data for development
export const mockExperts: Expert[] = [
  {
    id: "zhang-ming",
    name: "张明",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang",
    level: "认证行家",
    rating: 4.8,
    reviewCount: 45,
    city: "北京",
    years: 5,
    skills: ["CRM", "自动化", "多维表格", "数据看板"],
    hourlyRate: 300,
    caseCount: 12,
    intro: "专注飞书多维表格解决方案，帮助20+企业完成数字化转型。",
  },
  {
    id: "li-jing",
    name: "李静",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=li",
    level: "金牌行家",
    rating: 4.9,
    reviewCount: 102,
    city: "上海",
    years: 8,
    skills: ["系统集成", "API集成", "自动化", "CRM"],
    hourlyRate: 500,
    caseCount: 45,
    intro: "10年企业数字化经验，擅长系统集成与流程自动化。",
  },
  {
    id: "wang-qiang",
    name: "王强",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang",
    level: "认证行家",
    rating: 4.6,
    reviewCount: 28,
    city: "深圳",
    years: 3,
    skills: ["数据看板", "自动化", "多维表格"],
    hourlyRate: 200,
    caseCount: 8,
    intro: "数据驱动型顾问，专注于可视化与自动化方案。",
  },
  {
    id: "zhao-li",
    name: "赵丽",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao",
    level: "初级行家",
    rating: 4.7,
    reviewCount: 15,
    city: "杭州",
    years: 2,
    skills: ["多维表格", "模板定制", "培训"],
    hourlyRate: 150,
    caseCount: 5,
  },
];
