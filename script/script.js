//console.log("soft check");
//To prevent the game to start yet
var gameStart=false;


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

//win state
var winCase=function(){
    console.log("You have won!")
}


//lose state
var eatenAlive=function(){
    console.log("You have been eaten alive. Zombie babies!");
}

var nuclearBomb=function(){
    console.log("A nuclear bomb has exploded in front of you");
}

var womanFury=function(){
    console.log("Hell hath no fury like a woman scorned");
}

var noStamina=function(){
    console.log("You have fainted in your home. Goodness know how but ya");
}

// functions if bump wall, step on lego, bump Table

var wallBump=function(){
    console.log("Bump Wall");
}

var legoStep=function(){
    console.log("lego ouch!");
    player.stamina-=5;
    if(player.stamina<=0)
    {
        noStamina();
    }
}

var tableBump=function(){
    console.log("table ouch");
    player.stamina-=10;
    if(player.stamina<=0)
    {
                noStamina();
    }
}

var darkRoom=function(){
    console.log("dark room");
}

var seeBed=function(){
    console.log("I see bed");
}

var seeBaby=function(){
    console.log("I see baby");
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
                    player.milk=true;
                    playAreaArray[player.yCoordinate][player.xCoordinate]="x";
                    break;
                    case "p":
                    console.log("You have found a peg");
                    player.peg=true;
                    playAreaArray[player.yCoordinate][player.xCoordinate]="x";
                    break
                    case "x":
                    console.log("You groped in the dark and found nothing");
                    break;
                    case "bed":
                    console.log("You can feel your comfy bed in the dark");
                    break;
                    case "baby":
                    console.log("The little terror");
                    break;
                    case "l":
                    console.log("You feel the lego. Must remember to clear...");
                    break;
                    case "t":
                    console.log("the table feels like some monster in the dark...");
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
                        }
                    else{
                            if(player.milk)
                                {
                                    console.log("you have fed the kid. Good job");
                                    baby.fed=true;
                                    player.milk=false;
                                        if(baby.fed&&baby.diaper)
                                        {
                                            baby.sleep=true;
                                            console.log("sleeping like a baby")
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
                        }
                    else{
                            if(player.peg)
                                {
                                    console.log("you have change the kid's diapers. Good job");
                                    baby.diaper=true;
                                    player.peg=false;
                                    if(baby.fed&&baby.diaper)
                                        {
                                            baby.sleep=true;
                                            console.log("sleeping like a baby")
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
                }
            }}
    }

// Game interaction functions end here


document.addEventListener("keyup",checkKey);


//Window load new html
window.onload=function()
{
    console.log("load up");
    document.body.innerHTML="";
    var startBox=document.createElement("div");
    startBox.classList.add("startBox");
    document.body.appendChild(startBox);

    var header= document.createElement("div");
    header.classList.add("header");
    startBox.appendChild(header);
    var title=document.createElement("h1");
    title.classList.add("StartScreenText");
    title.innerText="Baby Game";
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


}