import React from "react";
import { Typography, Button, Card, CardContent, Box, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";

function UserDetail() {
  const { userId } = useParams();
  
  // Lấy dữ liệu người dùng từ model data thay vì fetch từ API
  const user = models.userModel(userId);

  // Nếu không tìm thấy người dùng
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