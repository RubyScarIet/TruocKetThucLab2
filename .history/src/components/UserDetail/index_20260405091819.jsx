import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Box, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Reset lại user về null khi đổi ID để tránh hiện user cũ
    setUser(null);
    setLoading(true);

    // 2. Đảm bảo đường dẫn gọi đúng API endpoint của server
    fetchModel(`/user/${userId}`)
      .then((response) => {
        // response.data phải chứa object user {first_name, last_name, ...}
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch user:", err);
        setLoading(false);
      });
  }, [userId]); 

  // 3. Hiển thị trạng thái đang tải (Loading) để UX mượt hơn
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 4. Nếu fetch xong mà không có dữ liệu mới báo "Không tìm thấy"
  if (!user) {
    return (
      <Typography variant="h6" sx={{ p: 2 }}>
        Không tìm thấy thông tin cho người dùng ID: {userId}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          {/* Hiển thị Tên đầy đủ theo yêu cầu */}
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" color="text.secondary">
            Nghề nghiệp: {user.occupation}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            📍 Địa điểm: {user.location}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', borderLeft: '4px solid #ddd', pl: 2 }}>
            {user.description}
          </Typography>
          
          {/* Nút bấm dẫn đến Route trang ảnh */}
          <Button 
            variant="contained" 
            color="primary"
            component={Link} 
            to={`/photos/${userId}`}
          >
            Xem Album Ảnh của {user.first_name}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;