import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Divider, Box, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải ảnh:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (!photos || photos.length === 0) return <Typography sx={{ p: 2 }}>Người dùng này chưa có ảnh.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          {/* Định dạng ngày tháng thân thiện */}
          <CardHeader title={`Đăng ngày: ${new Date(photo.date_time).toLocaleString()}`} />
          <CardMedia component="img" image={`/images/${photo.file_name}`} alt="User post" />
          <CardContent>
            <Typography variant="h6" gutterBottom>Bình luận:</Typography>
            <Divider sx={{ mb: 2 }} />
            {photo.comments ? photo.comments.map((c) => (
              <Box key={c._id} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #eee" }}>
                <Typography variant="subtitle2">
                  {/* Link quay lại trang cá nhân của người bình luận */}
                  <Link to={`/users/${c.user._id}`}>
                    {c.user.first_name} {c.user.last_name}
                  </Link>
                  <Typography component="span" variant="caption" sx={{ ml: 2, color: "gray" }}>
                    ({new Date(c.date_time).toLocaleString()})
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>{c.comment}</Typography>
              </Box>
            )) : <Typography variant="body2">Chưa có bình luận.</Typography>}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;