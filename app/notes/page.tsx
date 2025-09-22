"use client";

import { getNotes } from "../lib/api";
import NoteList from "../components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NotesPage from "../components/NotesPage/NotesPage";
import { useState } from "react";
import { NoteListResponse } from "../types/notes";
import Loading from "../loading";
import Error from "../error";

const Notes = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery<NoteListResponse>({
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
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} value="the list of notes" />;
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
