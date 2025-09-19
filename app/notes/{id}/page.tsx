"use client";
import { getNotesById } from "@/app/lib/api";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const NoteDetails = () => {
  const params = useParams();
  const noteId = params.id;

  const { data, isLoading, isError } = useQueries({
    queryKey: ["note", noteId],
    queryFn: () => getNotesById({ noteId }),
    enable: !!noteId,
  });
  if (isLoading) return <p>Loading notes</p>;
  if (isError) return <p>Error loading nite</p>;
  return (
    <div>
      <h3>{data?.title}</h3>
      <p>{data?.content}</p>
      <p>Tag: {data?.tag}</p>
    </div>
  );
};

export default NoteDetails;
