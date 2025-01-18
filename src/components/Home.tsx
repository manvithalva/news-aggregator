import React from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { ArticleList } from "./ArticleList";
import { PreferencesModal } from "./PreferenceModal";

export const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState("all-news");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box maxWidth="lg" margin="auto" padding={3}>
      <SearchBar />

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        marginTop={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          // maxWidth="md"
          gap={2}
        >
          {/* Tabs Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="News Tabs"
            >
              <Tab label="All News" value="all-news" />
              <Tab label="For You" value="personalized" />
            </Tabs>

            <PreferencesModal />
          </Box>

          {/* Tabs Content */}
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            {selectedTab === "all-news" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  All News
                </Typography>
                <ArticleList />
              </Box>
            )}
            {selectedTab === "personalized" && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Personalized News
                </Typography>
                <ArticleList personalized />
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
