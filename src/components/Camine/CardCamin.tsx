import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../../theme/theme.d";
import { PhotoCamera } from "@mui/icons-material";
const imagePath = "/uploads/images/61784b75-103b-4b6c-a3bc-a13512e929ad.png";
const fullUrl = `http://localhost:8080${imagePath}`;
console.log(fullUrl);
interface Camin {
  name: string;
  description: string;
  adress: string;
}

export const CardCamin = ({
  camin,
  onClick,
  selected,
}: {
  onClick: () => void;
  camin: Camin;
  selected: boolean;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        onClick={onClick}
        sx={{
          maxWidth: 345,
          borderRadius: "10px",
          boxShadow: selected ? 6 : 3,
          mt: 2,
          minWidth: "300px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: selected ? "translateY(-8px) scale(0.98)" : "none",
        }}
      >
        <CardActionArea>
          {imagePath ? (
            <CardMedia
              component="img"
              height="140"
              image={fullUrl}
              alt="Poza Camin"
            />
          ) : (
            <CardMedia
              sx={{
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <PhotoCamera fontSize="large" />
            </CardMedia>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {camin.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {camin.description}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {camin.adress}
            </Typography>
          </CardContent>
        </CardActionArea>
        {selected && (
          <Box
            sx={{
              height: "4px",
              width: "100%",
              backgroundColor: "primary.main",
              borderRadius: "2px",
              animation: "slideIn 0.5s ease-in-out",
              mt: "4px",
              "@keyframes slideIn": {
                "0%": { width: "0%" },
                "100%": { width: "100%" },
              },
            }}
          />
        )}
      </Card>
    </ThemeProvider>
  );
};
