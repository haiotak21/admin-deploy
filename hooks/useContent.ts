import { useQuery } from "@tanstack/react-query";

async function fetchContent(type: "study" | "quiz" | "flashcard") {
  const res = await fetch(`/api/content/${type}`);
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

export const useContent = (type: "study" | "quiz" | "flashcard") => {
  return useQuery({
    queryKey: ["content", type],
    queryFn: () => fetchContent(type),
  });
};
