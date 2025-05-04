import React from "react";
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  useTheme,
  styled,
} from "@mui/material";

interface Preferences {
  cleanliness: number;
  quietness: number;
  lifestyle: string;
}

interface PreferencesFormProps {
  preferences: Preferences;
  onChange: (updated: Preferences) => void;
}

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${theme.palette.primary.light}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${theme.palette.primary.light}`,
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 1),
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
}));

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  preferences,
  onChange,
}) => {
  const theme = useTheme();

  const handleSliderChange =
    (name: "cleanliness" | "quietness") =>
    (event: Event, newValue: number | number[]) => {
      onChange({
        ...preferences,
        [name]: newValue as number,
      });
    };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    onChange({
      ...preferences,
      lifestyle: event.target.value as string,
    });
  };

  return (
    <Box sx={{ pr: 5, pl: 5 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(3),
        }}
      >
        Preferințe de conviețuire
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 500, mb: 2 }}
        >
          Nivel preferat de curățenie: {preferences.cleanliness}/10
        </Typography>
        <StyledSlider
          value={preferences.cleanliness}
          onChange={handleSliderChange("cleanliness")}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 500, mb: 2 }}
        >
          Nivel preferat de liniște: {preferences.quietness}/10
        </Typography>
        <StyledSlider
          value={preferences.quietness}
          onChange={handleSliderChange("quietness")}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel
          id="lifestyle-label"
          sx={{
            color: theme.palette.text.secondary,
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Stil de viață preferat
        </InputLabel>
        <StyledSelect
          labelId="lifestyle-label"
          value={preferences.lifestyle}
          label="Stil de viață preferat"
          onChange={handleSelectChange}
          MenuProps={{
            PaperProps: {
              sx: {
                marginTop: 1,

                boxShadow: theme.shadows[3],
              },
            },
          }}
        >
          <MenuItem value="Matinal">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Matinal</Typography>
              <Typography variant="caption" color="text.secondary">
                Activ dimineața, preferă liniște noaptea
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem value="Nocturn">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Nocturn</Typography>
              <Typography variant="caption" color="text.secondary">
                Activ noaptea, preferă liniște dimineața
              </Typography>
            </Box>
          </MenuItem>
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default PreferencesForm;
