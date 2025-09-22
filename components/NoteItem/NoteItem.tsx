import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteItem.module.css";

import Link from "next/link";
import Button from "../Button/Button";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/notes";

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, string>({
    mutationFn: (noteId) => deleteNote({ noteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleDelteNotes = () => {
    mutation.mutate(item.id);
  };
  return (
    <li className={css.listItem}>
      <Link href={`/notes/${item.id}`} className={css.content}>
        <p className={css.title}>{item.title}</p>
      </Link>
      <div className={css.footer}>
        <p className={css.tag}>{item.tag}</p>
        <Button
          typeBtn="button"
          className={css.button}
          onClick={handleDelteNotes}
          value="Delete"
        />
      </div>
    </li>
  );
};

export default NoteItem;
