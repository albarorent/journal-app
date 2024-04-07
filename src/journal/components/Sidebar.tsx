import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/useDispatch";
import { SideBardItem } from "./";
import { MenuOutlined } from "@mui/icons-material";

export const Sidebar = ({
  drawerWidth = 240,
  show,
  showNavbar
}: {
  drawerWidth: number;
  show: boolean;
  showNavbar:()=>void
}) => {
  const { displayName } = useAppSelector((state: RootState) => state.auth);
  const { notes } = useAppSelector((state: RootState) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      className="animate__animated animate__backOutLeft"
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: show ? "block" : "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={showNavbar}
            >
              <MenuOutlined />
            </IconButton>
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />
        <List>
          {notes.map((note) => (
            <SideBardItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
