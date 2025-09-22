import css from "./NoteList.module.css";

import NoteItem from "../NoteItem/NoteItem";
import { Note } from "@/types/note";

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </ul>
  );
};

export default NoteList;
