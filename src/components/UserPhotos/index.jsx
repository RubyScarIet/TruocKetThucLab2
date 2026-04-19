import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 5 (Lab 2).
 * Fetch dữ liệu từ backend API GET /photosOfUser/:id thay vì dùng fake model data.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    // Gọi backend API GET /photosOfUser/:id
    fetchModel(`/photosOfUser/${userId}`)
      .then(({ data }) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Load ảnh từ thư mục src/images/, trả về null nếu không tìm thấy
  const getImageSrc = (fileName) => {
    try {
      return require(`../../images/${fileName}`);
    } catch (e) {
      return null;
    }
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (error) return <Typography color="error" sx={{ p: 2 }}>Lỗi: {error}</Typography>;
  if (!photos || photos.length === 0) {
    return <Typography variant="h6" sx={{ p: 2 }}>Người dùng này không có ảnh.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Album Ảnh
      </Typography>
      {photos.map((photo) => {
        const imgSrc = getImageSrc(photo.file_name);
        return (
          <Card key={photo._id} sx={{ mb: 3 }}>
            {/* Hiển thị ảnh từ src/images nếu file tồn tại */}
            {imgSrc && (
              <CardMedia
                component="img"
                image={imgSrc}
                alt={photo.file_name}
                sx={{ maxHeight: 400, objectFit: "cover" }}
              />
            )}
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                📅 {formatDate(photo.date_time)}
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
                      {comment.user && (
                        <MuiLink
                          component={Link}
                          to={`/users/${comment.user._id}`}
                          sx={{ textDecoration: "none", fontWeight: "bold", color: "#1976d2" }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </MuiLink>
                      )}
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
        );
      })}
    </Box>
  );
}

export default UserPhotos;
