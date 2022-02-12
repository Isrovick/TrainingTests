import {Command} from 'commander';
import * as pkg from './package.json';

import {selectRunner, NAMES} from './challenges';

const program = new Command();

program.name(pkg.name).
    description(pkg.description).
    argument('challenge <string>', NAMES.join('|'), selectRunner).
    option('-t, --test-run', 'Testing the challenge with the built in example').
    option('-d, --debug', 'Output extra debugging').
    option('-i, --input-file <string>', 'File to pipe the input from').
    option('-o, --output-file <string>', 'File to pipe the result out').
    version(pkg.version).
    action(async (runner, opts) => {
      const {debug} = opts;
      if (debug) process.env.DEBUG = 'true';

      const start = process.hrtime();
      await runner(opts);
      const end = process.hrtime(start);

      if (debug)
        console.debug('\nDuration: %ds %dms', end[0], end[1] / 1000000);
    });

program.parse();