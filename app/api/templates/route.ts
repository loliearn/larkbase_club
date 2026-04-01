import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/connection";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    // Parallel fetch templates and count
    const [templates, countResult] = await Promise.all([
      sql`
        SELECT
          t.id, t.title, t.thumbnail, t.price, t.category, t.subcategory,
          t.industry, t.description, t.collect_count as "collectCount",
          t.created_at as "createdAt",
          e.id as "authorId", e.name as "authorName", e.avatar as "authorAvatar",
          e.level as "authorLevel"
        FROM templates t
        LEFT JOIN experts e ON t.author_id = e.id
        WHERE t.status = 'active' ${category && category !== "全部" ? sql`AND t.category = ${category}` : sql``}
        ORDER BY t.collect_count DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      sql`SELECT COUNT(*) as total FROM templates WHERE status = 'active' ${category && category !== "全部" ? sql`AND category = ${category}` : sql``}`,
    ]);

    return NextResponse.json({
      templates,
      total: countResult[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
