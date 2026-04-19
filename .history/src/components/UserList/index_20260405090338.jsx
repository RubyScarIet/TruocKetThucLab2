import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; 

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  // 1. Tạo state để lưu trữ danh sách người dùng lấy từ server
  const [users, setUsers] = useState([]);

  // 2. Sử dụng useEffect để gọi API khi component được khởi tạo (mount)
  useEffect(() => {
    // Gọi API lấy danh sách người dùng từ server 
    fetchModel("/user/list")
      .then((response) => {
        // Cập nhật state với dữ liệu nhận được 
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      });
  }, []); // Mảng rỗng đảm bảo chỉ gọi API một lần duy nhất

  return (
    <div>
      <Typography variant="h6" style={{ padding: "16px", paddingBottom: "0" }}>
        Danh sách người dùng
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            {/* Điều hướng đến chi tiết người dùng thông qua ID [cite: 19, 30] */}
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