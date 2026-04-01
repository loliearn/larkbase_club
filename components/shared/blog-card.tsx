import Link from "next/link";
import { Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readCount: number;
  author: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardContent className="p-5">
          <Badge variant="secondary" className="mb-2 text-xs">
            {post.category}
          </Badge>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.readCount}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Mock data
export const mockBlogPosts: BlogPost[] = [
  {
    id: "getting-started",
    title: "飞书多维表格入门指南",
    excerpt: "从零开始搭建你的第一个多维表格",
    date: "2026-03-28",
    category: "教程",
    readCount: 1280,
    author: "张明",
  },
  {
    id: "choose-expert",
    title: "如何选择合适的行家",
    excerpt: "企业数字化转型中如何筛选匹配的行家服务",
    date: "2026-03-25",
    category: "行业洞察",
    readCount: 856,
    author: "李静",
  },
  {
    id: "automation-tips",
    title: "进阶指南：自动化工作流",
    excerpt: "利用多维表格自动化功能提升团队效率",
    date: "2026-03-22",
    category: "教程",
    readCount: 2103,
    author: "王强",
  },
];
