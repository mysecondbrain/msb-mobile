import * as SQLite from "expo-sqlite";

export type Note = { id: number; title: string; content: string; created_at: number; updated_at: number };

const db = SQLite.openDatabase("msb.db");

export function init() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        created_at INTEGER,
        updated_at INTEGER
      );`
    );
  });
}

export function listNotes(): Promise<Note[]> {
  return new Promise((resolve, reject) => {
    db.readTransaction(tx => {
      tx.executeSql(
        "SELECT * FROM notes ORDER BY updated_at DESC",
        [],
        (_, { rows }) => resolve(rows._array as Note[]),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function getNote(id: number): Promise<Note | null> {
  return new Promise((resolve, reject) => {
    db.readTransaction(tx => {
      tx.executeSql(
        "SELECT * FROM notes WHERE id = ? LIMIT 1",
        [id],
        (_, { rows }) => resolve(rows.length ? (rows.item(0) as Note) : null),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function createNote(title: string, content: string): Promise<number> {
  const ts = Date.now();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)",
        [title, content, ts, ts],
        (_, res) => resolve(res.insertId as number),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function updateNote(id: number, title: string, content: string): Promise<void> {
  const ts = Date.now();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?",
        [title, content, ts, id],
        () => resolve(),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function deleteNote(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("DELETE FROM notes WHERE id = ?", [id], () => resolve(), (_, err) => { reject(err); return false; });
    });
  });
}

export function deleteAllNotes(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("DELETE FROM notes", [], () => resolve(), (_, err) => { reject(err); return false; });
    });
  });
}

export function searchNotes(q: string): Promise<Note[]> {
  return new Promise((resolve, reject) => {
    const like = `%${q}%`;
    db.readTransaction(tx => {
      tx.executeSql(
        "SELECT * FROM notes WHERE title LIKE ? OR content LIKE ? ORDER BY updated_at DESC",
        [like, like],
        (_, { rows }) => resolve(rows._array as Note[]),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}