import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  
  // Lấy ID từ URL: /users/5723... hoặc /photos/5723...
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const isPhotos = pathParts[1] === "photos";

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((response) => {
          setUserName(`${response.data.first_name} ${response.data.last_name}`);
        })
        .catch(() => setUserName(""));
    } else {
      setUserName("");
    }
  }, [userId]);

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Tên Của Bạn</Typography>
        <Typography variant="h6">
          {userId ? (isPhotos ? `Photos of ${userName}` : userName) : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;