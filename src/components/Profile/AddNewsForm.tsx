import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

interface AddNewsFormProps {
  title: string;
  description: string;
  date: string;
  onChange: (field: "title" | "description" | "date", value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({
  title,
  description,
  date,
  onChange,
  onSubmit,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Titlu"
            name="title"
            value={title}
            onChange={(e) => onChange("title", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descriere"
            name="description"
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            required
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Data"
            name="date"
            value={date}
            onChange={(e) => onChange("date", e.target.value)}
            required
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Adaugă Noutatea
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewsForm;
