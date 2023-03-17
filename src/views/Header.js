import React from "react";
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import {Typography} from "antd";
import MenuIcon from '@mui/icons-material/Menu';

const Title = styled('div')(({ theme }) => ({
  display: "flex",
  alignSelf: "center",
  justifyContent: "center",
  verticalAlign: "center",
  flex: 1,
  fontSize: 24
}));
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Title>Audit Viewer</Title>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header