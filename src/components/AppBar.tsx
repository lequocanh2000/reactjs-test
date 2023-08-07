import React, { useState } from "react";
// mui
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
// import Button from "@mui/material/Button";
// import Alert from "@mui/material/Alert";
// import Grid from "@mui/material/Grid";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import MenuMui from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// icon
import Magnify from "mdi-material-ui/Magnify";
import AccountOutline from "mdi-material-ui/AccountOutline";
import Logout from "mdi-material-ui/Logout";

import adminImage from "../assets/images/user/admin.jpg";

const CardCustomize = styled(Card)({
  "&.MuiCard-root": {
    boxShadow:
      "rgba(0, 0, 0, 0.06) 0px 3px 4px -1px, rgba(0, 0, 0, 0.01) 0px 2px 3px -1px",
  },
});

const Menu = styled(MenuMui)({
  "& .MuiMenu-paper": { width: 140, mt: 4 },
  "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
});

function AppBar() {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <CardCustomize>
      <Stack direction="row" justifyContent="space-between" p={2} px={4}>
        <TextField
          //   label="TextField"
          variant="outlined"
          id="search"
          size="small"
          placeholder="Tìm kiếm"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify />
              </InputAdornment>
            ),
          }}
        />
        <Avatar
          src={adminImage}
          sx={{
            width: 44,
            height: 44,
            border: "1px solid #ccc",
            ":hover": { cursor: "pointer" },
          }}
          alt="Admin"
          onClick={(event) => handleClick(event)}
        />
        <Menu
          keepMounted
          id="simple-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Hồ sơ" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </MenuItem>
        </Menu>
      </Stack>
    </CardCustomize>
  );
}

export default AppBar;
