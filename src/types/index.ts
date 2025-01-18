export interface NewsSource {
  name: NewsSourceEnum;
  fetchNews: (
    searchTerm: string,
    date?: Date,
    category?: Category
  ) => Promise<NewsItem[]>;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  image: string;
}

export enum NewsSourceEnum {
  GUARDIAN = "guardian",
  NYTIMES = "nytimes",
  NEWSORG = "newsOrg",
  ALL = "all",
}

export enum Category {
  Business = "business",
  Entertainment = "entertainment",
  Sports = "sports",
  Politics = "politics",
  Technology = "technology",
  Any = "any",
}
