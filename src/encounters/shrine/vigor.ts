import { randomUUID } from "crypto";
import { CommandInteraction } from "discord.js";
import { Shrine } from "../../shrines/Shrine";
import { shrineEmbeds } from "./shrineEmbeds";
import { applyShrine } from "./applyShrine";
import { getAsset } from "../../utils/getAsset";

export const vigorShrine = async (
  interaction: CommandInteraction
): Promise<void> => {
  const shrine: Shrine = {
    id: randomUUID(),
    name: "Vigor Shrine",
    description: `The shrine fills you with renewed vigor.`,
    image: getAsset(
      "fantasy",
      "places",
      "a beautiful glowing statue in a serene forest"
    ).s3Url(),
    color: "WHITE",
    effect: {
      name: "Shrine of Vigor",
      buff: true,
      debuff: false,
      modifiers: {
        maxHP: 3,
      },
      duration: 30 * 60000,
      started: new Date().toString(),
    },
  };

  applyShrine({ shrine, interaction });

  interaction.editReply({
    embeds: shrineEmbeds({ shrine, interaction }),
  });
};
