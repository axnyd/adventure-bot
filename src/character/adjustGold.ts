import { Character } from "./Character";
import { getCharacter } from "./getCharacter";
import store from '../store'
import { updateGold } from "../store/slices/characters";

export const adjustGold = (
  characterId: string,
  amount: number
): Character | void => {
  const character = getCharacter(characterId);
  if (!character) return;
  store.dispatch(updateGold({
    character,
    gold: character.gold + amount,
  }));
  return getCharacter(characterId);
};
