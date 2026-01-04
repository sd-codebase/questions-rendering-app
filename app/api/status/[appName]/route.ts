import { NextRequest, NextResponse } from "next/server";

const API_URLS: Record<string, string | undefined> = {
  jeemains: process.env.NEXT_PUBLIC_JEE_MAINS_BASE_URL,
  jeeadvanced: process.env.NEXT_PUBLIC_JEE_ADVANCED_BASE_URL,
  neet: process.env.NEXT_PUBLIC_NEET_BASE_URL,
};

interface RouteContext {
  params: Promise<{
    appName: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { appName } = await context.params;

  const apiUrl = API_URLS[appName.toLowerCase()];

  if (!apiUrl) {
    return NextResponse.json(
      {
        error: "Invalid app name",
        message: `App name '${appName}' is not supported. Valid options: ${Object.keys(
          API_URLS
        ).join(", ")}`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      status: "ok",
      appName,
      apiUrl,
      serviceName: "question-rendering-app",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
