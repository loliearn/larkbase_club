import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/connection";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch expert first (needed before parallel queries)
    const experts = await sql`
      SELECT
        id, name, avatar, level, title, city, years, intro,
        rating, review_count as "reviewCount", case_count as "caseCount",
        hourly_rate as "hourlyRate", wechat, email, skills, status,
        created_at as "createdAt"
      FROM experts
      WHERE id = ${id} OR name = ${id}
      LIMIT 1
    `;

    if (experts.length === 0) {
      return NextResponse.json({ error: "Expert not found" }, { status: 404 });
    }

    const expert = experts[0];

    // Fetch reviews, cases, templates in parallel
    const [reviews, cases, templates] = await Promise.all([
      sql`
        SELECT
          id, author_name as "authorName", author_company as "authorCompany",
          rating, content, project_title as "projectTitle",
          created_at as "createdAt"
        FROM reviews
        WHERE expert_id = ${id}
        ORDER BY created_at DESC
        LIMIT 10
      `,
      sql`
        SELECT
          id, title, thumbnail, industry, description,
          created_at as "createdAt"
        FROM cases
        WHERE expert_id = ${id}
        ORDER BY created_at DESC
      `,
      sql`
        SELECT
          id, title, thumbnail, price, category, subcategory,
          industry, collect_count as "collectCount",
          created_at as "createdAt"
        FROM templates
        WHERE author_id = ${id} AND status = 'active'
        ORDER BY created_at DESC
        LIMIT 6
      `,
    ]);

    return NextResponse.json({
      expert,
      reviews,
      cases,
      templates,
    });
  } catch (error) {
    console.error("Error fetching expert:", error);
    return NextResponse.json(
      { error: "Failed to fetch expert" },
      { status: 500 }
    );
  }
}
