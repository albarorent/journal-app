import { useMemo } from "react";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { startNewNot } from "../../store/journal/thunks";
import { RootState } from "../../store";

export const Journal = () => {
  const { isSaving, active } = useAppSelector(
    (state: RootState) => state.journal
  );

  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  const dispatch = useAppDispatch();
  
  const onClickNewNote = () => {
    dispatch(startNewNot());
  };

  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickNewNote}
        size="large"
        disabled={isSavingNote}
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
