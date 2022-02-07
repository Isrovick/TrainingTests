/*
# Optimal Exchange
Process Optimizations: Improve the runtime process
Problem analysis: You must be able to understand and seek the best solution to problems
Mathematics: Mathematics Operations
Algorithms: Understanding Algorithms
#Description
The Exchange of currency of a random country has 'k' number of denominations. For each denomination, there is a coin.
Whenever a transaction happens with the cashier, to pay an amount 'X', you give exactly or some amount greater than 'X' ( let us say 'Y' ) to the cashier.
He then pays back the extra amount ( Y-X ) back to you. Both of you try to minimize the number of coins exchanged in the process. For example, if X = 68 and you have the denominations , 1,2,5,10,20,50, then the optimal transaction could be you paying the cashier 50+20 units ( 2 coins ) and then the cashier paying you back 2 units ( 1 coin ). Hence , the total number of coin exchanged in the process being 3 ( 50 + 20 - 2 ).
The efficiency of a set of denominations is calculated by the minimum number of coin exchange required for every integer coin value between 1 and N ( some upper bound, lets assume ) and taking their average as A. Lower the A, better is the set of denomination.
Write a program that, given a series of coins, calculates the average and maximum number of coins needed to pay any amount in the range [1,N]. You may assume that both parties involved have sufficient denominations of any coin at their disposal
#Input
The first line contains the number of test cases. For each test case, there is a single line containing N ( 1<=N<=100 ),Number of denominations K( K<=10 ) and then the value of each denomination, all separated by a single space.
#Output
For each test case the output is a single line containing first the average and then the maximum number of coins involved in paying an amount in range [1,N]. The average should be accurate upto 2 decimal places.
#Sample Input
3
100 6 1 2 5 10 20 50
100 6 1 3 10 15 51 84
100 6 1 4 9 16 25 36
#Sample Output
2.96 5
2.56 3
2.85 5
*/

type Result = { avg: string; max: Number };
const LIMITS = {
  cases: { min: 1, max: 100 },
  coins: { min: 1, max: 10 },
};


function computeResults(input): Promise<Array<Result>> {
  
  const [N, ...cases] = input.split(/\r?\n/);
  
  const checkEdge = (val, { min, max }) =>
    val >= min && val <= max ? val : false;

 
  const results = cases.map(async function (_case, i) {
    const [MAX, N, ...coins] = _case.split(" ").map(Number);

    const max = checkEdge(MAX, LIMITS.cases);
    const n = checkEdge(N, LIMITS.cases);

    if (!(max && n) || coins.length !== n) {
      HandleBadCondition(`Case #${i + 1}: Out of Bounds`);
      return;
    }


    return computeResult(coins, max);

  });

  return Promise.all(results);
}

const computeResult = (coins:number[], testCase:number): Result => {

  let s=0;
  let bestSol= new Array(testCase+1);

  const optimal = (coins:number[], val:number, weigth:number, maxValue:number) => {

    if(bestSol[val] == null || bestSol[val] > weigth){
        bestSol[val]=weigth;
        coins.forEach(coin => {
            if(val+coin<=maxValue) optimal(coins, val+coin, weigth+1,maxValue);
            if(val-coin>=0) optimal(coins,val-coin, weigth+1,maxValue);
            
        });
    }
  } 

  optimal(coins, 0, 0, testCase);
  bestSol.forEach((solution)=>{
    s+=solution;
  });

  const avg = Number((s)/(testCase)).toFixed(2);
  const maxCoins:number = Math.max.apply(null,bestSol)
  return { avg, max:maxCoins };
}



const HandleBadCondition = (err) => {
  console.log(err);
};

const input = `12
100 6 1 2 5 10 20 50
100 6 1 3 10 15 51 84
100 6 1 4 9 16 25 36
10 7 1 2 3 5 6 8 10
30 7 1 2 13 15 19 21 24
6 1 1
95 7 1 3 41 46 70 88 91
98 8 1 2 31 37 52 70 73 76
8 8 1 2 3 4 5 6 7 8
83 8 1 8 14 35 36 37 74 80
92 4 1 26 58 64
25 1 1`;

(async () => {
  const results = await computeResults(input);
  results.forEach(({ avg, max }) => console.log(`${avg} ${max}`));
})();