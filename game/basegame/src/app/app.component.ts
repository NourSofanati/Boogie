import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  title = 'Boogie';
  count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

window.onload = async () => {
  const form = document.querySelector('form');
  const chatInput = document.getElementById('chatmessage');
  const canvas = document.querySelector('canvas');
  let frequencyDataLen, frequencyData;
  let lineEmitter, dotEmitter, bufferSource, audioBuffer;
  let actx: AudioContext;
  let gainNode,noiseSpeed,noise;
  chatInput.onfocus = () => {
    form.classList.toggle('focused');
  }
  form.onsubmit = (e) => {
    e.preventDefault();
    chatInput.value = '';
    if (form.classList.contains('focused'))
      form.classList.toggle('focused');
  }
  window.onclick = (e) => {
    if (e.target != chatInput) {
      if (form.classList.contains('focused')) {
        form.classList.toggle('focused');
      }
    }
  }

  function init(t) {
    var o = t.noise = {};
    function r(t, o, r) {
      this.x = t,
        this.y = o,
        this.z = r
    }
    r.prototype.dot2 = function (t, o) {
      return this.x * t + this.y * o
    }
      ,
      r.prototype.dot3 = function (t, o, r) {
        return this.x * t + this.y * o + this.z * r
      }
      ;
    var n = [new r(1, 1, 0), new r(-1, 1, 0), new r(1, -1, 0), new r(-1, -1, 0), new r(1, 0, 1), new r(-1, 0, 1), new r(1, 0, -1), new r(-1, 0, -1), new r(0, 1, 1), new r(0, -1, 1), new r(0, 1, -1), new r(0, -1, -1)]
      , e = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
      , a = new Array(512)
      , i = new Array(512);
    o.seed = function (t) {
      t > 0 && t < 1 && (t *= 65536),
        (t = Math.floor(t)) < 256 && (t |= t << 8);
      for (var o = 0; o < 256; o++) {
        var r;
        r = 1 & o ? e[o] ^ 255 & t : e[o] ^ t >> 8 & 255,
          a[o] = a[o + 256] = r,
          i[o] = i[o + 256] = n[r % 12]
      }
    }
      ,
      o.seed(0);
    var d = .5 * (Math.sqrt(3) - 1)
      , f = (3 - Math.sqrt(3)) / 6
      , h = 1 / 6;
    function u(t) {
      return t * t * t * (t * (6 * t - 15) + 10)
    }
    function s(t, o, r) {
      return (1 - r) * t + r * o
    }
    o.simplex2 = function (t, o) {
      var r, n, e = (t + o) * d, h = Math.floor(t + e), u = Math.floor(o + e), s = (h + u) * f, l = t - h + s, w = o - u + s;
      l > w ? (r = 1,
        n = 0) : (r = 0,
          n = 1);
      var v = l - r + f
        , M = w - n + f
        , c = l - 1 + 2 * f
        , p = w - 1 + 2 * f
        , y = i[(h &= 255) + a[u &= 255]]
        , x = i[h + r + a[u + n]]
        , m = i[h + 1 + a[u + 1]]
        , q = .5 - l * l - w * w
        , z = .5 - v * v - M * M
        , A = .5 - c * c - p * p;
      return 70 * ((q < 0 ? 0 : (q *= q) * q * y.dot2(l, w)) + (z < 0 ? 0 : (z *= z) * z * x.dot2(v, M)) + (A < 0 ? 0 : (A *= A) * A * m.dot2(c, p)))
    }
      ,
      o.simplex3 = function (t, o, r) {
        var n, e, d, f, u, s, l = (t + o + r) * (1 / 3), w = Math.floor(t + l), v = Math.floor(o + l), M = Math.floor(r + l), c = (w + v + M) * h, p = t - w + c, y = o - v + c, x = r - M + c;
        p >= y ? y >= x ? (n = 1,
          e = 0,
          d = 0,
          f = 1,
          u = 1,
          s = 0) : p >= x ? (n = 1,
            e = 0,
            d = 0,
            f = 1,
            u = 0,
            s = 1) : (n = 0,
              e = 0,
              d = 1,
              f = 1,
              u = 0,
              s = 1) : y < x ? (n = 0,
                e = 0,
                d = 1,
                f = 0,
                u = 1,
                s = 1) : p < x ? (n = 0,
                  e = 1,
                  d = 0,
                  f = 0,
                  u = 1,
                  s = 1) : (n = 0,
                    e = 1,
                    d = 0,
                    f = 1,
                    u = 1,
                    s = 0);
        var m = p - n + h
          , q = y - e + h
          , z = x - d + h
          , A = p - f + 2 * h
          , b = y - u + 2 * h
          , g = x - s + 2 * h
          , j = p - 1 + .5
          , k = y - 1 + .5
          , B = x - 1 + .5
          , C = i[(w &= 255) + a[(v &= 255) + a[M &= 255]]]
          , D = i[w + n + a[v + e + a[M + d]]]
          , E = i[w + f + a[v + u + a[M + s]]]
          , F = i[w + 1 + a[v + 1 + a[M + 1]]]
          , G = .6 - p * p - y * y - x * x
          , H = .6 - m * m - q * q - z * z
          , I = .6 - A * A - b * b - g * g
          , J = .6 - j * j - k * k - B * B;
        return 32 * ((G < 0 ? 0 : (G *= G) * G * C.dot3(p, y, x)) + (H < 0 ? 0 : (H *= H) * H * D.dot3(m, q, z)) + (I < 0 ? 0 : (I *= I) * I * E.dot3(A, b, g)) + (J < 0 ? 0 : (J *= J) * J * F.dot3(j, k, B)))
      }
      ,
      o.perlin2 = function (t, o) {
        var r = Math.floor(t)
          , n = Math.floor(o);
        t -= r,
          o -= n;
        var e = i[(r &= 255) + a[n &= 255]].dot2(t, o)
          , d = i[r + a[n + 1]].dot2(t, o - 1)
          , f = i[r + 1 + a[n]].dot2(t - 1, o)
          , h = i[r + 1 + a[n + 1]].dot2(t - 1, o - 1)
          , l = u(t);
        return s(s(e, f, l), s(d, h, l), u(o))
      }
      ,
      o.perlin3 = function (t, o, r) {
        var n = Math.floor(t)
          , e = Math.floor(o)
          , d = Math.floor(r);
        t -= n,
          o -= e,
          r -= d;
        var f = i[(n &= 255) + a[(e &= 255) + a[d &= 255]]].dot3(t, o, r)
          , h = i[n + a[e + a[d + 1]]].dot3(t, o, r - 1)
          , l = i[n + a[e + 1 + a[d]]].dot3(t, o - 1, r)
          , w = i[n + a[e + 1 + a[d + 1]]].dot3(t, o - 1, r - 1)
          , v = i[n + 1 + a[e + a[d]]].dot3(t - 1, o, r)
          , M = i[n + 1 + a[e + a[d + 1]]].dot3(t - 1, o, r - 1)
          , c = i[n + 1 + a[e + 1 + a[d]]].dot3(t - 1, o - 1, r)
          , p = i[n + 1 + a[e + 1 + a[d + 1]]].dot3(t - 1, o - 1, r - 1)
          , y = u(t)
          , x = u(o)
          , m = u(r);
        return s(s(s(f, v, y), s(h, M, y), m), s(s(l, c, y), s(w, p, y), m), x)
      }
  } (this);

  init;

  var ctx = canvas.getContext("2d");
  let w = ctx.canvas.width = window.innerWidth;
  let h = ctx.canvas.height = window.innerHeight;

  window.onresize = function () {
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
  };

  let nrt = 0;
  let npt = 0;
  let dots = [];
  let lines = [];

  let config = {
    circleRadius: 80,
    multiplier: 40,
    colorSpeed: 20,
    hueStart: 220,
    glow: 0
  }

  var AudioContext = window.AudioContext;
  var playing = false, startedAt, pausedAt;

  (function () {
    if (!AudioContext) {
      console.log("No Audio");
      return;
    }
    initializeAudio();
  })();
  let analyser
  function initializeAudio() {


    console.log("Loading Audio Buffer");

    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open(
      "GET",
      "https://stream.beatstars.com/i/itsgold-171100/2036456/09d0393f7f1a3dcad1a48eb0e0f2a897.mp3",
      true
    );
    xmlHTTP.responseType = "arraybuffer";

    xmlHTTP.onload = function (e) {
      actx = new AudioContext();
      console.log("Decoding Audio File Data");

      actx.decodeAudioData(
        this.response,
        function (buffer) {
          console.log("Ready");
          //document.getElementById("info").innerHTML = "- Ready! Click anywhere to play or pause -";
          setTimeout(function () { document.getElementById("info").style.display = "none" }, 4000);
          let audioBuffer = buffer;

          // Run
          analyser = actx.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.6;
          analyser.maxDecibels = 0;
          analyser.minDecibels = -100;

          gainNode = actx.createGain();
          gainNode.connect(analyser);
          analyser.connect(actx.destination);
          frequencyDataLen = analyser.frequencyBinCount;
          frequencyData = new Uint8Array(frequencyDataLen);

          clear();//play();
          canvas.addEventListener("click", toggleAudio);
          canvas.addEventListener("touchdown", toggleAudio);
        },
        function () {
          console.log("Error decoding audio data");
        }
      );
    };

    xmlHTTP.send();
  }

  function emitDot() {
    if (dots.length > 150) { return; }
    dots.push({
      xp: w / 2,
      yp: h / 2,
      xv: Math.random() * 0.4 - 0.2,
      yv: Math.random() * 0.4 - 0.2,
      rad: Math.random() * (15 - 2) + 2,
      hue: Math.random() * 50 - 25
    });
  }

  function emitLine() {
    if (lines.length > 50) { return; }
    lines.push({
      xp: w / 2,
      yp: h / 2,
      xv: Math.random() * 0.4 - 0.2,
      yv: Math.random() * 0.4 - 0.2,
      hue: Math.random() * 50 - 25
    });
  }

  function clear() {
    var avg = averageFrequency();

    ctx.beginPath();
    var grd = ctx.createLinearGradient(w / 2, 0, w / 2, h);
    grd.addColorStop(0, "hsl(" + (config.hueStart + npt * config.colorSpeed) + ", 35%, 10%");
    grd.addColorStop(1, "hsl(" + (config.hueStart + npt * config.colorSpeed) + ", 75%, 5%");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    ctx.closePath();
  }

  function drawDots() {
    var avg = averageFrequency();

    for (let i = 0; i < dots.length; i++) {
      ctx.beginPath();
      var grd = ctx.createRadialGradient(dots[i].xp + dots[i].rad, dots[i].yp + dots[i].rad, 0, dots[i].xp + dots[i].rad, dots[i].yp + dots[i].rad, dots[i].rad);
      grd.addColorStop(0, "hsla(" + (config.hueStart + npt * config.colorSpeed + dots[i].hue) + ", 50%, 50%, " + (avg / 400) + "%)");
      grd.addColorStop(1, "hsla(" + (config.hueStart + npt * config.colorSpeed + dots[i].hue) + ", 50%, 50%, 0%)");
      ctx.fillStyle = grd;
      ctx.fillRect(dots[i].xp, dots[i].yp, dots[i].rad * 2, dots[i].rad * 2);
      ctx.closePath();

      if (dots[i].xp > w || dots[i].xp < 0 || dots[i].yp > w || dots[i].yp < 0) {
        dots[i] = dots[dots.length - 1];
        dots.pop();
      } else {
        dots[i].xp += dots[i].xv * Math.pow(avg / 1000, 1.5);
        dots[i].yp += dots[i].yv * Math.pow(avg / 1000, 1.5);
      }
    }
  }

  function drawLines() {
    var avg = averageFrequency();
    var maxDist = 150;

    for (var i = 0; i < lines.length; i++) {
      for (var j = 0; j < lines.length; j++) {
        var proDist = 100 / maxDist;
        var opacity = 100 - dist(lines[j].xp, lines[j].yp, lines[i].xp, lines[i].yp) * proDist;

        if (dist(lines[j].xp, lines[j].yp, lines[i].xp, lines[i].yp) < maxDist) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "hsla(" + (config.hueStart + npt * config.colorSpeed) + ", 50%, 50%, " + (opacity - 50) + "%)"
          ctx.moveTo(lines[i].xp, lines[i].yp);
          ctx.lineTo(lines[j].xp, lines[j].yp);
          ctx.stroke();
          ctx.closePath();
        }
      }

      if (lines[i].xp > w || lines[i].xp < 0 || lines[i].yp > w || lines[i].yp < 0) {
        lines[i] = lines[lines.length - 1];
        lines.pop();
      } else {
        lines[i].xp += lines[i].xv * avg / 500;
        lines[i].yp += lines[i].yv * avg / 500;
      }
    }
  }

  function drawSpectrum() {
    noiseSpeed = averageFrequency();
    nrt += noiseSpeed / 3000000; // Rotation
    npt += noiseSpeed / 1000000; // Distortion
    var avg = 0;

    analyser.getByteFrequencyData(frequencyData);
    var noiseRotate = noise.perlin2(10, nrt);
    var points = Math.round(frequencyDataLen - frequencyDataLen / 3);
    var avgFrq = averageFrequency();

    for (i = 0; i < points; i++) {
      avg += frequencyData[i];
      avg = avg / points;

      var x1 =
        w / 2 + (config.circleRadius + (avgFrq / 4) / points) *
        Math.cos(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var y1 =
        h / 2 + (config.circleRadius + (avgFrq / 4) / points) *
        Math.sin(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var x2 =
        w / 2 + ((config.circleRadius + (avgFrq / 4) / points) + avg * config.multiplier) *
        Math.cos(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var y2 =
        h / 2 + ((config.circleRadius + (avgFrq / 4) / points) + avg * config.multiplier) *
        Math.sin(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var x3 =
        w / 2 + ((config.circleRadius + (avgFrq / 4) / points) + Math.pow((avg * config.multiplier) * 0.09, 2)) *
        Math.cos(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var y3 =
        h / 2 + ((config.circleRadius + (avgFrq / 4) / points) + Math.pow((avg * config.multiplier) * 0.09, 2)) *
        Math.sin(-Math.PI / 2 + 2 * Math.PI * i / points + noiseRotate);
      var nd1 = noise.simplex2(y1 / 100, npt) * 10;

      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.shadowBlur = config.glow;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "hsla(" + (config.hueStart + npt * config.colorSpeed) + ", 50%, " + (20 + (Math.pow(avg * 3, 2))) + "%, 100%)";
      ctx.shadowColor = "hsla(" + (config.hueStart + npt * config.colorSpeed) + ", 50%, " + (20 + (Math.pow(avg * 3, 2))) + "%, 100%)";
      ctx.moveTo(x1 + nd1, y1 + nd1);
      ctx.lineTo(x2 + nd1, y2 + nd1);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.shadowBlur = config.glow;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "hsla(" + (config.hueStart + npt * config.colorSpeed) + ", 50%, " + (30 + (Math.pow(avg * 3, 2))) + "%, 100%)";
      ctx.shadowColor = "hsla(" + (config.hueStart + npt * config.colorSpeed) + ", 50%, " + (30 + (Math.pow(avg * 3, 2))) + "%, 100%)";
      ctx.moveTo(x1 + nd1, y1 + nd1);
      ctx.lineTo(x3 + nd1, y3 + nd1);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function render() {
    //if (!playing) return;
    clear();
    drawDots();
    drawSpectrum();
    drawLines();
    requestAnimationFrame(render);
  }

  function toggleAudio() {
    playing ? pause() : play();
  }

  function play() {
    dotEmitter = setInterval(emitDot, 50);
    lineEmitter = setInterval(emitLine, 100);
    startedAt = pausedAt ? Date.now() - pausedAt : Date.now();
    bufferSource = null;
    bufferSource = actx.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.loop = true;
    bufferSource.connect(gainNode);

    if (pausedAt) bufferSource.start(0, pausedAt / 1000);
    else bufferSource.start();

    playing = true;
    render();
  }

  function pause() {
    clearInterval(dotEmitter);
    clearInterval(lineEmitter);
    pausedAt = Date.now() - startedAt;
    bufferSource.stop();
    playing = false;
  }

  function lerp(x1, x2, n) {
    return x1 + (x2 - x1) * n;
  }

  function dist(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  function averageFrequency() {
    var avg = 0;
    for (var i = 0; i < frequencyData.length; i++) {
      avg += frequencyData[i];
    }
    return avg;
  }
}


