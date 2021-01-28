import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { apartmentMachine, Schema } from '../state-machines/apartment';

export type Current = keyof Schema['states']
export type Actions = {
  goNorth: () => void,
  goSouth: () => void,
  goEast: () => void,
  goWest: () => void,
}

export default function useApartment(): [Current, Actions] {
  const [current, send] = useMachine(apartmentMachine);
  const actions = useMemo(() => {
    return {
      goNorth: () => send('NORTH'),
      goSouth: () => send('SOUTH'),
      goEast: () => send('EAST'),
      goWest: () => send('WEST'),
    };
  }, [send]);

  return [
    // @ts-ignore We know that `value` must be one of the valid state machine states. But xstate
    // doesn't know that, for some reason...
    current.value,
    actions,
  ];
}
