import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { NewsSourceEnum, Category } from "../types";

export function PreferencesModal() {
  const [open, setOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(() => {
    const savedSources = localStorage.getItem("preferredSources");
    return savedSources ? JSON.parse(savedSources) : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem("preferredCategories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSave = () => {
    // Save preferences to localStorage
    localStorage.setItem("preferredSources", JSON.stringify(selectedSources));
    localStorage.setItem(
      "preferredCategories",
      JSON.stringify(selectedCategories)
    );

    // Display a success message
    alert("Preferences have been successfully saved!");

    // Close the modal
    setOpen(false);
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    setSelectedSources((prev) =>
      checked ? [...prev, source] : prev.filter((s) => s !== source)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  return (
    <>
      <Button
        variant="outlined"
        size={isSmallScreen ? "small" : "medium"}
        onClick={() => setOpen(true)}
      >
        Customize Feed
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby="preferences-modal-title"
      >
        <DialogTitle id="preferences-modal-title">
          Personalize Your News Feed
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Preferred Sources */}
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Preferred Sources" />
                <CardContent>
                  <Grid container spacing={2}>
                    {Object.entries(NewsSourceEnum).map(([key, value]) => (
                      <Grid item xs={6} sm={4} key={key}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSources.includes(value)}
                              onChange={(e) =>
                                handleSourceChange(value, e.target.checked)
                              }
                              name={`source-${value}`}
                            />
                          }
                          label={key}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Preferred Categories */}
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Preferred Categories" />
                <CardContent>
                  <Grid container spacing={2}>
                    {Object.entries(Category).map(([key, value]) => (
                      <Grid item xs={6} sm={4} key={key}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCategories.includes(value)}
                              onChange={(e) =>
                                handleCategoryChange(value, e.target.checked)
                              }
                              name={`category-${value}`}
                            />
                          }
                          label={key}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
