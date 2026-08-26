export type HistoryItem = {
  period?: string;
  content: string;
};

export type Instructor = {
  id: number;

  name: string;
  company: string;
  department: string;
  role: string;
  number: string;
  email: string;
  career: number;

  categories: string[];
  topics: string[];
  description: string;

  workYears: string;
  workHistories: HistoryItem[];
  formerCompanies: string[];
  lectureHistories: HistoryItem[];
  certifications: string[];
  publications: string[];
};