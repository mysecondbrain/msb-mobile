import * as FileSystem from "expo-file-system";

export type OnboardingState = {
  terms: boolean;
  privacy: boolean;
  aiOptIn: boolean;
};

const PATH = FileSystem.documentDirectory + "onboarding.json";

export async function loadOnboarding(): Promise<OnboardingState> {
  try {
    const info = await FileSystem.getInfoAsync(PATH);
    if (!info.exists) return { terms: false, privacy: false, aiOptIn: false };
    const txt = await FileSystem.readAsStringAsync(PATH);
    return JSON.parse(txt);
  } catch {
    return { terms: false, privacy: false, aiOptIn: false };
  }
}

export async function saveOnboarding(state: OnboardingState) {
  await FileSystem.writeAsStringAsync(PATH, JSON.stringify(state));
}

export function allDone(state: OnboardingState) {
  return state.terms && state.privacy; // aiOptIn optional
}