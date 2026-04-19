import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel("http://localhost:3000/user/list")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch user list:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Box sx={{ p: 3 }}><CircularProgress /></Box>;

  if (!users || users.length === 0) {
    return (
      <Typography variant="h6" sx={{ p: 2 }}>
        Không có người dùng
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" style={{ padding: "16px", paddingBottom: "0" }}>
        Danh sách người dùng
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText 
                primary={`${item.first_name} ${item.last_name}`} 
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;