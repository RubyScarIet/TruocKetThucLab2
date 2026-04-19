import React from "react";
import { Typography, Card, CardContent, CardMedia, Box, TextField, Button } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  
  // Lấy danh sách ảnh của người dùng
  const photos = models.photoOfUserModel(userId);
  
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
              📅 {photo.date_time}
            </Typography>
            
            {/* Hiển thị comments */}
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
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {comment.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.date_time}
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
