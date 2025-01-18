import { Category, NewsItem, NewsSourceEnum } from "../types";
import { NewsSource } from "../types";

const NEWS_ORG_API = import.meta.env.VITE_NEWS_ORG_API;
const NEWS_ORG_API_KEY = import.meta.env.VITE_NEWS_ORG_API_KEY;

export class NewsOrg implements NewsSource {
  name = NewsSourceEnum.NEWSORG;

  async fetchNews(
    searchTerm = "",
    date?: Date,
    category?: Category
  ): Promise<NewsItem[]> {
    if (!NEWS_ORG_API_KEY) {
      throw new Error("Invalid API key");
    }

    if (!NEWS_ORG_API) {
      throw new Error("Invalid base URL");
    }

    const params: Record<string, string> = {
      apiKey: NEWS_ORG_API_KEY,
      q: searchTerm,
      sortBy: "publishedAt",
    };

    if (category) {
      params.q = category;
    }

    if (date) {
      params.from = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      params.to = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    }

    try {
      const url = `${NEWS_ORG_API}?${new URLSearchParams(params).toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      return data.articles
        .map((article: any) => ({
          title: article.title,
          description: article.description ?? "",
          publishedAt: article.publishedAt,
          url: article.url,
          author: article.author ?? "Unknown",
          image: article.urlToImage || undefined,
        }))
        .filter((article: any) => article.title !== "[Removed]");
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  }
}
