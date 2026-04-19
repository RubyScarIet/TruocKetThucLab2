import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Dùng fetchModel thay vì models

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null); // Khởi tạo state là null

  useEffect(() => {
    // Gọi API lấy thông tin chi tiết user
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.error(err));
  }, [userId]); // Chạy lại mỗi khi userId thay đổi

  if (!user) return <Typography>Đang tải dữ liệu người dùng...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography variant="h6" color="text.secondary">Nghề nghiệp: {user.occupation}</Typography>
          <Typography variant="subtitle1"> Địa điểm: {user.location}</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>{user.description}</Typography>
          <Button variant="contained" component={Link} to={`/photos/${userId}`}>
            Xem Album Ảnh
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;