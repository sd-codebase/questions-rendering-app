"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin, Alert, Flex, Tag, ConfigProvider, theme } from "antd";
import { QuestionApiResponse, QuestionData } from "@/app/types/question";
import { Question } from "@/app/components/question";

const Urls = {
  jeemains: process.env.NEXT_PUBLIC_JEE_MAINS_BASE_URL,
  neet: process.env.NEXT_PUBLIC_NEET_BASE_URL,
};

export default function QuestionPage() {
  const params = useParams();
  const id = params.id as string;
  const thememode = params.thememode as string;
  const appName = params.appName as string;
  const showPyo = params.showPyo as string;

  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/questions/${id}/${appName}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Question not found");
          } else {
            setError("Failed to load question");
          }
          setQuestionData(null);
          return;
        }

        const apiResponse: QuestionApiResponse = await response.json();

        if (apiResponse.data) {
          setQuestionData(apiResponse.data);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question");
        setQuestionData(null);
      } finally {
        setLoading(false);
      }
    }

    if (id && appName) {
      fetchQuestion();
    }
  }, [id, appName]);

  const isDark = thememode === "dark";
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const content = () => {
    // Loading state
    if (loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
          <Spin size="large" />
        </Flex>
      );
    }

    // Error state
    if (error || !questionData) {
      return (
        <Alert
          message={error || "Question Not Found"}
          description={`Unable to load question with ID: ${id}`}
          type="error"
          showIcon
        />
      );
    }

    // Success state
    const baseUrl = Urls[appName as keyof typeof Urls];

    const resourceUrl = baseUrl
      ? `${baseUrl}/resources-data/${appName}/${questionData.resources_directory}`
      : "";

    return (
      <Card title={null}>
        <Question
          question={questionData}
          showPyo={showPyo}
          resourceUrl={resourceUrl}
        />
      </Card>
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          padding: "32px",
          backgroundColor: isDark ? "#141414" : "#f5f5f5",
        }}
      >
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>{content()}</div>
      </div>
    </ConfigProvider>
  );
}
