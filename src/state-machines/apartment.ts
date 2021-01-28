import { Machine } from 'xstate';

export type Schema = {
  states: {
    entry: {},
    kitchen: {},
    dining: {},
    living: {},
    hallway1: {},
    bedrooms_entry: {},
    guest_bathroom: {},
    guest_bedroom: {},
    master_bedroom: {},
    master_bathroom: {},
    master_closets: {},
  },
}

type Event =
  | { type: 'NORTH' }
  | { type: 'SOUTH' }
  | { type: 'EAST' }
  | { type: 'WEST' }

export const apartmentMachine = Machine<{}, Schema, Event>({
  id: 'apartment',
  initial: 'entry',
  states: {
    entry: {
      on: {
        EAST: 'kitchen',
        NORTH: 'dining',
        WEST: 'hallway1',
      },
    },
    kitchen: {
      on: {
        WEST: 'entry',
      },
    },
    dining: {
      on: {
        SOUTH: 'entry',
        EAST: 'living',
      },
    },
    living: {
      on: {
        WEST: 'dining',
      },
    },
    hallway1: {
      on: {
        EAST: 'entry',
        WEST: 'bedrooms_entry',
      },
    },
    bedrooms_entry: {
      on: {
        EAST: 'hallway1',
        WEST: 'master_bedroom',
        SOUTH: 'guest_bathroom',
        NORTH: 'guest_bedroom',
      },
    },
    guest_bathroom: {
      on: {
        NORTH: 'bedrooms_entry',
      },
    },
    guest_bedroom: {
      on: {
        SOUTH: 'bedrooms_entry',
      },
    },
    master_bedroom: {
      on: {
        EAST: 'bedrooms_entry',
        SOUTH: 'master_closets',
      },
    },
    master_bathroom: {
      on: {
        NORTH: 'master_closets',
      },
    },
    master_closets: {
      on: {
        NORTH: 'master_bedroom',
        SOUTH: 'master_bathroom',
      },
    },
  },
});
