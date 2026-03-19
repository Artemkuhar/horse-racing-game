export type RoundViewRow = {
  position: number;
  name: string;
};

export type RoundView = {
  id: string;
  round: number;
  distance: number;
  rows: RoundViewRow[];
};
