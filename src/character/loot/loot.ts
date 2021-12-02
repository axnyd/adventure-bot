import { randomUUID } from "crypto";
import { values } from "remeda";
import { looted } from "../../store/slices/loots";
import { Character } from "../Character";
import { getCharacter } from "../getCharacter";
import { updateCharacter } from "../updateCharacter";
import store from "../../store";
import { Item } from "../../equipment/Item";
import { characterLooted } from "../../store/slices/characters";

export type LootResult = {
  id: string;
  itemsTaken: Item[];
  goldTaken: number;
  looterId: string;
  targetId: string;
  timestamp: string;
};

const isLootable = (item: Item): boolean => item.lootable ?? false;
const isNotLootable = (item: Item): boolean => !isLootable(item);

export function loot({
  looterId,
  targetId,
}: {
  looterId: string;
  targetId: string;
}): LootResult | void {
  const looter = getCharacter(looterId);
  const target = getCharacter(targetId);
  if (!looter || !target) {
    console.error(`loot failed looterId:${looterId} targetId:${targetId}`);
    return;
  }
  const goldTaken = target.gold;
  const itemsTaken = target.inventory.filter(isLootable);

  updateCharacter({
    ...looter,
    gold: looter.gold + goldTaken,
    // TODO: equip taken items
    equipment: autoEquip(looter.equipment), // TODO: add itemsTaken
    xp: looter.xp + target.xpValue,
    inventory: [...looter.inventory, ...itemsTaken],
  });
  updateCharacter({
    ...target,
    gold: 0,
    equipment: equipmentFilter(target.equipment, isNotLootable),
    inventory: target.inventory.filter(isNotLootable),
  });
  const loot: LootResult = {
    id: randomUUID(),
    goldTaken,
    itemsTaken,
    looterId: looter.id,
    targetId: target.id,
    timestamp: new Date().toString(),
  };
  console.log(`${looter.name} loots ${target.name}`, loot);

  store.dispatch(looted(loot));
  store.dispatch(characterLooted(loot));
  return loot;
}

const autoEquip = (
  equipment: Character["equipment"]
  // items: Item[] // TODO: implement this
): Character["equipment"] => {
  return equipment;
};

/**
 * Equipment minus
 */
export const equipmentFilter = (
  equipment: Character["equipment"],
  predicate: (item: Item) => boolean
): Character["equipment"] =>
  values(equipment)
    .filter(predicate)
    .reduce(
      (equipment, item) => ({
        ...equipment,
        [item.type]: item,
      }),
      {}
    );
