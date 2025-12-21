"use client";

import MathExpression from "./math-expression";
import { Typography, Flex } from "antd";

const { Text } = Typography;

interface QuestionProps {
  question: Record<string, any>;
  showPyo: string;
  resourceUrl: string;
}

export const Question = ({ question, showPyo, resourceUrl }: QuestionProps) => {
  return (
    <Flex vertical style={{ flex: 1 }}>
      <MathExpression
        exp={question.question?.replaceAll("{{INTEGER ANSWER}}", "....")}
        resourceUrl={resourceUrl}
      />
      {showPyo?.toLowerCase() === "yes" && <Text strong>{question.pyo}</Text>}
      {Object.keys(question.options || {})?.length > 0 ? (
        <>
          {Object.keys(question.options)?.map(
            (opKey: string, index: number) => (
              <Flex
                key={index}
                style={{ marginBottom: "0.5rem" }}
                gap={"0.25rem"}
              >
                {opKey})
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
