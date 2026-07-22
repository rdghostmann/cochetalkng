export interface Question {
  id: string;

  title: string;

  body: string;

  userId: string;

  createdAt: string;
}

export interface Answer {
  id: string;

  questionId: string;

  body: string;

  userId: string;

  createdAt: string;
}