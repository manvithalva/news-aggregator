import { Category, NewsItem, NewsSourceEnum, NewsSource } from "../types";
import { format } from "date-fns";

const NEW_YORK_TIMES_API = import.meta.env.VITE_NEW_YORK_TIMES_API;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export class NewYorkTimes implements NewsSource {
  name = NewsSourceEnum.NYTIMES;

  async fetchNews(
    searchTerm = "",
    date?: Date,
    category?: Category
  ): Promise<NewsItem[]> {
    if (!NEW_YORK_TIMES_API || !NYT_API_KEY) {
      throw new Error("Invalid API configuration");
    }

    const params: Record<string, string> = {
      "api-key": NYT_API_KEY,
      q: searchTerm,
    };

    if (category) {
      params.q = category;
    }

    if (date) {
      const formattedDate = format(date, "yyyyMMdd");
      params.begin_date = formattedDate;
      params.end_date = formattedDate;
    }

    try {
      const url = `${NEW_YORK_TIMES_API}?${new URLSearchParams(
        params
      ).toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
      const data = await response.json();

      return data.response.docs.map((article: any) => {
        return {
          title: article.headline.main,
          description: article.snippet,
          publishedAt: article.pub_date,
          url: article.web_url,
          author: article.byline?.person?.[0]
            ? `${article.byline.person[0].firstname || ""} ${
                article.byline.person[0].lastname || ""
              }`.trim() || "Unknown"
            : "Unknown",
          image: article.multimedia?.[0]?.url
            ? "https://static01.nyt.com/" + article.multimedia?.[0]?.url
            : undefined,
        };
      });
    } catch (error) {
      console.error("Error fetching news from NYT API:", error);
      throw error;
    }
  }
}
