import { EmbedFieldData, Emoji } from "discord.js";
import { Character } from "../character/Character";
import { getCharacterStatModified } from "../character/getCharacterStatModified";
import { hpBar } from "../character/hpBar/hpBar";

export function primaryStatFields({
  character,
  xpEmoji,
  adjustment = 0,
}: {
  character: Character;
  xpEmoji?: Emoji;
  adjustment?: number;
}): EmbedFieldData[] {
  return [
    {
      name: "HP",
      value: `${character.hp}/${getCharacterStatModified(
        character,
        "maxHP"
      )}\n${hpBar(character, adjustment)}`,
    },
    {
      name: "XP",
      value: (xpEmoji?.toString() ?? "🧠") + " " + character.xp.toString(),
      inline: true,
    },
    {
      name: "GP",
      value: "💰 " + character.gold.toString(),
      inline: true,
    },
  ];
}
