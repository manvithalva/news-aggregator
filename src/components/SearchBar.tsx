import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { Search } from "lucide-react";

/**
 * SearchBar component that allows users to search articles.
 * This component consists of a text input field where users can type a search query, and a button
 * that triggers the search action. Upon submitting the form, the user is navigated to a search results
 * page with the query passed as a URL parameter.
 */
export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      navigate("/"); // Navigate to the home page if no search query is provided
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Navigate to search results page
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <form onSubmit={handleSearch} className="flex gap-2 tablet:gap-3">
      <TextField
        type="text"
        label="Search articles..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow tablet:text-sm tablet:py-1"
      />
      <Button
        type="submit"
        className="tablet:text-sm tablet:py-1"
        size={isSmallScreen ? "small" : "medium"}
      >
        <Search className="mr-2 h-4 w-4 tablet:h-3 tablet:w-3" /> Search
      </Button>
    </form>
  );
}
