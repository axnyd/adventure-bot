import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { getUserCharacter } from "../character/getUserCharacter";
import { isCharacterOnCooldown } from "../character/isCharacterOnCooldown";
import { setCharacterCooldown } from "../character/setCharacterCooldown";
import { cooldownRemainingText } from "../character/cooldownRemainingText";
import { randomEncounter } from "../encounters/randomEncounter";

export const command = new SlashCommandBuilder()
  .setName("adventure")
  .setDescription("Set off in search of glory.");

export const execute = async (
  interaction: CommandInteraction
): Promise<void> => {
  const player = getUserCharacter(interaction.user);
  if (player.hp === 0) {
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(`You're too weak to press on.`)
          .setImage("https://imgur.com/uD06Okr.png"),
      ],
    });
    return;
  }
  if (isCharacterOnCooldown(player.id, "adventure")) {
    await interaction.editReply({
      embeds: [
        new MessageEmbed().setDescription(
          `You can adventure again ${cooldownRemainingText(
            player.id,
            "adventure"
          )}`
        ),
      ],
    });
    return;
  }
  setCharacterCooldown(player.id, "adventure");
  const encounter = randomEncounter();
  console.log(encounter);
  await encounter(interaction);
};

export default { command, execute };
