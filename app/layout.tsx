import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
});

const baseUrl = "https://larkbase.club";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LarkBase Club - 飞书多维表格行家俱乐部",
    template: "%s | LarkBase Club",
  },
  description: "连接专业行家与企业，快速找到合适的飞书多维表格解决方案。128+认证行家，500+成功案例，覆盖CRM、数据看板、自动化等领域。",
  keywords: ["飞书多维表格", "行家", "CRM系统", "数据看板", "自动化", "模板定制", "企业数字化"],
  authors: [{ name: "LarkBase Club" }],
  creator: "LarkBase Club",
  publisher: "LarkBase Club",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "zh-CN": baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: baseUrl,
    siteName: "LarkBase Club",
    title: "LarkBase Club - 飞书多维表格行家俱乐部",
    description: "连接专业行家与企业，快速找到合适的飞书多维表格解决方案",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LarkBase Club - 飞书多维表格行家俱乐部",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LarkBase Club - 飞书多维表格行家俱乐部",
    description: "连接专业行家与企业，快速找到合适的飞书多维表格解决方案",
    images: ["/og-image.png"],
    creator: "@LarkBaseClub",
  },
  verification: {
    google: "your-google-verification-code", // TODO: 替换为实际验证码
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LarkBase Club",
  "url": baseUrl,
  "logo": `${baseUrl}/logo.png`,
  "description": "连接专业行家与企业，快速找到合适的飞书多维表格解决方案",
  "sameAs": [
    "https://twitter.com/LarkBaseClub",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Chinese"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#005da7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansSC.variable} min-h-full flex flex-col font-sans antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
