import { NextRequest, NextResponse } from "next/server";

const Urls = {
  jeemains: process.env.NEXT_PUBLIC_JEE_MAINS_BASE_URL,
  jeeadvanced: process.env.NEXT_PUBLIC_JEE_ADVANCED_BASE_URL,
  neet: process.env.NEXT_PUBLIC_NEET_BASE_URL,
};

interface RouteContext {
  params: Promise<{
    solution_id: string;
    appName: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { solution_id, appName } = await context.params;

    if (!solution_id || !/^[a-zA-Z0-9_-]+$/.test(solution_id)) {
      return NextResponse.json(
        { error: "Invalid solution ID" },
        { status: 400 }
      );
    }

    if (!Object.prototype.hasOwnProperty.call(Urls, appName)) {
      return NextResponse.json({ error: "Invalid app" }, { status: 400 });
    }

    const EXTERNAL_API_BASE = `${
      Urls[appName as keyof typeof Urls]
    }/api/public/solutions`;

    const response = await fetch(`${EXTERNAL_API_BASE}/${solution_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Solution not found" },
          { status: 404 }
        );
      }
      throw new Error("Failed to fetch solution");
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching solution:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
