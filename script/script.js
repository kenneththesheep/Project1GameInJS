console.log("soft check");
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

//lose state
var eatenAlive=function(){
    console.log("You have been eaten alive. Zombie babies!");
}

var nuclearBomb=function(){
    console.log("A nuclear bomb has exploded in front of you");
}
//This function is to check for key press
var checkKey=function(event){
    //console.log(event);

    if(event.keyCode===38)
        {
        // up key pressed
            player.yCoordinate--;
            if(boundaryCheck()){
//                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
            }
            else
            {
                player.yCoordinate++;
                console.log("bumped");
            }

        }
        else if(event.keyCode===40)
        {
            //down key pressed
            player.yCoordinate++;
            if(boundaryCheck()){
//                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
            }
            else
            {
                player.yCoordinate--;
                console.log("bumped");
            }

        }
        else if (event.keyCode===39){
        //right key pressed
            player.xCoordinate++;
            if(boundaryCheck()){
//                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
            }
            else
            {
                player.xCoordinate--;
                console.log("bumped");
            }

        }
        else if (event.keyCode===37)
        {
        //left key pressed
                    player.xCoordinate--;
            if(boundaryCheck()){
//                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:" +player.xCoordinate);
                console.log(playAreaArray[player.yCoordinate][player.xCoordinate]);
            }
            else
            {
                player.xCoordinate++;
                console.log("bumped");
            }

        }
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
        else if(event.keyCode===83)
        {
        //S Key to sleep

        }
    }



document.addEventListener("keyup",checkKey);