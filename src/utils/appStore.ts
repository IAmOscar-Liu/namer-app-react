import { useSyncExternalStore } from "react";
import randomWords from "random-words";

export type AppState = {
  currentWord: string;
  favoriteWords: string[];
};

const generateRandomWord = () =>
  randomWords({ exactly: 1, wordsPerString: 2 })[0];

const NUM_OF_WORDS = 10;

const createAppStore = (INITIAL_STATE: AppState) => {
  let state = { ...INITIAL_STATE };

  const savedWords: string[] = [state.currentWord];
  let wordIdx = 0;

  const listeners = new Set<(state: AppState) => void>();
  const subscribe = (listener: (state: AppState) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const emitChange = () => listeners.forEach((listener) => listener(state));

  return {
    getNextWord: () => {
      wordIdx = (wordIdx + 1) % NUM_OF_WORDS;
      if (!savedWords[wordIdx]) savedWords[wordIdx] = generateRandomWord();

      state = { ...state, currentWord: savedWords[wordIdx] };
      emitChange();
    },
    toggleFavoriteWord: (word: string) => {
      state = {
        ...state,
        favoriteWords: state.favoriteWords.includes(word)
          ? state.favoriteWords.filter((w) => w !== word)
          : [...state.favoriteWords, word],
      };
      emitChange();
    },
    useAppStore: <SelectorOutput>(
      selector: (state: AppState) => SelectorOutput
    ): SelectorOutput => useSyncExternalStore(subscribe, () => selector(state)),
  };
};

const INITIAL_STATE = Object.freeze({
  currentWord: generateRandomWord(),
  favoriteWords: [],
});

const appStore = createAppStore(INITIAL_STATE);

export const { useAppStore, getNextWord, toggleFavoriteWord } = appStore;
