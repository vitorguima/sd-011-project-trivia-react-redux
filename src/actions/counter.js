export const START_COUNTER = 'START_COUNTER';
export const STOP_COUNTER = 'STOP_COUNTER';
export const SAVE_COUNTER = 'SAVE_COUNTER';

export const startCounter = () => ({
  type: START_COUNTER,
});

export const stopCounter = () => ({
  type: STOP_COUNTER,
});

export const saveCounter = (payload) => ({
  type: SAVE_COUNTER,
  payload,
});
