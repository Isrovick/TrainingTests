/* 
# Alien invasion
Matrices Operations: Understanding Matrices Operations
Array: Understanding Vector Operations
Mathematics: Mathematics Operations
Algorithms: Understanding Algorithms
Process Optimizations: Improve in to runtime process

#Description
While an unexpected alien invasion arrived to earth to exterminate the human race, the resistance has managed to know the shield's protection layers of their ships using an ultrasonic radar remaining at the atmosphere yet, the leader of the offensive battalion noticed that each layer has a rectangular form and has 1 or many command centers but if we can precisely target the middle from each one of them and hit them in sync, we could have a chance to destroy their ships

Unfortunately the mainframe in charge of decode the radar results was destroyed within the massive attack, and it's because of this that after several references one of the new recruits told us he could be able to make contact with you --THE BEST KNOWN HACKER UNTIL NOW--. The world needs your help to decode the information generated by the radar so we could have an offensive advantage over the enemy who threaten to vanish the human race from the universe.

Thanks to an old images processor, we were able to transform the output from the radar to an information matrix with the layers bound within it. We need a program that allow us to aim with precision to each command center on each layer for all the ships that we give you in the following format

#Input
The 1st line of the input it's an integer N, being this the amount of ships you will need to process a solution for (1 <= N <= 30). Each ship will have 3 numbers at the first line X,Y they represent the ship dimensions, height and width respectively (4 <= {X,Y} <= 100) and Z that represent the scale for each value within the matrix. The following X lines are gonna be each row representation shown by the processor, each one of them will have Y elements separated with a blank with each W element being detection of the command center visible in that position, W will be whichever character on the following regex expression [a-zA-Z], you should notice that any other W character not recognized must be treated as an empty space.

#Output
Each line will be the position and shoot sequence for each enemy ship, in which all the command centers found are gonna be shown separated with a blank for each layer in depth order with each name and aim position in the following format, (W:Px,Py[;s])+ where W it's gonna be the name of the command center of that layer, Px his X central coordinate and Py his Y central coordinate both using the real scale round to 3 digits. Note that those layers that has more than 1 command center share the same entry separated by a ';' and sorted ascending by size (area) and alphabetical order.
* */

const fs = require('fs');

const { resourceLimits } = require('worker_threads');

fs.readFile('alien.in', (err, data) => {
    
    if (err) throw err;
  
    var scenarios = parseInfo(data.toString());
    
    scenarios.map((scenario,index) => battle(scenario,index));

})

const parseInfo = (data) => {

    const lines = data.split(/\r?\n/);

    var   n = parseInt(lines[0]);

    const N = (1<=n && n<=30) ? n : false;

    if(!N) HandleBadCondition("N out of range");

    const ParsedLines = [];

    const scenarios = [];

    for (let index = 1; index < lines.length; index++){
        
        let line = lines[index].split(" ");
        
        var j = 0;

        const l = parseInt(line[0]);
        
        let scenario={};


        var x = parseInt(line[0]);

        var y = parseInt(line[1]);

        var z = parseFloat(line[2]);


        scenario.X = (1<=x && x<=100) ? x : false;

        scenario.Y = (1<=y && y<=100) ? y : false;

        scenario.Z = z;

        scenario.battleField = [];


        if(!(scenario.X&&scenario.Y)){

            HandleBadCondition("X or Y out of range, line:"+index);

            return;
        } 


        index++;

        
        while(j<l){
       
            scenario.battleField.push(lines[index+j].split(" "))
            
            j++;
        
        }
        
        index+=l-1;
    
        scenarios.push(scenario);

    }

    return scenarios;
}

const battle = (scenario, AuxRef ) => {
   
    const WValues = searchWValues(scenario);

    console.log(`\nBattle #${AuxRef+1}\n`);

    let WLayers = []


    WValues.map(w => {

            const shotsInfo = CalculationsAndParameters(w,scenario);

            const layer= {W:w,Coord:shotsInfo}

            WLayers.push(layer);

    });
   
   WLayers.sort(function (a, b) {

        return a.Coord.size - b.Coord.size || a.W.charCodeAt(0) - b.W.charCodeAt(0);

   });

   WLayers.map( shotsInfo => {

        console.log(`${shotsInfo.W}:${shotsInfo.Coord.P.Px},${shotsInfo.Coord.P.Py};`);
   })


}

const CalculationsAndParameters = (W,scenario) => {

    let Xmax = -1 

    let Ymax = -1 

    let Xmin = scenario.X + 1 

    let Ymin = scenario.Y + 1 


    for (let x = 0; x < scenario.X; x++) {
        for (let y = 0; y < scenario.Y; y++) {
            
            var w = scenario.battleField[x][y]
             
             if( W == w ){

                Xmax = x > Xmax ? x : Xmax;

                Ymax = y > Ymax ? y : Ymax;

                Xmin = x < Xmin ? x : Xmin;

                Ymin = y < Ymin ? y : Ymin;

             }
        } 
     }

     const size = (Xmax-Xmin+1) * (Ymax-Ymin+1)
     
     const Px = (((Xmax+Xmin)/2 + 0.5)*scenario.Z).toFixed(3)
     
     const Py = (((Ymax+Ymin)/2 + 0.5)*scenario.Z).toFixed(3)

     if(Xmax == -1 || Ymax == -1 || Xmin == scenario.X +1 ||Ymin == scenario.Y +1) 
        
        return null
     
     else 
       
        return {cmax:{x:Xmax,y:Ymax},cmin:{x:Xmin,y:Ymin}, P:{Px:Px,Py:Py} ,size: size }

}

const searchWValues = (scenario) => {
    
    let WValues=[]; 
    
    for (let x = 0; x < scenario.X; x++) {
       for (let y = 0; y < scenario.Y; y++) {
            
            var w = scenario.battleField[x][y]
                
            if(!WValues.includes(w)&& !empty(w)){
                
                WValues.push(w);

            }  
       } 
    }
    
    return WValues;

}

const empty = (c) =>{

    return !(/[A-Za-z]{1}/.test(c))

}

const HandleBadCondition = (err) => {

    console.log(err);

}


