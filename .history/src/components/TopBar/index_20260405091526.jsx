import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [context, setContext] = useState("");
  
  // Trích xuất userId từ URL (ví dụ: /users/123 -> 123)
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const isPhotos = pathParts[1] === "photos";

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((response) => {
          const name = `${response.data.first_name} ${response.data.last_name}`;
          setContext(isPhotos ? `Photos of ${name}` : name);
        })
        .catch(() => setContext(""));
    } else {
      setContext("");
    }
  }, [userId, isPhotos]);

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Bên trái: Tên của bạn */}
        <Typography variant="h6" color="inherit">
          Nguyễn Văn A (Tên của bạn)
        </Typography>

        {/* Bên phải: Ngữ cảnh động */}
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;