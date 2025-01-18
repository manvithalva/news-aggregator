import { useGetNews } from "../hooks/use-fetch-news";
import { ArticleCard } from "./ArticleCard";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
import { AlertTriangle } from "lucide-react";

interface ArticleListProps {
  personalized?: boolean;
}

// Loading state component for a single skeleton card
export function ArticleCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "auto" }}>
      <CardHeader
        title={<Skeleton variant="rectangular" width="75%" height={30} />}
      />
      <CardContent>
        <Stack spacing={2}>
          {/* Description lines */}
          <Skeleton variant="rectangular" width="100%" height={20} />
          <Skeleton variant="rectangular" width="85%" height={20} />

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Skeleton variant="rectangular" width={100} height={20} />
            <Skeleton variant="rectangular" width={150} height={20} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Loading state component with multiple skeleton cards
export function ArticleListSkeleton() {
  return (
    <Stack spacing={3}>
      {[...Array(5)].map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </Stack>
  );
}

/**
 * Displays a list of articles or a loading state while fetching the articles.
 * The component fetches articles and displays them in a list. If articles are still loading,
 * a loading skeleton is shown. If no articles are found, a message is displayed to the user.
 */
export function ArticleList({ personalized = false }: ArticleListProps) {
  const { data, isLoading } = useGetNews({ personalized });

  // Return loading skeleton if data is still being fetched
  if (isLoading) return <ArticleListSkeleton />;

  // Return a message if no articles are found
  if (!data || data.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding={4}
        gap={2}
      >
        <AlertTriangle size={64} color="gray" />
        <Typography variant="h6" color="textPrimary">
          No articles found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          We're sorry, but there are no articles at the moment. Please check
          back later.
        </Typography>
      </Box>
    );
  }

  // Return the list of articles if data is available
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      justifyContent="center"
      alignItems="flex-start"
    >
      {data.map((article, index) => (
        <ArticleCard key={index} newsItem={article} />
      ))}
    </Box>
  );
}
