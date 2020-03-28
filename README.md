# Project1GameInJS

~ 👶Baby Dungeon Manual👶~

--- Welcome Speech---
<br>I see you have interest in reading a portion of the game where most people will either skip or use it as a bedtime story. No matter whether you have accidentally stumble into this portion or are really geeky, we welcome you

---Storyline---
<br>You are a daddy who is woken up in the middle of the night.🌙
<br>You hear your kid crying. 😭
<br>You need to move in a dark room and find his milk bottle and a peg (you know how stinky a diapers can get). 
Once done, look for him, feed him, change his diaper and go back to bed.

---Controls---
<br>Arrow keys to move around the map⬆⬇⬅➡
<br>Space to search the area🔍
<br>F to feed to kid 🍼
<br>C to change the diapers💩
<br>M to toggle map🗺
<br>S to sleep on bed🛏

---Game play---
<br> You are to move around the room, search for the peg and milk bottle. You will know when the inventory at the bottom of screen displays the items.
<br>Avoid the lego blocks and table. This will deplete your stamina.
<br>You have 100 stamina. Ensure not to drop the stamina below 0 or you will faint and restart from the beginning
<br> Your stamina will automatically deplete every 2 seconds. :smiling_imp:

---How to win---
<br>Make sure everyone is happy, including yourself
<br>Ensure the baby's diaper is changed and he is fed.
<br>When you are sure you have done the following

---How to loose---
<br>There are a few ways
<br>You lose all your stamina before completing the task. 💀
<br>You try to feed the baby without the milk bottle. :male_zombie:
<br> You change his diapers without a peg. 💣
<br> You try to sleep before making the baby sleep. ☠


---Technologies used---

<br>Nothing too fanciful. We have used HTML/CSS and Javascript to code. 

<br>Inkscape was used to create some images.

<br>Credits to fonts.googleapis.com for allowing us to use their fonts and the different websites for the images which was used. 

---Unsolved Issues---

<br> We are working on the interface to make it look a bit better.
<br> It is still vanilla version so only one level is available. Look out for more.

---Tips to using my code---
<ul>
<li> If you decide to use my code for whatever reasons, I am cool with it. But you must make sure you know what each code is doing or else it will cause more chaos then starting from scratch.</li>
<li>When you copy, please be careful with the syntax.</li>
<li> Make sure the file directory of the images is correct or you will need to modify the DOM.</li>
<li>Naming convention is crucial (especially the images from the map) as it will result in no image appearing if you try to modify.</li>
<li>Please study the css and js files especially. When you modify the DOM in the js files, make sure do the corresponding action for css file.</li>
<li>If you have any comments or questions, please contact me. I will be glad to connect with you. Will put my linkedIn here in the future.</li>
</ul>
---Overview Technical Approach---
<ol>
<li>I set up three files(html/js/css) to link to each other</li>
<li>I decide to go ahead to check and collect all the keypress code that I will use for my game.</li>
<li>I set up a 2 by 2 dummy array to test out the movement and to ensure I can go through different elements in the array and not run out of the boundary.</li>
<li>I created a 2 by 2 array(6X6) which will form the basis of the map.</li>
<li>I inserted different elements which will placed in the array (bed, baby, netural ground(X), lego(l), table (t),peg(p) and milk(m)).</li>
<li>I created a player object which consist of the stamina, name and xycoordinates</li>
<li>I created a baby object which consist of three parameters 1)fed? 2) daipered? and 3) slept. All are boolean. 3) will only be true if 1) and 2) are true.
<li>For each arrow key, it is to test for 1) boundary, 2) neutral ground, 3)lego or 4) table. Each will link to the respective function</li>
<li>Space is to check for all elements. The more important is the peg and milk.</li>
<li>With that out of the way, I created the html and css for the front page. I split my screen into two. One for html and one for js so it is easier to see and put it the desired class and id.</li>
<li>Once I had a start page, I moved everything to js under Window(load) which will refactor to the initial page where the page will load up</li>
<li>On the initial page, I have a button which will start the game. To ensure that the keyboard is not activated during the start page, I left a trigger to ensure it is locked still the start button is pressed and toggle the lock</li>
<li>Following which, I created a game page on html and css. It will consist of a screen to show what the user is seeing, a message which correspond to every action. Before which, I had to disable the js so it didn't intervene.
</li>
<li>I tested out to ensure the image appear as desired in the spaces</li>
<li>Once that is done, I moved the html into js</li>
<li>I ensure all the function will relate to the respective game screen</li>
<li>I also ensure the milk and peg appears when being picked up</li>
<li>Following that, it is to work on the win and lose conditions. </li>
<li>Once that is done, I decide to place a setTimeout to ensure that once the user wins or lose, it goes back to initial screen and also clear the setTimeout when that is done.</li>
<li>Next I worked on the setInterval to ensure that the stamina drops continously when the game start and update it on the screen</li>
<li>I decided to add a map mode since this is rpg (inspired by Super Metroid).</li>
<li> I took the liberty and drew on Inkscape how the map will look like</li>
<li>I link the map image with the x and y coordinate so it will look neater
</li>
<li>Will continue to think about other add on from here</li>
</ol>