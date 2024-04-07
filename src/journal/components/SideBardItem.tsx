import { Note } from "../../interface/JournalInterface";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useAppDispatch } from "../../hooks/useDispatch";

export const SideBardItem = ({ title, body, id, date, imagesUrls }: Note) => {
  const dispatch = useAppDispatch();
  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imagesUrls }));
  };
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
