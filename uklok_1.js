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

const input = `3
100 6 1 2 5 10 20 50
100 6 1 3 10 15 51 84
100 6 1 4 9 16 25 36`;

const main = () => {

    const lines = input.split(/\r?\n/);

    const k = parseInt(lines[0]); 
    
    for( var i =1; i<=k ;i++){     
         
            const line = lines[i].split(" ").map(num =>{return parseInt(num)})
            
            const testCase = (line[0]>=1 && line[0]<=100) ? line[0] : (false);
            
            const nOfDenominations = (line[1]>=1 && line[1]<=10 ) ? line[1] : (false) ;
            
            if(!(testCase && nOfDenominations) || (nOfDenominations > (line.length-2))) {
            
                HandleBadCondition("Out of Bounds");
               
                continue;
            }

            let denominations = line.slice(2 , 2 + nOfDenominations )
            
            denominations.sort(function(a,b){return b - a;});
            
            result(denominations,testCase)   
    }

} 

const result = (denominations,testCase ) => {
    
   
    let NoCoinsRegister=[];
    
    let CoinsSpent=0;

    for (let i = testCase; i > 0; i--) { 
        
        let coinCount=pay(i,denominations);
    
        CoinsSpent+=coinCount;
       
        NoCoinsRegister.push(coinCount);
    }

    const avg = (CoinsSpent/testCase).toFixed(2);

    const max = Math.max.apply(null,NoCoinsRegister)

    console.log(`${avg} ${max}`);

}

const pay = (payment,coins)=>{

    if(payment==0) return 0

    let coinStack = [];

    for (let index = 0; index < coins.length; index++) {
        
        const coin = coins[index];
        const letToPay = payment%coin;
        const ExactMinCoinAmnt = Math.floor(payment/coin);   
        
        if(letToPay != 0){
            
            const remainingCoinsDenom = coins.slice(index+1,coins.length);
            
            const AddExtraCoinToPay = Math.abs(payment - ( ExactMinCoinAmnt + 1 )*coin)

            const changePile = returnChange(AddExtraCoinToPay,  remainingCoinsDenom, 0);

            const pile1 = ExactMinCoinAmnt + 1 + changePile;
        
            const pile2 = ExactMinCoinAmnt + pay( Math.abs(letToPay), remainingCoinsDenom );

            let value = (pile1<pile2) ? (pile1) : (pile2);
            
            coinStack.push(value);
        }
        else{
            coinStack.push(ExactMinCoinAmnt);
        }
    }

    const min = Math.min.apply(null,coinStack)
    
    return min;

}

const returnChange = (change,  coins, index) => {

    if( change == 0 || index >= coins.length) return 0;

    const coin = coins[index];
    const letToPay = change%coin;
    const ExactMinCoinAmnt = Math.floor(change/coin); 

     if(letToPay != 0){
         return ExactMinCoinAmnt + returnChange(letToPay,coins,index+1);
     } 
     else{
          return ExactMinCoinAmnt;
     }  
}

const HandleBadCondition = (err) => {
    console.log(err);
}

main();










