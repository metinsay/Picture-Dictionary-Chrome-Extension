var lastQuery;
var cache=[];
var numImages=4;
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
function getDefinition(text){return "Insert definition of "+text;}
function loadImages(text){

  if(lastQuery==text)
    return;
  lastQuery=text;

  const key =    'AIzaSyAXN4fGhe1QQ4IzmHmP3k41GisPZWKZ0AM';
  const oldkey = 'AIzaSyAniCHF1d7zJWlzyW4wOcAw5M-BTOQapPk';
  const cx = '001108766585115529364:gjel7ctrn4m';
  const num = numImages;

  let query = 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&q='
  query += text +  '%20clipart';
  query += '&%20searchType=%E2%80%9Cimage%E2%80%9D&%20num=' + num
  var xhr = new XMLHttpRequest();

  xhr.open("GET", query, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);
  console.log(result);

  for (i = 0; i < numImages; i++) {
      const url = result.items[i].pagemap.cse_thumbnail[0].src;
      cache[i]=url;
  }
  return query;
}
var mouseX,mouseY;
function logMouse(e){
    mouseX=e.pageX;
    mouseY=e.pageY+20;
}
function updateImage(){
    var element=document.getElementById("def");
    element.style.left=mouseX+"px";
    element.style.top=mouseY+"px";
    var text=getSelectionText();
    document.getElementById("def-text").innerHTML=getDefinition(text);
    loadImages(text);
    for(var i=0;i<numImages;i++)
        document.getElementById("def-image"+i).src=cache[i];
    showDefineDiv(1);
}
function search(){
    updateImage();
}
function showDefineDiv(show){
    var e=document.getElementById("def");
    e.style.display=show?"block":"none";
}
document.addEventListener("keydown", function (e) {
    e = e || window.event;
    if(e.key=="Escape")
        showDefineDiv(0);
    // use e.keyCode
});
document.addEventListener("click", logMouse);
document.body.innerHTML+=`<div id="def" style="display:none"> 
    <span id="def-text">Insert definition</span><br/>
    <img id="def-image0" class="imgDef" ></img>
    <img id="def-image1" class="imgDef" ></img>
    <img id="def-image2" class="imgDef" ></img>
    <img id="def-image3" class="imgDef" ></img>
    </div>
    `;
