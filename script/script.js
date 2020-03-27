console.log("soft check");
//player object
var player=
{
    name:"",
    xCoordinate:0,
    yCoordinate:0
};


//play area

var testAreaArray=
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]

];


//Boundary check to ensure not bumped into the wall
var boundaryCheck=function(){
    if((player.yCoordinate<0) || (player.yCoordinate>=testAreaArray.length) ||player.xCoordinate<0||(player.xCoordinate>=testAreaArray[player.yCoordinate].length))
    {
        return false;
    }
    else
    {
        return true;
    }
}


//This function is to check for key press
var checkKey=function(event){
    //console.log(event);

    if(event.keyCode===38)
        {
        // up key pressed
            player.yCoordinate--;
            if(boundaryCheck()){
                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(testAreaArray[player.yCoordinate][player.xCoordinate]);
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
                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(testAreaArray[player.yCoordinate][player.xCoordinate]);
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
                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:"+ player.xCoordinate);
                console.log(testAreaArray[player.yCoordinate][player.xCoordinate]);
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
                console.log("coordinates y:"+player.yCoordinate+",Coordinates x:" +player.xCoordinate);
                console.log(testAreaArray[player.yCoordinate][player.xCoordinate]);
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

        }
        else if (event.keyCode===70)
        {
        // F key to feed

        }
        else if (event.keyCode===67)
        {
        //C key to Change diapers

        }
        else if(event.keyCode===83)
        {
        //S Key to sleep

        }
    }



document.addEventListener("keyup",checkKey);