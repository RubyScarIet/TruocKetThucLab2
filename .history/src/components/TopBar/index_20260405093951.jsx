import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const isPhotosView = location.pathname.includes("/photos/");

  useEffect(() => {
    if (userId) {
      fetchModel("http://localhost:3000/user/" + userId)
        .then((response) => {
          if (response && response.data) {
            setUserName(response.data.first_name + " " + response.data.last_name);
          }
        })
        .catch(() => setUserName(""));
    } else {
      setUserName("");
    }
  }, [userId, isPhotosView]);

  const getTitle = () => {
    if (!userId) return "";
    if (isPhotosView) return `Photos of ${userName}`;
    return userName;
  };

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Photo Sharing</Typography>
        <Typography variant="h6">{getTitle()}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;