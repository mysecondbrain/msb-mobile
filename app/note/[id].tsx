import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getNote, updateNote, deleteNote } from "../../src/db";
import { useTheme } from "../../src/theme";
import Toast from "../../src/Toast";

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nav = useNavigation();
  const t = useTheme();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [saving, setSaving] = React.useState<'idle'|'saving'|'saved'>('idle');
  const [lastSaved, setLastSaved] = React.useState<number | null>(null);
  const [toast, setToast] = React.useState<{ visible: boolean; msg: string }>({ visible: false, msg: "" });

  const titleRef = React.useRef<TextInput | null>(null);
  const contentRef = React.useRef<TextInput | null>(null);
  const saveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    (async () => {
      const note = await getNote(Number(id));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        // Fokus: Wenn kein Titel vorhanden, zuerst Titel; sonst Inhalt
        requestAnimationFrame(() => {
          if (!note.title?.trim()) titleRef.current?.focus();
          else contentRef.current?.focus();
        });
      } else {
        // Neue Notiz? Fokus auf Titel
        requestAnimationFrame(() => titleRef.current?.focus());
      }
    })();
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [id]);

  const manualSave = async () => {
    if (!id) return;
    setSaving('saving');
    await updateNote(Number(id), title, content);
    setSaving('saved');
    setLastSaved(Date.now());
    setToast({ visible: true, msg: 'Gespeichert' });
    setTimeout(() => setToast({ visible: false, msg: '' }), 1200);
    setTimeout(() => setSaving('idle'), 800);
  };

  // Autosave mit Debounce
  React.useEffect(() => {
    if (!id) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving('saving');
      await updateNote(Number(id), title, content);
      setSaving('saved');
      setLastSaved(Date.now());
      setTimeout(() => setSaving('idle'), 800);
    }, 700);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [id, title, content]);

  React.useLayoutEffect(() => {
    nav.setOptions({
      title: "Notiz",
      headerRight: () => (
        <TouchableOpacity onPress={manualSave} disabled={saving === 'saving'}>
          <Text style={{ color: saving === 'saving' ? '#94a3b8' : t.colors.primary, fontWeight: '700' }}>
            {saving === 'saving' ? 'Speichern…' : 'Speichern'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [nav, manualSave, saving, t.colors.primary]);

  const remove = () => {
    Alert.alert('Notiz löschen?', 'Dies kann nicht rückgängig gemacht werden.', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: async () => { await deleteNote(Number(id)); (nav as any).goBack(); } }
    ]);
  };

  const dismiss = () => Keyboard.dismiss();

  const savedHint = lastSaved ? new Date(lastSaved).toLocaleTimeString() : '';

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
        <View style={{ padding: 16, gap: 12, flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: t.colors.sub }}>
              {saving === 'saving' ? 'Speichern…' : saving === 'saved' ? `Gespeichert ${savedHint}` : ' '}
            </Text>
            <TouchableOpacity onPress={dismiss}>
              <Text style={{ color: t.colors.primary, fontWeight: '700' }}>Tastatur zu</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            ref={titleRef}
            value={title}
            onChangeText={setTitle}
            placeholder="Titel"
            placeholderTextColor={t.colors.sub}
            returnKeyType="next"
            onSubmitEditing={() => contentRef.current?.focus()}
            style={[s.title, { color: t.colors.text }]}
          />

          <TextInput
            ref={contentRef}
            value={content}
            onChangeText={setContent}
            placeholder="Inhalt"
            placeholderTextColor={t.colors.sub}
            multiline
            keyboardAppearance={t.dark ? 'dark' : 'light'}
            style={[s.body, { color: t.colors.text, borderColor: t.colors.inputBorder, backgroundColor: t.colors.inputBg }]}
          />

          {/* Bottom Action Bar */}
          <View style={s.actionsWrap}>
            <TouchableOpacity onPress={remove} style={[s.action, { backgroundColor: t.colors.danger }]}>
              <Text style={s.actionText}>Löschen</Text>
            </TouchableOpacity>
            <View style={{ width: 12 }} />
            <TouchableOpacity onPress={manualSave} disabled={saving === 'saving'} style={[s.action, { backgroundColor: t.colors.primary, opacity: saving === 'saving' ? 0.6 : 1 }]}>
              <Text style={s.actionText}>{saving === 'saving' ? 'Speichern…' : 'Speichern'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast visible={toast.visible} message={toast.msg} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800' },
  body: { flex: 1, minHeight: 240, borderWidth: 1, borderRadius: 12, padding: 12, textAlignVertical: 'top' },
  actionsWrap: { flexDirection: 'row', paddingTop: 8 },
  action: { flex: 1, padding: 14, alignItems: 'center', borderRadius: 12 },
  actionText: { color: '#fff', fontWeight: '700' },
});