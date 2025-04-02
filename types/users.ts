export type UserRole = 'student' | 'teacher';

export type UserMetric = {
  id: string;
  label: string;
  value: string | number;
  change: string;
};

export type UserStatsResponse = {
  students: {
    metrics: UserMetric[];
    progressOverTime: Array<{
      month: string;
      quizScore: string;
      flashcards: number;
    }>;
    weeklyActivity: Array<{
      id: string;
      metric: string;
      value: string;
      trend: 'up' | 'down';
    }>;
    subjectPerformance: Array<{
      subject: string;
      score: number;
      change: string;
    }>;
  };
  teachers: {
    metrics: UserMetric[];
    activityTrends: Array<{
      month: string;
      activeTeachers: number;
      contentCreated: number;
    }>;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  lastLogin: string;
  avgScore?: string;
  quizzesTaken?: number;
  classrooms?: number;
  resources?: number;
};

export type UsersListResponse = {
  data: User[];
  total: number;
  page: number;
  limit: number;
};