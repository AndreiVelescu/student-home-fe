import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import React from "react";

interface BlogCardProps {
  news: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
  };
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ news, onClick }) => {
  return (
    <Card
      sx={{
        minWidth: { xs: "300px", sm: "500px" },
        minHeight: { xs: "100%", sm: "330px" },
        maxWidth: { xs: "380px", sm: "600px" },
        maxHeight: { xs: "100%", sm: "330px" },
        width: { xs: "400px", sm: "600px" },
        height: { xs: "100%", sm: "330px" },
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: 3,
        mt: 2,
        transition: "transform 0.2s ease-in-out, box-shadow 0.1s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
      onClick={onClick}
    >
      {news.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={news.imageUrl}
          alt={news.title}
          sx={{
            objectFit: "contain",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, paddingBottom: 2 }}>
        {/* Titlul noutății */}
        <Typography
          variant="h6"
          color="primary"
          sx={{
            mb: 1,
            fontWeight: "bold",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          {news.title}
        </Typography>

        {/* Data noutății */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {new Date(news.date).toLocaleDateString()}
        </Typography>

        {/* Descrierea noutății */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: "text.primary",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            lineHeight: 1.5,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Citește mai mult
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
