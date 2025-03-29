export type StudySet = {
    id: string;
    title: string;
    subject: string;
    terms: number;
    views: number;
    rating: number;
    status: string;
  };
  
  export type Quiz = {
    id: string;
    title: string;
    subject: string;
    questions: number;
    timeLimit: number;
    attempts: number;
    avgScore: number;
    status: string;
  };
  
  export type FlashcardSet = {
    id: string;
    title: string;
    subject: string;
    cards: number;
    reviews: number;
    rating: number;
    status: string;
  };