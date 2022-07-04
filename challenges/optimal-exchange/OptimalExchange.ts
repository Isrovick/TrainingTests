let {DEBUG} = process.env;

type Result = { avg: number; max: number };

const checkEdge = (val, {min, max}) => val >= min && val <= max ? val : false;
const LIMITS = {
  cases: {min: 1, max: 100},
  coins: {min: 1, max: 10},
};

class Case {
  public readonly size: number;
  public readonly coins: Array<number>;

  private _paths: Array<Array<number>>;
  private _result: Result;

  constructor(input: string, private readonly number) {
    const {size, coins} = this.parseInput(input);
    this.size = size;
    this.coins = coins;

    if (DEBUG) {
      console.debug(`Case ${number}\t| parseInput - ${size} ${coins}`);
    }
  }

  private parseInput(input: string): { size: number, coins: Array<number> } {
    const [MAX, N, ...coins] = input.split(' ').map(Number);

    const max = checkEdge(MAX, LIMITS.cases);
    const n = checkEdge(N, LIMITS.coins);

    if (!(max && n) || coins.length !== n)
      throw new Error(`Wrong input | Case: #${this.number} => ${input}`);

    return {size: max, coins};
  }

  private solve(): Result {
    const {size, coins, number} = this;
    if (DEBUG) {
      console.debug(`Case #${number} | result -> solve`);
      console.debug(`size: ${size}`);
      console.debug(`coins: ${coins}`);
    }

    const paths: Array<Array<number>> = [];
    const move = [].concat(...coins.map((coin) => [coin, -coin]));
    const withinBounds = (pos) => pos >= 0 && pos <= size;

    const optimalPath = (pos: number, steps: Array<number>): Array<number> => {
      if (!withinBounds(pos)) throw new Error('Out of bounds');

      // Current status check
      const path: Array<number> = paths[pos];
      if (path && path.length < steps.length) return path;

      // New Optimal path
      paths[pos] = steps;

      // Looking for optimal paths from here
      move.forEach((dx) => {
        try {
          const next = pos + dx;
          if (withinBounds(next))
            paths[next] = optimalPath(next, steps.concat(dx));
        } catch (e) {}

        return;
      });

      return paths[pos];
    };

    paths[0] = optimalPath(0, []);

    if (DEBUG) {
      console.debug(paths.map(
          (path, amount) => ({amount, count: path.length, coins: path})).
          map(obj => Object.entries(obj).
              map(([key, val]) => `${key}: ${val}`).
              join('\t')).join('\n'));
    }

    this._paths = paths;
    const weights = paths.map(({length}) => length);
    const total = (accum, weight) => accum + weight;

    const avg = weights.reduce(total) / size;
    const max = Math.max(...weights);

    return {avg, max};
  }

  get result(): Result {
    if (DEBUG) console.debug(`-------------- #${this.number} ----------------`);
    if (!this._result) this._result = this.solve();

    if (DEBUG) console.debug(
        `result: ${JSON.stringify(this._result, undefined, 2)}`);
    return this._result;
  }
}

export class OptimalExchange {
  public readonly cases: Array<Case>;

  constructor(input: string) {
    DEBUG = process.env.DEBUG;
    this.cases = this.parseInput(input);
  }

  private parseInput(input: string): Array<Case> {
    const [N, ...cases] = input.split(/\r?\n/);
    if (Number(N) !== cases.length) throw new Error(`Cases number mismatch`);

    if (DEBUG) {
      console.debug('OptimalExchange | parseInput');
      console.debug(`Cases: ${N}`);
    }

    return cases.map((_case, i) => new Case(_case, i + 1));
  }

  get results(): Array<Result> {
    return this.cases.map(({result}) => result);
  }
}