import { NextRequest, NextResponse } from "next/server";

const Urls = {
  jeemains: process.env.NEXT_PUBLIC_JEE_MAINS_BASE_URL,
  neet: process.env.NEXT_PUBLIC_NEET_BASE_URL,
};

interface RouteContext {
  params: Promise<{
    question_id: string;
    appName: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { question_id, appName } = await context.params;

    // Validate question_id to prevent injection attacks
    if (!question_id || !/^[a-zA-Z0-9_-]+$/.test(question_id)) {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    // Validate appName is a valid key
    if (!Object.prototype.hasOwnProperty.call(Urls, appName)) {
      return NextResponse.json({ error: "Invalid app" }, { status: 400 });
    }

    const EXTERNAL_API_BASE = `${
      Urls[appName as keyof typeof Urls]
    }/api/public/questions`;

    // Fetch from external API
    const response = await fetch(`${EXTERNAL_API_BASE}/${question_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Question not found" },
          { status: 404 }
        );
      }
      throw new Error("Failed to fetch question");
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
