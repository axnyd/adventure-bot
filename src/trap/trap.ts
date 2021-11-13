import { getCharacterStatModified } from "../character/getCharacterStatModified";
import { TrapResult, d20, d6, adjustHP } from "../gameState";
import { getCharacter } from "../character/getCharacter";

export const trapAttack = (
  characterId: string,
  attackBonus = 1
): TrapResult | void => {
  const defender = getCharacter(characterId);
  if (!defender) return;
  const attackRoll = d20();
  const damage = d6();
  if (attackRoll + attackBonus > getCharacterStatModified(defender, "ac")) {
    adjustHP(characterId, -damage);
    return { outcome: "hit", attackRoll, attackBonus, damage, defender };
  }
  return { outcome: "miss", attackRoll, attackBonus, damage, defender };
};
