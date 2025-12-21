"use client";

import MathExpression from "./math-expression";
import { Typography, Flex, Space } from "antd";

const { Text } = Typography;

interface QuestionProps {
  question: Record<string, any>;
  showPyo: string;
  resourceUrl: string;
}

export const Question = ({ question, showPyo, resourceUrl }: QuestionProps) => {
  return (
    <Flex vertical style={{ flex: 1, fontSize: "1rem" }} gap={"0.75rem"}>
      <MathExpression
        exp={question.question?.replaceAll("{{INTEGER_ANSWER}}", ".......")}
        resourceUrl={resourceUrl}
      />
      {showPyo?.toLowerCase() === "yes" && (
        <Text strong style={{ fontSize: "1rem" }}>
          {question.pyo}
        </Text>
      )}
      {Object.keys(question.options || {})?.length > 0 ? (
        <>
          {Object.keys(question.options)?.map(
            (opKey: string, index: number) => (
              <Flex
                key={index}
                style={{ marginBottom: "0.5rem" }}
                gap={"0.25rem"}
              >
                <Text strong style={{ fontSize: "1rem", minWidth: "2rem" }}>
                  {opKey})
                </Text>

                <MathExpression
                  exp={question.options[opKey]}
                  resourceUrl={resourceUrl}
                />
              </Flex>
            )
          )}
        </>
      ) : null}
    </Flex>
  );
};
