import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import filteringIcon from "../../assets/system-uicons_filtering.png";
import listIcon from "../../assets/bi_view-list.png";
import gridIcon from "../../assets/ci_grid-big-round.png";

interface SearchFilterProps {
  totalResults?: number;
  showOptions?: number[];
  sortOptions?: string[];
  defaultShow?: number;
  defaultSort?: string;
  onShowChange?: (value: number) => void;
  onSortChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  totalResults = 32,
  showOptions = [16, 32, 64],
  sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Popularity",
  ],
  defaultShow = 16,
  defaultSort = "Default",
  onShowChange,
  onSortChange,
  onSearchChange,
}) => {
  const [showValue, setShowValue] = React.useState<number>(defaultShow);
  const [sortValue, setSortValue] = React.useState<string>(defaultSort);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const handleShowChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setShowValue(value);
    onShowChange?.(value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortValue(value);
    onSortChange?.(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
        backgroundColor: "#fff7ed",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          src={filteringIcon}
          alt="Filter"
          style={{ width: 24, height: 24, cursor: "pointer" }}
        />
        <Typography variant="body2" sx={{ color: "black", fontWeight: 500 }}>
          Filter
        </Typography>
        <img
          src={gridIcon}
          alt="Grid View"
          style={{ width: 24, height: 24, cursor: "pointer" }}
        />
        <img
          src={listIcon}
          alt="List View"
          style={{ width: 24, height: 24, cursor: "pointer" }}
        />
        <Typography sx={{ color: "grey" }}>|</Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "medium",
            color: "text.primary",
            minWidth: "fit-content",
          }}
        >
          Showing 1-{showValue} of {totalResults} results
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          size="small"
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Show Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            Show
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={showValue}
              onChange={handleShowChange}
              displayEmpty
              sx={{
                borderRadius: 1,
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              {showOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            Sort by
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortValue}
              onChange={handleSortChange}
              displayEmpty
              sx={{
                borderRadius: 1,
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchFilter;
