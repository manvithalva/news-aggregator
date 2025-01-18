import { Guardian } from "../api/guardian";
import { NewsOrg } from "../api/newsOrg";
import { NewYorkTimes } from "../api/newYorkTimes";
import { Category, NewsItem, NewsSourceEnum } from "../types";

interface NewsParams {
  query: string;
  date?: Date;
  category?: Category | Category[];
  source?: NewsSourceEnum | NewsSourceEnum[];
  personalized?: boolean;
}

export const getNews = async ({
  query,
  date,
  category,
  source,
  personalized = false,
}: NewsParams): Promise<NewsItem[]> => {
  try {
    let sourcesToFetch: NewsSourceEnum[] = [];
    let categoriesToFetch: Category[] = [];

    if (personalized) {
      try {
        // Retrieve personalized settings from localStorage
        const personalizedCat: Category[] = JSON.parse(
          localStorage.getItem("preferredCategories") || "[]"
        );
        const personalizedSource: NewsSourceEnum[] = JSON.parse(
          localStorage.getItem("preferredSources") || "[]"
        );

        sourcesToFetch =
          personalizedSource.length > 0 ? personalizedSource : [];
        categoriesToFetch = personalizedCat.length > 0 ? personalizedCat : [];
      } catch (error) {
        console.error("Error parsing personalized settings:", error);
        // Fall back to defaults if localStorage parsing fails
        sourcesToFetch = [];
        categoriesToFetch = [];
      }
    } else {
      sourcesToFetch = source
        ? Array.isArray(source)
          ? source
          : [source]
        : [
            NewsSourceEnum.GUARDIAN,
            NewsSourceEnum.NYTIMES,
            NewsSourceEnum.NEWSORG,
          ];

      categoriesToFetch = category
        ? Array.isArray(category)
          ? category
          : [category]
        : [];
    }

    // If no categories specified, fetch without category filter
    if (categoriesToFetch.length === 0 && !personalized) {
      const newsPromises = sourcesToFetch.map((src) => {
        switch (src) {
          case NewsSourceEnum.NYTIMES:
            return new NewYorkTimes().fetchNews(query, date);
          case NewsSourceEnum.GUARDIAN:
            return new Guardian().fetchNews(query, date);
          case NewsSourceEnum.NEWSORG:
            return new NewsOrg().fetchNews(query, date);
          default:
            return Promise.resolve([]);
        }
      });

      const results = await Promise.allSettled(newsPromises);
      return results
        .filter(
          (result): result is PromiseFulfilledResult<NewsItem[]> =>
            result.status === "fulfilled"
        )
        .flatMap((result) => result.value);
    }

    // Fetch with category filters
    const newsPromises = sourcesToFetch.flatMap((src) =>
      categoriesToFetch.map((cat) => {
        switch (src) {
          case NewsSourceEnum.NYTIMES:
            return new NewYorkTimes().fetchNews(query, date, cat);
          case NewsSourceEnum.GUARDIAN:
            return new Guardian().fetchNews(query, date, cat);
            case NewsSourceEnum.NEWSORG:
              return new NewsOrg().fetchNews(query, date,cat);
          default:
            return Promise.resolve([]);
        }
      })
    );

    const results = await Promise.allSettled(newsPromises);
    return results
      .filter(
        (result): result is PromiseFulfilledResult<NewsItem[]> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};
