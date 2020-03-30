//Section 1: Global variables to use to do all the switches (Line 1 to 30)
var gameStart = false;
var toggleInstructionSwitch = false;
var toggleControlSwitch = false;
var toggleHelpSwitch = false;
var restart;
var timerIntervalFunction;
var mapStatus = false;
var backgroundMusic = "Music/ElfenLiedLilium.mp3";
var DungeonMusic = "Music/MusicBox.mp3"
var startSound;
var dungeonSound;
var staminaDepletion;
var explodeSound = "SoundEffect/Explode.mp3";
var explode;
var NoStaminaSound = "SoundEffect/NoStamina.wav";
var NoStamina;
var WinSound = "SoundEffect/Win.wav";
var win;
var wrathSound = "SoundEffect/womanwrath.mp3"
var wrath;
var zombieBabySound = "SoundEffect/zombieBaby.mp3";
var zombieBaby;
var pickUpSound = "SoundEffect/pickup.wav";
var pickUp;
var ouchSound = "SoundEffect/Ouch.mp3";
var ouch;
var mapSound = "SoundEffect/map.wav";
var map;
var toggleStatus = "hidden";

//Section 2: Define player object which consist of name, coordinates, stamina and picked up items(Line 33 to 41)
var player =
{
    name : "",
    xCoordinate : 0,
    yCoordinate : 0,
    stamina : 100,
    milk : false,
    peg : false
};

//Section 3: Define baby object to check 3 conditions. (Line 44 to 49)
var baby =
{
    fed : false,
    diaper : false,
    sleep : false
};

//Section 4: Creation of map area(Line 52 to 85)
//play area
//for testing purpose
var testAreaArray =
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]

];

//for creating different dungeon format
var dummyAreaArray =
[
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"]
];

//to use as user defined map
var playAreaArray = [];
//first version map where everything is fixed
var fixAreaArray =
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
playAreaArray = fixAreaArray;

//Section 5: Music creation. sound Effect for short burst. Sound for looped music. (Line 88 to 121)
//Music Function
//more for soundEffect
function soundEffect(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//more for music background
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.loop=true;
  document.body.appendChild(this.sound);
  this.play = function(){

    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//Section 6: Initialisation all variables. To be called upon winning or losing the game. (Line 124 to 152)
var reinitialisation = function(){
    gameStart = false;
    fixAreaArray =
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
playAreaArray = fixAreaArray;
baby =
{
    fed : false,
    diaper : false,
    sleep : false
};
player =
{
    name : "",
    xCoordinate : 0,
    yCoordinate : 0,
    stamina : 100,
    milk : false,
    peg : false
};
dungeonSound.stop();
}

//Section 7: Adjusting stamina length (Line 155 to 169)
var staminaDistanceCheck=function(){
    var displayStamina = document.getElementById("staminaCount");
    if(player.stamina === 100)
    {
        displayStamina.style.marginLeft = "18px";
    }
    else if(player.stamina > 9 && player.stamina < 100)
    {
        displayStamina.style.marginLeft = "25px";
    }
    else
    {
        displayStamina.style.marginLeft = "35px";
    }
}


//Section 8: Time Interval call back function to deplete the stamina.(Line 174 to 189)

var timerCallBack = function(){

    console.log(player.stamina);

    var displayStamina = document.getElementById("staminaCount");
    player.stamina -= 1;
    staminaDistanceCheck();
    if(player.stamina <= 0){
        displayStamina.innerText = `0`;
        noStamina();
    }
    else
    {
        displayStamina.innerText = `${player.stamina}`;
    }
}

//Section 9: Boundary Check.(Line 192 to 202)
//Boundary check to ensure not bumped into the wall
var boundaryCheck = function(){
    if((player.yCoordinate<0) || (player.yCoordinate >= playAreaArray.length) || player.xCoordinate<0 || (player.xCoordinate >= playAreaArray[player.yCoordinate].length))
    {
        return false;
    }
    else
    {
        return true;
    }
}

//Section 10: Call back function to end the 10 second timer from every end state and to reload the initial screen. (Line 205-208)
var backInitial = function(){
    initialScreen();
    clearTimeout(restart);
};

//Section 11 Win state function when you sleep when the baby sleep. (Line 211-222)/
var winCase = function(){
    win.play();
    console.log("You have won!")
reinitialisation();
var winImage = document.getElementById("gamescreen");
winImage.style.backgroundImage = "url('background/happySleepingMan.jpg')";
var winMessage = document.getElementById("Message");
winMessage.innerText = "Good job. You have won. But tomorrow the cycle repeats again. You will return back to main screen in 10 seconds";
        gameStart = false;
clearInterval(timerIntervalFunction);
restart = setTimeout(backInitial,10000);
}

//Section 12 Lose state 1 function when you try to feed baby with no milk bottle. (Line 225-236)
var eatenAlive = function(){
    zombieBaby.play();
    console.log("You have been eaten alive. Zombie babies!");
reinitialisation();
var loseImage1 = document.getElementById("gamescreen");
loseImage1.style.backgroundImage = "url('background/zombieBaby.jpeg')";
var loseMessage1=document.getElementById("Message");
loseMessage1.innerText = "You have been too brave to feed the baby with your life. You lost.... Well, fortunately it is just a nightmare(or is it). You will return back to main screen in 10 seconds";
        gameStart=false;
clearInterval(timerIntervalFunction);
restart = setTimeout(backInitial,10000);
}

//Section 13 Lose state 2 function when you try to change diaper without peg. (Line 239-250)
var nuclearBomb = function(){
    explode.play();
    console.log("A nuclear bomb has exploded in front of you");
 reinitialisation();
var loseImage2 = document.getElementById("gamescreen");
loseImage2.style.backgroundImage = "url('background/nuclear.jpg')";
var loseMessage2 = document.getElementById("Message");
        gameStart = false;
loseMessage2.innerText = "The smell of the poop blew your mind. Well fortunately, your wife was there to save you. You will return to the main screen in 10 seconds";
clearInterval(timerIntervalFunction);
restart = setTimeout(backInitial,10000);
}

//Section 14 Lose state 3 function when you try to sleep without completing your tasks. (Line 253-264)
var womanFury = function(){
    wrath.play();
    console.log("Hell hath no fury like a woman scorned");
reinitialisation();
var loseImage3 = document.getElementById("gamescreen");
loseImage3.style.backgroundImage = "url('background/AngryWife.png')";
var loseMessage3 = document.getElementById("Message");
        gameStart = false;
loseMessage3.innerText = "Hell hath no fury like a woman scorned. Serve you right for letting your wife work alone to face the demon spawn. You will return to the main screen in 10 seconds";
clearInterval(timerIntervalFunction);
restart = setTimeout(backInitial,10000);
}

//Section 15 Lose state 4 function when you lost all your stamina. (Line 267-282)
var noStamina = function(){

    NoStamina.play();
    console.log("You have fainted in your home. Goodness know how but ya");
reinitialisation();
var loseImage4 = document.getElementById("gamescreen");
loseImage4.style.backgroundImage = "url('background/noStamina.jpg')";
var loseMessage4 = document.getElementById("Message");
loseMessage4.innerText = "You have fainted in your home. Goodness know how but ya. You will return to the main screen in 10 seconds";
    var displayStamina = document.getElementById("staminaCount");
        displayStamina.innerText = `0`;
        //noStamina();
        gameStart = false;
clearInterval(timerIntervalFunction);
restart = setTimeout(backInitial,10000);
}

// functions if bump wall, step on lego, bump Table
//Section 16 Function to tell user they bump into wall. (Line 286-293)
var wallBump = function(){
    console.log("Bump Wall");
    ouch.play();
    var wallImage = document.getElementById("gamescreen");
    wallImage.style.backgroundImage = "url('background/wall.jpeg')";
    var Message = document.getElementById("Message");
    Message.innerText = "You have bumped into the wall. Thought this was your house?";
}

//Section 17 Function to tell user they step on lego. (Line 296-313)
var legoStep = function(){
    console.log("lego ouch!");
    ouch.play();
    if(staminaDepletion)
    {
            player.stamina -= 5;}
            staminaDistanceCheck();
    var legoImage = document.getElementById("gamescreen");
    legoImage.style.backgroundImage = "url('background/lego.jpeg')";
    var Message = document.getElementById("Message");
    Message.innerText = "Ouch, why is the lego here? To clear in the morning";
    var staminaBar = document.getElementById("staminaCount");
    staminaBar.innerText = `${player.stamina}`;
    if(player.stamina <= 0)
    {
        noStamina();
    }
}

//Section 18 Function to tell user they bump table. (Line 316-334)
var tableBump = function(){
    console.log("table ouch");
    ouch.play();
    if(staminaDepletion)
    {
    player.stamina -= 10;
    }
      var tableImage = document.getElementById("gamescreen");
      staminaDistanceCheck();
    tableImage.style.backgroundImage = "url('background/table.jpeg')";
    var Message = document.getElementById("Message");
    Message.innerText = "Wa Lao! Who left the stupid table here!";
    var staminaBar = document.getElementById("staminaCount");
    staminaBar.innerText = `${player.stamina}`;
    if(player.stamina <= 0)
    {
                noStamina();
    }
}

//Section 19 Functions to tell user where they navigated to (Line 337 to 368)
var darkRoom = function(){
    console.log("dark room");
    var darkImage = document.getElementById("gamescreen");
    darkImage.style.backgroundImage = "url('background/darkCorridor.jpeg')";
    var Message = document.getElementById("Message");
    Message.innerText = "Isn't the dark so romantic?";
}

var seeBed = function(){
    console.log("I see bed");
    var bedImage = document.getElementById("gamescreen");
    bedImage.style.backgroundImage = "url('background/bed.jpg')";
    var Message = document.getElementById("Message");
    Message.innerText = "My beautiful bed. Wish I could just sleep.";
}

var seeBaby = function(){
    console.log("I see baby");
    if(baby.sleep)
    {
    var babySleepImage = document.getElementById("gamescreen");
    babySleepImage.style.backgroundImage = "url('background/sleepingBaby.jpeg')";
    var Message = document.getElementById("Message");
    Message.innerText = "Aren't they angels when they sleep";
    }
    else
    {
    var babyCryImage = document.getElementById("gamescreen");
    babyCryImage.style.backgroundImage = "url('background/cryingBaby.jpg')";
    var Message = document.getElementById("Message");
    Message.innerText = "Better get him to sleep before he drives me insane!";
    }
}

// Section 20: Display of map(Line 372 to 382)
var mapMode = function(){
    console.log("map mode");
    console.log(player.xCoordinate.toString());
    console.log(player.yCoordinate.toString());
    var mapDisplayUrl = "map/map" + player.yCoordinate.toString() + player.xCoordinate.toString() + ".png";
    console.log(mapDisplayUrl);
    console.log(typeof mapDisplayUrl);

    var mapImage = document.getElementById("gamescreen");
    mapImage.style.backgroundImage = `url(${mapDisplayUrl})`;
}

// Section 21: Function to check what the user stepped on. l for lego, t for table, x for neutral ground, m for milk, p for peg, bed for bed and baby for baby(Line 385 to 410)
var switchCheckMovement=function(){
    switch(playAreaArray[player.yCoordinate][player.xCoordinate])
                    {
                        case "l":
                        legoStep();
                        break;
                        case "t":
                        tableBump();
                        break;
                        case "x":
                        darkRoom();
                        break;
                        case "m":
                        darkRoom();
                        break;
                        case "p":
                        darkRoom();
                        break;
                        case "bed":
                        seeBed();
                        break;
                        case "baby":
                        seeBaby();
                        break;
                    }
}

//Section 22: This function is to check for key press and only activated when game start. Prior/ it will start the music. (Line 413 to 704)
var checkKey = function(event){
    //console.log(event);
    if(!gameStart){
        startSound.play();
        console.log("test");
    }
    if(gameStart)
    {    //start of movement logic
        if(event.keyCode === 38)
            {
            // up key pressed
                player.yCoordinate--;
                staminaDepletion = true;
                if(boundaryCheck())
                {

                    switchCheckMovement();

                }
                else
                {
                    player.yCoordinate++;
                    wallBump();

                }

            }


        else if(event.keyCode === 40)
            {

                player.yCoordinate++;
                staminaDepletion=true;
                if(boundaryCheck()){
                    switchCheckMovement();

                }
                else
                {
                    player.yCoordinate--;
                    wallBump();
                }

            }
            else if (event.keyCode === 39){
            //right key pressed
                player.xCoordinate++;
                staminaDepletion = true;
                if(boundaryCheck()){
                    switchCheckMovement();

                }
                else
                {
                    player.xCoordinate--;
                    wallBump();
                }

            }
            else if (event.keyCode === 37)
            {
            //left key pressed
                        player.xCoordinate--;
                        staminaDepletion = true;
                if(boundaryCheck()){
                    switchCheckMovement();

                }
                else
                {
                    player.xCoordinate++;
                    wallBump();
                }

            }
        //end of movement logic

        //start of picking up logic
            else if (event.keyCode === 32)
            {

            //space key pressed to search
            staminaDepletion = false;
                switch (playAreaArray[player.yCoordinate][player.xCoordinate])
                {
                    case "m":
                    pickUp.play();
                    console.log("You have found some milk!");
                    var milkImage = document.querySelector(".milkContainer");
                    milkImage.style.backgroundImage = "url('figure/milkBottle.png')";
                    var milkMessage = document.getElementById("Message");
                    milkMessage.innerText = "Found the milk, lucky you.";
                    player.milk = true;
                    playAreaArray[player.yCoordinate][player.xCoordinate] = "x";
                    break;
                    case "p":
                    pickUp.play();
                    console.log("You have found a peg");
                    var pegImage = document.querySelector(".pegContainer");
                    pegImage.style.backgroundImage = "url('figure/peg.png')";
                    var pegMessage = document.getElementById("Message");
                    pegMessage.innerText = "Found the peg, lucky you.";
                    player.peg = true;
                    playAreaArray[player.yCoordinate][player.xCoordinate] = "x";
                    break
                    case "x":
                    console.log("You groped in the dark and found nothing");
                    var darkMessage = document.getElementById("Message");
                    darkMessage.innerText = "I know you love dancing in the dark, but come on";
                    break;
                    case "bed":
                    console.log("You can feel your comfy bed in the dark");
                    var bedMessage = document.getElementById("Message");
                    bedMessage.innerText = "The bed summons you but you know you need to do something before a disaster happens";
                    break;
                    case "baby":
                    console.log("The little terror");
                    var babyMessage = document.getElementById("Message");
                    babyMessage.innerText = "The little rascal";
                    break;
                    case "l":
                    console.log("You feel the lego. Must remember to clear...");
                    var legoMessage = document.getElementById("Message");
                    legoMessage.innerText = "I did not know you have fetish in stepping on lego... ";
                    break;
                    case "t":
                    console.log("the table feels like some monster in the dark...");
                    var tableMessage = document.getElementById("Message");
                    tableMessage.innerText = "The table feels like it moved...";
                    break;
                }

            }
            //end of pick up logic

            //start of feed logic
        else if (event.keyCode === 70)
        {
        // F key to feed
        //Logic to feed the kiddo
        staminaDepletion = false;
        if(playAreaArray[player.yCoordinate][player.xCoordinate] === "baby")
            {
                //console.log("check milk")
                if(baby.fed)
                    {
                     console.log("Dude you fed the kid. Come on. Wake up");
                    var fedMessage = document.getElementById("Message");
                    fedMessage.innerText = "Dude you fed the kid. Come on. Wake up!";
                    }
                else{
                if(player.milk)
                        {
                 console.log("you have fed the kid. Good job");

                 baby.fed = true;
            player.milk = false;
                var milkBottleUsed = document.querySelector(".milkContainer");
                milkBottleUsed.style.backgroundImage = "url('')";

             if(baby.fed&&baby.diaper)
                          {
             baby.sleep = true;
               console.log("sleeping like a baby")
               var fedMessage2 = document.getElementById("Message");
                    fedMessage2.innerText = "Sleeping like a baby! Time for me to return";
                    var sleepingBaby = document.getElementById("gamescreen");
                    sleepingBaby.style.backgroundImage = "url('/background/sleepingBaby.jpeg')";
                                    }
                    else{
                        var fedMessage3 = document.getElementById("Message");
                    fedMessage3.innerText = "There is something missing in my life";

                                    }
                            }
                        else
                            {
                     eatenAlive();
                            }
                    }
            }
        else
        {
            console.log("Who are you feeding? Ghost?");
                    var fedMessage4 = document.getElementById("Message");
                    fedMessage4.innerText = "Dude, who are you feeding? Ghost?";
        }

        }
        //end of feed logic

        //start of diaper logic
        else if (event.keyCode === 67)
        {
        //C key to Change diapers
        //Logic to change the diapers
        staminaDepletion = false;
        if(playAreaArray[player.yCoordinate][player.xCoordinate] === "baby")
            {
                //console.log("check milk")
                if(baby.diaper)
                    {
                        console.log("Dude you sure like to smell his poop huh");
                    var diaperMessage = document.getElementById("Message");
                    diaperMessage.innerText = "Dude you sure like to smell his poop huh.";
                    }
                else{
                        if(player.peg)
                            {
                                console.log("you have change the kid's diapers. Good job");
                    var pegUsed=document.querySelector(".pegContainer");
                pegUsed.style.backgroundImage = "url('')";

                                baby.diaper = true;
                                player.peg = false;
                                if(baby.fed&&baby.diaper)
                                    {
                                        baby.sleep = true;
                                        console.log("sleeping like a baby");
                            var diaperMessage2 = document.getElementById("Message");
                    diaperMessage2.innerText = "Sleeping like a baby! Time for me to return";
                    var sleepingBaby = document.getElementById("gamescreen");
                    sleepingBaby.style.backgroundImage = "url('background/sleepingBaby.jpeg')";
                                    }
                                    else{
                                        var diaperMessage3 = document.getElementById("Message");
                    diaperMessage3.innerText = "He is still crying. What did I miss?";
                                    }
                            }
                        else
                            {
                                nuclearBomb();
                            }
                    }
            }
        else
        {
            console.log("Wow, you really know how to play with floating diapers");
            var diaperMessage4 = document.getElementById("Message");
                    diaperMessage4.innerText = "Wow, you really know how to play with floating diapers";
        }

        }
        //end of diaper logic



        else if(event.keyCode === 83)
        {
        //S Key to sleep
        staminaDepletion = false;
            if(playAreaArray[player.yCoordinate][player.xCoordinate] === "bed")
            {
                console.log("sleep bed");
                if(baby.sleep)
                {
                    winCase();
                    //console.log("peaceful day");
                }
                else
                {
                    womanFury();
                }
            }
            else
            {
                console.log("now it is not time for camp la");
                    var sleepMessage=document.getElementById("Message");
                    sleepMessage.innerText="You can sleep anywhere I see, but now it is not the time";
            }
        }
                else if(event.keyCode === 77)
        {
        //M Key to map
        map.play();
        staminaDepletion = false;
            mapStatus = !mapStatus;
            if(mapStatus){
                        console.log("M key pressed");
                        mapMode();
                    }
            else{
                        switchCheckMovement();


            }

        }

    }
    }

// Game interaction functions end here
//Section 23: Display of help screen when the ? is clicked on the bottom left of the help screen(Linke 708 to 718)
var HelpScreen = function(event){
    staminaDepletion = false;
toggleHelpSwitch = !toggleHelpSwitch;
if(toggleHelpSwitch){
    var helpScreenOn = document.getElementById("gamescreen");
    helpScreenOn.style.backgroundImage = "url('background/controls.png')";
    }
    else{
        switchCheckMovement();
    }
}

//Section 24: Checking whether user pressed any keys (Line 721)
document.addEventListener("keyup",checkKey);
//toggle messages

//Section 25: Toggle of Instruction and Controls on start page (Line 725 to 761)
var toggleInstruction = function(event){
//console.log("toggle");
//toggleInstructionSwitch=!toggleInstructionSwitch;
var toggleInstruction = document.querySelector(".instruction");

if(toggleStatus === "hidden")
    {
        toggleInstruction.style.visibility = "visible";
        toggleInstruction.innerHTML = "You are a daddy who is woken up in the middle of the night. <br> You hear your kid crying.<br> You need to move in a dark room and find his milk bottle and a peg (you know how stinky a diapers can get). <br> Once done, look for him, feed him, change his diaper and go back to bed.";
            toggleStatus = "visible";
    }
else
    if(toggleStatus === "visible")
    {
    toggleInstruction.style.visibility = "hidden";
    toggleStatus = "hidden"
    }
}

var toggleControl = function(event){
//console.log("toggle");
var toggleInstruction = document.querySelector(".instruction");

if(toggleStatus === "hidden")
    {
        toggleInstruction.style.visibility = "visible";
        toggleInstruction.innerHTML = "Arrow keys to move. <br>Space to search.<br> F to feed <br> C to change diapers.<br> S to go back to sleep<br>M to toggle map mode";
            toggleStatus = "visible";
    }
else
    if(toggleStatus === "visible")
    {
    toggleInstruction.style.visibility = "hidden";
    toggleStatus = "hidden"
    }

}

//Section 26: DOM to create game screen.(Line 764 to 904)
var gameScreen = function(event){
    startSound.stop();
    dungeonSound.play();
    console.log("test");
    gameStart = true;
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "black";
    var gameContainer = document.createElement("div");
    gameContainer.classList.add("gamecontainer");
    document.body.appendChild(gameContainer);
//first container
    var firstContainer = document.createElement("div");
    firstContainer.classList.add("container");
    gameContainer.appendChild(firstContainer);

    var firstContainerRow = document.createElement("div");
    firstContainerRow.classList.add("row");
    firstContainer.appendChild(firstContainerRow);

    var firstContainerLeftDiv = document.createElement("div");
    firstContainerLeftDiv.classList.add("col-md-2");
    firstContainerLeftDiv.classList.add("test");
    firstContainerRow.appendChild(firstContainerLeftDiv);

    var circle = document.createElement("div");
    //circle.classList.add("circle");(Delete if heart fails)
    circle.classList.add("heart");
    firstContainerLeftDiv.appendChild(circle);

    var circleText = document.createElement("div");
    //circleText.classList.add("circle-txt");(Delete if heart fails)
    circleText.classList.add("heartText");
    circleText.setAttribute("id","staminaCount");
    circleText.innerText = "100";
    circle.appendChild(circleText);

    var firstContainerMiddleDiv = document.createElement("div");
    firstContainerMiddleDiv.classList.add("col-md-8");
    firstContainerMiddleDiv.classList.add("test");
    firstContainerRow.appendChild(firstContainerMiddleDiv);

    var firstContainerRightDiv = document.createElement("div");
    firstContainerRightDiv.classList.add("col-md-2");
    firstContainerRightDiv.classList.add("test");
    firstContainerRow.appendChild(firstContainerRightDiv);

    var inventoryText = document.createElement("span");
    inventoryText.classList.add("inventory");
    inventoryText.innerHTML = "<br>Inventory";
    firstContainerRightDiv.appendChild(inventoryText);

//second container
 var secondContainer = document.createElement("div");
 secondContainer.classList.add("container");
 gameContainer.appendChild(secondContainer);

 var secondContainerRow = document.createElement("div");
 secondContainerRow.classList.add("row");
 secondContainer.appendChild(secondContainerRow);

 var secondContainerLeftDiv = document.createElement("div");
 secondContainerLeftDiv.classList.add("col-md-2");
 secondContainerLeftDiv.classList.add(
    "test");
 secondContainerRow.appendChild(secondContainerLeftDiv);

var helpCircle = document.createElement("div");
helpCircle.classList.add("circle");
helpCircle.setAttribute("id","Help");
secondContainerLeftDiv.appendChild(helpCircle);

var helpCircleText = document.createElement("div");
helpCircleText.classList.add("circle-txt");

helpCircleText.innerText = "?";
helpCircle.appendChild(helpCircleText);

  var secondContainerMiddleDiv = document.createElement("div");
 secondContainerMiddleDiv.classList.add("col-md-8");
 secondContainerMiddleDiv.classList.add(
    "test");
 secondContainerRow.appendChild(secondContainerMiddleDiv);

var gameScreen = document.createElement("div");
gameScreen.classList.add("gamescreen");
gameScreen.setAttribute("id","gamescreen");
secondContainerMiddleDiv.appendChild(gameScreen);

  var secondContainerRightDiv = document.createElement("div");
 secondContainerRightDiv.classList.add("col-md-2");
 secondContainerRightDiv.classList.add(
    "test");
 secondContainerRow.appendChild(secondContainerRightDiv);

var secondContainerRightDivFirstRow = document.createElement("div");
secondContainerRightDivFirstRow.classList.add("row");
secondContainerRightDivFirstRow.classList.add("test");
secondContainerRightDiv.appendChild(secondContainerRightDivFirstRow);

var milkcontainer = document.createElement("div");
milkcontainer.classList.add("milkContainer");
secondContainerRightDivFirstRow.appendChild(milkcontainer);

var secondContainerRightDivSecondRow = document.createElement("div");
secondContainerRightDivSecondRow.classList.add("row");
secondContainerRightDivSecondRow.classList.add("test");
secondContainerRightDiv.appendChild(secondContainerRightDivSecondRow);

var pegcontainer = document.createElement("div");
pegcontainer.classList.add("pegContainer");
secondContainerRightDivSecondRow.appendChild(pegcontainer);


var thirdContainer = document.createElement("div");
thirdContainer.classList.add("container");
gameContainer.appendChild(thirdContainer);

var thirdContainerRow = document.createElement("div");
thirdContainerRow.classList.add("row");
thirdContainerRow.classList.add("justify-content-center");
thirdContainer.appendChild(thirdContainerRow);


var thirdContainerMiddleDiv = document.createElement("div");
thirdContainerMiddleDiv.classList.add("col-md-10");
thirdContainerMiddleDiv.classList.add("test");
thirdContainerMiddleDiv.classList.add("text-center");
thirdContainerRow.appendChild(thirdContainerMiddleDiv);

var message = document.createElement("span");
message.setAttribute("id","Message");

message.innerText = "Let's stop the baby from crying. Wonder who turned out the lights";
thirdContainerMiddleDiv.appendChild(message);

var activateHelpScreen = document.getElementById("Help");
activateHelpScreen.addEventListener("click",HelpScreen);


    timerIntervalFunction = setInterval(timerCallBack,2000);
}

//Section 27: DOM to create title screen.(Line 907 to 992)
var initialScreen = function(){

    gameStart = false;
        document.body.innerHTML = "";
    document.body.style.backgroundColor = "#E6E6E6";
    reinitialisation();
    var startBox = document.createElement("div");
    startBox.classList.add("startBox");
    document.body.appendChild(startBox);

    var header = document.createElement("div");
    header.classList.add("header");
    startBox.appendChild(header);


    var title = document.createElement("span");
    title.classList.add("headerText");
    title.innerText = "Baby Dungeon";
    header.appendChild(title);

    var startButtonDiv = document.createElement("div");
    startButtonDiv.classList.add("button");
    startBox.appendChild(startButtonDiv);

    var startButton = document.createElement("button");
    startButton.setAttribute("id","Start");
    startButton.innerText = "Start";
    startButtonDiv.appendChild(startButton);

    var firstClassContainer = document.createElement("div");
    firstClassContainer.classList.add("container");
    startBox.appendChild(firstClassContainer);

    var firstClassRow = document.createElement("div");
    firstClassRow.classList.add("row");
    firstClassContainer.appendChild(firstClassRow);

    var firstClassLeftDiv = document.createElement("div");
    firstClassLeftDiv.classList.add("col-md-3");
    firstClassRow.appendChild(firstClassLeftDiv);

    var firstClassMiddleDiv = document.createElement("div");
    firstClassMiddleDiv.classList.add("col-md-6");
     firstClassMiddleDiv.classList.add("instruction");
    firstClassRow.appendChild(firstClassMiddleDiv);

    var secondClassContainer = document.createElement("div");
    secondClassContainer.classList.add("container");
    startBox.appendChild(secondClassContainer);

    var secondClassRow = document.createElement("div");
    secondClassRow.classList.add("row");
    secondClassContainer.appendChild(secondClassRow);

    var secondClassLeftDiv = document.createElement("div");
    secondClassLeftDiv.classList.add("col-md-3");
    secondClassRow.appendChild(secondClassLeftDiv);

    var secondClassMiddleDiv = document.createElement("div");
    secondClassMiddleDiv.classList.add("col-md-3");
    secondClassRow.appendChild(secondClassMiddleDiv);

    var instructionButton = document.createElement("button");
    instructionButton.setAttribute("id","clickInstruction");
    instructionButton.innerText = "Instruction";
    secondClassMiddleDiv.appendChild(instructionButton);

    var secondClassRightDiv = document.createElement("div");
    secondClassRightDiv.classList.add("col-md-4");
    secondClassRow.appendChild(secondClassRightDiv);

    var controlButton = document.createElement("button");
    controlButton.setAttribute("id","clickControl");
    controlButton.innerText = "Controls"
    secondClassRightDiv.appendChild(controlButton);

    var instructionToggle = document.getElementById("clickInstruction");
    instructionToggle.addEventListener("click",toggleInstruction);

    var controlToggle = document.getElementById("clickControl");
    controlToggle.addEventListener("click",toggleControl);

    var buttonStart = document.getElementById("Start");
    buttonStart.addEventListener("click",gameScreen);

}

//Section 28: Loading function (Line 994 to 1010)
window.onload=function()
{
    //console.log("load up");
    //preload all the background music and sound effect
    startSound = new sound(backgroundMusic);
    dungeonSound = new sound(DungeonMusic);
    explode = new soundEffect(explodeSound);
    NoStamina = new soundEffect(NoStaminaSound);
    win = new soundEffect(WinSound);
    wrath = new soundEffect(wrathSound);
    zombieBaby = new soundEffect(zombieBabySound);
    pickUp = new soundEffect(pickUpSound);
    ouch = new soundEffect(ouchSound);
    map = new soundEffect(mapSound);
    initialScreen();
}