import axios from "axios";
import { Note, NoteListResponse } from "../types/notes";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

type GetNotesParams = {
  search?: string;
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
};

export const getNotes = async (params: GetNotesParams = {}) => {
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
