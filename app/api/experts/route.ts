import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/connection";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const level = searchParams.get("level");
  const city = searchParams.get("city");
  const skill = searchParams.get("skill");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const sort = searchParams.get("sort") || "rating";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    // Sort mapping
    const sortOptions: Record<string, string> = {
      rating: "rating DESC",
      "price-asc": "hourly_rate ASC",
      "price-desc": "hourly_rate DESC",
      cases: "case_count DESC",
    };
    const orderBy = sortOptions[sort] || "rating DESC";

    // Build dynamic query based on active filters
    const conditions: string[] = ["status = 'active'"];
    const params: any[] = [];
    let paramIndex = 1;

    if (level) {
      conditions.push(`level = $${paramIndex++}`);
      params.push(level);
    }
    if (city) {
      conditions.push(`city = $${paramIndex++}`);
      params.push(city);
    }
    if (skill) {
      conditions.push(`$${paramIndex++} = ANY(skills)`);
      params.push(skill);
    }
    if (priceMin) {
      conditions.push(`hourly_rate >= $${paramIndex++}`);
      params.push(parseInt(priceMin));
    }
    if (priceMax) {
      conditions.push(`hourly_rate <= $${paramIndex++}`);
      params.push(parseInt(priceMax));
    }

    const whereClause = conditions.join(" AND ");

    // Build parameterized query - neon uses tagged templates with separate params
    const experts = await sql`
      SELECT
        id, name, avatar, level, title, city, years, intro,
        rating, review_count as "reviewCount", case_count as "caseCount",
        hourly_rate as "hourlyRate", skills, status,
        created_at as "createdAt"
      FROM experts
      WHERE ${sql.unsafe(whereClause)}
      ORDER BY ${sql.unsafe(orderBy)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    // Count total with same filters
    const countResult = await sql`
      SELECT COUNT(*) as total FROM experts
      WHERE ${sql.unsafe(whereClause)}
    `;

    return NextResponse.json({
      experts,
      total: countResult[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json(
      { error: "Failed to fetch experts" },
      { status: 500 }
    );
  }
}
