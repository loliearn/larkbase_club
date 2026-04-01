import Link from "next/link";
import { ArrowRight, Users, Briefcase, TrendingUp, Search } from "lucide-react";
import { sql } from "@/lib/db/connection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ExpertCard } from "@/components/shared/expert-card";
import { TemplateCard } from "@/components/shared/template-card";
import { BlogCard } from "@/components/shared/blog-card";

const stats = [
  { value: "128+", label: "入驻行家", icon: Users },
  { value: "500+", label: "成功案例", icon: Briefcase },
  { value: "85%", label: "需求匹配率", icon: TrendingUp },
];

async function getHomeData() {
  const [expertsResult, templatesResult, blogsResult, expertsCountResult] = await Promise.all([
    sql`
      SELECT id, name, avatar, level, city, years, intro,
             rating, review_count as "reviewCount", case_count as "caseCount",
             hourly_rate as "hourlyRate", skills
      FROM experts
      WHERE status = 'active'
      ORDER BY rating DESC
      LIMIT 3
    `,
    sql`
      SELECT t.id, t.title, t.thumbnail, t.price, t.category, t.collect_count as "collectCount",
             e.name as "author"
      FROM templates t
      LEFT JOIN experts e ON t.author_id = e.id
      WHERE t.status = 'active'
      ORDER BY t.collect_count DESC
      LIMIT 4
    `,
    sql`
      SELECT b.id, b.title, b.excerpt, b.category, b.read_count as "readCount",
             b.published_at as "date", e.name as "author"
      FROM blogs b
      LEFT JOIN experts e ON b.author_id = e.id
      WHERE b.status = 'published'
      ORDER BY b.published_at DESC
      LIMIT 2
    `,
    sql`SELECT COUNT(*) as count FROM experts WHERE status = 'active'`,
  ]);

  return {
    experts: expertsResult,
    templates: templatesResult,
    blogs: blogsResult,
    expertCount: expertsCountResult[0]?.count || 0,
  };
}

export default async function HomePage() {
  const { experts, templates, blogs } = await getHomeData();

  // Transform data for components
  const expertCards = experts.map((e: any) => ({
    id: e.id,
    name: e.name,
    avatar: e.avatar || "",
    level: e.level,
    rating: parseFloat(e.rating) || 0,
    reviewCount: e.reviewCount || 0,
    city: e.city || "",
    years: e.years || 0,
    skills: e.skills || [],
    hourlyRate: e.hourlyRate || 0,
    caseCount: e.caseCount || 0,
    intro: e.intro || "",
  }));

  const templateCards = templates.map((t: any) => ({
    id: t.id,
    title: t.title,
    thumbnail: t.thumbnail || "",
    price: t.price || 0,
    author: t.author || "",
    category: t.category || "",
    collectCount: t.collectCount || 0,
  }));

  const blogCards = blogs.map((b: any) => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt || "",
    date: b.date ? new Date(b.date).toISOString().split("T")[0] : "",
    category: b.category || "",
    readCount: b.readCount || 0,
    author: b.author || "",
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            飞书多维表格行家俱乐部
          </h1>
          <p className="text-lg text-muted-foreground">
            连接专业行家与企业，快速找到合适的解决方案
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="输入行家姓名、模板关键词..."
              className="h-12 pl-12 pr-32 bg-card border-border shadow-md text-base"
            />
            <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9">
              搜索
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button size="lg" render={<Link href="/expert-square" />}>
              找行家
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/expert-join" />}>
              我要入驻
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 py-4">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Experts */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-screen-xl lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">推荐行家</h2>
            <Button variant="ghost" size="sm" render={<Link href="/expert-square" />}>
              查看更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertCards.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} showIntro />
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Hot Templates */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="mx-auto max-w-screen-xl lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">热门模板</h2>
            <Button variant="ghost" size="sm" render={<Link href="/templates" />}>
              查看更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {templateCards.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Latest Blogs */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-screen-xl lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">最新博客</h2>
            <Button variant="ghost" size="sm" render={<Link href="/blog" />}>
              查看更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {blogCards.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
