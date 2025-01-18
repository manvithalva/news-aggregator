import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { NewsItem } from "../types";
import { Newspaper } from "lucide-react";

export const ArticleCard = ({ newsItem }: { newsItem: NewsItem }) => {
  const handleClick = () => {
    if (newsItem.url) {
      window.open(newsItem.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      className="mobile:w-full w-[30%] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="relative">
        {newsItem.image ? (
          <div
            className="h-36 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${newsItem.image})` }}
            role="img"
            aria-label={newsItem.title}
          />
        ) : (
          <div className="h-36 bg-gray-100 flex items-center justify-center">
            <Newspaper className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {newsItem.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {newsItem.description}
        </p>
      </CardContent>
    </Card>
  );
};
