"use client";

import { useState, useEffect } from "react";
import { Star, MessageCircle, FileText, Copy, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  id: string;
  authorName: string;
  authorCompany: string;
  rating: number;
  content: string;
  projectTitle: string;
  createdAt: string;
}

interface Case {
  id: string;
  title: string;
  thumbnail: string;
  industry: string;
  description: string;
}

interface Expert {
  id: string;
  name: string;
  avatar: string;
  level: string;
  title: string;
  city: string;
  years: number;
  intro: string;
  rating: string;
  reviewCount: number;
  caseCount: number;
  hourlyRate: number;
  wechat: string;
  email: string;
  skills: string[];
}

const services = [
  { icon: "🎨", title: "模板定制", desc: "根据企业需求定制专属多维表格模板", price: "¥500起" },
  { icon: "💻", title: "系统开发", desc: "基于飞书多维表格的系统功能开发", price: "¥300/时" },
  { icon: "📞", title: "技术咨询", desc: "多维表格使用与优化的专业咨询", price: "¥200/时" },
];

interface Props {
  expertId: string;
}

export default function ExpertDetailClient({ expertId }: Props) {
  const [data, setData] = useState<{
    expert: Expert;
    reviews: Review[];
    cases: Case[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpert() {
      try {
        const res = await fetch(`/api/experts/${expertId}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch expert:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpert();
  }, [expertId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto px-4 py-8 lg:px-8">
          <Skeleton className="h-48 w-full rounded-xl mb-6" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.expert) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">未找到该行家信息</p>
      </div>
    );
  }

  const { expert, reviews, cases } = data;

  const levelColor: Record<string, string> = {
    "认证行家": "bg-primary/10 text-primary border-primary/20",
    "金牌行家": "bg-[var(--gold-badge)] text-[var(--gold-badge-foreground)] border-[var(--gold-badge)]",
    "战略行家": "bg-[var(--purple-badge)] text-[var(--purple-badge-foreground)] border-[var(--purple-badge)]",
    "初级行家": "bg-muted text-muted-foreground border-transparent",
  };

  const rating = parseFloat(expert.rating) || 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-screen-xl px-4 py-3 lg:px-8">
          <p className="text-sm text-muted-foreground">
            首页 &gt; 行家 &gt; <span className="text-foreground">{expert.name}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex shrink-0 justify-center sm:block">
                    <Avatar className="h-24 w-24 rounded-2xl">
                      <AvatarImage src={expert.avatar || ""} alt={expert.name} />
                      <AvatarFallback className="rounded-2xl bg-muted text-3xl font-semibold">
                        {expert.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">{expert.name}</h1>
                      <Badge variant="outline" className={`border ${levelColor[expert.level] || ""}`}>
                        {expert.level === "金牌行家" && "🏅 "}
                        {expert.level}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {expert.title || "飞书多维表格专家"} · {expert.city} · {expert.years}年经验
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({expert.reviewCount}评价)</span>
                      </span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">{expert.caseCount}个项目完成</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {expert.intro || "暂无简介"}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button>
                        <MessageCircle className="mr-1.5 h-4 w-4" /> 发起咨询
                      </Button>
                      <Button variant="outline">
                        <FileText className="mr-1.5 h-4 w-4" /> 提交需求
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">技能标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(expert.skills || []).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services & Pricing */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">服务类型 & 价格</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {services.map((service) => (
                    <div
                      key={service.title}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:bg-accent/50"
                    >
                      <span className="text-3xl">{service.icon}</span>
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-xs text-muted-foreground">{service.desc}</p>
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Cases */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">成功案例 ({cases.length})</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    查看全部 <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {cases.map((caseItem) => (
                    <div key={caseItem.id} className="group cursor-pointer overflow-hidden rounded-xl border border-border">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary/40">
                          {caseItem.title.slice(0, 2)}
                        </span>
                      </div>
                      <div className="border-t border-border bg-card p-3">
                        <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {caseItem.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{caseItem.industry}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">评价 ({expert.reviewCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-foreground">{rating.toFixed(1)}/5</span>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{review.authorName}</span>
                            <span className="text-xs text-muted-foreground">· {review.authorCompany}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString("zh-CN") : ""}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">&ldquo;{review.content}&rdquo;</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-4 w-full">
                  查看全部评价
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">微信号</p>
                    <p className="font-medium text-foreground">{expert.wechat || "暂未公开"}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8" onClick={() => {
                    if (expert.wechat) navigator.clipboard.writeText(expert.wechat);
                  }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">邮箱</p>
                    <p className="font-medium text-foreground text-sm">{expert.email || "暂未公开"}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    <Mail className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">数据概览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">入驻时间</span>
                  <span className="text-sm font-medium text-foreground">2024年3月</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">完成项目</span>
                  <span className="text-sm font-medium text-foreground">{expert.caseCount}个</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">响应时间</span>
                  <span className="text-sm font-medium text-foreground">24小时内</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">好评率</span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    98%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
