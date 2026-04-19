import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardMedia, Box, CircularProgress, Link as MuiLink } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel("http://localhost:3000/photosOfUser/" + userId)
      .then((response) => {
        if (response && response.data) {
          setPhotos(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch photos:", err);
        setLoading(false);
      });
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) return <Box sx={{ p: 3 }}><CircularProgress /></Box>;
  
  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h6" sx={{ p: 2 }}>
        Người dùng này không có ảnh.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Album Ảnh
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt={photo.file_name}
            sx={{ maxHeight: 400, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              📅 {formatDate(photo.date_time)}
            </Typography>
            
            {photo.comments && photo.comments.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Bình luận ({photo.comments.length})
                </Typography>
                {photo.comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{
                      mb: 2,
                      p: 1.5,
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      borderLeft: "3px solid #1976d2",
                    }}
                  >
                    <MuiLink
                      component={Link}
                      to={`/users/${comment.user._id}`}
                      sx={{ textDecoration: "none", fontWeight: "bold", color: "#1976d2" }}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </MuiLink>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {comment.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comment.date_time)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
