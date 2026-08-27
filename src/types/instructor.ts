export type HistoryItem = {
  period?: string;
  content: string;
};

export type Instructor = {
  id: number;

  // 기본 정보
  name: string;
  company: string;
  department: string;
  role: string;
  number: string;
  email: string;
  career: number;

  // 강의 분야
  categories: string[];
  topics: string[];
  description: string;

  // 상세 이력
  workYears: string;
  workHistories: HistoryItem[];
  formerCompanies: string[];

  // 일반 강의 이력
  lectureHistories: HistoryItem[];

  // KISIA 강의 이력
  kisiaLectureHistories: HistoryItem[];

  // 자격 / 저서
  certifications: string[];
  publications: string[];

  instructorGrade?: string;
  historyRaw?: string;
};