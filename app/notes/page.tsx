"use client";

import { getNotes } from "../lib/api";
import NoteList from "../components/NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";

const Notes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
  if (isLoading) return <p>Loading notes</p>;
  if (isError) return <p>Something went wrong 😢</p>;

  return (
    <section>
      <h1>Note List</h1>
      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </section>
  );
};

export default Notes;
