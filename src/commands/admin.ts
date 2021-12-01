import { SlashCommandBuilder } from "@discordjs/builders";
import { randomUUID } from "crypto";
import { CommandInteraction } from "discord.js";
import { getUserCharacters } from "../character/getUserCharacters";
import { updateCharacter } from "../character/updateCharacter";
import { armorShrine } from "../encounters/shrine/armor";
import { attackShrine } from "../encounters/shrine/attack";
import { vigorShrine } from "../encounters/shrine/vigor";

export const command = new SlashCommandBuilder()
  .setName("admin")
  .setDescription("Administrative functions.")
  .addSubcommand((option) =>
    option
      .setName("apply_item_defaults")
      .setDescription("Apply default properties to any items that lack them.")
  )
  .addSubcommand((option) =>
    option.setName("unequip_all").setDescription("Globally unequip all items.")
  )
  .addSubcommand((option) =>
    option.setName("armor_shrine").setDescription("Summon an armor shrine.")
  )
  .addSubcommand((option) =>
    option.setName("vigor_shrine").setDescription("Summon a vigor shrine.")
  )
  .addSubcommand((option) =>
    option.setName("attack_shrine").setDescription("Summon an attack shrine.")
  )
  .addSubcommand((option) =>
    option.setName("slayer_shrine").setDescription("Summon a slayer shrine.")
  );

export const execute = async (
  interaction: CommandInteraction
): Promise<void> => {
  switch (interaction.options.getSubcommand()) {
    case "apply_item_defaults":
      applyItemDefaults();
      return interaction.reply("Item defaults applied.");
    case "unequip_all":
      unequipAll();
      return interaction.reply("All equipment removed.");
    case "armor_shrine":
      return armorShrine(interaction);
    case "vigor_shrine":
      return vigorShrine(interaction);
    case "attack_shrine":
      return attackShrine(interaction);
  }
};

const applyItemDefaults = async (): Promise<void> => {
  getUserCharacters().forEach((character) =>
    updateCharacter({
      ...character,
      inventory: character.inventory.map((item) => ({
        ...item,
        id: item.id ?? randomUUID(),
        sellable: item.sellable ?? item.name !== "heavy crown",
        tradeable: item.tradeable ?? item.name !== "heavy crown",
      })),
    })
  );
};

const unequipAll = async (): Promise<void> => {
  getUserCharacters().forEach((character) =>
    updateCharacter({
      ...character,
      equipment: {},
    })
  );
};

export default { command, execute };
