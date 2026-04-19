import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];

  useEffect(() => {
    if (userId) {
      // Gọi API lấy tên người dùng để hiển thị lên thanh công cụ
      fetchModel("/user/" + userId)
        .then((response) => {
          setUserName(response.data.first_name + " " + response.data.last_name);
        })
        .catch(() => setUserName(""));
    }
  }, [userId]);

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Your name</Typography>
        <Typography variant="h6">
          {userId ? (location.pathname.includes("photos") ? `Photos of ${userName}` : userName) : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;