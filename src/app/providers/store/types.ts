import type { HorseState } from '@/entities/horse/model';
import type { RaceState } from '@/entities/race/model';
import type { ResultState } from '@/entities/result/model';
import type { ToastState } from '@/shared/ui/toast/model';

export type RootState = {
  horse: HorseState;
  race: RaceState;
  result: ResultState;
  toast: ToastState;
};
