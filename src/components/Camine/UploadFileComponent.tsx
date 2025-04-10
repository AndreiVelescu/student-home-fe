import { AddAPhoto, X } from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { InputField } from "./InputField";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import theme from "../../theme/theme.d";
import { useController, UseControllerProps } from "react-hook-form";
import React from "react";

export interface FileItem {
  file: File;
  preview: string;
  title: string;
  description: string;
  fileType: "" | "BuletinFront" | "BuletinBack" | "ConfirmareStudii";
}

interface UploadFileComponentProps extends UseControllerProps {
  files: FileItem[];
  onChange: (updatedFiles: FileItem[]) => void;
  onRemove?: (index: number) => void;
}

// Aplica tema personalizat
const minimalTheme = createTheme({
  palette: {
    primary: {
      main: "#235CF3",
    },
  },
});

// Adăugăm forwardRef pentru a permite referințele
export const UploadFileComponent = React.forwardRef<
  HTMLInputElement,
  UploadFileComponentProps
>((props, ref) => {
  const { field, fieldState } = useController(props);
  const { files, onChange, onRemove } = props;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const newFiles = Array.from(event.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: "",
      description: "",
      fileType: "" as "" | "BuletinFront" | "BuletinBack" | "ConfirmareStudii",
    }));

    onChange([...files, ...newFiles]);
    field.onChange([...files, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    onChange(updatedFiles);
    field.onChange(updatedFiles);
    if (onRemove) onRemove(index);
  };

  const handleInputDisabled = (files: any) => {
    if (files.length >= 3) {
      return true;
    }
    return false;
  };

  const handleInputChange = (
    index: number,
    field: "title" | "description" | "fileType",
    value: string
  ) => {
    const updatedFiles = [...files];
    updatedFiles[index][field] = value as any;
    onChange(updatedFiles);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container spacing={2} mt={2}>
          {files.map((file, index) => (
            <Grid item key={file.preview} xs={12} sm={6} md={4}>
              <Stack
                bgcolor={"white"}
                p={1}
                borderRadius={2}
                border="1px dashed"
                borderColor="#235CF3"
                spacing={1}
              >
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      ":hover": {
                        backgroundColor: "background.default",
                      },
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Select
                  value={file.fileType}
                  onChange={(e) =>
                    handleInputChange(index, "fileType", e.target.value)
                  }
                >
                  <MenuItem value="">Alege Varianta</MenuItem>
                  <MenuItem value="BuletinFront">Buletin Fata</MenuItem>
                  <MenuItem value="BuletinBack">Buletin Spate</MenuItem>
                  <MenuItem value="ConfirmareStudii">
                    Confirmare Studii
                  </MenuItem>
                </Select>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Button
          color="primary"
          component="label"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 160,
            width: 246,
            backgroundColor: "background.paper",
            border: "1px dashed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InsertDriveFileIcon />
          {files.length >= 3 ? (
            <Typography>Maxim 3 file-uri</Typography>
          ) : (
            <Typography>Adauga document</Typography>
          )}
          <input
            disabled={files.length >= 3}
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={ref}
          />
        </Button>
      </Box>
    </ThemeProvider>
  );
});

UploadFileComponent.displayName = "UploadFileComponent";
