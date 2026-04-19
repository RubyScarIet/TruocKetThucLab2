import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    // Gọi API lấy ảnh của user
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  if (!photos) return <Typography>Đang tải ảnh...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardHeader title={`Ngày đăng: ${new Date(photo.date_time).toLocaleString()}`} />
          <CardMedia component="img" image={`/images/${photo.file_name}`} />
          <CardContent>
            <Typography variant="h6">Bình luận:</Typography>
            <Divider sx={{ mb: 2 }} />
            {photo.comments && photo.comments.map((comment) => (
              <Box key={comment._id} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #eee" }}>
                <Typography variant="subtitle2">
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  <Typography component="span" variant="caption" sx={{ ml: 2 }}>
                    ({new Date(comment.date_time).toLocaleString()})
                  </Typography>
                </Typography>
                <Typography variant="body2">{comment.comment}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;