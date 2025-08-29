import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl, KeyboardAvoidingView, Platform } from "react-native";
import { init, listNotes, createNote, searchNotes, Note } from "../src/db";
import { useTheme } from "../src/theme";
import { Link } from "expo-router";

export default function Home() {
  const t = useTheme();
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const load = React.useCallback(async () => {
    setRefreshing(true);
    const data = query ? await searchNotes(query) : await listNotes();
    setNotes(data);
    setRefreshing(false);
  }, [query]);

  React.useEffect(() => { init(); load(); }, [load]);

  const add = async () => {
    if (!title.trim() && !content.trim()) return;
    const id = await createNote(title.trim() || "(ohne Titel)", content.trim());
    setTitle(""); setContent("");
    await load();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
        <View style={{ padding: 16, gap: 12 }}>
          <Text style={{ color: t.colors.text, fontSize: 22, fontWeight: "800" }}>Notizen</Text>
          <TextInput
            placeholder="Suche"
            placeholderTextColor={t.colors.sub}
            value={query}
            onChangeText={(v) => { setQuery(v); }}
            onSubmitEditing={load}
            style={[s.input, { backgroundColor: t.colors.inputBg, borderColor: t.colors.inputBorder, color: t.colors.text }]}
          />
          <View style={{ gap: 8 }}>
            <TextInput
              placeholder="Titel"
              placeholderTextColor={t.colors.sub}
              value={title}
              onChangeText={setTitle}
              style={[s.input, { backgroundColor: t.colors.inputBg, borderColor: t.colors.inputBorder, color: t.colors.text }]}
            />
            <TextInput
              placeholder="Inhalt"
              placeholderTextColor={t.colors.sub}
              value={content}
              onChangeText={setContent}
              multiline
              style={[s.input, { height: 88, backgroundColor: t.colors.inputBg, borderColor: t.colors.inputBorder, color: t.colors.text, textAlignVertical: 'top' }]}
            />
            <TouchableOpacity onPress={add} style={[s.btn, { backgroundColor: t.colors.primary }]}> 
              <Text style={s.btnT}>Speichern</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={notes}
          keyExtractor={(item) => String(item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <Link href={`/note/${item.id}`} asChild>
              <TouchableOpacity style={[s.row, { backgroundColor: t.colors.card, borderColor: t.colors.border }]}> 
                <Text style={{ color: t.colors.text, fontWeight: '700', marginBottom: 4 }} numberOfLines={1}>{item.title}</Text>
                <Text style={{ color: t.colors.sub }} numberOfLines={2}>{item.content}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 10, padding: 12 },
  btn: { padding: 14, borderRadius: 12, alignItems: 'center' },
  btnT: { color: '#fff', fontWeight: '700' },
  row: { padding: 14, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth }
});