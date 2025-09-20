"use client";
import NoteDetails from "@/app/components/NoteDetails/NoteDetails";
import { getNotesById } from "@/app/lib/api";
import { Note } from "@/app/types/notes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const Details = () => {
  const params = useParams();
  const noteId = params.id as string;

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => getNotesById({ noteId }),
    enabled: !!noteId,
  });
  if (isLoading) return <p>Loading notes</p>;
  if (isError) return <p>Error loading nite</p>;
  if (!data) return <p>No note found</p>;
  return (
    <>
      <NoteDetails data={data} />
    </>
  );
};

export default Details;
