import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getNote, updateNote, deleteNote } from "../../src/db";
import { useTheme } from "../../src/theme";

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = useTheme();
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [saving, setSaving] = React.useState<'idle'|'saving'|'saved'>('idle');

  React.useEffect(() => {
    (async () => {
      const note = await getNote(Number(id));
      if (note) { setTitle(note.title); setContent(note.content); }
    })();
  }, [id]);

  React.useEffect(() => {
    const h = setTimeout(async () => {
      if (!id) return;
      setSaving('saving');
      await updateNote(Number(id), title, content);
      setSaving('saved');
      setTimeout(()=>setSaving('idle'), 800);
    }, 600);
    return () => clearTimeout(h);
  }, [id, title, content]);

  const remove = () => {
    Alert.alert('Notiz löschen?', 'Dies kann nicht rückgängig gemacht werden.', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: async () => { await deleteNote(Number(id)); router.back(); } }
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
        <View style={{ padding: 16, gap: 12 }}>
          <Text style={{ color: t.colors.sub }}>{saving === 'saving' ? 'Speichern…' : saving === 'saved' ? 'Gespeichert' : ' '}</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titel"
            placeholderTextColor={t.colors.sub}
            style={[s.title, { color: t.colors.text }]}
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Inhalt"
            placeholderTextColor={t.colors.sub}
            multiline
            style={[s.body, { color: t.colors.text, borderColor: t.colors.inputBorder }]}
          />
          <TouchableOpacity onPress={remove} style={[s.del, { backgroundColor: t.colors.danger }]}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Löschen</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800' },
  body: { minHeight: 220, borderWidth: 1, borderRadius: 12, padding: 12, textAlignVertical: 'top' },
  del: { padding: 14, alignItems: 'center', borderRadius: 12 }
});