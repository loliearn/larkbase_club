import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/connection";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    // Parallel fetch blogs and count
    const [blogs, countResult] = await Promise.all([
      sql`
        SELECT
          b.id, b.title, b.excerpt, b.cover_image as "coverImage",
          b.category, b.read_count as "readCount",
          b.published_at as "publishedAt",
          e.id as "authorId", e.name as "authorName", e.avatar as "authorAvatar"
        FROM blogs b
        LEFT JOIN experts e ON b.author_id = e.id
        WHERE b.status = 'published'
        ORDER BY b.published_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      sql`SELECT COUNT(*) as total FROM blogs WHERE status = 'published'`,
    ]);

    return NextResponse.json({
      blogs,
      total: countResult[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
