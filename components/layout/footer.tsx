import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "首页", href: "/" },
    { label: "行家", href: "/expert-square" },
    { label: "模板", href: "/templates" },
    { label: "博客", href: "/blog" },
  ],
  company: [
    { label: "关于我们", href: "/about" },
    { label: "行家入驻", href: "/expert-join" },
    { label: "模板发布", href: "/publish" },
    { label: "联系客服", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-8">
        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">产品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">公司</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-foreground">联系我们</h3>
            <p className="text-sm text-muted-foreground">
              邮箱: contact@larkbase.club
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              地址: 北京市朝阳区某大厦
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              LB
            </div>
            <span className="text-sm text-muted-foreground">
              © 2026 LarkBase Club · 飞书多维表格行家俱乐部
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            让专业行家与企业高效连接
          </p>
        </div>
      </div>
    </footer>
  );
}
