import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setDesactivedNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNot = () => {
  return async (dispatch: any, getState: () => RootState) => {
    //savingNote
    dispatch(savingNewNote());
    //uid
    const { uid } = getState().auth;
    const currentDate = new Date();
    const diaFormateado = currentDate.getDate(); // Obtiene el día del mes (1-31)
    const day = diaFormateado < 10 ? "0" + diaFormateado : diaFormateado;
    const monthFormateado = currentDate.getMonth() + 1;
    const month =
      monthFormateado < 10 ? "0" + monthFormateado : monthFormateado;
    const year = currentDate.getFullYear();

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    const newNote = {
      id: newDoc.id,
      title: "",
      body: "",
      date: { day, month, year },
      imagesUrls:[]
    };

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
  
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: any, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid del usuario no existe");

    const notes = await loadNotes(uid);
    
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    noteToFireStore.imagesUrls = noteToFireStore.imagesUrls || [];
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: any) => {
    dispatch(setSaving());

    //arreglo de promesas
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls))
    
  };
};

export const desactiveNote = () =>{
  return async (dispatch:any) =>{
    dispatch(setDesactivedNote());
  }
}

export const startDeletingNote = () => {
  return async (dispatch: any, getState: () => RootState) => {
    const {uid} = getState().auth;
    const {active:note} = getState().journal

    
    
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`)

    await deleteDoc(docRef);
     
    dispatch(deleteNoteById(note && note.id))
    
  } 
}