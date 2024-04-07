import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";
import { useState } from "react";

const drawerWidth = 280;

export const JournalLayout = ({ children }: any) => {
  const [show, setShow] = useState<boolean>(false);

  const showNavbar = () => {
    setShow(!show);
  };

  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeInUpBig animate_faster"
    >
      <Navbar drawerWidth={drawerWidth} showNavbar={showNavbar} />
      <Sidebar drawerWidth={drawerWidth} show={show} showNavbar={showNavbar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
