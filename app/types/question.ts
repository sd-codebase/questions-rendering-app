export interface QuestionOption {
  id: string;
  text: string;
  label: "A" | "B" | "C" | "D";
}

export interface QuestionData {
  id: string;
  question: string;
  options: {
    [key: string]: unknown;
  };
  has_integer_answer: boolean;
  resources_directory: string;
  level: number;
  pyo: string;
  // JEE Advanced only; null/absent for NEET and JEE Main.
  type?: string | null;
  paragraph?: QuestionParagraph | null;
}

export interface QuestionParagraph {
  id: string;
  content: string;
}

export interface QuestionApiResponse {
  data: QuestionData;
  message: string;
}

export interface QuestionApiError {
  error: string;
}
