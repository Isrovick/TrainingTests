import {optimalExchange} from './optimal-exchange';

//TODO: This could be constructed dynamically.
const RUNNERS = {
  exchange: optimalExchange,
  alien: () => 'dummy',
};

export function selectRunner(name): Function {
  const runner = RUNNERS[name];
  if (!runner) throw new Error(`${name} is not a valid challenge name`);

  return runner;
}

export const NAMES = Object.keys(RUNNERS);