import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteItem.module.css";
import { Note } from "@/app/types/notes";
import { deleteNote } from "@/app/lib/api";
import Link from "next/link";

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
        <div className={css.footer}>
          <p className={css.tag}>{item.tag}</p>
          <button className={css.button} onClick={handleDelteNotes}>
            Delete
          </button>
        </div>
      </Link>
    </li>
  );
};

export default NoteItem;
