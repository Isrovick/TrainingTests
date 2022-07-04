import {join} from 'path';

import {OptimalExchange} from './OptimalExchange';
import {inputSteam, outputStream} from '../utils';

export async function optimalExchange(opts) {
  const {DEBUG} = process.env;
  const {testRun, inputFile, outputFile} = opts;

  if (DEBUG) {
    console.debug('Optimal Exchange | runner', opts);
    console.debug('--------------------------INPUT---------------------------');
  }

  const input = await inputSteam(
      testRun ? join(__dirname, 'example.in') : inputFile);
  const optimalExchange = new OptimalExchange(input);

  const output = optimalExchange.results.map(
      ({avg, max}) => `${avg.toFixed(2)} ${max}`).
      join('\n');

  if (DEBUG) {
    console.debug('--------------------------OUTPUT--------------------------');
    console.debug(output);
  }

  return outputStream(output,
      testRun ? join(__dirname, 'example.out') : outputFile);
}