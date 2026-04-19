import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!userId) {
      setTitle("");
      return;
    }
    // Fetch user info từ backend để hiển thị tên trên TopBar
    fetchModel(`/user/${userId}`)
      .then(({ data }) => {
        const userName = `${data.first_name} ${data.last_name}`;
        setTitle(location.pathname.includes("photos") ? `Photos of ${userName}` : userName);
      })
      .catch(() => setTitle(""));
  }, [userId, location.pathname]);

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">My name</Typography>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
