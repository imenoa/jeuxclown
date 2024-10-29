// ------------------------------------------------------------Mes Variables:

let SpaceContenair = document.querySelector("#SpaceContenair");
let clown = document.querySelector("#clown");
let gameStart = document.querySelector("#gameStart");
let scoreContainer = document.querySelector("#score");
let attemptContenainer = document.querySelector("#attempt");
let finalmsg = document.querySelector("#finalmsg");
let gameEnd = document.querySelector("#gameEnd");



let gameInterval; //id du setinterval--------------------- a cleane a chaque fois sinon plusieur intervalle peuvent ce supperposer.
let changelvl = 1000



startButton()// initialise bouton demarage

let missedtarget = 0
let attempt = 0
let score = 0


//--------------------------------------------------------------------------------------Bouton de départ:

function startButton() {
   gameStart.textContent = ""
    clown.style.display = 'none';

    let startButton = document.createElement('button');
    startButton.textContent = "Are you brave enought?";
    gameStart.appendChild(startButton);

    startButton.addEventListener("click", function () {

        startButton.style.display = "none";
        clown.style.display = 'block';// Affiche le clown
        level()
        clearInterval(gameInterval)
        gameInterval = setInterval(level, changelvl)
        
       

    })
    
} 

//----------------------------------------------------------------------------------------------------------- Réinitianlise le jeu
function reset (){

    attempt = 0;
    score = 0;
    scoreContainer.textContent = "Score: " + score + "/20" ;
    attemptContenainer.textContent = "Attempt: "+ attempt+ "/20";
    
    level()
    clearInterval(gameInterval)
    gameInterval = setInterval(level, changelvl)

}
//--------------------------------------------------------------------------------------------------------Changer Niveau

function changelevel(lvl) {
    console.log(lvl);
    
    changelvl = lvl
    reset()
}

 //--------------------------------------------------------------------------------------------------------Lance le clow

function level() {
    


    let SpaceContenairWidth = SpaceContenair.clientWidth;
    let SpaceContenairHeight = SpaceContenair.clientHeight;

    let W = Math.floor(Math.random() * (SpaceContenairWidth - clown.clientWidth));
    let H = Math.floor(Math.random() * (SpaceContenairHeight - clown.clientHeight));

    clown.style.top = H + "px";
    clown.style.left = W + "px";
    
}


//----------------------------------------------------------------------------------------- click & score & animation
let clownimg = document.querySelector("#clown img");
let touchSound = document.querySelector("#touchSound");
let touchmsg = document.querySelector("#touchmsg");

clownimg.addEventListener("click", function () {
    attempt++
    score++;
    scoreContainer.textContent = "Score: " + score + "/20" ;
    attemptContenainer.textContent = "Attempt: "+ attempt+ "/20";

    clownimg.classList.add('shake');
    setTimeout(() => {
        clownimg.classList.remove('shake');
    }, 500);

    touchSound.currentTime = 0;
    touchSound.play();

    touchmsg.textContent = "Damn you got me!"
    setTimeout(() => {
        touchmsg.textContent = ''
    }, 1000);

    end();//-------------------------------------------------------------------------------------check condition
});

//------------------------------------------------------ click manqué

let missSound = document.querySelector("#missSound");
let missmsg = document.querySelector("#missmsg");



document.addEventListener("click", function (event) {

    if (clownimg !== event.target) {
        missed();
    }
});

function missed() {
    attempt++
    missedtarget++

    if (missedtarget === 2) {

        missSound.currentTime = 0;
        missSound.play();

        missmsg.textContent = "You're gonna die !"
        setTimeout(() => {
            missmsg.textContent = ''
        }, 1000);
        missedtarget = 0
    }

    end();//-------------------------------------------------------------------------------------check condition
}
//------------------------------------------------------------------------------------------------------Fin du game

function end() {

    if (attempt >= 20) {
        clearInterval(gameInterval); // stp mouvement inité par level
        scoreContainer.textContent = '';
        attemptContenainer.textContent='';


        if (score >= 11) {
            finalmsg.textContent = score +"/30"+ "You've made it...Give me my revenge!"
            

        } else if (score === 10) {
            finalmsg.textContent = score +"/30"+ "No winner ... Ican't accept that!"
        } else {
            finalmsg.textContent = score + "/30"+ " Game over... you died you fool!";

        }

        setTimeout(() => {
            finalmsg.textContent = ''
        }, 3000);

        score = 0;
        attempt = 0;
        restartButton();

    }

}

//------------------------------------------------------------------------------------------------------------resetbutton


function restartButton() {
    clown.style.display = 'none';

    let restartButton = document.createElement('button');
    restartButton.textContent = "Will you dare to try again ?";
    gameEnd.appendChild(restartButton);

    restartButton.addEventListener("click", function () {
        restartButton.style.display = "none";
        clown.style.display = 'block';
        attempt = 0;
        score = 0;
        scoreContainer.textContent = "Score: " + score + "/20" ;
        attemptContenainer.textContent = "Attempt: "+ attempt+ "/20";
        
        level()
        clearInterval(gameInterval)//-----------------------------------------------ajouter à chaque rappel de de fonction/VARIABLE
        gameInterval = setInterval(level, changelvl)



    })

}








