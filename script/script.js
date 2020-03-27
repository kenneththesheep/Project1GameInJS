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


//This function is to check for key press
checkKey=function(event){
    //console.log(event);

    if(event.keyCode===38)
        {
        // up key pressed

        }
        else if(event.keyCode===40)
        {
            //down key pressed

        }
        else if (event.keyCode===39){
        //right key pressed

        }
        else if (event.keyCode===37)
        {
        //left key pressed

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