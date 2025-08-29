import * as FileSystem from "expo-file-system";
import { listNotes } from "./db";

export async function exportNotesToJson(): Promise<{ path: string; content: string }>{
  const notes = await listNotes();
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), notes }, null, 2);
  const path = FileSystem.documentDirectory + `notes-export-${Date.now()}.json`;
  await FileSystem.writeAsStringAsync(path, payload);
  return { path, content: payload };
}

export async function importNotesFromJson(input: string) {
  // Für jetzt: Nur validieren – eigentlicher Merge folgt später.
  JSON.parse(input);
}