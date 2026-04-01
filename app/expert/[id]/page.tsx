import { Metadata } from "next";
import { sql } from "@/lib/db/connection";
import ExpertDetailClient from "./ExpertDetailClient";

const baseUrl = "https://larkbase.club";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const experts = await sql`
      SELECT id, name, level, title, city, intro, rating, review_count as "reviewCount"
      FROM experts
      WHERE id = ${id} OR name = ${id}
      LIMIT 1
    `;

    if (experts.length === 0) {
      return {
        title: "行家未找到",
        description: "抱歉，您访问的行家信息不存在",
      };
    }

    const expert = experts[0];
    const title = `${expert.name} - ${expert.level} - LarkBase Club`;
    const description = expert.intro || `${expert.name}，${expert.level}，${expert.city}。专注飞书多维表格解决方案，帮助企业完成数字化转型。`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/expert/${id}`,
        type: "profile",
        images: [{ url: "/og-image.png", alt: expert.name }],
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      alternates: {
        canonical: `${baseUrl}/expert/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "行家详情",
      description: "查看行家详细信息",
    };
  }
}

export default async function ExpertDetailPage({ params }: Props) {
  const { id } = await params;

  // Fetch expert for JSON-LD schema
  let expertName = "";
  let expertLevel = "";
  let expertCity = "";

  try {
    const experts = await sql`
      SELECT name, level, city
      FROM experts
      WHERE id = ${id} OR name = ${id}
      LIMIT 1
    `;
    if (experts.length > 0) {
      expertName = experts[0].name;
      expertLevel = experts[0].level;
      expertCity = experts[0].city;
    }
  } catch (error) {
    console.error("Error fetching expert for schema:", error);
  }

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": expertName,
    "description": `${expertName}，${expertLevel}，${expertCity}。专注飞书多维表格解决方案`,
    "url": `${baseUrl}/expert/${id}`,
    "areaServed": {
      "@type": "City",
      "name": expertCity || "中国"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "飞书多维表格服务",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "模板定制"
          },
          "price": "500",
          "priceCurrency": "CNY"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "系统开发"
          },
          "price": "300",
          "priceCurrency": "CNY"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "技术咨询"
          },
          "price": "200",
          "priceCurrency": "CNY"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "行家",
        "item": `${baseUrl}/expert-square`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": expertName,
        "item": `${baseUrl}/expert/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExpertDetailClient expertId={id} />
    </>
  );
}
