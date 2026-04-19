import React from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  // 1. Lấy userId từ URL (ví dụ: /photos/650...) [cite: 32]
  const { userId } = useParams();

  // 2. Lấy danh sách ảnh của người dùng từ model data [cite: 80]
  const photos = models.photoOfUserModel(userId);

  return (
    <Box sx={{ p: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4, maxWidth: "100%" }}>
          {/* Hiển thị ngày giờ đăng ảnh - Đã format thân thiện [cite: 34, 37] */}
          <CardHeader 
            title={`Ngày đăng: ${new Date(photo.date_time).toLocaleString()}`} 
          />
          
          {/* Hiển thị hình ảnh từ thư mục images [cite: 76-77] */}
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Photo of user ${userId}`}
            sx={{ width: '100%', height: 'auto' }}
          />

          <CardContent>
            <Typography variant="h6" gutterBottom>Bình luận:</Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Duyệt qua từng bình luận của ảnh [cite: 34, 78] */}
            {photo.comments ? photo.comments.map((comment) => (
              <Box key={comment._id} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #eeeeee" }}>
                <Typography variant="subtitle2">
                  {/* Tên người bình luận là Link dẫn về trang cá nhân của họ [cite: 35-36] */}
                  <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  <Typography component="span" variant="caption" sx={{ ml: 2, color: "text.secondary" }}>
                    ({new Date(comment.date_time).toLocaleString()})
                  </Typography>
                </Typography>
                
                {/* Nội dung bình luận [cite: 35, 94] */}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {comment.comment}
                </Typography>
              </Box>
            )) : (
              <Typography variant="body2" color="text.secondary">Chưa có bình luận nào.</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;