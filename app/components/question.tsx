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
    <Flex vertical style={{ flex: 1, fontSize: "1rem" }} gap={"1.5rem"}>
      <MathExpression
        exp={question.question?.replaceAll("{{INTEGER_ANSWER}}", ".......")}
        resourceUrl={resourceUrl}
      />
      {showPyo?.toLowerCase() === "yes" && (
        <Space style={{ margin: "1rem 0" }}>
          <Text strong style={{ fontSize: "1rem" }}>
            {question.pyo}
          </Text>
        </Space>
      )}
      {Object.keys(question.options || {})?.length > 0 ? (
        <>
          {Object.keys(question.options)?.map(
            (opKey: string, index: number) => (
              <Flex
                key={index}
                style={{ marginBottom: "0.5rem" }}
                gap={"0.5rem"}
              >
                <Text strong style={{ fontSize: "1rem" }}>
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
