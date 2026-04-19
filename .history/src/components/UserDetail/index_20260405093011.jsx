import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Box, CircularProgress, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Đảm bảo có dấu gạch chéo ở đầu URL
    fetchModel("http://localhost:3000/user/" + userId)

      .then((response) => {
        // Kiểm tra kỹ xem response.data có tồn tại không
        if (response && response.data) {
          setUser(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch user:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Box sx={{ p: 3 }}><CircularProgress /></Box>;
  
  // Nếu vẫn báo không tìm thấy, hãy kiểm tra tab Network trong F12
  if (!user) return <Typography variant="h6" sx={{ p: 2 }}>Không tìm thấy dữ liệu người dùng.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>{`${user.first_name} ${user.last_name}`}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">Nghề nghiệp: {user.occupation}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>📍 Địa điểm: {user.location}</Typography>
          <Typography variant="body1" sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5' }}>{user.description}</Typography>
          
          <Button variant="contained" component={Link} to={`/photos/${userId}`}>
            Xem Album Ảnh của {user.first_name}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;