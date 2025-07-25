import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type:': 'application/json',
  },
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search?.trim()) {
    params.search = search.trim();
  }

  const { data } = await instance.get<FetchNotesResponse>('/notes', { params });
  return data;
};

interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: number | string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};