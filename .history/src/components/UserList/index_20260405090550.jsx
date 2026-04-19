import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link để điều hướng [cite: 20]

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  // Lấy danh sách người dùng từ model data [cite: 68]
  const users = models.userListModel();

  return (
    <div>
      <Typography variant="h6" style={{ padding: "16px", paddingBottom: "0" }}>
        Danh sách người dùng
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            {/* - component={Link}: Biến ListItem thành thẻ <a> của React Router [cite: 30]
              - to: Đường dẫn đích dựa trên ID của người dùng [cite: 19]
            */}
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