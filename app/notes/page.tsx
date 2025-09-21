"use client";

import { getNotes } from "../lib/api";
import NoteList from "../components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NotesPage from "../components/NotesPage/NotesPage";
import { useState } from "react";
import { NoteListResponse } from "../types/notes";

const Notes = () => {
  const [page, setPage] = useState(1);
  //   const [tag, setTag] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery<NoteListResponse>({
    queryKey: ["notes", { page, search }],
    queryFn: () =>
      getNotes({
        page,
        perPage: 10,
        search,
        sortBy: "created",
      }),
    placeholderData: keepPreviousData,
  });
  if (isLoading) return <p>Loading notes</p>;
  if (isError) return <p>Something went wrong 😢</p>;
  if (!data) return <p>No note found</p>;

  return (
    <>
      <NotesPage data={data} setPage={setPage} setSearch={setSearch}>
        {data?.notes?.length ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        )}
      </NotesPage>
    </>
  );
};

export default Notes;
