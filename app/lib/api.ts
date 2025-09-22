import axios from "axios";
import { Note, NoteListResponse } from "../types/notes";

axios.defaults.baseURL = "https://notehub-public.goit.study/ap";
const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type GetNotesParams = {
  search?: string;
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
};

export const getNotes = async (params: GetNotesParams = {}) => {
  await delay(2000);
  const res = await axios.get<NoteListResponse>("/notes", {
    headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
    params,
  });
  return res.data;
};

export const getNotesById = async ({ noteId }: { noteId: string }) => {
  const res = await axios.get<Note>(`/notes/${noteId}`, {
    headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
  });
  return res.data;
};

export const deleteNote = async ({ noteId }: { noteId: string }) => {
  await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
  });
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}) => {
  await axios.post<Note>("/notes", note, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
