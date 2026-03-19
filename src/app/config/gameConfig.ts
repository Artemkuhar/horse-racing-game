export const GAME_CONFIG = {
  // Race setup
  raceDistances: [1200, 1400, 1600, 1800, 2000, 2200],
  horsesPerRound: 10,

  // Horse loading & schedule generation timings (ms)
  fetchHorsesDelayMs: 400,
  generateScheduleDelayMs: 350,

  // Race simulation timings (ms)
  raceTickMs: 50,
  racePausePollMs: 100,

  // Race simulation tuning
  baseDistanceForSpeed: 1200,
  speedMultiplier: 1.6,
} as const;

export type GameConfig = typeof GAME_CONFIG;
