import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/useDispatch";
import { startLogout } from "../../store/auth";
import { desactiveNote } from "../../store/journal/thunks";

export const Navbar = ({
  drawerWidth = 240,
  showNavbar,
}: {
  drawerWidth: number;
  showNavbar: () => void;
}) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };

  const onDesactiveNote = () => {
    dispatch(desactiveNote());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
          onClick={showNavbar}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={onDesactiveNote}
          >
            <Button color="inherit" sx={{ fontSize: "1.1rem" }}>
              {" "}
              Journal App
            </Button>
          </Typography>
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
