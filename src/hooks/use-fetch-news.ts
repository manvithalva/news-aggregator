import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Category, NewsSourceEnum } from "../types";
import { getNews } from "../services/newsAggregator";

interface useGetNewsProps {
  personalized?: boolean;
}

export function useGetNews({ personalized }: useGetNewsProps) {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const query = queryParameters.get("q") ?? "any";
  const date = queryParameters.get("date")
    ? new Date(queryParameters.get("date")!)
    : undefined;
  const category = (queryParameters.get("category") as Category) ?? undefined;
  const source = (queryParameters.get("source") as NewsSourceEnum) ?? undefined;

  function fetchNews() {
    return getNews({ query, date, category, source, personalized });
  }

  return useQuery({
    queryKey: ["news", query, date, category, source],
    queryFn: fetchNews,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
