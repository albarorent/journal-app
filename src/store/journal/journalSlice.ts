import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../../interface/JournalInterface";

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
      state.messageSaved = `${payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      if (state.active && state.active.imagesUrls) {
        state.active.imagesUrls = [...state.active.imagesUrls, ...payload];
      }
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.notes = []),
        (state.active = null);
    },
    setDesactivedNote: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.active = null);
    },
    deleteNoteById: (state, {payload}) => {
      state.active = null,
      state.notes = state.notes.filter(note=> note.id !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  clearNotesLogout,
  updateNote,
  setDesactivedNote,
  deleteNoteById,
  setPhotosToActiveNote,
  savingNewNote,
} = journalSlice.actions;
