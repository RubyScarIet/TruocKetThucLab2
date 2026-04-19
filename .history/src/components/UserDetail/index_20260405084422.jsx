import React from "react";
import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  // 1. Lấy userId từ URL (ví dụ: /users/650...)
  const { userId } = useParams();

  // 2. Lấy dữ liệu chi tiết của người dùng từ model
  const user = models.userModel(userId);

  // Trường hợp không tìm thấy user (phòng lỗi deep link sai ID)
  if (!user) {
    return <Typography variant="h6">Không tìm thấy thông tin người dùng.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          {/* Hiển thị Tên đầy đủ */}
          <Typography variant="h4" gutterBottom>
            {`${user.first_name} ${user.last_name}`}
          </Typography>

          {/* Hiển thị Nghề nghiệp và Địa chỉ */}
          <Typography variant="h6" color="text.secondary">
            Nghề nghiệp: {user.occupation}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            📍 Địa điểm: {user.location}
          </Typography>

          {/* Hiển thị Mô tả bản thân */}
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 3 }}>
            {user.description}
          </Typography>

          {/* Nút bấm để xem ảnh của người này - Yêu cầu quan trọng của bài Lab */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/photos/${userId}`}
          >
            Xem Album Ảnh
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;