// ==UserScript==
// @name     Free4talk Dictator
// @include  https://www.free4talk.com/room/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://code.jquery.com/jquery-3.4.1.min.js
// @version  14.0
// @grant    GM_addStyle
// ==/UserScript==
//--- The @grant directive is used to restore the proper sandbox.
/* globals jQuery, $, waitForKeyElements */
$("body").append ( `
<div id="chat-head">
  <img class ="ImageHead" src="https://lh3.googleusercontent.com/a/AGNmyxZix5B83X9llFjKEknMmkmCQ5uiGZiOBTSSz-X4rw">
</div>

<script>
var chatHead = document.getElementById("chat-head");
var isDragging = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

document.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
document.addEventListener("mousemove", drag);
document.addEventListener("click", Open);

function Open(e) {
  if (e.target === chatHead && !isDragging) {
   console.log("clicked")
  }
}

function dragStart(e) {
  if (e.target === chatHead) {
    e.preventDefault();
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    isDragging = true;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, chatHead);
  }
}

function dragEnd(e) {
  isDragging = false;
  var screenWidth = window.innerWidth;
  var chatHeadWidth = chatHead.offsetWidth;
  var chatHeadX = chatHead.getBoundingClientRect().x;
  var newX;

  if (chatHeadX + chatHeadWidth / 2 < screenWidth / 2) {
    newX = 0;
  } else {
    newX = screenWidth - chatHeadWidth;
  }

  currentX = newX;
  currentY = yOffset;
  setTranslate(newX, currentY, chatHead);
}



function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
</script>


<div id="customMenu">
<div id="Block-container-id" class="block-container">

</div>
<button class="KickButtonClass" id="KickButton" onclick="kickOut()">KICK</button>
<button class="blockButtonClass" id="BlackListAddButton"onclick="ShortBL()">add to blacklist</button>
</div>

<div class="containerClients">

       <p id ="TopicSet" class ="RoomSettingsX">Topic: Join us to practice</p>
      <p id ="LanguageSet" class ="RoomSettings">Language :English</p>
            <p id ="LevelSet" class ="RoomSettings">Level: Upper Advanced</p>
</div>

<div id="ShowRunner" class="wrapping">
<div id="first">
</div>
<div id="second">
</div>
<div id="third">
</div>
<div class="Online-Friends">
<div class="Online-container">
<img src="https://www.free4talk.com/static/media/logo.409a5cde.svg"/>
</div>
<div class="Online-Name-Container">
<p id="Online-Joiner" >Free4talk</p>
</div>
<div class="Is-Online">
<p>is online</p>
</div>
</div>
</div>
<div id="UserInfo" role="document" class="ant-modal UserInfoClass" style="width: 520px;"><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div><div class="ant-modal-content"><button id="UserInfoClose" type="button" aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span></button><div class="ant-modal-body"><div class="sc-TOsTZ ctcxOx"><div class="ant-row-flex ant-row-flex-space-around"><div class="ant-col"><span class="ant-avatar  ant-avatar-square ant-avatar-image  " style="width: 192px; height: 192px; line-height: 192px; font-size: 18px;"><img id="InfoImg" src="https://wiregrassatstoneoak.com/views/site/images/global/icons/loading.gif" referrerpolicy="no-referrer"></span></div><div class="ant-col" style="flex: 1 1 0%;"><div class="ant-row-flex ant-row-flex-middle" style="flex-direction: column; padding: 14px 20px 0px; height: 100%; min-width: 274px;"><div class="ant-col" style="flex: 1 1 0%;"><div id="ThisUserID" style="color: rgb(204, 204, 204); font-size: 0.8em;"></div><div class="ant-row-flex gutter8" style="margin-left: -4px; margin-right: -4px;"><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FollowersCount" style="color: rgb(204, 204, 204); font-size: 0.8em;"> </div></div><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FriendsCount" style="color: rgb(204, 204, 204); font-size: 0.8em;"> </div></div><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FollowingCount" style="color: rgb(204, 204, 204); font-size: 0.8em;"> </div></div></div><div id="UserNameGet" style="font-size: 1.5em;">Loading user.. Please wait</div></div><div class="ant-col" style="margin-top: 20px;"><div class="ant-row-flex gutter4" style="margin-left: -2px; margin-right: -2px;"><div class="ant-col" style="padding-left: 2px; padding-right: 2px;"></div><div class="ant-col" style="padding-left: 2px; padding-right: 2px;"></div></div></div></div></div></div></div></div><div class="ant-modal-footer"><div><button type="button" class="ant-btn" style="display: none;"><span>Cancel</span></button><button id="OKusers" type="button" class="ant-btn ant-btn-primary"><span>Close</span></button></div></div></div><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div></div>
<button id="stops" class="ant-btn ant-btn-sm" >Stop</button>
<div id="RecordingDiv" class="containerRec">
<video  id="videoElement" class="output zzz" autoplay >
</video>
<img id="NoSignal" class="NoSignal" src="https://i.pinimg.com/originals/5a/93/4e/5a934e84f67d2a61a118ec95b1d6cb74.gif" ondragstart="return false;" oncontextmenu="return false;">
<button id ="FinishHim" class="aaa stop-btn"  >STOP</button>
<button id ="GoForIt" class="nnn" >START</button>
<button id ="PlayBack" class="ppp" ></button>
<button id="CloseRecordDiv" class=" close-btn">CLOSE</button>
<input type="checkbox" id="audioToggle" style="display: none;" checked />
<input type="checkbox" id="micAudioToggle" style="display: none;" checked />
<a href="#" download="output.mp4" id="downloadLink" class= "ooo">DOWNLOAD</a>
</div>
<p id="Notification"  class="Not-Att"></p>
<p id="display-area"  class="Welcome-msg"></p>
<div class="ant-popover ant-popover-placement-top updateClass"><div class="ant-popover-content"><div class="ant-popover-arrow"></div><div class="ant-popover-inner" role="tooltip"><div><div class="ant-popover-inner-content "><div class="ant-popover-message"><i aria-label="icon: exclamation-circle" class="anticon anticon-exclamation-circle"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i><div class="ant-popover-message-title"><div  style="max-width: 320px;">There is a new update. Do you want to update now?</div></div></div><div class="ant-popover-buttons"><button type="button" id="cancelUpdate" class="ant-btn ant-btn-sm"><span>No</span></button><button type="button" id="Update" class="ant-btn ant-btn-primary ant-btn-sm"><span>Update</span></button></div></div></div></div></div></div></div>
<div class="ant-popover ant-popover-placement-top ConfirmationClass"><div class="ant-popover-content"><div class="ant-popover-arrow"></div><div class="ant-popover-inner" role="tooltip"><div><div class="ant-popover-inner-content "><div class="ant-popover-message"><i aria-label="icon: exclamation-circle" class="anticon anticon-exclamation-circle"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i><div class="ant-popover-message-title"><div id="Confirm-name" style="max-width: 320px;">ADAM was trying to send messages, however, they got deleted. Do you want to see them?</div></div></div><div class="ant-popover-buttons"><button type="button" id="cancel" class="ant-btn ant-btn-sm"><span>Cancel</span></button><button type="button" id="ShowIt" class="ant-btn ant-btn-primary ant-btn-sm"><span>Show me</span></button></div></div></div></div></div></div></div>
<div role="document" class="ant-modal MessagesClass" style="width: 500px;"><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div><div class="ant-modal-content"><button id="CloseDialogue" type="button" aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span></button><div class="ant-modal-body"><h4 id="PreMessages" class="ant-typography"></h4><h5 id="MsgsCounNum" class="ant-typography ant-typography-warning"></h5><div id="XXXX" class="ant-typography"></div></div></div><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div></div>
<div id="Setting-div" class="settings" style="position: absolute; left: 30%; width: 500px; height: 500px; background-color: black; transition: top 0.3s; border-radius: 10px; border: 2px solid white;">

  <button id="settingsclose" style="position: absolute; top: 0; right: 0;">X</button>
  <h1 style="text-align: center;">Free4talk Settings</h1>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
    <div class="checkbox-div">
      <label style="display: block; text-align: center;">
        <input id="check0" type="checkbox" onclick="SaveSettings();">
        Sound effects
      </label>
    </div>
    <div class="checkbox-div">
      <label style="display: block; text-align: center;">
        <input id="check1" type="checkbox"onclick="SaveSettings();">
        Silent mute
      </label>
    </div>
  </div>
</div>



<div id="Blacklist-div" class="BlackListDivClass" style="position: absolute; left: 30%; width: 500px; height: 600px; background-color: black; transition: top 0.3s; border-radius: 10px; border: 2px solid white;">
  <button id="BlackListclose" style="position: absolute; top: 0; right: 0;">X</button>
  <h1 style="text-align: center; color: black;">Blacklist manager</h1>
<h4 style="text-align: center; color: grey; font-style: italic;">Add a user to  blacklist by clicking on them</h4>

    <div id="ContainerOfUsers" style="text-align: center; margin: 0 auto; width: 100%;" >
      </div>
    <h3 style="text-align: center; color: black;">Blocked users</h3>
    <h4 style="text-align: center; color: grey; font-style: italic;">Take a user off the blacklist by choosing them from the list below</h4>

    <div id="ListOfBlockedUsers" style="text-align: center; margin: 0 auto; width: 100%;" >
      <select id="dropdownBlocked">
    <option value="">Select a user to unblock</option>
    <option value="Hasso D Rame">Hasso D Rame</option>
    <option value="Zool King">Zool King</option>


  </select>
      <h4 id="BlackListRemovalText" style="text-align: center; color: green; opacity: 0; transition: opacity 1s;">­</h4>
<button id="YesBtn" class="yes">Yes</button>
<button id="NoBtn" class="no">No</button>

      </div>
  </div>


<div id ="ButtonsContainerID" class ="ButtonsContainerClass">
<button id ="RecordButton" class="ant-btn ant-btn-sm RecordButtonStyle" >🔴</button>
<button id="Loader" class="ant-btn ant-btn-sm Refresh" onclick="ArrayNames(),OneTime()">Start</button>
<button id="clear" class="ant-btn ant-btn-sm" onclick="clean()">Hide</button>
<button id="BlockIcon" type="button" class="ant-btn ant-dropdown-trigger ant-btn-primary ant-btn-circle ant-btn-icon-only ant-btn-background-ghost BlockPos" style="border: none; visibility: visible; top: 4px;">
  ❌
</button>
<button id="SettingsIcon" type="button" class=" ant-dropdown-trigger ant-btn-primary ant-btn-circle ant-btn-icon-only ant-btn-background-ghost SettingsPos" style="border: none; visibility: visible;"><i aria-label="icon: setting" class="anticon anticon-setting"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg></i></button>
</div>

<h4 id="Farmer-Text-ID" class="Farmer-Text" ></h4>
<div class="Unfollow-detector">
<div class="Unfollow-container">
<img id="Unfollow-src" src="https://lh3.googleusercontent.com/a/AEdFTp6QtC1aVIhh0r9SdtZK-HgLrEB4X_PCv0T3cVGQhQ"/>
</div>
<div class="unfollow-Name-Container">
<p id="unfollow-name" >JustN Learning Arabic just unfollowed you</p>
</div>
</div>

<script>
/////////////////////
var current = "14.0";
/////////////////////
// What's new
// ADDED A NEW CUSTOM KICK MESSAGE
const keepup = setInterval(up2date, 60000);
const keeepup = setTimeout(up2date, 60000);
function up2date() {
 let link = '';
link += 'https://f4t-dictator.000webhostapp.com/F4t-Dictator-Updater.user.js';
link += '?t=' + Date.now();
  fetch(link, {cache: "no-cache"})
  .then(res => res.text())
  .then(text => {
    var version =  text.slice(247,250);
    if (current < version){
      ////const audio = new Audio("https://proxy.notificationsounds.com/notification-sounds/elegant-notification-sound/download/file-sounds-1233-elegant.mp3");
      ////audio.play();
      clearInterval(keepup);
      var cols = document.getElementsByClassName('updateClass');
      for(i=0; i<cols.length; i++) {
        cols[i].style.top = '15px';
      }
    }
  })
  .catch(err => console.log(err));
}
</script>


<script>
document.getElementById("clear").style.visibility = "hidden";
document.getElementById("stops").style.visibility = "hidden";
document.getElementById("Loader").disabled = false;
const IDINIT = setTimeout(IDGRAB, 500);
function IDGRAB() {
IDARR = [];
var RoomLink = window.location.href.slice(26, 36);
let xhr = new XMLHttpRequest();
xhr.open("POST", "https://free4talk-sync.herokuapp.com/sync/get/free4talk/groups/?a=sync-get-free4talk-groups");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
var [first, second] = xhr.responseText.split(RoomLink);
var last3 = first.slice(-200)
var [third, fourth] = last3.split('","platform"');
let ID = third.slice(-24)
IDARR.push(ID);
document.getElementById("Loader").innerText = "Start";
var yalla = document.getElementById("Loader");
yalla.click();
        }
    };
    let doto = ('{"body":{}}');
    xhr.send(doto);
}
let clicked = false;

function ArrayNames() {
const ImagesDiv = document.getElementById("first");
const ContainerDiv = document.getElementById("second");
const MuteDiv = document.getElementById("third");
const Loader = document.getElementById("Loader");
Loader.addEventListener("click", WholeThing);
const Recheck = setInterval(WholeThing, 2000);
const myTimeout = setTimeout(WholeThing, 1);
function WholeThing() {
document.getElementById("Loader").disabled = true;
document.getElementById("Loader").style.visibility = "hidden";
var div1 = document.getElementById('first');
var div2 = document.getElementById('second');
var div3 = document.getElementById('third');
while(div1.firstChild) {
div1.removeChild(div1.firstChild);}
while(div2.firstChild) {
div2.removeChild(div2.firstChild);}
while(div3.firstChild) {
div3.removeChild(div3.firstChild);}
if(document.getElementsByClassName('sc-iujRgT').length > 0) {
var FullDiv = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes;

for(let index = 0; index < FullDiv.length - 1; index++) {
var UsernameClass = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[2].childNodes[0];
var Avatar = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[1].childNodes[0];
const clone = Avatar.cloneNode(true);
const MyPhotosdiv = document.createElement("div");
MyPhotosdiv.id = UsernameClass.innerHTML;
MyPhotosdiv.className = "imgbox";
MyPhotosdiv.setAttribute("onclick", "select(this)");
ImagesDiv.appendChild(MyPhotosdiv);
MyPhotosdiv.appendChild(clone);
const MyBtnBoxdiv = document.createElement("div");
MyBtnBoxdiv.id = "Btnbox" + index;
MyBtnBoxdiv.className = "Btnbox";
ContainerDiv.appendChild(MyBtnBoxdiv);
const MyButtons = document.createElement("button");
MyButtons.innerHTML = UsernameClass.innerHTML;
MyButtons.id = "user" + index;
MyButtons.className = "ant-btnY";
MyButtons.setAttribute("onclick", "Mute()");
MyButtons.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  customMenu.style.left = (event.pageX + 100) + 'px';
  customMenu.style.top = (event.pageY + 50) + 'px';
  customMenu.classList.add('show');
});
document.addEventListener('click', function(event) {
  customMenu.classList.remove('show');
  customMenu.style.top = '10000px';
  customMenu.style.left = '10000px';
});

MyBtnBoxdiv.appendChild(MyButtons);


const MyBtnBoxdivx = document.createElement("div");
MyBtnBoxdivx.id = "Btnbox" + index;
MyBtnBoxdivx.className = "Btnbox";
MuteDiv.appendChild(MyBtnBoxdivx);

const MyButtonsx = document.createElement("button");
MyButtonsx.innerHTML = "🗑️";
MyButtonsx.id = UsernameClass.innerHTML;
MyButtonsx.className = "ant-mute";
MyButtonsx.setAttribute("onclick", "Delete(this)");

MyBtnBoxdivx.appendChild(MyButtonsx);


}

}}}

const interceptedMessages = [];
var Participants = [];
var MyPeerId = []
var roomIDHolder = []
FullNamesAndIDS = [];
var currentURL = window.location.href;
var urlParts = currentURL.split("/");
var roomIndex = urlParts.indexOf("room");
var roomID = urlParts[roomIndex + 1].substr(0, 5);
roomIDHolder.push(roomID)

let ws;
const webSocketHandler = {
  construct(target, args) {
    const webSocket = new target(...args);

    if (webSocket.url.includes("free4talk")) {
      const originalSend = webSocket.send;
      webSocket.send = function(data) {
        interceptedMessages.push({data});
if (data.includes("room:transporter:register")) {
MyPeerId.push({data});
  const jsonStr = MyPeerId[0].data.slice(2);
const json = JSON.parse(jsonStr);
const peerId = json[1].peerId;
MyPeerId = []
MyPeerId.push(peerId);

}
if (data.includes("blocked")) {
  const modifiedMessage = data.replace("blocked", "null");
  interceptedMessages.push({ data: modifiedMessage });
  originalSend.bind(this)(modifiedMessage);
}


        originalSend.bind(this)(data);
      };
      ws = webSocket;
    }

    return webSocket;
  }
};

window.WebSocket = new Proxy(window.WebSocket, webSocketHandler);

function listen(fn){
  fn = fn || console.log;
  let property = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "data");
  const data = property.get;

function lookAtMessage() {
  let socket = this.currentTarget instanceof window.WebSocket;
  if (!socket) {
    return data.call(this);
  }

  let msg = data.call(this);
  Object.defineProperty(this, "data", { value: msg } );

  if (msg.includes("muted")) {
    var checkbox = document.getElementById('Mute-Switch');
    if (checkbox) {
      if (checkbox.checked && ws) {
        msg = msg.replace(/"muted":true/g, '"muted":false')
                 .replace(/has muted/g, '❌ WAS UNABLE TO MUTE ❌');
        ws.send(msg);
      }
    }
  }

  if (msg.includes("participantMap")) {
Participants = []
Participants.push({msg});

  }
    if (msg.includes("friends:new:follower")) {
ShowFollower();

  }
if (msg.includes("messages:create")) {
  let chatIdStartIndex = msg.indexOf('"chatId":"') + 10;
  let chatIdEndIndex = msg.indexOf('"', chatIdStartIndex);
  var chatId = msg.substring(chatIdStartIndex, chatIdEndIndex);
  GetMessages()

  function GetMessages() {
let GetLastMessages = new XMLHttpRequest();
GetLastMessages.open("POST", "https://free4talk-messenger.herokuapp.com/messenger/get/last-messages/?a=messenger-get-last-messages&v=347-3&t=" +Date.now());
GetLastMessages.setRequestHeader("Accept", "application/json");
GetLastMessages.setRequestHeader("Content-Type", "application/json");
GetLastMessages.onreadystatechange = function() {
if (GetLastMessages.readyState === 4) {
var myObj = JSON.parse(GetLastMessages.responseText);
console.log(myObj.data.messages[0].lastMessage.fromId)
let content = myObj.data.messages[0].lastMessage.content;
let startIndex = content.indexOf('"text":"') + 8;
let endIndex = content.indexOf('"', startIndex);
let text = content.substring(startIndex, endIndex);
console.log(text);

    }
  }
  var data = JSON.parse(localStorage.getItem("user:token"));
  var payload = {
    "token": data.data,
    "body": {"chatIds": [chatId]}
  };
  GetLastMessages.send(JSON.stringify(payload));
}










}


  interceptedMessages.push({msg});
  return msg;
}


  property.get = lookAtMessage;

  Object.defineProperty(MessageEvent.prototype, "data", property);
}



listen();

let XHR_FOLLOWERS_REQUEST = new XMLHttpRequest();
function ShowFollower() {
  XHR_FOLLOWERS_REQUEST.open("POST", "https://free4talk-identity.herokuapp.com/identity/get/followers/?a=identity-get-followers");
  XHR_FOLLOWERS_REQUEST.setRequestHeader("Accept", "application/json");
  XHR_FOLLOWERS_REQUEST.setRequestHeader("Content-Type", "application/json");
  XHR_FOLLOWERS_REQUEST.onreadystatechange = function() {
    if (XHR_FOLLOWERS_REQUEST.readyState === 4) {
      var myObj = JSON.parse(XHR_FOLLOWERS_REQUEST.responseText);


  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  var parentDiv = document.querySelector('.react-container');
  var childDiv = document.createElement('div');
  childDiv.className = 'sc-gojNiO jknDzv';
  childDiv.innerHTML = '<div class="sc-cQFLBn jYGEuz message   verified FollowColor"><div class="user"><div class="avatar"><span class="ant-avatar  ant-avatar-square ant-avatar-image  "><img src=' + myObj.data.rows[0].avatar + ' referrerpolicy="no-referrer"></span></div><div class="name primary"><span>' + myObj.data.rows[0].name + '</span></div><div class="time"><span>' + formattedTime + '</span></div></div><div class="text"><div class="html"><p class = "TEXTFOLLOW">Just followed you</p></div><div class="fake-actions"></div></div></div>';
  parentDiv.appendChild(childDiv);
  var endDiv = document.querySelector('.end');
  parentDiv.appendChild(endDiv);
  audioplayN();
  childDiv.addEventListener('click', function() {
    console.log('clicked');
        var cols55 = document.getElementsByClassName('UserInfoClass');
    for(i = 0; i < cols55.length; i++) {
        cols55[i].style.top = '30%';
  }
  ShowUserInformations();
document.getElementById("InfoImg").src = "https://wiregrassatstoneoak.com/views/site/images/global/icons/loading.gif";
document.getElementById("ThisUserID").innerText = "";
document.getElementById("UserNameGet").innerText = "Loading User .. Please wait";
document.getElementById("FollowersCount").innerText = "";
document.getElementById("FriendsCount").innerText = "";
document.getElementById("FollowingCount").innerText = "";


document.getElementById("InfoImg").src = myObj.data.rows[0].avatar;
document.getElementById("ThisUserID").innerText = "ID: " + myObj.data.rows[0].id;
document.getElementById("UserNameGet").innerText = myObj.data.rows[0].name;
document.getElementById("FollowersCount").innerText = "Followers: " +myObj.data.rows[0].followers;
document.getElementById("FriendsCount").innerText = "Friends: " + myObj.data.rows[0].friends;
document.getElementById("FollowingCount").innerText = "Following: " + myObj.data.rows[0].following;
  });

  parentDiv.scrollTop = parentDiv.scrollHeight;
    }
  }
  var data = JSON.parse(localStorage.getItem("user:token"));
  var payload = {
    "token": data.data,
    "body": {
      "offset": 0,
      "limit": 1,
    }
  };
  XHR_FOLLOWERS_REQUEST.send(JSON.stringify(payload));
}

function audioplayN() {
  let audio = new Audio();
  audio.preload = "auto";
  audio.src = "https://f4t-dictator.000webhostapp.com/NewFollower.mp3";
  audio.oncanplaythrough = function() {
    audio.play();
  };
}


async function Delete(grabber) {
  let Participaants = ["room:refresh-participants", {rid: roomIDHolder[0], pid: MyPeerId[0] }];
  let DeliveriT = "42" + JSON.stringify(Participaants);
  ws.send(DeliveriT);

let BABA = grabber.id;
let name = BABA
function getParticipantIdByName(name) {
  var message = Participants[0].msg;
  var startIndex = message.indexOf('{');
  var endIndex = message.lastIndexOf('}') + 1;
  var jsonString = message.slice(startIndex, endIndex);
  var participantMap = JSON.parse(jsonString).participantMap;

  for (var pid in participantMap) {
    if (participantMap.hasOwnProperty(pid)) {
      var participant = participantMap[pid];
      if (participant.name === name) {
        return pid;
      }
    }
  }

  return null;
}

var participantName = name;
var participantId = getParticipantIdByName(participantName);


let UserToDelete = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "remove-messages" }];
let ExecuteCommand = "42" + JSON.stringify(UserToDelete);
ws.send(ExecuteCommand);
DeleteMessage()
}


let OwnerArray = [];
let OwnerBlock = [];

function checkForElement() {
  const element = document.querySelector('.sc-jzJRlG.depLok div');
  if (element) {
    const text = document.querySelector('.sc-jzJRlG.depLok div').childNodes[0].textContent;
    if (text.startsWith("Hi, ")) {
      OwnerArray.push(text.slice(4));
      setTimeout(checkForAllUsers, 500);
    }
  } else {
    setTimeout(checkForElement, 100);
  }
}

function checkForAllUsers() {
  var AllUsers = document.getElementsByClassName('sc-iujRgT giAagV')[0];
  if (AllUsers) {

    setTimeout(GetUserBlock, 5000);
  } else {
    setTimeout(checkForAllUsers, 500);
  }
}

function GetUserBlock() {
  var AllUsers = document.getElementsByClassName('sc-iujRgT giAagV')[0];
  var found = false;
  var divs = AllUsers.getElementsByClassName("name");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].textContent.includes(OwnerArray[0])) {
      if (OwnerBlock.length === 0) {
        OwnerBlock.push(divs[i].parentNode);
      }
      let userStatusDiv = OwnerBlock[0].querySelector('.user-status');
      if (userStatusDiv === null) {
        document.getElementById("display-area").innerText ="🛈 No Ownership";
        setTimeout(GetUserBlock, 2500);
      } else {
document.getElementById("display-area").innerText ="";

        setTimeout(GetUserBlock, 1000);
        decider();

      }
      found = true;
      break;
    }
  }
  if (!found) {
  }
}

checkForElement();
function isSimilarUsername(username, targetNames) {
  const distances = targetNames.map(targetName => {
    const targetNameWords = targetName.toLowerCase().split(' ');
    const usernameWords = username.toLowerCase().split(' ');
    let totalDistance = 0;
    for (const targetNameWord of targetNameWords) {
      let minDistance = Infinity;
      for (const usernameWord of usernameWords) {
        const distance = levenshteinDistance(targetNameWord, usernameWord);
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
      totalDistance += minDistance;
    }
    return totalDistance;
  });
  const maxDistances = targetNames.map(targetName => Math.floor(targetName.length / 3)); // allow up to 1/3 of the name length as distance
  return distances.some((distance, i) => distance <= maxDistances[i]);
}



function levenshteinDistance(s, t) {
  const m = s.length;
  const n = t.length;
  const d = [];
  s = s.toLowerCase(); // convert s to lowercase
  t = t.toLowerCase(); // convert t to lowercase
  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (s[i - 1] === t[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(
          d[i - 1][j] + 1, // deletion
          d[i][j - 1] + 1, // insertion
          d[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return d[m][n];
}

async function decider() {
const targetNames = ['hasso', 'rame', 'Prophet', 'kos', 'qahba', 'zobi', 'pussy', 'dick', 'nigger', 'bitch', 'cunt', 'faggot', 'retard', 'whore', 'tranny', 'chink', 'kike', 'zool', 'Meow'];

  const div = document.querySelector('.sc-iujRgT');
  if (div) {

    var FullDiv = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes;

    for (let index = 0; index < FullDiv.length - 1; index++) {
      var UsernameClass = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[2].childNodes[0];
      let username = UsernameClass.innerHTML;
      if (isSimilarUsername(username, targetNames)) {
  let Participaants = ["room:refresh-participants", {rid: roomIDHolder[0], pid: MyPeerId[0] }];
  let DeliveriT = "42" + JSON.stringify(Participaants);
  ws.send(DeliveriT);
  function getParticipantIdByName(name) {
  var message = Participants[0].msg;
  var startIndex = message.indexOf('{');
  var endIndex = message.lastIndexOf('}') + 1;
  var jsonString = message.slice(startIndex, endIndex);
  var participantMap = JSON.parse(jsonString).participantMap;

  for (var pid in participantMap) {
    if (participantMap.hasOwnProperty(pid)) {
      var participant = participantMap[pid];
      if (participant.name === name) {
        return pid;
      }
    }
  }

  return null;
}


var DeletionAnnounce = document.getElementById("Farmer-Text-ID");

var participantName = username;
var ReasonOfKcik = "You have been kicked out of this room because the owner/co-owners have blacklisted you from their rooms due to your inappropriate name or behavior. Go act dumb in another room."
var participantId = getParticipantIdByName(participantName);
let UserTokick = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "blocked","params":{"reason": ReasonOfKcik} }];
let ExecuteCommand0 = "42" + JSON.stringify(UserTokick);
ws.send(ExecuteCommand0);

let UserToDelete = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "remove-messages" }];
let ExecuteCommand1 = "42" + JSON.stringify(UserToDelete);
ws.send(ExecuteCommand1);

DeletionAnnounce.innerHTML = "⚠️ " + username + " has been kicked out.";
DeletionAnnounce.style.color = "red";
DeletionAnnounce.style.opacity = 1;
setTimeout(function() {
DeletionAnnounce.style.opacity = 0;
}, 10000);

}}}}

function select(ele) {
document.getElementById("InfoImg").src = "https://wiregrassatstoneoak.com/views/site/images/global/icons/loading.gif";
document.getElementById("ThisUserID").innerText = "";
document.getElementById("UserNameGet").innerText = "Loading User .. Please wait";
document.getElementById("FollowersCount").innerText = "";
document.getElementById("FriendsCount").innerText = "";
document.getElementById("FollowingCount").innerText = "";
ShowUserInformations();
    var cols55 = document.getElementsByClassName('UserInfoClass');
    for(i = 0; i < cols55.length; i++) {
        cols55[i].style.top = '30%';
    }



  let Participaants = ["room:refresh-participants", {rid: roomIDHolder[0], pid: MyPeerId[0] }];
  let DeliveriT = "42" + JSON.stringify(Participaants);
  ws.send(DeliveriT);

let BABA = ele.id;
let name = BABA
function getParticipantByName(name) {
  var message = Participants[0].msg;
  var startIndex = message.indexOf('{');
  var endIndex = message.lastIndexOf('}') + 1;
  var jsonString = message.slice(startIndex, endIndex);
  var participantMap = JSON.parse(jsonString).participantMap;

  for (var pid in participantMap) {
    if (participantMap.hasOwnProperty(pid)) {
      var participant = participantMap[pid];
      if (participant.name === name) {
        return {
          id: participant.id,
          name: participant.name,
          avatar: participant.avatar,
          followers: participant.followers,
          following: participant.following,
          friends: participant.friends
        };
      }
    }
  }

  return null;
}


var participant = getParticipantByName(name);
var avatarLink = participant.avatar;
var followersCount = participant.followers;
var followingCount = participant.following;
var friendsCount = participant.friends;
var id = participant.id;
document.getElementById("InfoImg").src = avatarLink;
document.getElementById("ThisUserID").innerText = "ID: " +id;
document.getElementById("UserNameGet").innerText = name;
document.getElementById("FollowersCount").innerText = "Followers: " +followersCount;
document.getElementById("FriendsCount").innerText = "Friends: " +friendsCount;
document.getElementById("FollowingCount").innerText = "Following: " +followingCount;}



  function kickOut() {
  function getParticipantByName(name) {
  var message = Participants[0].msg;
  var startIndex = message.indexOf('{');
  var endIndex = message.lastIndexOf('}') + 1;
  var jsonString = message.slice(startIndex, endIndex);
  var participantMap = JSON.parse(jsonString).participantMap;

  for (var pid in participantMap) {
    if (participantMap.hasOwnProperty(pid)) {
      var participant = participantMap[pid];
      if (participant.name === name) {
        return {
          id: pid,
          name: participant.name,
          avatar: participant.avatar,
          followers: participant.followers,
          following: participant.following,
          friends: participant.friends
        };
      }
    }
  }

  return null;
}


var kickButton = document.getElementById("KickButton");

var buttonName = kickButton.innerHTML.slice(5);
var participant = getParticipantByName(buttonName);
var participantId = participant.id;

let UserToKick = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "blocked" }];
let ExecuteCommand2 = "42" + JSON.stringify(UserToKick);
ws.send(ExecuteCommand2);
  }



  function ShortBL() {
    var BlackListButton = document.getElementById("BlackListAddButton");
    var DeletionAnnounce = document.getElementById("Farmer-Text-ID");

let dropdown = document.querySelector("#dropdownBlocked");
  let option = document.createElement("option");
      option.value = BlackListButton.innerHTML.slice(10);
      option.text = BlackListButton.innerHTML.slice(10);
      dropdown.add(option);
      saveDropdownElements();
removeDuplicates();
  removeEmptyOptions();

DeletionAnnounce.innerHTML = "🛈 " + BlackListButton.innerHTML.slice(10) + " Added to the blacklist.";
DeletionAnnounce.style.color = "red";
DeletionAnnounce.style.opacity = 1;
setTimeout(function() {
DeletionAnnounce.style.opacity = 0;
}, 5000);


  }
  var dropdownSaver = document.getElementById("dropdownBlocked");
function saveDropdownElements() {
var elements = [];
for (var i = 0; i < dropdownSaver.options.length; i++) {
elements.push(dropdownSaver.options[i].value);}
localStorage.setItem("dropdownElements", JSON.stringify(elements));
}
function removeDuplicates() {
  var seen = new Set();
  for (var i = 0; i < dropdownSaver.options.length; i++) {
    var option = dropdownSaver.options[i];
    if (seen.has(option.text)) {
      dropdownSaver.remove(i);
      i--;
    } else {
      seen.add(option.text);
    }
  }
}
function removeEmptyOptions() {
  for (var i = 0; i < dropdownSaver.options.length; i++) {
    if (!dropdownSaver.options[i].text.trim()) {
      dropdownSaver.remove(i);
      i--;
    }
  }
}
var secondDiv = document.getElementById("second");
var kickButton = document.getElementById("KickButton");
secondDiv.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  var button = event.target;
  if (button.tagName === 'BUTTON') {
  var BlackListButton = document.getElementById("BlackListAddButton");
    var buttonName = button.innerHTML;
    kickButton.innerHTML = "Kick " +buttonName;
    BlackListButton.innerHTML = "BlackList " +buttonName;

var FullDiv = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes;
var BlockImg = document.getElementById("Block-container-id");
var NametoAppend = buttonName;
var matchingIndex = -1;
BlockImg.innerHTML = "";
for (let index = 0; index < FullDiv.length - 1; index++) {
  var UsernameClass = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[2].childNodes[0];
  var Avatar = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[1].childNodes[0];
  if (UsernameClass.innerHTML === NametoAppend) {
    matchingIndex = index;
    break;
  }
}

if (matchingIndex !== -1) {
  let matchingAvatar = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[matchingIndex].childNodes[1].childNodes[1].childNodes[0];
  let clone = matchingAvatar.cloneNode(true);
  BlockImg.appendChild(clone);
}

  }
});




function Mute() {
let secondDivxC = document.getElementById('second');

function DisableAccess() {
secondDivxC.addEventListener('click', stopClick, true);
}
function EnableAccess() {
    secondDivxC.removeEventListener('click', stopClick, true);
}
function stopClick(event) {
  event.stopPropagation();
  event.preventDefault();
}
DisableAccess();
MuteAudio();
document.getElementById("XXXX").innerHTML = ""
let i = 0;
let text = window.event.target.id;
let UserToMute = window.event.target.innerHTML;
let imgID = text.replace("user", "");

let name = UserToMute;

  let Participaants = ["room:refresh-participants", {rid: roomIDHolder[0], pid: MyPeerId[0] }];
  let DeliveriT = "42" + JSON.stringify(Participaants);
  ws.send(DeliveriT);
  function getParticipantIdByName(name) {
  var message = Participants[0].msg;
  var startIndex = message.indexOf('{');
  var endIndex = message.lastIndexOf('}') + 1;
  var jsonString = message.slice(startIndex, endIndex);
  var participantMap = JSON.parse(jsonString).participantMap;

  for (var pid in participantMap) {
    if (participantMap.hasOwnProperty(pid)) {
      var participant = participantMap[pid];
      if (participant.name === name) {
        return pid;
      }
    }
  }

  return null;
}
var participantName = UserToMute;
ContainerTime =  document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[imgID].childNodes[0].childNodes[0];
const TimerDiv = document.createElement("div");
TimerDiv.id = "display";
TimerDiv.className = "ant-col Timer";
TimerDiv.setAttribute("style", "padding-left: 17px;");
ContainerTime.appendChild(TimerDiv);
start();
    const Supp = document.createElement("div");
    Supp.className = "overlay supporter";
    Supp.id = "Cool";
    Supp.setAttribute("style", "display: block;");
    const Div2 = document.createElement("div");
    Div2.className = "block";
    var Supporter = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[imgID].childNodes[1];
    Supporter.appendChild(Supp);
    const element2 = document.getElementById("Cool");
    element2.appendChild(Div2);
    username = window.event.target.textContent || window.event.target.innerText;
    document.getElementById("Notification").style.visibility = "visible";
    document.getElementById("clear").disabled = true;
    document.getElementById("Notification").innerText = username + " is being muted";
    document.getElementById("Confirm-name").innerText = username + " was trying to send messages, however, they got deleted. Do you want to see them?"
    document.getElementById("PreMessages").innerText = "Messages history of " + username;
    var colsd = document.getElementsByClassName('SettingsPos');
    for(i = 0; i < colsd.length; i++) {
        colsd[i].style.top = '-500px';
    }

        var xxcc = document.getElementsByClassName('BlockPos');
    for(i = 0; i < xxcc.length; i++) {
        xxcc[i].style.left = '157px';
    }
    var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.left = '124px';}
    document.getElementById("stops").style.visibility = "visible";


var MuteClicking = setInterval(function() {
ws.send(DeliveriT);
var participantId = getParticipantIdByName(participantName);
let UserToDelete = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "muted" }];
let ExecuteCommand = "42" + JSON.stringify(UserToDelete);
ws.send(ExecuteCommand);
}, 400);


    let ArrayOfTexts = [];

    var DeleteChat = setInterval(function() {
        var xpath = '//span[text()="' + username + '"]/../../../div[2]/div[2]/button';
        var xpathd = '//div[text()="' + username + '" and @class="blind"]/../span[text()=" Clear Chat" ]/..';
        var xpathn = '//span[text()="OK"]/..';
        var Textpath = '//span[text()="' + username + '"]/../../../div[2]/div[1]/p';
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(matchingElement != null) {
            var matchingElement = document.evaluate(Textpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (matchingElement != null) {
  ArrayOfTexts.push(matchingElement.innerText);
}
ws.send(DeliveriT);
var participantId = getParticipantIdByName(participantName);
let UserToDelete = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "remove-messages" }];
let ExecuteCommand = "42" + JSON.stringify(UserToDelete);
ws.send(ExecuteCommand);}}, 500);



var DeleteChatimg = setInterval(function() {
const divs = document.querySelectorAll('.sc-gojNiO jknDzv');
divs.forEach(div => {
  const links = div.querySelectorAll('a.internal.upload.blur, a.internal.giphy.resize');
  links.forEach(link => {
    const image = link.querySelector('img');
    if (image) {
      const hasSpan = Array.from(div.querySelectorAll('span')).some(span => span.textContent === name);
      if (hasSpan) {


ws.send(DeliveriT);
var participantId = getParticipantIdByName(participantName);
let UserToDelete = ["room:owner:command", { roomId: roomIDHolder[0], targetPid: participantId, command: "remove-messages" }];
let ExecuteCommand = "42" + JSON.stringify(UserToDelete);
ws.send(ExecuteCommand);

      }
    }
  });
});


}, 1500);














    stops.onclick = function() {
    EnableAccess();
var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.left = '52px';}
var Hider = document.getElementsByClassName('ant-dropdown-menu');
for(i=0; i<Hider.length; i++) {
Hider[i].style.opacity = '100%';
}
    var xxcc = document.getElementsByClassName('BlockPos');
    for(i = 0; i < xxcc.length; i++) {
        xxcc[i].style.left = '105px';
    }
TimerDivv = document.getElementById("display");
if(TimerDivv != null) {
TimerDivv.remove();}
        var Supporter = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[imgID].childNodes[1];
        cools = document.getElementById("Cool");
        if(cools != null) {
            Supporter.removeChild(cools);
        }
        var colsd = document.getElementsByClassName('SettingsPos');
        for(i = 0; i < colsd.length; i++) {
            colsd[i].style.top = '8px';
        }

                var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '12px';
        }
        var filteredArr = ArrayOfTexts.filter(function(item, index) {
            if(ArrayOfTexts.indexOf(item) == index)
                return item;
        });
        var time = new Date();
        var PMAM = time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
        var myDivo = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[imgID].childNodes[1].childNodes[1].childNodes[0];
        var divClone;
        var temp = "";
        for(var i = 0; i < filteredArr.length; i++) {
            lol = i;
            temp += ('<div class="sc-gojNiO jknDzv"><div class="sc-cQFLBn jYGEuz message   unverified"><div class="user"><div class="name primary"><span>' + username + '</span></div><div id="' + lol + '" class="avatar"></div><div class="time"><span>' + PMAM + '</span></div></div><div class="text"><div class="html"><p>' + filteredArr[i] + '</p></div><div class="fake-actions"></div></div></div></div>');
        }
        document.getElementById("XXXX").innerHTML = temp;
        document.getElementById("MsgsCounNum").innerText = "A total of " + filteredArr.length + " messages have been deleted. A copy of each identical message is shown down below."
        for(var Y = 0; Y < filteredArr.length; Y++) {
            var Ochild = document.getElementById(Y);
            divClone = myDivo.cloneNode(true);
            Ochild.appendChild(divClone);
        }
        var FullDiv = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes;
        var UsernameClass = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[FullDiv.length - 1].childNodes[1].childNodes[2].childNodes[0];



        if(filteredArr.length >= 1) {
            var cols = document.getElementsByClassName('ConfirmationClass');
            for(i = 0; i < cols.length; i++) {
                cols[i].style.top = '15px';
            }
ShowDeletedMessages();
            document.getElementsByClassName("ant-modal-body").innerHTML = temp;
            var colsd = document.getElementsByClassName('SettingsPos');
            for(i = 0; i < colsd.length; i++) {
                colsd[i].style.top = '-500px';
            }
                            var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '-500px';
        }
        }
        document.getElementById("Notification").style.visibility = "hidden";
        document.getElementById("Notification").innerText = "";
        var element = document.getElementById("stops");
        document.getElementById("stops").style.visibility = "hidden";
        document.getElementById("clear").disabled = false;
        clearInterval(MuteClicking);
        clearInterval(DeleteChat);
                clearInterval(DeleteChatimg);

        stop = true;
        const nodeList = document.querySelectorAll(".Btnbox");
for(let i = 0; i < nodeList.length; i++) {
    var UserIDArray = "user" + i;
    var element = document.getElementById(UserIDArray);
    if (element) {
        element.disabled = false;
    }
}

    };
}
const myTimeout = setTimeout(clean, 1);
function clean() {
var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.top = '-500px';}
var FinishMove = document.getElementsByClassName('StopRecordButton');
for(i=0; i<FinishMove.length; i++) {
FinishMove[i].style.top = '-300px';}
    const clear = document.getElementById("clear");
    var xxx = document.querySelector("#ShowRunner").classList.length;
    if(xxx === 1) {
        document.querySelector("#ShowRunner").classList.add("slide");
        document.getElementById("clear").innerText = "Show";
HideHud();
        document.getElementById("stops").style.visibility = "hidden";
        document.getElementById("Notification").style.visibility = "hidden";
        var cols = document.getElementsByClassName('wrapping');
        for(i = 0; i < cols.length; i++) {
            cols[i].style.left = '-500px';
        }
        var colsdss = document.getElementsByClassName('SettingsPos');
        for(i = 0; i < colsdss.length; i++) {
            colsdss[i].style.top = '-500px';
        }
                        var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '-500px';
        }
    }
    if(xxx === 2) {
        document.querySelector("#ShowRunner").classList.remove("slide");
        document.getElementById("clear").innerText = "Hide";
        document.getElementById("Notification").style.visibility = "visible";
ShowHud();
        var cols = document.getElementsByClassName('wrapping');
        for(i = 0; i < cols.length; i++) {
            cols[i].style.left = '7px';
        }
        var colsdww = document.getElementsByClassName('SettingsPos');
        for(i = 0; i < colsdww.length; i++) {
            colsdww[i].style.top = '8px';
        }
                        var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '12px';
        }
var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.top = '13px';}
    }
}

function BombIt() {
const textarea = document.querySelector('.ant-mentions textarea');
const senderss = document.querySelectorAll('button.ant-btn.send-box.ant-btn-primary.ant-btn-sm')[0];
textarea.maxLength = 10000000;
textarea.focus();
document.execCommand('insertText', false, '&nbsp;\'.repeat(50000));
senderss.click();
}



function OneTime() {

const button = document.getElementById("FinishHim");
let color = "green";
setInterval(() => {
  if (color === "green") {
    color = "red";
  } else {
    color = "green";
  }

  button.style.color = color;
}, 500);

LoadSettings();
const checkForDiv = () => {
  const div = document.querySelector('.ant-row-flex.ant-row-flex-start.ant-row-flex-middle');
  if (div) {
    const buttonHtml = '<button id="BombChat" type="button" class="ant-btn ant-btn-sm ant-col" style="padding-left: 10px; padding-right: 2px;"  onclick="BombIt()">🗑</button>';
    div.insertAdjacentHTML('beforeend', buttonHtml);

var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.top = '13px';}
    document.getElementById("clear").style.visibility = "visible";
    document.querySelector("#ShowRunner").classList.remove("slide");
    document.getElementById("clear").innerText = "Hide";
    var cols = document.getElementsByClassName('wrapping');
    for(i = 0; i < cols.length; i++) {
        cols[i].style.left = '7px';
    }
    var colsd = document.getElementsByClassName('SettingsPos');
    for(i = 0; i < colsd.length; i++) {
        colsd[i].style.top = '8px';
    }
                var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '12px';
        }



const button = document.querySelector('.ant-btn-link');
const toggleDiv = document.createElement('div');
toggleDiv.className = 'sc-jtRfpW iKUzgK';
const toggleSwitch = document.createElement('label');
toggleSwitch.className = 'switch';
const toggleInput = document.createElement('input');
toggleInput.type = 'checkbox';
toggleInput.id = 'Mute-Switch';
toggleInput.className = 'toggle-input';
const toggleSlider = document.createElement('span');
toggleSlider.className = 'slider round';
toggleSwitch.appendChild(toggleInput);
toggleSwitch.appendChild(toggleSlider);
const muteText = document.createElement('span');
muteText.textContent = 'You cannot be muted by anyone';
muteText.id = 'mute-text-id';
muteText.className = 'mute-text-class';
muteText.style = 'display: none';
toggleDiv.appendChild(muteText);

toggleDiv.appendChild(toggleSwitch);
button.parentNode.replaceChild(toggleDiv, button);

 const muteSwitch = document.getElementById("Mute-Switch");

  muteSwitch.addEventListener("change", function() {
    if (muteSwitch.checked) {
      muteText.style.display = "block";
    } else {
      muteText.style.display = "none";
    }
  });

  } else {
    setTimeout(checkForDiv, 2500); // wait 2 seconds and check again
  }
}

checkForDiv();






var dropdownSaver = document.getElementById("dropdownBlocked");

function loadDropdownElements() {
var elements = JSON.parse(localStorage.getItem("dropdownElements"));
if (elements) {
for (var i = 0; i < elements.length; i++) {
var option = document.createElement("option");
option.value = elements[i];
option.text = elements[i];
dropdownSaver.add(option);}}}

function removeEmptyOptions() {
  for (var i = 0; i < dropdownSaver.options.length; i++) {
    if (!dropdownSaver.options[i].text.trim()) {
      dropdownSaver.remove(i);
      i--;
    }
  }
}

setTimeout(loadDropdownElements, 1000);
setTimeout(removeEmptyOptions, 2000);



}


const Rest = setTimeout(Restores, 1)
function Restores() {
    const WelcomeMessage = document.querySelectorAll('.depLok').length > 0;
    if(WelcomeMessage) {
        Run();
    } else {
        setTimeout(Restores, 100);
    }
}
function Run() {
    const whatever = document.querySelectorAll('.sc-fjdhpX').length > 0;
    if(whatever) {
        var x = document.getElementsByClassName('sc-fjdhpX eyTYBo')[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent;
    } else {
        Restores();
    }
}
</script>
<script>
CloseDialogue.onclick = function () {

var colsdsss = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsdsss.length; i++) {
colsdsss[i].style.top = '8px';}
                var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '12px';
        }
var colsd = document.getElementsByClassName('MessagesClass');
for(i=0; i<colsd.length; i++) {
colsd[i].style.left = '150%';}}

cancel.onclick = function () {
var cols = document.getElementsByClassName('ConfirmationClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-300px';}
var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '8px';}
                var bioi = document.getElementsByClassName('BlockPos');
        for(i = 0; i < bioi.length; i++) {
            bioi[i].style.top = '12px';
        }
}
ShowIt.onclick = function () {
SlideDeletedMessages();
var cols = document.getElementsByClassName('ConfirmationClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-300px';}
var colsd = document.getElementsByClassName('MessagesClass');
for(i=0; i<colsd.length; i++) {
colsd[i].style.left = '30%';
}
}
settingsclose.onclick = function () {
var cols = document.getElementsByClassName('settings');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-500px';}
var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '8px';}
}
BlackListclose.onclick = function () {
var cols = document.getElementsByClassName('BlackListDivClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-1000px';}
var colsd = document.getElementsByClassName('BlockPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '12px';}
}
SettingsIcon.onclick = function () {
var cols = document.getElementsByClassName('settings');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '150px';}
var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '-500px';}
}
BlockIcon.onclick = function () {
var cols = document.getElementsByClassName('BlackListDivClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '90px';}
var bioi = document.getElementsByClassName('BlockPos');
for(i = 0; i < bioi.length; i++) {
bioi[i].style.top = '-500px';}

var elementsToRemove = document.querySelectorAll('#ToRemove');
for (var i = 0; i < elementsToRemove.length; i++) {
    elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
}


var FullDiv = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes;
for(let index = 0; index < FullDiv.length - 1; index++) {
var UsernameClass = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[2].childNodes[0];
var Avatar = document.getElementsByClassName('sc-iujRgT giAagV')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[1].childNodes[0];
thewholediv = document.getElementById("ContainerOfUsers");
thatdiv = document.getElementById("Blacklist-div");
const MyBtnBoxdivs = document.createElement("div");
const WillgetDeleted = document.createElement("div");
WillgetDeleted.id = "ToRemove";
WillgetDeleted.setAttribute("style", "text-align: center; margin: 0 auto; width: 50%;");
thewholediv.appendChild(WillgetDeleted);
MyBtnBoxdivs.id = "Btnbox" + index;
MyBtnBoxdivs.className = "Btnbox";
WillgetDeleted.appendChild(MyBtnBoxdivs);
const MyButtonsB = document.createElement("button");
MyButtonsB.innerHTML = UsernameClass.innerHTML;
MyButtonsB.className = "button-7";
MyBtnBoxdivs.appendChild(MyButtonsB);}
const BlockingBtns = document.querySelectorAll(".button-7");
const dropdown = document.querySelector("#dropdownBlocked");

BlockingBtns.forEach(function(BlockingBtn) {
  BlockingBtn.addEventListener("click", function() {
    let exists = false;
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].value === BlockingBtn.innerText) {
        exists = true;
                 var BlackListRemovalText = document.getElementById("BlackListRemovalText");
    BlackListRemovalText.innerHTML = BlockingBtn.innerText + " is already in the blacklist";
BlackListRemovalText.style.color = "blue";
    BlackListRemovalText.style.opacity = 1;
    setTimeout(function() {
      BlackListRemovalText.style.opacity = 0;
    }, 2000);
        break;
      }
    }
    if (!exists) {
      const option = document.createElement("option");
      option.value = BlockingBtn.innerText;
      option.text = BlockingBtn.innerText;
      dropdown.add(option);
          var BlackListRemovalText = document.getElementById("BlackListRemovalText");
    BlackListRemovalText.innerHTML = BlockingBtn.innerText + " is added to the blacklist";
BlackListRemovalText.style.color = "red";
    BlackListRemovalText.style.opacity = 1;
    setTimeout(function() {
      BlackListRemovalText.style.opacity = 0;
    }, 2000);
saveDropdownElements();

    }
  });
});

document.getElementById("dropdownBlocked").addEventListener("change", function() {
  var selectedOption = document.getElementById("dropdownBlocked").options[document.getElementById("dropdownBlocked").selectedIndex];
  if (selectedOption.value !== "") {
    document.getElementById("YesBtn").style.transition = "opacity 0.5s";
    document.getElementById("YesBtn").style.opacity = "100%";
    document.getElementById("NoBtn").style.transition = "opacity 0.5s";
    document.getElementById("NoBtn").style.opacity = "100%";

var BlackListRemovalText = document.getElementById("BlackListRemovalText");
BlackListRemovalText.innerHTML = "Are you sure that you want to remove " + selectedOption.text + " from blacklist?";
BlackListRemovalText.style.color = "red";
BlackListRemovalText.style.opacity = 1;


  }

});

document.getElementById("YesBtn").addEventListener("click", function() {
  document.getElementById("YesBtn").style.transition = "opacity 0.5s";
  document.getElementById("YesBtn").style.opacity = "0%";
  document.getElementById("NoBtn").style.transition = "opacity 0.5s";
  document.getElementById("NoBtn").style.opacity = "0%";
  var selectedOption = document.getElementById("dropdownBlocked").options[document.getElementById("dropdownBlocked").selectedIndex];
  if (selectedOption.value !== "") {
    var BlackListRemovalText = document.getElementById("BlackListRemovalText");
    BlackListRemovalText.innerHTML = selectedOption.text + " is removed from the blacklist";
    BlackListRemovalText.style.color = "green";
    BlackListRemovalText.style.opacity = 1;
    document.getElementById("dropdownBlocked").remove(document.getElementById("dropdownBlocked").selectedIndex);
    setTimeout(function() {
      BlackListRemovalText.style.opacity = 0;
    }, 2000);
      saveDropdownElements();
  }
});

document.getElementById("NoBtn").addEventListener("click", function() {
  document.getElementById("YesBtn").style.transition = "opacity 0.5s";
  document.getElementById("YesBtn").style.opacity = "0%";
  document.getElementById("NoBtn").style.transition = "opacity 0.5s";
  document.getElementById("NoBtn").style.opacity = "0%";
  var BlackListRemovalText = document.getElementById("BlackListRemovalText");
BlackListRemovalText.style.opacity = 0;
});


var dropdownSaver = document.getElementById("dropdownBlocked");

function saveDropdownElements() {
var elements = [];
for (var i = 0; i < dropdownSaver.options.length; i++) {
elements.push(dropdownSaver.options[i].value);}
localStorage.setItem("dropdownElements", JSON.stringify(elements));
}

function loadDropdownElements() {
var elements = JSON.parse(localStorage.getItem("dropdownElements"));
if (elements) {
for (var i = 0; i < elements.length; i++) {
var option = document.createElement("option");
option.value = elements[i];
option.text = elements[i];
dropdownSaver.add(option);}}}
loadDropdownElements();




function removeDuplicates() {
  var seen = new Set();
  for (var i = 0; i < dropdownSaver.options.length; i++) {
    var option = dropdownSaver.options[i];
    if (seen.has(option.text)) {
      dropdownSaver.remove(i);
      i--;
    } else {
      seen.add(option.text);
    }
  }
}
removeDuplicates();

function removeEmptyOptions() {
  for (var i = 0; i < dropdownSaver.options.length; i++) {
    if (!dropdownSaver.options[i].text.trim()) {
      dropdownSaver.remove(i);
      i--;
    }
  }
}
  removeEmptyOptions();









}
Update.onclick = function () {
app = window.open('https://f4t-dictator.000webhostapp.com/F4t-Dictator-Updater.user.js');
document.addEventListener("visibilitychange", function() {
if (document.hidden) {}
else {location.reload();
app.close();}});
}
cancelUpdate.onclick = function () {
var cols = document.getElementsByClassName('updateClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-300px';}
}
UserInfoClose.onclick = function () {
var cols55 = document.getElementsByClassName('UserInfoClass');
for(i=0; i<cols55.length; i++) {
cols55[i].style.top = '-200%';
}
}
OKusers.onclick = function () {
var cols55 = document.getElementsByClassName('UserInfoClass');
for(i=0; i<cols55.length; i++) {
cols55[i].style.top = '-200%';
}
}

RecordButton.onclick = function () {
  var Recs = document.getElementsByClassName('containerRec');
for(i=0; i<Recs.length; i++) {
Recs[i].style.top = '150px';}
var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.top = '-500px';}
}
CloseRecordDiv.onclick = function () {
  var Recs = document.getElementsByClassName('containerRec');
for(i=0; i<Recs.length; i++) {
Recs[i].style.top = '-500px';}
var RecordMove = document.getElementsByClassName('RecordButtonStyle');
for(i=0; i<RecordMove.length; i++) {
RecordMove[i].style.top = '13px';}



}
</script>

<script>
var hr = 0;
var min = 0;
var sec = 0;
var count = 0;
var timer = false;
var start_time;
function start() {
  timer = true;
  start_time = (new Date()).getTime();
  stopwatch();
}
function stop() {
  timer = false;
  start_time = null;
}
function reset() {
  timer = false;
  start_time = null;
  min = 0;
  hr = 0;
  sec = 0;
  count = 0;
document.getElementById("display").innerHTML = "00:00:00:00";
}
function stopwatch() {
  var now = (new Date()).getTime();
  var diff = now - start_time;
  if (timer) {
    var str_time = (new Date(diff).toISOString().slice(11, 23));
    var hrString = ""+str_time.substring(0,2);
    var minString = ""+str_time.substring(3,5);
    var secString = ""+str_time.substring(6,8);
    var countString =""+ str_time.substring(9,11);

var Mongela = document.getElementById("display");

  if(Mongela != null) {
    document.getElementById("display").innerHTML = (minString+":"+secString+":"+countString);
  }



    requestAnimationFrame(stopwatch)
  }
}
</script>
<script>
var checkBox = document.getElementById("check0");

function ShowHud() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/ShowHud.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function HideHud() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/HideHud.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function MuteAudio() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/MuteAudio.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function DeleteMessage() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/DeleteMessage.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function ShowDeletedMessages() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/ShowDeletedMessages.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function SlideDeletedMessages() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/SlideDeletedMessages.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}

function ShowUserInformations() {
let audio = new Audio();
audio.preload = "auto";
audio.src = "https://f4t-dictator.000webhostapp.com/ShowUserInformations.mp3";
if(checkBox.checked == true) {
audio.oncanplaythrough = function() {
audio.play();};}}



</script>

<script>
function SaveSettings() {
var checkBox0 = document.getElementById("check0");
var checkBox1 = document.getElementById("check1");

if (checkBox0.checked == true){
localStorage.setItem("check0", "on");}
if (checkBox1.checked == true){
localStorage.setItem("check1", "on");}
if (checkBox0.checked == false){
localStorage.setItem("check0", "off");}
if (checkBox1.checked == false){
localStorage.setItem("check1", "off");}
if (checkBox2.checked == true){
localStorage.setItem("check2", "on");}
if (checkBox2.checked == false){
localStorage.setItem("check2", "off");}
}
function LoadSettings () {
check0 = localStorage.getItem("check0");
check1 = localStorage.getItem("check1");
check2 = localStorage.getItem("check2");

if (check0 == "on"){document.getElementById("check0").checked = true;}
if (check0 == "off") {document.getElementById("check0").checked = false;}
if (check1 == "on"){document.getElementById("check1").checked = true;}
if (check1 == "off") {document.getElementById("check1").checked = false;}



}
</script>
<script>
document.getElementById("FinishHim").style.visibility = "hidden";
document.getElementById("downloadLink").style.visibility = "hidden";
document.getElementById("PlayBack").style.visibility = "hidden";

  const GoForIt = document.getElementById('GoForIt');
const FinishHim = document.getElementById('FinishHim');
const RecordButton = document.getElementById('RecordButton');
let isRecording = false;
let intervalId = null;
GoForIt.addEventListener('click', startRecording);
FinishHim.addEventListener('click', stopRecording);
function startRecording() {
  isRecording = true;
  toggleRecording();
}
function stopRecording() {
  isRecording = false;
  FinishHim.style.visibility = 'hidden';
  RecordButton.innerHTML = '🔴';
  clearInterval(intervalId);
}
function toggleRecording() {
  if (isRecording) {
    intervalId = setInterval(() => {
      if (RecordButton.innerHTML === '🔴') {
        RecordButton.innerHTML = '🟢';
      } else {
        RecordButton.innerHTML = '🔴';
      }
    }, 300);
  }
}
</script>
<script>
window.onload = () => {
const videoElement = document.getElementById('videoElement');
const GoForIt = document.getElementById('GoForIt');
const FinishHim = document.getElementById('FinishHim');
const download = document.getElementById('downloadLink');
const audioToggle = document.getElementById('audioToggle');
const micAudioToggle = document.getElementById('micAudioToggle');
let blobs;
let blob;
let rec;
let stream;
let voiceStream;
let desktopStream;
const mergeAudioStreams = (desktopStream, voiceStream) => {
const context = new AudioContext();
const destination = context.createMediaStreamDestination();
let hasDesktop = false;
let hasVoice = false;
if (desktopStream && desktopStream.getAudioTracks().length > 0) {
const source1 = context.createMediaStreamSource(desktopStream);
const desktopGain = context.createGain();
desktopGain.gain.value = 0.7;
source1.connect(desktopGain).connect(destination);
hasDesktop = true;}
if (voiceStream && voiceStream.getAudioTracks().length > 0) {
const source2 = context.createMediaStreamSource(voiceStream);
const voiceGain = context.createGain();
voiceGain.gain.value = 0.7;
source2.connect(voiceGain).connect(destination);
hasVoice = true;}
return (hasDesktop || hasVoice) ? destination.stream.getAudioTracks() : [];
};
GoForIt.onclick = async () => {

const audio = audioToggle.checked || false;
const mic = micAudioToggle.checked || false;
desktopStream = await navigator.mediaDevices.getDisplayMedia({ video:true,
audio:
{channels: 2,
autoGainControl: false,
echoCancellation: false,
noiseSuppression: false}});
if (mic === true) {
voiceStream = await navigator.mediaDevices.getUserMedia({
video: false,
audio: {
...mic,
channels: 2,
autoGainControl: false,
echoCancellation: false,
noiseSuppression: false
}});}

document.getElementById("NoSignal").style.visibility = "hidden";
document.getElementById("PlayBack").style.visibility = "hidden";
document.getElementById("GoForIt").style.visibility = "hidden";
document.getElementById("downloadLink").style.visibility = "hidden";
document.getElementById("FinishHim").style.visibility = "visible";

const tracks = [
  ...desktopStream.getVideoTracks(),
  ...mergeAudioStreams(desktopStream, voiceStream)
];
stream = new MediaStream(tracks);
videoElement.srcObject = stream;
videoElement.muted = true;
videoElement.autoplay = true;

blobs = [];
rec = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp8,opus'});
rec.ondataavailable = (e) => blobs.push(e.data);
rec.onstop = async () => {
blob = new Blob(blobs, {type: 'video/webm'});
let url = window.URL.createObjectURL(blob);
download.href = url;

const today = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = months[today.getMonth()];
const day = today.getDate();
const year = today.getFullYear();
let hours = today.getHours();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
let minutes = today.getMinutes();
minutes = minutes < 10 ? '0'+minutes : minutes;
let seconds = today.getSeconds();
seconds = seconds < 10 ? '0'+seconds : seconds;
const dateTime = "Recorded at " +day+ " " +monthName+ " " +year+ " at " +hours+ ":" +minutes+ " " +ampm ;
download.download = dateTime+ '.webm';
download.style.display = 'block';
 videoElement.srcObject = null;
videoElement.src = url;
videoElement.autoplay = false;
videoElement.muted = false;


};
rec.start();

};
FinishHim.onclick = () => {
document.getElementById("PlayBack").style.visibility = "visible";
document.getElementById("GoForIt").style.visibility = "visible";
document.getElementById("FinishHim").style.visibility = "hidden";
document.getElementById("downloadLink").style.visibility = "visible";
rec.stop();

stream.getTracks().forEach(s=>s.stop())
 desktopStream.getTracks().forEach(track => track.stop());
  };
};
</script>
<script>


const videoElement = document.getElementById("videoElement");
const playButton = document.getElementById("PlayBack");

playButton.addEventListener("click", function() {

    videoElement.play();
    videoElement.controls = true;

  document.getElementById("PlayBack").style.visibility = "hidden";

});
</script>

<script>
setInterval(() => {
  let container = document.querySelector('.Online-Friends');
  let nameContainer = document.querySelector('.Online-Name-Container');

  let width = nameContainer.getBoundingClientRect().width;
  let Extra = width + 80;
  container.style.width = Extra + "px";
}, 1);
</script>



<script>

let Myfriends = [];
let clients = [];
let matched = [];
let Allf4t = [];
let FriendsRequest = new XMLHttpRequest();
let Everyone = new XMLHttpRequest();

function GetFriends() {
FriendsRequest.open("POST", "https://free4talk-identity.herokuapp.com/identity/get/relationships/?a=identity-get-relationships");
FriendsRequest.setRequestHeader("Accept", "application/json");
FriendsRequest.setRequestHeader("Content-Type", "application/json");
FriendsRequest.onreadystatechange = function() {
if (FriendsRequest.readyState === 4) {
var myObj = JSON.parse(FriendsRequest.responseText);
Myfriends.push(myObj.data.friends);


GetEveryone();


    }
  }
  var data = JSON.parse(localStorage.getItem("user:token"));
  var payload = {
    "token": data.data,
    "body": {
      "offset": 0,
      "limit": 100,
    }
  };
  FriendsRequest.send(JSON.stringify(payload));
}

function GetEveryone() {
  Everyone.open("POST", "https://free4talk-sync.herokuapp.com/sync/get/free4talk/groups/?a=sync-get-free4talk-groups");
  Everyone.setRequestHeader("Accept", "application/json");
  Everyone.setRequestHeader("Content-Type", "application/json");
  Everyone.onreadystatechange = function() {
    if (Everyone.readyState === 4) {
      try {
        var SecondObj = JSON.parse(Everyone.responseText);
                    Allf4t.push(SecondObj)

        for (var key in SecondObj['data']) {
          var group = SecondObj['data'][key];
          for (var client of group['clients']) {
            var clientInfo = {
              'id': client['id'],
              'name': client['name'],
              'avatar': client['avatar'],
            };
            clients.push(clientInfo);
          }
        }
        Myfriends[0].forEach(friendId => {
          let match = clients.find(client => client.id === friendId);
          if (match) {
            matched.push(match);
            updateElements();
          }
        });
      } catch (error) {
        GetFriends();
      }
    }
  }
  var ReqS = {"body": {}}
  Everyone.send(JSON.stringify(ReqS));
}






let infoArray = [];

async function updateElements() {
  const onlineJoiner = document.getElementById("Online-Joiner");
  const imageElement = document.querySelector(".Online-container img");
  const onlineFriends = document.getElementsByClassName("Online-Friends")[0];
  if (matched) {

    for (let index = 0; index < matched.length; index++) {
      onlineFriends.style.opacity = 1;

infoArray = [];
infoArray.push(matched[index].name);
infoArray.push(matched[index].id);
infoArray.push(matched[index].avatar);
      onlineJoiner.innerText = matched[index].name;
      imageElement.src = matched[index].avatar;
      await new Promise(resolve => setTimeout(resolve, 5000));
      onlineFriends.style.opacity = 0;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
matched = [];
clients = [];
    setTimeout(GetEveryone, 60000);
  } else {
  matched = [];
clients = [];
    setTimeout(GetEveryone, 60000);
  }
}
function hideCircles(num) {
  const circles = document.querySelectorAll('.circle');

  // Show/hide circles based on input number
  for (let i = 0; i < circles.length; i++) {
    if (i < num) {
      circles[i].style.display = 'inline-block';
    } else {
      circles[i].style.display = 'none';
    }
  }
}

function DriverClk() {
  const element = document.querySelector(".Online-Friends");
  element.addEventListener("click", function() {








  Everyone.open("POST", "https://free4talk-sync.herokuapp.com/sync/get/free4talk/groups/?a=sync-get-free4talk-groups");
  Everyone.setRequestHeader("Accept", "application/json");
  Everyone.setRequestHeader("Content-Type", "application/json");
  Everyone.onreadystatechange = function() {
if (Everyone.readyState === 4) {
  var SecondObj = JSON.parse(Everyone.responseText);
  for (var key in SecondObj['data']) {
    var group = SecondObj['data'][key];
    for (var client of group['clients']) {
      var clientInfo = {
        'id': client['id'],
        'name': client['name'],
        'avatar': client['avatar'],
      };
if (clientInfo.id === infoArray[1]) {
for (let i = 0; i < group.clients.length; i++) {
console.log(group.clients[i].avatar);



}



document.getElementById("TopicSet").textContent ="Topic: " +group.topic;
document.getElementById("LanguageSet").textContent ="Language: " +group.language;
document.getElementById("LevelSet").textContent ="Level: " +group.level;


console.log("Topic: " +group.topic);
console.log("Language: " +group.language);
console.log("Level: " +group.level);
console.log("Max people: " +group.maxPeople);
console.log(group);
}
    }
  }
}

  }
  var ReqS = {"body": {}}
  Everyone.send(JSON.stringify(ReqS));













});
}
 DriverClk()



















GetFriends();

</script>




<script>


</script>






<script>
var BlackListedFolks = [];
var dropdownSaver = document.getElementById("dropdownBlocked");

function GetBlockedUsers() {
  for (var i = 1; i < dropdownSaver.options.length; i++) {
    BlackListedFolks.push(dropdownSaver.options[i].text);
  }
  setTimeout(deleteBlacklistedMessages, 500);

}

async function deleteBlacklistedMessages() {
var Hider = document.getElementsByClassName('ant-dropdown-menu');
var koukou = document.getElementsByClassName('ant-popover-inner');
var DeletionAnnounce = document.getElementById("Farmer-Text-ID");
  for (var i = 0; i < BlackListedFolks.length; i++) {

    var xpath = '//span[text()="' + BlackListedFolks[i] + '"]/../../../div[2]/div[2]/button';
    var xpathd = '//div[text()="' + BlackListedFolks[i] + '" and @class="blind"]/../span[text()=" Clear Chat"]/..';
    var xpathn = '//span[text()="OK"]/..';
    var Textpath = '//span[text()="' + BlackListedFolks[i] + '"]/../../../div[2]/div[1]/p';
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (matchingElement != null) {
      matchingElement.click();
      var matchingElementy = document.evaluate(xpathd, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      matchingElementy.click();
      var matchingElementn = document.evaluate(xpathn, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      matchingElementn.click();





DeletionAnnounce.innerHTML = "⚠️ " + BlackListedFolks[i] + " is not allowed to text";
DeletionAnnounce.style.color = "red";
DeletionAnnounce.style.opacity = 1;
setTimeout(function() {
DeletionAnnounce.style.opacity = 0;
}, 3000);

      for(i=0; i<koukou.length; i++) {
koukou[i].style.opacity = '0%';}
for(i=0; i<Hider.length; i++) {
Hider[i].style.opacity = '0%';}
await new Promise(resolve => setTimeout(resolve, 500));

for(i=0; i<koukou.length; i++) {
koukou[i].style.opacity = '100%';}
for(i=0; i<Hider.length; i++) {
Hider[i].style.opacity = '100%';}

    }

  }
  BlackListedFolks = [];
  setTimeout(GetBlockedUsers, 500);

}

setTimeout(GetBlockedUsers, 3000);

</script>


<script>
setInterval(() => {
  let container = document.querySelector('.Unfollow-detector');
  let nameContainer = document.querySelector('.unfollow-Name-Container');

  let width = nameContainer.getBoundingClientRect().width;
  let Extra = width + 80;
  container.style.width = Extra + "px";
}, 250);
</script>







<script>

</script>

` );
/* CSS */
GM_addStyle ( `
#chat-head {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #3b5998;
  z-index: 9999;
  transition: transform 0.3s ease-out;
}
.ImageHead {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  pointer-events: none;
}

#customMenu {
  position: fixed;
  top: 10000px;
  left: 10000px;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 28px;
  z-index: 1;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#customMenu.show {
  opacity: 1;
  pointer-events: auto;
}

.KickButtonClass {
  background-color: #ff4f4f;
  color: white;
  border: none;
  padding: 5px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  margin-top: 20px; /* add margin to top of button to space it from text */
    width: 220px; /* set a fixed width */
  white-space: nowrap; /* prevent wrapping */
}

.KickButtonClass:hover {
  background-color: #ff2e2e;
}

.blockButtonClass {
  background-color: #000000;
  color: white;
  border: none;
  padding: 5px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  margin-top: 10px; /* add margin to top of button to space it from text */
    width: 220px; /* set a fixed width */
  white-space: nowrap; /* prevent wrapping */
}



.containerClients {
position: fixed;
top: -1250px;
left: -1250px;
  width: 100%;
  max-width: 700px;
  background-color: #1e272e;
    width: 400px;
  height: 250px;
}










.FollowersCount {
  position: absolute;
  bottom: -20px;
  width: 100%;
  text-align: center;
  z-index: 2;
    color: #1890ff;
 width: 100%;
  font-size: smaller;
}


.mute-text-class {

}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 0;
  padding: 0;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-input:checked + .slider {
  background-color: #2196F3;
}

.toggle-input:checked + .slider:before {
  transform: translateX(24px);
}

.TEXTUNFOLLOW {
  font-size: 15px;
  color: red;
}
.TEXTFOLLOW {
  font-size: 15px;
  color: green;
}




button.yes {
  background-color: red;
  color: white;
  font-weight: bold;
    cursor: pointer;
    opacity: 0%;

}

button.no {
  background-color: green;
  color: white;
  font-weight: bold;
    cursor: pointer;
    opacity: 0%;

}



.ant-popover-inner {
    opacity: 100%;
}


.Timer{
  font-family: Oswald;
  font-size: 19px;
}


.iTSKDL {
    display: flex;
    flex-direction: column;
    height: 1000%;
}


.Online-Friends {
    user-select: none;
    position: fixed;
    bottom: 150px;
    width: auto;
    height: 47px;
    border-radius: 10px;
    background-image: url(https://iili.io/HYHQTgV.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    border: 2px solid #40a9ff;
    opacity: 0%;
    transition: opacity 1.0s;
}


.Farmer {
    position: absolute;
    top: 16px;
    left: 367px;
}
.Farmer-Text {
    position: absolute;
    top: 35px;
    left: 2px;
      opacity: 0;
  transition: opacity 1.0s;
}


.Online-container {
    position: absolute;
    top: 7px;
    left: 6px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;

}
.Online-container img {
    width: 100%;
}

.block-container {
    position: absolute;
    top: 5%;
    left: 43%;
    width: 31px;
    height: 31px;
    border-radius: 20%;
    overflow: hidden;

}
.block-container img {
    width: 100%;
}



.Online-Name-Container {
    position: absolute;
    font-size: 13px;
    color: rgb(47, 148, 233);
    top: 4px;
    left: 41px;
}
.meow {
    position: absolute;
    top: 50px;
    left: 50px;
}



.Is-Online {
    position: absolute;
    font-weight: bold;
    font-size: 10px;
    top: 21px;
    left: 41px;
    width: 66px;
    color: green;
}




.checkbox-div {
  margin-top: 10px;
  margin-bottom: 10px;
}

.ant-dropdown-menu {
opacity: 100%;
}
.SettingsPos {
position: fixed;
transition: top 0.5s;
top: 8px;
left: 83px;
}
.BlockPos {
position: fixed;
transition: top 0.5s;
transition: left 0.5s;

top: 12px;
left: 105px;
}
.RecordButtonStyle {
position: fixed;
top: -500px;
left: 52px;
transition: top 1.0s, left 0.5s;
}
.StopRecordButton {
position: fixed;
transition: top 0.5s;
top: -300px;
left: 75px;
}
.close-btn {
    position: absolute;
    top: 44px;
    outline: none;
    font-weight: bold;
    color: #bf473c;
    right: 12px;
}
button.close-btn {
    cursor: pointer;
    background-color: transparent;
    width: 81px;
    height: 70px;
    border: none;
}
.containerRec {
/////border: 2px solid white;

    position: absolute;
    top: -500px;
    left: 20%;
    width: 771px;
    height: 435px;
    transition: top 0.5s;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7EAAAIQCAYAAABXFOmmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFu2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYTg3MzFiOSwgMjAyMS8wOS8wOS0wMDozNzozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMS0xMFQyMzoxNDo0OSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDEtMTBUMjM6MzI6MTQrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDEtMTBUMjM6MzI6MTQrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzYmFjYTE4LWYyOTgtZWM0Mi1iZTk3LWRmNGU3NzQyMzA5MiIgeG1wTU06RG9jdW1lbnRJRD0i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fdWrXjXJ33nnnXjd616H3/qt38KLXvQifMu3fAv27duHsiwxGAywubk5NX70+c9//mQyJwC49957UZYliqLAcDicUkmPHDkyUW0ffPDBCRm+9tpr8bznPW+yXfUt2wovfelLJ/n3v//9uOGGG/CJT3wCr3/96/H2t78dnU5HOpGSrpsuS5CvuuqqiX+/8Au/gNXVVVx99dXCstj8cDjE2toanv/85+O2227DzTffLCxfYbuklA6kG45NWpFYj67ETaqvIVXYECqPCepWtERKqs0swGwZqjJtIPNFZMsU/H62vjWtgjZt36bMulRYEeEMlXqrsKJZgVXqK5v6TObEk2MTBTak2pYI7M5DUmMTZghNk7tYqe1L4dipEDJFtubxsMjzvMN+m5WFiMixRPZ7v/d7J5MjVfjN3/xNHDlyBL/wC7+AbreLubk59Ho99Hq9ydhXALjlllumJk166KGHpggzO1718OHDk4mSbr/9dnzsYx8DAFx//fW4/PLLJ9uxJJZSil/4hV/Aa17zmin/fviHfxjLy8v4kz/5k8l2IrW5+p4ti2q8bfVX7bNnzx78X//X/wVgdC7f/e534/rrr5/aT4RLL70U3/d93zepJ/bcm5BoSikpy1IXg+mVWE/1tUII1cjHhs02Tduo004FmWrq0mXXdyysyj7fndi2izPvo61vTaugTdu3LbcuFdbmHlKrCiv6nI5KfQ2phjahvibsXCQ1dkeiaVK2W8heqLTpepW+dBYR1CZVWADIsoyYfo+V7c5a5X/1V38VDz74IN74xjdObfszP/MzU8orgKlZia+++uopJfb+++9HlmUTksyS2G63OyGxH//4x/HhD38YAHDTTTdNCYe8EnvgwAF8+MMfxkc+8hG84AUvmCzf2trCN3/zN+PChQtTx8VDRmTZtPL9ne9856QOfuM3fgNf/vKXhWWyKIoCb37zmyflnT17VrsPuy8hhHS73UXdtloS6zmREwtf1cil7JAqUF1KU92Klk6ddJ00KYYCK/JXB93ETqawrffQ56lp+zZlxm6zFWwf8Da+eKuwFVSzEouUUF8V1mYCqRjqWlJhdy6SGhsdieyFSZsmd7vlfE3AflJHtaxOdDqdC4PBoCJFym1Z4kYIwXve8x68613vwu233473vve9+L3f+72pWX4/+tGPTrY9ffo0HnvsMQDA3NwcgOlj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');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: contain;

}
      @media (max-width: 500px) {
        .containerRec {
          width: 100%;
          height: 100%;
          transform: translate(0, 0);
        }
      }
      .mmm {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
.ooo {
    font-weight: bold;
    color: #c44a3f;
    position: absolute;
    bottom: 236px;
    left: 93%;
    transform: translateX(-50%);
    font-size: 12px;

}

            .aaa {
cursor: pointer;
    position: absolute;
    bottom: 276px;
    left: 93%;
    transform: translateX(-50%);
    border: none;
    outline: none;
    font-weight: bold;
    color: #bf473c;
    background-color: transparent;
      }
            .nnn {
                 cursor: pointer;
    position: absolute;
    bottom: 276px;
    left: 93%;
    transform: translateX(-50%);
    border: none;
    outline: none;
    font-weight: bold;
    color: #bf473c;
    background-color: transparent;
      }


.ppp {
    position: absolute;
    top: 112px;
    right: 365px;
}
button.ppp {
cursor: pointer;
background-color: transparent;
width: 150px;
height: 150px;
background-image: url(https://freeiconshop.com/wp-content/uploads/edd/play-flat.png);
background-size: cover;
background-position: center;
  border: none;
}

.zzz {
      position: absolute;
    left: 42.3%;
    top: 6.1%;
    width: 532px;
    height: 332px;
    transform: translateX(-50%) scaleX(1.18) scaleY(1.09);
}
.NoSignal {
      position: absolute;
    left: 42.3%;
    top: 6.1%;
    width: 532px;
    height: 332px;
    transform: translateX(-50%) scaleX(1.18) scaleY(1.09);
}


.UserInfoClass {
position: fixed;
transition: top 0.5s;
top: -200%;
left: 30%;
}
.OverFlow {
overflow: auto;
}
.slide {
}
.modal {
display: block;
position: fixed;
top:100px;
left:250px;
width:550px;
height:250px;
}
.wrapping {
display: flex;
position:fixed;
top:66px;
transition: left 1.0s;
width:30%;
}
.ConfirmationClass {
 top:-300px;
 left:5px;
transition: top 0.5s;
}
.updateClass {
 top:-300px;
 left:5px;
transition: top 0.5s;
}

.MessagesClass {
position: fixed;
top: 19%;
left: 150%;
transition: left 0.5s;
}
.settings {
    border: 2px solid white;
    position: absolute;
    top: -500px;
    left: 20%;
    width: 771px;
    height: 435px;
    transition: top 0.5s;
    background-image: url(https://img.freepik.com/free-photo/luxury-banner-background-perfect-canva_1361-3594.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}
.BlackListDivClass {
    border: 2px solid white;
    position: absolute;
    top: -1000px;
    left: 20%;
    width: 500px;
    height: 625px;
    transition: top 0.5s;
    background-image: url(https://img.freepik.com/free-photo/gradient-earth-tone-background-soft-vintage-style_53876-125325.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}

.Not-Att {
position:fixed;
top:33px;
left:7px;
color: #313131;
font-size: 14px;
-webkit-animation: colorschange 0.5s infinite alternate;
}
@-webkit-keyframes colorschange {
  0% {
color: red;
  }
  100% {
    color: white;
  }
}
.Welcome-msg {
    position: fixed;
    top: 9px;
    left: 340px;
    color: white;
    font-size: 14px;
    -webkit-animation: opacityChange 10s infinite;
}

@-webkit-keyframes opacityChange {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  35% {
    opacity: 0.7;
  }
  45% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.ant-btnY:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
}

.ant-btnY {
  position: fixed;
  display: inline-block;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0,0,0,.015);
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  font-size: 13px;
  border-radius: 4px;
  color: rgba(0,0,0,.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0,0,0,.12);
  box-shadow: 0 2px 0 rgba(0,0,0,.045);
  width: 165px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}


.ant-mute {
  line-height: 1.499;
  position: fixed;
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  font-size: 13px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  background-color: #f83325;
  border-color: #f83325;
  width: fit-content;
}


.button-7 {
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
  width: 200px;

}

.button-7:hover,
.button-7:focus {
  background-color: #ff0000;
}

.button-7:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button-7:active {
  background-color: #0064bd;
  box-shadow: none;
}

#first {
    width:35px;
    height:250px;
}
#second {
    width:170px;
    height:250px;
}
#third {
    width:30px;
    height:250px;
      min-width: 50px;

}

.imgbox {
  width: 35px;
  height: 35px;
}
.Btnbox {
  width: 240px;
  height: 35px;
}
.mutebox {
  width: 50px;
  height: 250px;
}
.Img {
  width: 32px;
  height: 32px;
    border: 1px solid black;
}
.MT {
  width: 28px;
  height: 250px;

}

#settingsclose {
  background-color: transparent;
  border: none;
  font-size: 20px;
}

 #dropdownBlocked {
color: red;
width: 220px;
text-align: center;
  }
  #dropdownBlocked option[value=""] {
    font-weight: bold;

  }

.Unfollow-detector {
    user-select: none;
  position: fixed;
  top: 250px;
  right: -1000px;
    width: auto;
    height: 47px;
    border-radius: 10px;
    background-image: url(https://iili.io/HYHQTgV.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    border: 2px solid #40a9ff;
    opacity: 100%;
    transition: right 1.0s;
      z-index: 999; /* A high value */
}
.Unfollow-container {
    position: absolute;
    top: 7px;
    left: 6px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;

}
.Unfollow-container img {
    width: 100%;
}

.unfollow-Name-Container {
    position: absolute;
    font-size: 13px;
    color: rgb(47, 148, 233);
    top: 4px;
    left: 41px;
    font-weight: bold;

}
#clear {
    position: fixed;
    top: 13px;
    left: 4px;
            transition: top 0.5s;

}






    #Loader {
        position:       fixed;
        top:            -500px;
        left:           8px;
        transition: top 0.5s;
    }
#startBTN {
        position:       fixed;
        top:            7px;
        left:           300px;
    }
#stopBTN {
        position:       fixed;
        top:            7px;
        left:           80px;
    }
#stops {
        position:       fixed;
        top:            2px;
        left:           52px;
        width:           70px;
    }

#MuteIcon0 {
        position:       fixed;
        top:            40px;
        left:           280px;
    }
.ButtonsContainerClass {

    position: absolute;
    left: 0px;
    width: 0px;
    height: 0px;

    transition: top 0.5s ease 0s;

    top: 0px;
}
.ButtonsContainerClass button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}


@media screen and (max-width: 1100px) {
.Farmer-Text {
    position: absolute;
    top: 71px;
    left: 2px;
      opacity: 0;
  transition: opacity 1.0s;
}

#stops {
        position:       fixed;
        top:            108px;
        left:           52px;
        width:           70px;
    }
    .Not-Att {
    position: fixed;
    top: 81px;
    left: 1px;
    color: #313131;
    font-size: 14px;
    -webkit-animation: colorschange 0.5s infinite alternate;
}

.wrapping {
    display: flex;
    position: fixed;
    top: 140px;
    transition: left 0.5s;
transition: top 0.5s;
    width: 30%;
}
.ButtonsContainerClass {

    position: absolute;
    left: 0px;
    width: 0px;
    height: 0px;
    transition: top 0.5s ease 0s;
top: 108px;
}
#clear {
    position: fixed;
    top: 120px;
    left: 4px;
            transition: top 0.5s;

}


.Online-Friends {
    user-select: none;
    position: fixed;
    bottom: 125px;
    width: auto;
    height: 47px;
    border-radius: 10px;
    background-image: url(https://iili.io/HYHQTgV.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    border: 2px solid #40a9ff;
    opacity: 0%;
    transition: opacity 1.0s;
}


}

` );
