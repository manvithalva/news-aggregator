import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { Category, NewsSourceEnum } from "../types";

/**
 * ArticleFilters component allows users to apply filters such as date, category, and source to articles.
 * The filters are applied using URL search parameters, and the component automatically closes after applying filters.
 */
export function ArticleFilters({ onClose }: { onClose?: () => void }) {
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  /**
   * Handles the application of the selected filters, updates the URL with the new search parameters,
   * and automatically closes the filter bar.
   */
  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search);
    if (date) params.set("date", format(date, "yyyy-MM-dd"));
    else params.delete("date");
    if (category) params.set("category", category);
    else params.delete("category");
    if (source) params.set("source", source);
    else params.delete("source");

    navigate(`/?${params.toString()}`);

    // Always close the filter bar after applying filters
    onClose?.();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 tablet:mb-2">Filters</h2>

      {/* Date Filter */}
      <div className="space-y-2 tablet:space-y-1">
        <TextField
          label="Date"
          type="date"
          value={date ? format(date, "yyyy-MM-dd") : ""}
          onChange={(e) =>
            setDate(e.target.value ? new Date(e.target.value) : null)
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2 tablet:space-y-1">
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {Object.values(Category).map((categoryValue) => (
              <MenuItem key={categoryValue} value={categoryValue}>
                {categoryValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Source Filter */}
      <div className="space-y-2 tablet:space-y-1">
        <FormControl fullWidth>
          <InputLabel>Source</InputLabel>
          <Select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            label="Source"
          >
            {Object.values(NewsSourceEnum).map((sourceValue) => (
              <MenuItem key={sourceValue} value={sourceValue}>
                {sourceValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Apply Filters Button */}
      <Button
        onClick={handleApplyFilters}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Apply Filters
      </Button>

      {/* Close Filters Button */}
      {onClose && (
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Close Filters
        </Button>
      )}
    </div>
  );
}
