import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  
  let title = "";
  if (userId) {
    const user = models.userModel(userId);
    if (user) {
      const userName = `${user.first_name} ${user.last_name}`;
      title = location.pathname.includes("photos") ? `Photos of ${userName}` : userName;
    }
  }

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Photo Sharing</Typography>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;