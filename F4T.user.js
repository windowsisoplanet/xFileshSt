// ==UserScript==
// @name     Free4talk Dictator
// @include  https://www.free4talk.com/room/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://code.jquery.com/jquery-3.4.1.min.js
// @require https://html2canvas.hertzen.com/dist/html2canvas.js
// @version  2.0
// @grant    GM_addStyle
// ==/UserScript==
//--- The @grant directive is used to restore the proper sandbox.
/* globals jQuery, $, waitForKeyElements */
$("body").append ( `


<div id="ShowRunner" class="wrapping">

<div id="first">
</div>
<div id="second">
</div>
<div id="third">
</div>

</div>
<div id="UserInfo" role="document" class="ant-modal UserInfoClass" style="width: 520px;"><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div><div class="ant-modal-content"><button id="UserInfoClose" type="button" aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span></button><div class="ant-modal-body"><div class="sc-TOsTZ ctcxOx"><div class="ant-row-flex ant-row-flex-space-around"><div class="ant-col"><span class="ant-avatar  ant-avatar-square ant-avatar-image  " style="width: 192px; height: 192px; line-height: 192px; font-size: 18px;"><img id="InfoImg" src="" referrerpolicy="no-referrer"></span></div><div class="ant-col" style="flex: 1 1 0%;"><div class="ant-row-flex ant-row-flex-middle" style="flex-direction: column; padding: 14px 20px 0px; height: 100%; min-width: 274px;"><div class="ant-col" style="flex: 1 1 0%;"><div id="ThisUserID" style="color: rgb(204, 204, 204); font-size: 0.8em;">ID: 5486998922</div><div class="ant-row-flex gutter8" style="margin-left: -4px; margin-right: -4px;"><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FollowersCount" style="color: rgb(204, 204, 204); font-size: 0.8em;">Followers: 183</div></div><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FriendsCount" style="color: rgb(204, 204, 204); font-size: 0.8em;">Friends: 34</div></div><div class="ant-col" style="padding-left: 4px; padding-right: 4px;"><div id="FollowingCount" style="color: rgb(204, 204, 204); font-size: 0.8em;">Following: 34</div></div></div><div id="UserNameGet" style="font-size: 1.5em;">Eliza</div></div><div class="ant-col" style="margin-top: 20px;"><div class="ant-row-flex gutter4" style="margin-left: -2px; margin-right: -2px;"><div class="ant-col" style="padding-left: 2px; padding-right: 2px;"></div><div class="ant-col" style="padding-left: 2px; padding-right: 2px;"></div></div></div></div></div></div></div></div><div class="ant-modal-footer"><div><button type="button" class="ant-btn" style="display: none;"><span>Cancel</span></button><button id="OKusers" type="button" class="ant-btn ant-btn-primary"><span>Close</span></button></div></div></div><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div></div>

<button id="stops" class="ant-btn ant-btn-sm" >Stop</button>
<button id="Loader" class="ant-btn ant-btn-sm Refresh" onclick="ArrayNames(),OneTime()">Start</button>
<button id="clear" class="ant-btn ant-btn-sm" onclick="clean()">Hide</button>
<p id="Notification"  class="Not-Att"></p>
<p id="Welcome"  class="Welcome-msg"></p>
<div class="ant-popover ant-popover-placement-top ConfirmationClass"><div class="ant-popover-content"><div class="ant-popover-arrow"></div><div class="ant-popover-inner" role="tooltip"><div><div class="ant-popover-inner-content "><div class="ant-popover-message"><i aria-label="icon: exclamation-circle" class="anticon anticon-exclamation-circle"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i><div class="ant-popover-message-title"><div id="Confirm-name" style="max-width: 320px;">ADAM was trying to send messages, however, they got deleted. Do you want to see them?</div></div></div><div class="ant-popover-buttons"><button type="button" id="cancel" class="ant-btn ant-btn-sm"><span>Cancel</span></button><button type="button" id="ShowIt" class="ant-btn ant-btn-primary ant-btn-sm"><span>Show me</span></button></div></div></div></div></div></div></div>
<div class="ant-popover ant-popover-placement-top MessagesClass"><div class="ant-popover-content"><div class="ant-popover-arrow"></div><div id="" class="ant-popover-inner MessagesClass" role="tooltip"><div><div class="ant-popover-inner-content "><h4 id="PreMessages" class="ant-typography"></h4><div id="" class="ant-popover-message"></div><div id="" class="ant-popover-message"><span id="" class="ant-typography"></span><div id="XXXX" class="ant-col "><span></span></div><div id="" class="ant-popover-message"></div></div></div></div></div></div><div class="ant-popover-buttons"><button type="button" aria-label="Close" id="CloseDialogue" class="ant-modal-close"><span class="ant-modal-close-x"><i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span></button></div>
<div id="Setting-div" role="document" class="ant-modal settings" style="width: 520px; transform-origin: 820px 80.75px;"><div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div><div class="ant-modal-content"><button id="settingsclose" type="button" aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></span></button><div class="ant-modal-body"><div class="ant-spin-nested-loading"><div class="ant-spin-container"><div class="sc-elJkPf jZeGZd"><form autocomplete="off" class="ant-form ant-form-horizontal ant-form-hide-required-mark"><div class="ant-tabs ant-tabs-top ant-tabs-small ant-tabs-line"><div role="tablist" class="ant-tabs-bar ant-tabs-top-bar ant-tabs-small-bar" tabindex="0"><div class="ant-tabs-nav-container"><span unselectable="unselectable" class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled"></span><div class="ant-tabs-nav-wrap"><div class="ant-tabs-nav-scroll"><div class="ant-tabs-nav ant-tabs-nav-animated"><div><div class="ant-tabs-tab-active ant-tabs-tab"><h1 class="SettingsText">Free4Talk Dictator Settings</h1></div></div></div></div></div></div><div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;"></div><div class="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" style="margin-left: 0%;"><div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active" style="min-height: 280px;"><div tabindex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;"></div><div class="ant-row ant-form-item"><div class="ant-col ant-form-item-control-wrapper"><div class="ant-form-item-control"></div></div></div><div class="ant-row-flex ant-row-flex-space-between ant-row-flex-middle features" style="margin-left: -8px; margin-right: -8px;"><div class="ant-col" style="padding-left: 8px; padding-right: 8px;"><div class="ant-row ant-form-item"><div class="ant-col ant-form-item-label"><label for="SettingsForm_noMic" class="ant-form-item-no-colon" title="Sound effects">Sound effects</label></div><div class="ant-col ant-form-item-control-wrapper"><label class="switch"><input id="check0" type="checkbox" checked=""><span class="slider round"></span></label></div></div></div><div class="ant-col" style="padding-left: 8px; padding-right: 8px;"><div class="ant-row ant-form-item"><div class="ant-col ant-form-item-label"><label for="SettingsForm_noCam" class="ant-form-item-no-colon" title="Silent muting">Silent muting</label></div><div class="ant-col ant-form-item-control-wrapper"><label class="switch"><input id="check1" type="checkbox" ><span class="slider round"></span></label></div></div></div><div class="ant-col" style="padding-left: 8px; padding-right: 8px;"><div class="ant-row ant-form-item"><div class="ant-col ant-form-item-label"><label for="SettingsForm_noEM" class="ant-form-item-no-colon" title="User muting Badge">User muting Badge</label></div><div class="ant-col ant-form-item-control-wrapper"><label class="switch"><input id="check2" onchange="Highlited()" type="checkbox" checked><span class="slider round"></span></label></div></div></div><div class="ant-col" style="padding-left: 8px; padding-right: 8px;"><div class="ant-row ant-form-item"><div class="ant-col ant-form-item-label"><label for="SettingsForm_noST" class="ant-form-item-no-colon" title=""></label></div><div class="ant-col ant-form-item-control-wrapper"><div class="ant-form-item-control has-success"><span class="ant-form-item-children"><button id="update" type="button" class="ant-btn no-border ant-btn-primary ant-btn-block" style=""><span class="">check for updates</span></button></span></div></div></div></div></div></div></div></div></div></form></div></div></div></div></div></div>
<button id="SettingsIcon" type="button" class="ant-btn ant-dropdown-trigger ant-btn-primary ant-btn-circle ant-btn-icon-only ant-btn-background-ghost SettingsPos" style="border: none; visibility: visible;"><i aria-label="icon: setting" class="anticon anticon-setting"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg></i></button>



<script>
document.getElementById("clear").style.visibility = "hidden";
document.getElementById("stops").style.visibility = "hidden";
document.getElementById("Loader").innerText = "Fetching users.. Please wait";
document.getElementById("Loader").disabled = true;



///////////////////////////////////////////////


const IDINIT = setTimeout(IDGRAB, 500);
function IDGRAB() {
IDARR = [];
var RoomLink = window.location.href.slice(26, 36);
let xhr = new XMLHttpRequest();
xhr.open("POST", "https://free4talk-sync.herokuapp.com/sync/get/free4talk/groups/?a=sync-get-free4talk-groups");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
if (xhr.readyState === 4) {

var [first, second] = xhr.responseText.split(RoomLink);
var last3 = first.slice(-200)


var [third, fourth] = last3.split('","platform"');
let ID = third.slice(-24)
IDARR.push(ID);
document.getElementById("Loader").disabled = false;
document.getElementById("Loader").innerText = "Start";


}};
let doto = ('{"body":{}}');
xhr.send(doto);
}
///////////////////////////////////////////////




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
document.getElementById("Welcome").style.visibility = "hidden";


var div1 = document.getElementById('first');
var div2 = document.getElementById('second');
var div3 = document.getElementById('third');

while(div1.firstChild){
div1.removeChild(div1.firstChild);}
while(div2.firstChild){
div2.removeChild(div2.firstChild);}
while(div3.firstChild){
div3.removeChild(div3.firstChild);}

var FullDiv = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes;
for (let index = 0; index < FullDiv.length -1; index++){

var UsernameClass = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[2].childNodes[0];
var Avatar = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes[index].childNodes[1].childNodes[1].childNodes[0];
const clone = Avatar.cloneNode(true);



///////////////////////////////////////////////
const MyPhotosdiv = document.createElement("div");
MyPhotosdiv.id = UsernameClass.innerHTML;
MyPhotosdiv.className = "imgbox";
MyPhotosdiv.setAttribute("onclick","select(this)");




ImagesDiv.appendChild(MyPhotosdiv);
MyPhotosdiv.appendChild(clone);
///////////////////////////////////////////////

///////////////////////////////////////////////
const MyBtnBoxdiv = document.createElement("div");
MyBtnBoxdiv.id = "Btnbox"+ index;
MyBtnBoxdiv.className = "Btnbox";
ContainerDiv.appendChild(MyBtnBoxdiv);
///////////////////////////////////////////////

///////////////////////////////////////////////
const MyButtons = document.createElement("button");
MyButtons.innerHTML = UsernameClass.innerHTML;
MyButtons.id = "user"+ index;
MyButtons.className = "ant-btnY";
MyButtons.setAttribute("onclick","Mute()");
MyBtnBoxdiv.appendChild(MyButtons);
///////////////////////////////////////////////

///////////////////////////////////////////////
const MyIconBoxdiv = document.createElement("div");
MyIconBoxdiv.id = "imgbox"+ index;
MyIconBoxdiv.className = "imgbox";
MuteDiv.appendChild(MyIconBoxdiv);
///////////////////////////////////////////////

///////////////////////////////////////////////

///////////////////////////////////////////////






}


}
}

function select(ele) {
let BABA = ele.id;
let xhr = new XMLHttpRequest();
xhr.open("POST", "https://free4talk-sync.herokuapp.com/sync/get/free4talk/groups/?a=sync-get-free4talk-groups");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
const myObj = JSON.parse(xhr.responseText);
var Clients = myObj["data"][IDARR]["clients"];

Clients.find(x => x.name === BABA).avatar;


document.getElementById("InfoImg").src=Clients.find(x => x.name === BABA).avatar;
document.getElementById("ThisUserID").innerText="ID: " +Clients.find(x => x.name === BABA).id;
document.getElementById("UserNameGet").innerText=Clients.find(x => x.name === BABA).name;
document.getElementById("FollowersCount").innerText="Followers: " +Clients.find(x => x.name === BABA).followers;
document.getElementById("FriendsCount").innerText="Friends: " +Clients.find(x => x.name === BABA).friends;
document.getElementById("FollowingCount").innerText="Following: " +Clients.find(x => x.name === BABA).following;

var cols55 = document.getElementsByClassName('UserInfoClass');
for(i=0; i<cols55.length; i++) {
cols55[i].style.top = '30%';
}





}
}


var chnuk1 = ('{"body":{"roomIds":["')
var chnuk3 =('"]}}')
let data = chnuk1 +IDARR+ chnuk3;
xhr.send(data);}



function Mute() {
let i = 0;
let text = window.event.target.id;
let imgID = text.replace("user", "");






const Supp = document.createElement("div");
Supp.className = "overlay supporter";
Supp.id = "Cool";
Supp.setAttribute("style","display: block;");
const Div2 = document.createElement("div");
Div2.className = "block";
var Supporter = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes[imgID].childNodes[1];
Supporter.appendChild(Supp);
const element2 = document.getElementById("Cool");
element2.appendChild(Div2);








username= window.event.target.textContent || window.event.target.innerText;
document.getElementById("Notification").style.visibility = "visible";
document.getElementById("clear").disabled = true;
document.getElementById("Notification").innerText = username+ " is being muted";
document.getElementById("Confirm-name").innerText = username+ " was trying to send messages, however, they got deleted. Do you want to see them?"
document.getElementById("PreMessages").innerText = "Deleted messages of " +username+ " :";
var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '-100px';}
document.getElementById("stops").style.visibility = "visible";
const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-acute-guitar-single-string-2325.wav");
audio.play();
var xpathx = '//div[@class="name"]/*[text()="'+username+'"]/../../button[2]';
var matchingElementx = document.evaluate(xpathx, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
matchingElementx.click();
matchingElementx.click();



var MuteClicking = setInterval(function(){
var xpathy = '//div[text()="'+username+'" and @class="blind"]/../span[text()=" Mute" ]/..';
var matchingElementy = document.evaluate(xpathy, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var checkBox = document.getElementById("check1");
if (checkBox.checked == true){
xMuteClicking();
  } else {
   matchingElementy.click();
  }
}, 300);



function xMuteClicking() {
var xpathy = '//div[text()="'+username+'" and @class="blind"]/../span[text()=" Mute" ]/..';
var matchingElementy = document.evaluate(xpathy, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var Unmute = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes[imgID].childNodes[1].childNodes[4].childNodes[0].innerHTML
var long = Unmute.length
if (long < 10) {
matchingElementy.click();
}
}






let ArrayOfTexts=[];
var DeleteChat = setInterval(function(){
var xpath = '//span[text()="'+username+'"]/../../../div[2]/div[2]/button';
var xpathd = '//div[text()="'+username+'" and @class="blind"]/../span[text()=" Clear Chat" ]/..';
var xpathn = '//span[text()="OK"]/..';
var Textpath = '//span[text()="'+username+'"]/../../../div[2]/div[1]/p';
var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (matchingElement != null) {
var matchingElement = document.evaluate(Textpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
ArrayOfTexts.push(matchingElement.innerText);
matchingElement.click();
var matchingElementy = document.evaluate(xpathd, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
matchingElementy.click();
var matchingElementn = document.evaluate(xpathn, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
matchingElementn.click()
}

}, 300);

var DisconnectBypass = setInterval(function(){
var xpathxs = '//div[@class="name"]/*[text()="'+username+'"]/../../button[2]';
var matchingElementxs = document.evaluate(xpathxs, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
matchingElementxs.click();
matchingElementxs.click();
}, 5000);

var Blocking = setInterval(function(){
const nodeList = document.querySelectorAll(".Btnbox");
for (let i = 0; i < nodeList.length; i++) {
var UserIDArray = "user"+i;
document.getElementById(UserIDArray).disabled = true;}
}, 100);





stops.onclick = function () {
var Supporter = document.getElementsByClassName('sc-bMVAic kPErRA')[0].childNodes[0].childNodes[imgID].childNodes[1];
cools  = document.getElementById("Cool");
if (cools != null) {
Supporter.removeChild(cools);}


var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '3px';}
console.clear();
var filteredArr = ArrayOfTexts.filter(function(item, index) {
  if (ArrayOfTexts.indexOf(item) == index)
    return item;
});

const d = new Date();
const h = d.getHours()
const m = d.getMinutes();
const s = d.getSeconds();
var temp = "";
for(var i= 0; i < filteredArr.length; i++) {
temp += ("<p> [" +h+":" +m+"] " +filteredArr[i]+ "</p>");}

document.getElementById("XXXX").innerHTML = temp;

if (filteredArr.length >=   1) {
var cols = document.getElementsByClassName('ConfirmationClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '15px';}
const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-chord-swell-short-692.wav");
audio.play();
document.getElementsByClassName("ant-modal-body").innerHTML = temp;

var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '-100px';}

}


document.getElementById("Notification").style.visibility = "hidden";
document.getElementById("Notification").innerText = "";
/////document.getElementById(imgID).style.visibility = "hidden";
var element = document.getElementById("stops");
document.getElementById("stops").style.visibility = "hidden";
document.getElementById("clear").disabled = false;
clearInterval(MuteClicking);
clearInterval(DeleteChat);
clearInterval(Blocking);
clearInterval(DisconnectBypass);


stop = true;
const nodeList = document.querySelectorAll(".Btnbox");
for (let i = 0; i < nodeList.length; i++) {
var UserIDArray = "user"+i;
document.getElementById(UserIDArray).disabled = false;
}};}
const myTimeout = setTimeout(clean, 1);




function clean() {
const clear = document.getElementById("clear");
var xxx = document.querySelector("#ShowRunner").classList.length;
    if (xxx === 1 ) {
document.querySelector("#ShowRunner").classList.add("slide");
document.getElementById("clear").innerText = "Show";
document.getElementById("stops").style.visibility = "hidden";
document.getElementById("Notification").style.visibility = "hidden";
var cols = document.getElementsByClassName('wrapping');
for(i=0; i<cols.length; i++) {
cols[i].style.left = '-500px';
}
var colsdss = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsdss.length; i++) {
colsdss[i].style.top = '-100px';}

}
if (xxx === 2 ) {
document.querySelector("#ShowRunner").classList.remove("slide");
document.getElementById("clear").innerText = "Hide";
document.getElementById("Notification").style.visibility = "visible";
const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-happy-bell-alert-601.wav");
audio.play();
   var cols = document.getElementsByClassName('wrapping');
for(i=0; i<cols.length; i++) {
cols[i].style.left = '7px';
}
var colsdww = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsdww.length; i++) {
colsdww[i].style.top = '3px';}
}
}

function OneTime() {
document.getElementById("clear").style.visibility = "visible";
document.querySelector("#ShowRunner").classList.remove("slide");
document.getElementById("clear").innerText = "Hide";
var cols = document.getElementsByClassName('wrapping');
for(i=0; i<cols.length; i++) {
cols[i].style.left = '7px';
}

var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '3px';}
}
const Rest = setTimeout(Restores, 1)
function Restores() {
const WelcomeMessage  = document.querySelectorAll('.depLok').length > 0;
if (WelcomeMessage) {
Run();
} else {
  setTimeout(Restores, 100);
}}
function Run(){
const whatever  = document.querySelectorAll('.sc-fjdhpX').length > 0;
if (whatever) {
var x = document.getElementsByClassName('sc-fjdhpX eyTYBo')[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent;
document.getElementById("Welcome").innerText = ""}
else {
Restores();}}


function sound() {

}


</script>

<script>
CloseDialogue.onclick = function () {
const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-negative-tone-interface-tap-2569.wav");
audio.play();
var colsdsss = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsdsss.length; i++) {
colsdsss[i].style.top = '3px';}
var colsd = document.getElementsByClassName('MessagesClass');
for(i=0; i<colsd.length; i++) {
colsd[i].style.left = '150%';}
}
cancel.onclick = function () {
var cols = document.getElementsByClassName('ConfirmationClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-300px';}
var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '3px';}
}
ShowIt.onclick = function () {
const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-interface-hint-notification-911.wav");
audio.play();
var cols = document.getElementsByClassName('ConfirmationClass');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-300px';}

var colsd = document.getElementsByClassName('MessagesClass');
for(i=0; i<colsd.length; i++) {
colsd[i].style.left = '20%';
}
}
settingsclose.onclick = function () {
var cols = document.getElementsByClassName('settings');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '-500px';}

var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '3px';}
}

SettingsIcon.onclick = function () {
var cols = document.getElementsByClassName('settings');
for(i=0; i<cols.length; i++) {
cols[i].style.top = '30%';}

var colsd = document.getElementsByClassName('SettingsPos');
for(i=0; i<colsd.length; i++) {
colsd[i].style.top = '-100px';}

}


update.onclick = function () {
app = window.open('https://github.com/windowsisoplanet/xFileshSt/raw/main/F4T.user.js');
app.close();
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

</script>


<script>
function html2canvas() {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://html2canvas.hertzen.com/dist/html2canvas.js";
    document.body.appendChild( scriptElement );
}

</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-alpha1/html2canvas.js">
</script>











` );


/* CSS */
GM_addStyle ( `

.SettingsPos {
position: fixed;
transition: top 0.7s;
top: 3px;
left: 45px;
}







.UserInfoClass {
position: fixed;
transition: top 0.7s;
top: -200%;
left: 30%;
}




.slide {

}

.modal {
  display: block;
  position: fixed; /* Stay in place */
top:100px;
left:250px;
    width:550px;
    height:250px;

}

.wrapping {
  display: flex;
 position:fixed;
 top:45px;
transition: left 0.6s;
 width:30%;
}

.ConfirmationClass {
 top:-300px;
 left:5px;
transition: top 0.8s;
}

.MessagesClass {
    display: flex;
    position: fixed;
    top: 19%;
    left: 150%;
    transition: left 0.8s;
    opacity: 100%;
    width:500px;
}
.settings {
    display: flex;
    position: fixed;
    top: -500px;
    left: 30%;
    transition: top 0.3s;

width:500px;
}

.Not-Att {
position:fixed;
top:9px;
left:106px;
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
position:fixed;
top:7px;
left:5px;
font-size: 14px;
-webkit-animation: colorchange 1.5s infinite alternate;
}
@-webkit-keyframes colorchange {
  0% {
    color: #eedd82;
  }

  30% {
    color:  #ffbf00;
  }
    60% {
    color: ff9912;
  }
    100% {
    color: white;
  }
}

.ant-btnY {
    line-height: 1.499;
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
    padding: 0 15px;
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
      width: 15%;
}
#first {
    width:35px;
    height:250px;
}
#second {
    width:220px;
    height:250px;
}
#third {
    width:30px;
    height:250px;
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
  height: 50px;
}
.Img {
  width: 32px;
  height: 32px;
    border: 1px solid black;
}
.MT {
  width: 28px;
  height: 28px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 34px;
}
.switch input {
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
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
input:checked + .slider:before {
  -webkit-transform: translateX(80px);
  -ms-transform: translateX(80px);
  transform: translateX(67px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

` );

GM_addStyle ( "                         \
#Loader {                         \
        position:       fixed;          \
        top:            7px;\
        left:           8px;\
    }    \
#startBTN {                         \
        position:       fixed;          \
        top:            7px;\
        left:           300px;\
    }    \
#stopBTN {                         \
        position:       fixed;          \
        top:            7px;\
        left:           80px;\
    }    \
#stops {                         \
        position:       fixed;          \
        top:            7px;\
        left:           52px;\
    }    \
#clear {                         \
        position:       fixed;          \
        top:            7px;            \
        left:           4px;            \
    }    \
#MuteIcon0 {                         \
        position:       fixed;          \
        top:            40px;            \
        left:           280px;            \
    }    \
   \
   \
" );
