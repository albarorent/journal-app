export interface JournalState {
  isSaving: boolean | null;
  messageSaved: string | null;
  notes: Note[]; // Ahora notes es un array de objetos de tipo Note
  active: Note | null;
}

export interface Note {
  id:string;
  title: string;
  body: string;
  date: {
    month:number|string,
    day:number | string
    year:number
  }; 
  imagesUrls : string[]
}