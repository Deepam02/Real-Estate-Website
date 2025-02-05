import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Avatar Button to open Menu */}
      <IconButton onClick={handleClick}>
        <Avatar src={user?.picture} alt="user image" />
      </IconButton>

      {/* MUI Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/favourites");
          }}
        >
          Favourites
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/bookings");
          }}
        >
          Bookings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            localStorage.clear();
            logout();
            
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
