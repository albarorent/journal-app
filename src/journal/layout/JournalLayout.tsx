import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children }: any) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeInUpBig "
    >
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
