const CONF_ORDER = 1; // 0 or 1 // -< if 0, start @ 2 vol @ 4 pitch -< if 1, start @ 4 pitch @ 2 vol
const CONF_LINK = 0; 
const CONF_LEAD = -1; // so either perma detach or update only on update, either volume or pitch define which leads
const setpointDuration = .25;
// what if we vary one duration rng // -< let's not init
// then we can try proportioned setpoints ratehr than rng but I doubt it
// 1, 2, 3 combo/perm of random, sequenced array style
let globalIterator=0;

const songPath = './song.mp3'; // maybe last unaware halluc typo was .mpg


let volArr=[];
let speedArr=[];

const samplingDefiningArrays = [ [2, 3, 3, 4, 4, 3, 3, 2] , [4, 3, 3, 2, 2, 3, 3, 4] ];
if (CONF_ORDER === 0){
    volArr=samplingDefiningArrays[0];
    speedArr=samplingDefiningArrays[1];
}
else if (CONF_ORDER === 1){
    volArr=samplingDefiningArrays[1];
    speedArr=samplingDefiningArrays[0];
}
else{
    volArr=samplingDefiningArrays[0];
    speedArr=samplingDefiningArrays[1];
}

const setPointsVol = [.4, .45, .5, .55, .6];
const setPointsSpeed = [.8, .9, 1, 1.1, 1.2];


let presVolIntervalIter = 0;
let presSpeedIntervalIter = 0;

let presVolInterval = 0;
let presSpeedInterval = 0;

function redefineVolInterval(){
    presVolInterval = volArr[presVolIntervalIter];
}

function redefineSpeedInterval(){
    presSpeedInterval = speedArr[presSpeedInterval];
}

function pickAmongFive(){
    return Math.floor(Math.random() * 5);
}

function nextVolIntervalIter(){
    if (presVolIntervalIter < 7){
        presVolIntervalIter++;
    }
    else{
        presVolIntervalIter=0;
    }
}

function nextSpeedIntervalIter(){
    if (presSpeedIntervalIter < 7){
        presSpeedIntervalIter++;
    }
    else{
        presSpeedIntervalIter=0;
    }
}



function runner(){
    const songAudio = new Audio(songPath);
    const songDuration = 232;
    console.log(songDuration);
    let randomForVolVal = setPointsVol[pickAmongFive()];
    let randomForSpeedVal = setPointsSpeed[pickAmongFive()];

    let volIntervalIter = 0;
    let speedIntervalIter = 0;
    redefineSpeedInterval();
    redefineVolInterval();


    let volInterval = presVolInterval;
    let speedInterval = presSpeedInterval;


    songAudio.play();
    advanceVolume();
    advanceSpeed();

    function advanceVolume(){
        if (0===0){
            console.log('advanceV');
            setTimeout(function(){
                songAudio.volume = randomForVolVal;
                console.log(songAudio.volume);
                volIntervalIter += volArr[presVolIntervalIter];
                
                advanceVolume();
            }, setpointDuration * volInterval * 1000);
            nextVolIntervalIter();
            redefineSpeedInterval();
            volInterval = presVolInterval;
            randomForVolVal = setPointsVol[pickAmongFive()];
            
        }
    }

    function advanceSpeed(){
        if (0===0){
            setTimeout(function(){
                songAudio.playbackRate = randomForSpeedVal;
                console.log(songAudio.playbackRate);
                speedIntervalIter += speedArr[presSpeedIntervalIter];
                
                advanceSpeed();
            }, setpointDuration * speedInterval * 1000);
            nextSpeedIntervalIter();
            redefineSpeedInterval();
            speedInterval = presSpeedInterval;
            randomForSpeedVal = setPointsSpeed[pickAmongFive()];
        }
    }


}

window.addEventListener("keydown", (event) => {
    if (event.code === "KeyT"){
        runner();
    }
})
