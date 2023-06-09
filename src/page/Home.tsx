import {
  getNextWord,
  toggleFavoriteWord,
  useAppStore,
} from "../utils/appStore";
import { AiOutlineHeart } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

function LikeButton() {
  const currentWord = useAppStore((state) => state.currentWord);
  const favoriteWords = useAppStore((state) => state.favoriteWords);

  return (
    <button onClick={() => toggleFavoriteWord(currentWord)}>
      {favoriteWords.includes(currentWord) ? (
        <MdFavorite />
      ) : (
        <AiOutlineHeart />
      )}
      {favoriteWords.includes(currentWord) ? "Unlike" : "Like"}
    </button>
  );
}

function CurrentWord() {
  const currentWord = useAppStore((state) => state.currentWord);

  return (
    <article>
      {currentWord.split(" ")[0]}
      <b>{currentWord.split(" ")[1]}</b>
    </article>
  );
}

function Home() {
  return (
    <div className="home">
      <CurrentWord />
      <div className="btn-group">
        <LikeButton />
        <button onClick={getNextWord}>Next</button>
      </div>
    </div>
  );
}

export default Home;
