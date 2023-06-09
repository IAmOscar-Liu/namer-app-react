import { toggleFavoriteWord, useAppStore } from "../utils/appStore";
import { AiFillDelete } from "react-icons/ai";

function Favorites() {
  const favoriteWords = useAppStore((state) => state.favoriteWords);

  return (
    <div className="favorites">
      <h1>
        {favoriteWords.length === 0
          ? "You don't have any favorite words"
          : `You have ${favoriteWords.length} favorites:`}
      </h1>
      <ul>
        {favoriteWords.map((word) => (
          <li key={word}>
            <div
              className="icon-container"
              onClick={() => toggleFavoriteWord(word)}
            >
              <AiFillDelete />
            </div>
            <span>{word}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
