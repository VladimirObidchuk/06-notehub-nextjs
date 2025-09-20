"use client";

import React from "react";
import css from "./NoteDetails.module.css";
import { Note } from "@/app/types/notes";

type Props = {
  data: Note;
};

const NoteDetails = ({ data }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{data.title}</h2>
      </div>
      <p className={css.content}>{data.content}</p>
      <p className={css.tag}>Tag: {data.tag}</p>
    </div>
  );
};

export default NoteDetails;
