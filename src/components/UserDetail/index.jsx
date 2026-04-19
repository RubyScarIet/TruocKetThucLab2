import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Box, Divider, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 5 (Lab 2).
 * Fetch dữ liệu từ backend API GET /user/:id thay vì dùng fake model data.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    // Gọi backend API GET /user/:id
    fetchModel(`/user/${userId}`)
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return <Typography variant="h6" sx={{ p: 2 }}>Chọn một người dùng từ danh sách bên trái</Typography>;
  }

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (error) return <Typography color="error" sx={{ p: 2 }}>Lỗi: {error}</Typography>;
  if (!user) return <Typography variant="h6" sx={{ p: 2 }}>Không tìm thấy người dùng.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>{`${user.first_name} ${user.last_name}`}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">Nghề nghiệp: {user.occupation}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Địa điểm: {user.location}</Typography>
          <Typography variant="body1" sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5" }}>{user.description}</Typography>

          <Button variant="contained" component={Link} to={`/photos/${userId}`}>
            Xem Album Ảnh của {user.first_name}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;
