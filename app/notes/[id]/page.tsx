"use client";
import NoteDetails from "@/app/components/NoteDetails/NoteDetails";
import Error from "@/app/error";
import { getNotesById } from "@/app/lib/api";
import Loading from "@/app/loading";
import { Note } from "@/app/types/notes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const Details = () => {
  const params = useParams();
  const noteId = params.id as string;

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => getNotesById({ noteId }),
    enabled: !!noteId,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} value="note details" />;
  if (!data) return <p>No note found</p>;
  return (
    <>
      <NoteDetails data={data} />
    </>
  );
};

export default Details;
