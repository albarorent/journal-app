import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from "../interface/JournalInterface";

export const loadNotes = async (uid: number) => {
  if (!uid) throw new Error("El uid del usuario no existe");
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes: Note[] = [];
  docs.forEach((doc) => {
    const data = doc.data();
    const note: Note = {
      id: doc.id,
      title: data.title,
      body: data.body,
      date: data.date,
      imagesUrls: data.imagesUrls,
    };
    notes.push(note);
  });
  return notes;
};
