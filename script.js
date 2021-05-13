const dimensions = [2048, 2048];

////////////////////////////////////////////////////////////////////////

const options = {
    shape: {letter: "𐡎", description: "shape (1: circle, 2: square)", min: 1, max: 2, step: 1},
    radius: {letter: "𐡀", description: "radius of circle", min: 0, max: 3000, step: 10},
    segments: {letter: "𐡔", description: "number of line segments the circle is comprised of", min: 100, max: 10000, step: 100},
    skipchance: {letter: "𐡜", description: "chance each line segment will be skipped during drawing in each iteration", min: 0, max: 1, step: 0.01},
    fps: {letter: "𐡚", description: "frames per second", min: 1, max: 1000, step: 1},
    iterations: {letter: "𐡘", description: "iterations before stopping", min: 10, max: 5000, step: 1},
    width: {letter: "𐡏", description: "canvas width in pixels", min: 500, max: 2500, step: 1},
    height: {letter: "𐡉", description: "canvas height in pixels", min: 500, max: 2500, step: 1},
    horicenter: {letter: "𐡏", description: "horizontal center as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    vericenter: {letter: "𐡏", description: "vertical center as a fraction of the canvas height", min: 0, max: 1, step: 0.01},
};

const defaults = {
    shape: 2,
    radius: 1000,
    segments: 1000,
    fps: 60,
    iterations: 1000,
    skipchance: 0.4,
    width: 1024,
    height: 1024,
    horicenter: 0.5,
    vericenter: 0.5,
};
let optionValues = JSON.parse(JSON.stringify(defaults));
//optionValues = JSON.parse("{\"shape\":2,\"radius\":1000,\"segments\":1600,\"fps\":11,\"iterations\":59,\"skipchance\":0.4}");

function setupOptions() {
    let rendered = "";
    Object.keys(options).forEach(n => {
        const o = options[n];
        const v = optionValues[n];
        rendered += `<label><div class="letter">${o.letter}</div><input type="range" min="${o.min}" max="${o.max}" step="${o.step}" value="${v}" name="${n}" oninput="handleOptionInput(this)" id="option-${n}"><div class="value">${v}</div><div class="description">${o.description}</div></label>`;
    })
    document.querySelector(".bitsnbobs").innerHTML = rendered;
}
setupOptions();

function handleOptionInput(e) {
    optionValues[e.name] = parseFloat(e.value);
    e.parentElement.querySelector(".value").innerText = parseFloat(e.value);
    restartRendering(optionValues);
}
function refreshRenderedOption(name) {
    const e = document.querySelector(`.bitsnbobs [name=${name}]`);
    const v = optionValues[name];
    e.value = v;
    e.parentElement.querySelector(".value").innerText = v;
}
function refreshAllRenderedOptions() {
    Object.keys(options).forEach(refreshRenderedOption);
}
function applyPreset(preset) {
    optionValues = Object.assign(optionValues, preset);
    refreshAllRenderedOptions();
    restartRendering(optionValues);
}

function restartRendering() {
    // clear interval, reset, apply options, restart
}

// based on https://stackoverflow.com/a/16245768
function htmlToObjectURL(html) {
    const sliceSize = 512;
    const byteArrays = [];

    for (let offset = 0; offset < html.length; offset += sliceSize) {
        const slice = html.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: 'text/html'});
    const url = URL.createObjectURL(blob)
    return url;
}

function canvasToDataURL(canvas) {
    return canvas.toDataURL();
}

function downloadFile(hrefData, filename) {
    let a = document.createElement("a");
    a.href = hrefData;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.outerHTML = "";
}

function download() {
    let filename = "art_" + new Date().toISOString().replace(/\:/g, ".");
    downloadFile(htmlToObjectURL(document.documentElement.outerHTML), filename + ".html")
    setTimeout(() => {downloadFile(canvasToDataURL(canvas), filename + ".png");}, 100);  // safari doesn't like two simultaneous downloads
}

function refresh() {
    location.reload(true)
}

function stop() {
    clearInterval(inter);
}

// out-of-place rotation of p = [x₁,y₁] around o = [x₂,y₂], based on
// http://stackoverflow.com/a/2259502
function rotate(o, p, angle) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    // copy point
    p = [p[0],p[1]];

    // translate point back to origin
    p[0] -= o[0];
    p[1] -= o[1];

    // rotate point
    var xnew = p[0] * c - p[1] * s;
    var ynew = p[0] * s + p[1] * c;

    // translate point back:
    p[0] = xnew + o[0];
    p[1] = ynew + o[1];

    return p;
}

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
let inter = null;

let r = Math.random;

function restartRendering(opts) {
    let w = opts.width;
    let h = opts.height;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    clearInterval(inter);
    ctx.clearRect(0, 0, w, h);

    // generate initial line
    let center = [w * opts.horicenter, h * opts.vericenter];
    let radius = opts.radius;
    let segments = opts.segments;
    line = [];
    for (let i = 0; i < segments; i++) {
        let x, y;
        if (opts.shape == 1) {
            x = center[0] + 2 * radius * Math.cos((i / segments) * 2 * Math.PI);
            y = center[1] + 2 * radius * Math.sin((i / segments) * 2 * Math.PI);
        } else if (opts.shape == 2) {
            if (i < segments / 4) {
                x = center[0] - radius + 2 * radius * (i / (segments / 4));
                y = center[1] - radius;
            } else if (i < segments / 2) {
                x = center[0] + radius;
                y = center[1] - radius + 2 * radius * ((i - segments / 4) / (segments / 4));
            } else if (i < 3 * segments / 4) {
                x = center[0] + radius - 2 * radius * ((i - segments / 2) / (segments / 4));
                y = center[1] + radius;
            } else {
                x = center[0] - radius;
                y = center[1] + radius - 2 * radius * ((i - 3 * segments / 4) / (segments / 4));
            }
        }

        line.push([x,y]);
    }

    // thing goes brr
    let n = 0;
    inter = setInterval(() => {
        if (n++ > opts.iterations) clearInterval(inter);

        ctx.beginPath();

        // draw
        line = line.map((p, i) => {

            let x = p[0];
            let y = p[1];

            if (i == 0 || r() < opts.skipchance) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x = center[0] + (x - center[0] + r() - 0.5) * 0.999 ** n + Math.cos(n/100);
            y = center[1] + (y - center[1] + r() - 0.5) * 0.999 ** n - Math.sin(i/100);

            return rotate([500,500], [x,y], 0.01);
        });
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.stroke();
    }, 1000 / opts.fps);
}

restartRendering(optionValues);
