# News Aggregator App

The News Aggregator App is a React-based web application that fetches and displays news from multiple sources, including News.org, The New York Times, and The Guardian. Users can search for news articles, filter by categories, and personalize their news feed based on their preferences.

---

## Features

- Fetch news from multiple APIs: News.org, The New York Times, and The Guardian.
- Search functionality to find articles by keywords.
- Category and source-based filtering.
- Personalization support with saved preferences for categories and sources.
- Modern UI with responsive design.

---

## How to Build and Run

### 1. **Build for Development**

To build the development image, use the following command:

```bash
docker build --target development -t news-aggregator:dev .
```

To run the development server:

```bash
docker run -p 5173:5173 news-aggregator:dev
```

### 2. **Build for Production**

To build the production image, use this command:

```bash
docker build --target production -t news-aggregator:prod .
```

To run the production app with Nginx:

```bash
docker run -p 80:80 news-aggregator:prod
```




