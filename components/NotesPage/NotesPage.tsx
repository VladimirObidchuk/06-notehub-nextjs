"use client";

import React, { ReactNode, useState } from "react";

import css from "./NotesPage.module.css";
import Button from "../Button/Button";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { NoteListResponse } from "@/types/notes";

type Props = {
  data: NoteListResponse;
  children: ReactNode;
  setPage: (page: number) => void;

  setSearch: (search: string) => void;
};

const NotesPage = ({ data, children, setPage, setSearch }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        <Pagination totalPages={data.totalPages} onPageChange={setPage} />
        <Button
          className={css.button}
          value="Create note +"
          typeBtn="button"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {children}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default NotesPage;
