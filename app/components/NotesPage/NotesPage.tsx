"use client";

import { NoteListResponse } from "@/app/types/notes";
import React, { ReactNode } from "react";

import css from "./NotesPage.module.css";
import Button from "../Button/Button";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

type Props = {
  data: NoteListResponse;
  children: ReactNode;
  setPage: (page: number) => void;

  setSearch: (search: string) => void;
};

const NotesPage = ({ data, children, setPage, setSearch }: Props) => {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        <Pagination totalPages={data.totalPages} onPageChange={setPage} />
        <Button className={css.button} value="Create note +" typeBtn="button" />
      </div>

      {children}
    </div>
  );
};

export default NotesPage;
