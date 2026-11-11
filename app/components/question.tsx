"use client";

import MathExpression from "./math-expression";
import { Typography, Flex, Space, Divider } from "antd";

const { Text } = Typography;

interface QuestionProps {
  question: Record<string, any>;
  showPyo: string;
  resourceUrl: string;
}

export const Question = ({ question, showPyo, resourceUrl }: QuestionProps) => {
  return (
    <Flex vertical style={{ flex: 1, fontSize: "1rem" }} gap={"0.75rem"}>
      {/* Passage (JEE Advanced comprehension questions only) */}
      {question.paragraph?.content ? (
        <>
          <MathExpression
            exp={question.paragraph.content}
            resourceUrl={resourceUrl}
          />
          <Divider style={{ margin: "0.25rem 0" }} />
        </>
      ) : null}
      <MathExpression
        exp={question.question?.replaceAll("{{INTEGER_ANSWER}}", ".......")}
        resourceUrl={resourceUrl}
      />
      {showPyo?.toLowerCase() === "yes" && (
        <Text strong style={{ fontSize: "1rem" }}>
          {question.pyo}
        </Text>
      )}
      {/* Skip the option list when every option is empty (e.g. {"a":"","b":"",...}),
          so no bare "a) b) c) d)" labels are shown. */}
      {Object.keys(question.options || {})?.length > 0 &&
      Object.values(question.options).some(
        (v) => v !== null && v !== undefined && String(v).trim() !== ""
      ) ? (
        <>
          {Object.keys(question.options)?.map(
            (opKey: string, index: number) => (
              <Flex
                key={index}
                style={{ marginBottom: "0.5rem" }}
                gap={"0.25rem"}
              >
                <Text strong style={{ fontSize: "1rem", minWidth: "1.5rem" }}>
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
