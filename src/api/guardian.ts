import { Category, NewsItem, NewsSourceEnum } from "../types";
import { NewsSource } from "../types";
import { format } from "date-fns";

const GAURDIAN_API = import.meta.env.VITE_GAURDIAN_API;
const GAURDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export class Guardian implements NewsSource {
  name = NewsSourceEnum.GUARDIAN;

  async fetchNews(
    searchTerm = "",
    date?: Date,
    category?: Category
  ): Promise<NewsItem[]> {
    if (!GAURDIAN_API_KEY) {
      throw new Error("Invalid API key");
    }

    if (!GAURDIAN_API) {
      throw new Error("Invalid base URL");
    }

    const params: any = {
      "api-key": GAURDIAN_API_KEY,
      q: searchTerm,
      "show-fields": "trailText",
      "show-elements": "image",
    };

    if (category) {
      params.q = category;
    }

    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      params["from-date"] = formattedDate;
      params["to-date"] = formattedDate;
    }

    try {
      const url = `${GAURDIAN_API}?${new URLSearchParams(params).toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      return data.response.results.map((newsItem: any) => {
        return {
          title: newsItem.webTitle,
          description: newsItem.fields?.trailText,
          url: newsItem.webUrl,
          image: newsItem.elements?.[0]?.assets?.[0]?.file,
        };
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  }
}
