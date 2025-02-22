import { CommandInteraction, MessageEmbed } from "discord.js";
import { encounterSummaryEmbed } from "../../encounter/encounterSummaryEmbed";
import { getEncounters } from "../../encounter/getEncounters";

export function listEncounters(interaction: CommandInteraction): void {
  const encounters = getEncounters();
  interaction.editReply({
    embeds:
      encounters.length > 0
        ? encounters
            .map((encounter) =>
              encounterSummaryEmbed({ encounter, interaction })
            )
            .slice(0, 10)
        : [
            new MessageEmbed({
              description: "No encounters yet. `/adventure` to find some!",
            }),
          ],
  });
}
