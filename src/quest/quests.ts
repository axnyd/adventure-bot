import { Quest } from "./Quest";

const questIds = [
  "slayer",
  "survivor",
  "blessed",
  // "afflicted",
  // "traveler",
  "healer",
  // "rogue",
] as const;

export type QuestId = typeof questIds[number];
export const isQuestId = (id: string): id is QuestId =>
  questIds.includes(id as QuestId);

// TODO: refactor to map.
export const quests: {
  [id in QuestId]: Quest;
} = {
  slayer: {
    id: "slayer",
    title: "Slayer",
    progress: 0,
    totalRequired: 5,
    objective: "Defeat 5 monsters",
    reward: "Deal more damage to monsters.",
    repeatable: true,
    victoryText: "Your are a slayer!",
  },
  survivor: {
    id: "survivor",
    title: "Survivor",
    progress: 0,
    totalRequired: 50,
    objective: "Survive 50 damage",
    reward: "Gain temporary health.",
    repeatable: true,
    victoryText: "You have survived hardship and it only makes you harder.",
  },
  // afflicted: {
  //   id: "afflicted",
  //   title: "Afflicted",
  //   progress: 0,
  //   totalRequired: 50,
  //   objective: "Become afflicted by 10 debuffs",
  //   reward: "Consume afflictions to gain strength.",
  //   repeatable: false,
  // },
  // traveler: {
  //   id: "traveler",
  //   title: "Traveler",
  //   progress: 0,
  //   totalRequired: 10,
  //   objective: "Travel the lands 10 times",
  //   reward: "Travel grants vigor.",
  //   repeatable: false,
  // },
  blessed: {
    id: "blessed",
    title: "Blessed",
    progress: 0,
    totalRequired: 5,
    objective: "Find 5 shrines.",
    reward: "Shrines last twice as long.",
    repeatable: false,
    victoryText: "#blessed is the shrine seeker.",
  },
  healer: {
    id: "healer",
    title: "Healer",
    progress: 0,
    totalRequired: 25,
    objective: "Heal 25 hp",
    reward: "Gain ability `/renew`, which heals over time.",
    repeatable: false,
    victoryText: "Flesh rended and renewed. The cycle of life.",
  },
  // rogue: {
  //   id: "rogue",
  //   title: 'Rogue',
  //   progress: 0,
  //   totalRequired: 15,
  //   objective: 'Evade '
  // },
};

export const getRandomQuests = (quests: Quest[], num = 3): Quest[] => {
  const available = [...quests];
  const results: Quest[] = [];
  while (results.length < num) {
    const i = Math.ceil(Math.random() * available.length);
    const quest = available[i];
    available.splice(i, 1);
    results.push(quest);
  }
  return results;
};
