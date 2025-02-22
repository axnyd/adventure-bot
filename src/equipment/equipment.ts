import { Item } from "./Item";

export type Equippable = Item & {
  equippable: true;
  type: "weapon" | "armor" | "shield" | "hat" | "amulet" | "ring";
};
export type Tradeable = Item & { tradeable: true };

export type Weapon = Equippable & {
  type: "weapon";
  damageMax: number;
  accuracyDescriptors: {
    wideMiss: string[];
    nearMiss: string[];
    onTheNose: string[];
    veryAccurate: string[];
  };
  // TODO:
  // damageDescriptors: {
  //   minimum: string[];
  //   weak: string[];
  //   average: string[];
  //   strong: string[];
  //   maximum: string[];
  // }
};

export type Armor = Equippable & {
  type: "armor";
};
export type Shield = Equippable & {
  type: "shield";
};
export type Hat = Equippable & {
  type: "hat";
};
export type Amulet = Equippable & {
  type: "amulet";
};
export type Ring = Equippable & {
  type: "ring";
};

export const isHat = (item: Item): item is Hat => item.type === "hat";
export const isAmulet = (item: Item): item is Amulet => item.type === "amulet";
export const isArmor = (item: Item): item is Armor => item.type === "armor";
export const isShield = (item: Item): item is Shield => item.type === "shield";
export const isWeapon = (item: Item): item is Weapon => item.type === "weapon";
export const isRing = (item: Item): item is Ring => item.type === "ring";
export const isEquippable = (item: Item): item is Equippable => item.equippable;
export const isTradeable = (item: Item): item is Tradeable =>
  item.tradeable ?? false;
