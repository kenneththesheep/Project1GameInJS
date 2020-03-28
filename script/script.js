//console.log("soft check");
//To prevent the game to start yet
var gameStart=false;
var toggleInstructionSwitch=false;
var toggleControlSwitch=false;
var restart;
//player object
var player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};

//baby object
var baby=
{
    fed:false,
    diaper:false,
    sleep:false
}

//play area
//for testing purpose
var testAreaArray=
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]

];
//for creating different dungeon format
var dummyAreaArray=
[
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"],
    ["x","x","x","x","x","x"]
];

//to use as user defined map
var playAreaArray=[];
//first version map where everything is fixed
var fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
playAreaArray=fixAreaArray;
//Boundary check to ensure not bumped into the wall
var boundaryCheck=function(){
    if((player.yCoordinate<0) || (player.yCoordinate>=playAreaArray.length) ||player.xCoordinate<0||(player.xCoordinate>=playAreaArray[player.yCoordinate].length))
    {
        return false;
    }
    else
    {
        return true;
    }
}

var backInitial=function(){
    initialScreen();
    clearTimeout(restart);
};

//win state
var winCase=function(){
    console.log("You have won!")
    gameStart=false;
    fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};
var winImage=document.getElementById("gamescreen");
winImage.style.backgroundImage="url('background/happySleepingMan.jpg')";
var winMessage=document.getElementById("Message");
winMessage.innerText="Good job. You have won. But tomorrow the cycle repeats again. You will return back to main screen in 10 seconds";
//to add win
restart=setTimeout(backInitial,10000);
}


//lose state
var eatenAlive=function(){
    console.log("You have been eaten alive. Zombie babies!");
    fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};
var loseImage1=document.getElementById("gamescreen");
loseImage1.style.backgroundImage="url('background/zombieBaby.jpeg')";
var loseMessage1=document.getElementById("Message");
loseMessage1.innerText="You have been too brave to feed the baby with your life. You lost.... Well, fortunately it is just a nightmare(or is it). You will return back to main screen in 10 seconds";
restart=setTimeout(backInitial,10000);

}

var nuclearBomb=function(){
    console.log("A nuclear bomb has exploded in front of you");
    fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};
var loseImage2=document.getElementById("gamescreen");
loseImage2.style.backgroundImage="url('background/nuclear.jpg')";
var loseMessage2=document.getElementById("Message");
loseMessage2.innerText="The smell of the poop blew your mind. Well fortunately, your wife was there to save you. You will return to the main screen in 10 seconds";
restart=setTimeout(backInitial,10000);
}

var womanFury=function(){
    console.log("Hell hath no fury like a woman scorned");
        fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};
var loseImage3=document.getElementById("gamescreen");
loseImage3.style.backgroundImage="url('background/AngryWife.png')";
var loseMessage3=document.getElementById("Message");
loseMessage3.innerText="Hell hath no fury like a woman scorned. Serve you right for letting your wife work alone to face the demon spawn. You will return to the main screen in 10 seconds";
restart=setTimeout(backInitial,10000);
}

var noStamina=function(){
    console.log("You have fainted in your home. Goodness know how but ya");
            fixAreaArray=
[
    ["bed","x","t","x","x","m"],
    ["x","x","x","l","x","x"],
    ["x","x","l","x","x","x"],
    ["x","p","x","x","x","x"],
    ["x","x","t","x","x","t"],
    ["t","x","x","x","x","baby"]
];
player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0,
    stamina: 100,
    milk:false,
    peg:false
};
var loseImage4=document.getElementById("gamescreen");
loseImage4.style.backgroundImage="url('background/noStamina.jpg')";
var loseMessage4=document.getElementById("Message");
loseMessage4.innerText="You have fainted in your home. Goodness know how but ya. You will return to the main screen in 10 seconds";
restart=setTimeout(backInitial,10000);
}

// functions if bump wall, step on lego, bump Table

var wallBump=function(){
    console.log("Bump Wall");
    var wallImage=document.getElementById("gamescreen");
    wallImage.style.backgroundImage="url('background/wall.jpeg')";
    var Message=document.getElementById("Message");
    Message.innerText="You have bumped into the wall. Thought this was your house?";
}

var legoStep=function(){
    console.log("lego ouch!");

    player.stamina-=5;
    var legoImage=document.getElementById("gamescreen");
    legoImage.style.backgroundImage="url('background/lego.jpeg')";
    var Message=document.getElementById("Message");
    Message.innerText="Ouch, why is the lego here? To clear in the morning";
    var staminaBar=document.getElementById("staminaCount");
    staminaBar.innerText=`Stamina: ${player.stamina}`;
    if(player.stamina<=0)
    {
        noStamina();
    }
}

var tableBump=function(){
    console.log("table ouch");
    player.stamina-=10;
      var tableImage=document.getElementById("gamescreen");
    tableImage.style.backgroundImage="url('background/table.jpeg')";
    var Message=document.getElementById("Message");
    Message.innerText="Wa Lao! Who left the stupid table here!";
    var staminaBar=document.getElementById("staminaCount");
    staminaBar.innerText=`Stamina: ${player.stamina}`;
    if(player.stamina<=0)
    {
                noStamina();
    }
}

var darkRoom=function(){
    console.log("dark room");
    var darkImage=document.getElementById("gamescreen");
    darkImage.style.backgroundImage="url('background/darkCorridor.jpeg')";
    var Message=document.getElementById("Message");
    Message.innerText="Isn't the dark so romantic?";
}

var seeBed=function(){
    console.log("I see bed");
    var bedImage=document.getElementById("gamescreen");
    bedImage.style.backgroundImage="url('background/bed.jpg')";
    var Message=document.getElementById("Message");
    Message.innerText="My beautiful bed. Wish I could just sleep.";
}

var seeBaby=function(){
    console.log("I see baby");
    if(baby.sleep)
    {
    var babySleepImage=document.getElementById("gamescreen");
    babySleepImage.style.backgroundImage="url('background/sleepingBaby.jpeg')";
    var Message=document.getElementById("Message");
    Message.innerText="Aren't they angels when they sleep";
    }
    else
    {
    var babyCryImage=document.getElementById("gamescreen");
    babyCryImage.style.backgroundImage="url('background/cryingBaby.jpg')";
    var Message=document.getElementById("Message");
    Message.innerText="Better get him to sleep before he drives me insane!";
    }
}

//This function is to check for key press and only activated when game start
var checkKey=function(event){
    //console.log(event);
    if(gameStart)
    {    //start of movement logic
        if(event.keyCode===38)
            {
            // up key pressed
                player.yCoordinate--;
                if(boundaryCheck())
                {
    //                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
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

                    //console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
                }
                else
                {
                    player.yCoordinate++;
                    wallBump();
                    //console.log("bumped");
                }

            }


        else if(event.keyCode===40)
            {
                //down key pressed
                player.yCoordinate++;
                if(boundaryCheck()){
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

                    //console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
                }
                else
                {
                    player.yCoordinate--;
                    wallBump();
                }

            }
            else if (event.keyCode===39){
            //right key pressed
                player.xCoordinate++;
                if(boundaryCheck()){
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

                    //console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
                }
                else
                {
                    player.xCoordinate--;
                    wallBump();
                }

            }
            else if (event.keyCode===37)
            {
            //left key pressed
                        player.xCoordinate--;
                if(boundaryCheck()){
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

                    //console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
                }
                else
                {
                    player.xCoordinate++;
                    wallBump();
                }

            }
        //end of movement logic

        //start of picking up logic
            else if (event.keyCode===32)
            {

            //space key pressed to search
                switch (playAreaArray[player.yCoordinate][player.xCoordinate])
                {
                    case "m":
                    console.log("You have found some milk!");
                    var milkImage=document.querySelector(".milkContainer");
                    milkImage.style.backgroundImage="url('figure/milkBottle.png')";
                    var milkMessage=document.getElementById("Message");
                    milkMessage.innerText="Found the milk, lucky you.";
                    player.milk=true;
                    playAreaArray[player.yCoordinate][player.xCoordinate]="x";
                    break;
                    case "p":
                    console.log("You have found a peg");
                    var pegImage=document.querySelector(".pegContainer");
                    pegImage.style.backgroundImage="url('figure/peg.png')";
                    var pegMessage=document.getElementById("Message");
                    pegMessage.innerText="Found the peg, lucky you.";
                    player.peg=true;
                    playAreaArray[player.yCoordinate][player.xCoordinate]="x";
                    break
                    case "x":
                    console.log("You groped in the dark and found nothing");
                    var darkMessage=document.getElementById("Message");
                    darkMessage.innerText="I know you love dancing in the dark, but come on";
                    break;
                    case "bed":
                    console.log("You can feel your comfy bed in the dark");
                    var bedMessage=document.getElementById("Message");
                    bedMessage.innerText="The bed summons you but you know you need to do something before a disaster happens";
                    break;
                    case "baby":
                    console.log("The little terror");
                    var babyMessage=document.getElementById("Message");
                    babyMessage.innerText="The little rascal";
                    break;
                    case "l":
                    console.log("You feel the lego. Must remember to clear...");
                    var legoMessage=document.getElementById("Message");
                    legoMessage.innerText="I did not know you have fetish in stepping on lego... ";
                    break;
                    case "t":
                    console.log("the table feels like some monster in the dark...");
                    var tableMessage=document.getElementById("Message");
                    tableMessage.innerText="The table feels like it moved...";
                    break;
                }

            }
            //end of pick up logic

            //start of feed logic
        else if (event.keyCode===70)
        {
        // F key to feed
        //Logic to feed the kiddo
        if(playAreaArray[player.yCoordinate][player.xCoordinate]==="baby")
            {
                //console.log("check milk")
                if(baby.fed)
                    {
                     console.log("Dude you fed the kid. Come on. Wake up");
                    var fedMessage=document.getElementById("Message");
                    fedMessage.innerText="Dude you fed the kid. Come on. Wake up!";
                    }
                else{
                if(player.milk)
                        {
                 console.log("you have fed the kid. Good job");

                 baby.fed=true;
            player.milk=false;
                var milkBottleUsed=document.querySelector(".milkContainer");
                milkBottleUsed.style.backgroundImage="url('')";

             if(baby.fed&&baby.diaper)
                          {
             baby.sleep=true;
               console.log("sleeping like a baby")
               var fedMessage2=document.getElementById("Message");
                    fedMessage2.innerText="Sleeping like a baby! Time for me to return";
                    var sleepingBaby=document.getElementById("gamescreen");
                    sleepingBaby.style.backgroundImage="url('/background/sleepingBaby.jpeg')";
                                    }
                    else{
                        var fedMessage3=document.getElementById("Message");
                    fedMessage3.innerText="There is something missing in my life";

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
                    var fedMessage4=document.getElementById("Message");
                    fedMessage4.innerText="Dude, who are you feeding? Ghost?";
        }

        }
        //end of feed logic

        //start of diaper logic
        else if (event.keyCode===67)
        {
        //C key to Change diapers
        //Logic to change the diapers
        if(playAreaArray[player.yCoordinate][player.xCoordinate]==="baby")
            {
                //console.log("check milk")
                if(baby.diaper)
                    {
                        console.log("Dude you sure like to smell his poop huh");
                    var diaperMessage=document.getElementById("Message");
                    diaperMessage.innerText="Dude you sure like to smell his poop huh.";
                    }
                else{
                        if(player.peg)
                            {
                                console.log("you have change the kid's diapers. Good job");
                    var pegUsed=document.querySelector(".pegContainer");
                pegUsed.style.backgroundImage="url('')";

                                baby.diaper=true;
                                player.peg=false;
                                if(baby.fed&&baby.diaper)
                                    {
                                        baby.sleep=true;
                                        console.log("sleeping like a baby");
                            var diaperMessage2=document.getElementById("Message");
                    diaperMessage2.innerText="Sleeping like a baby! Time for me to return";
                    var sleepingBaby=document.getElementById("gamescreen");
                    sleepingBaby.style.backgroundImage="url('background/sleepingBaby.jpeg')";
                                    }
                                    else{
                                        var diaperMessage3=document.getElementById("Message");
                    diaperMessage3.innerText="He is still crying. What did I miss?";
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
            var diaperMessage4=document.getElementById("Message");
                    diaperMessage4.innerText="Wow, you really know how to play with floating diapers";
        }

        }
        //end of diaper logic



        else if(event.keyCode===83)
        {
        //S Key to sleep
            if(playAreaArray[player.yCoordinate][player.xCoordinate]==="bed")
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
        }}
    }

// Game interaction functions end here


document.addEventListener("keyup",checkKey);
//toggle messages
var toggleInstruction=function(event){
//console.log("toggle");
toggleInstructionSwitch=!toggleInstructionSwitch;
var toggleInstruction=document.querySelector(".instruction");
if(toggleInstructionSwitch){
toggleInstruction.style.display="block";}
else{
    toggleInstruction.style.display="none";
}
}

var toggleControl=function(event){
//console.log("toggle");
toggleControlSwitch=!toggleControlSwitch;

var toggleControl=document.querySelector(".controls");
if(toggleControlSwitch){
toggleControl.style.display="block";}
else{
    toggleControl.style.display="none";
}
}
//building of the game screen
var gameScreen=function(event){
    console.log("test");
    gameStart=true;
    document.body.innerHTML="";
    var gameContainer=document.createElement("div");
    gameContainer.classList.add("gamecontainer");
    document.body.appendChild(gameContainer);

    var gameTitle=document.createElement("h2");
    gameTitle.innerText="Baby Dungeon";
    gameContainer.appendChild(gameTitle);

    var gameScreen=document.createElement("div");
    gameScreen.classList.add("gamescreen");
    gameScreen.setAttribute("id","gamescreen");
    gameContainer.appendChild(gameScreen);

    var gameMessageDiv=document.createElement("div");
    gameMessageDiv.classList.add("GameMessageDiv");
    gameContainer.appendChild(gameMessageDiv);

    var gameMessage=document.createElement("h3");
    gameMessage.setAttribute("id", "Message");
    gameMessage.innerText="Let's stop the baby from crying. Wonder who turned out the lights";
    gameMessageDiv.appendChild(gameMessage);

    var panel=document.createElement("div");
    panel.classList.add("panel");
    gameContainer.appendChild(panel);

    var milkContainer=document.createElement("div");
    milkContainer.classList.add("milkContainer");
    panel.appendChild(milkContainer);


    var pegContainer=document.createElement("div");
    pegContainer.classList.add("pegContainer");
    panel.appendChild(pegContainer);

    var staminaGuage=document.createElement("div");
    staminaGuage.classList.add("staminaGauge");
    gameContainer.appendChild(staminaGuage);


    var stamina=document.createElement("div");
    stamina.classList.add("stamina");
    staminaGuage.appendChild(stamina);

    var staminaText=document.createElement("p");
    staminaText.setAttribute("id","staminaCount");
    staminaText.innerText="Stamina: 100";
    stamina.appendChild(staminaText);

}


//title Screen
var initialScreen=function(){

    gameStart=false;
        document.body.innerHTML="";
    var startBox=document.createElement("div");
    startBox.classList.add("startBox");
    document.body.appendChild(startBox);

    var header= document.createElement("div");
    header.classList.add("header");
    startBox.appendChild(header);
    var title=document.createElement("h1");
    title.classList.add("StartScreenText");
    title.innerText="Baby Dungeon";
    header.appendChild(title);

    var imageBox=document.createElement("div");
    imageBox.classList.add("imageBox");
    startBox.appendChild(imageBox);

    var imageToAdd=document.createElement("img");
    imageToAdd.setAttribute("src","figure/sleepMan.jpg")
    imageToAdd.setAttribute("height", "200px");
    imageToAdd.setAttribute("width","200px");

    imageBox.appendChild(imageToAdd);

    var instructionSubHeading= document.createElement("h2");
    instructionSubHeading.setAttribute("id","clickInstruction");
    instructionSubHeading.innerText="Instruction(Click to show)";
    startBox.appendChild(instructionSubHeading);

    var instructionDiv=document.createElement("div");
    instructionDiv.classList.add("instruction");
    startBox.appendChild(instructionDiv);

    var instructionPara=document.createElement("p");
    instructionPara.innerHTML="You are a daddy who is woken up in the middle of the night. <br> You hear your kid crying.<br> You need to move in a dark room and find his milk bottle and a peg (you know how stinky a diapers can get). <br> Once done, look for him, feed him, change his diaper and go back to bed.<br>";
    instructionDiv.appendChild(instructionPara);

    var controlHeading=document.createElement("h2");
    controlHeading.setAttribute("id","clickControl");
    controlHeading.innerText="Controls(Click to show)";
    startBox.appendChild(controlHeading);

    var controlDiv=document.createElement("div");
    controlDiv.classList.add("controls");
    startBox.appendChild(controlDiv);

    var controlPara=document.createElement('p');
    controlPara.innerHTML="Arrow keys to move. <br>Space to search.<br> F to feed <br> C to change diapers.<br> S to go back to sleep";
    controlDiv.appendChild(controlPara);

    var buttonDiv=document.createElement('div');
    buttonDiv.classList.add("button");
    startBox.appendChild(buttonDiv);

    var button=document.createElement("button");
    button.setAttribute("id","Start");
    button.innerText="Start";
    buttonDiv.appendChild(button);

    var instructionToggle=document.getElementById("clickInstruction");
    instructionToggle.addEventListener("click",toggleInstruction);

    var controlToggle=document.getElementById("clickControl");
    controlToggle.addEventListener("click",toggleControl);

    var buttonStart=document.getElementById("Start");
    buttonStart.addEventListener("click",gameScreen);


}

//Window load new html
//Remember to load after creating the game screen

window.onload=function()
{
    console.log("load up");
    initialScreen();


}