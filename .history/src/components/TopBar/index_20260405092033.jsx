import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [context, setContext] = useState("");
  
  // Phân tích URL để lấy userId và loại trang (users hay photos)
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const isPhotosPage = pathParts[1] === "photos";

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((response) => {
          const name = `${response.data.first_name} ${response.data.last_name}`;
          setContext(isPhotosPage ? `Photos of ${name}` : `Details of ${name}`);
        })
        .catch(() => setContext(""));
    } else {
      setContext("");
    }
  }, [userId, isPhotosPage]);

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Nguyễn Văn A (Tên của bạn)
        </Typography>
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;