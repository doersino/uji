const options = {
    // TODO replace letters
    shape: {letter: "𐡎", description: "shape (1: circle, 2: square)", min: 1, max: 2, step: 1},
    radius: {letter: "𐡀", description: "radius of circle", min: 0, max: 3000, step: 10},
    rotationspeed: {letter: "R", description: "rotation speed", min: -0.15, max: 0.15, step: 0.005},
    rotationoriginhori: {letter: "X", description: "horizontal origin of rotation as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    rotationoriginverti: {letter: "X", description: "vertical origin of rotation as a fraction of the canvas height", min: 0, max: 1, step: 0.01},
    expansionhori: {letter: ">", description: "horizontal rate of expansion or contraction per iteration", min: 0.97, max: 1.03, step: 0.0005},
    expansionverti: {letter: ">", description: "horizontal rate of expansion or contraction per iteration", min: 0.97, max: 1.03, step: 0.0005},
    thickness: {letter: "T", description: "line thiccness in pixels", min: 0.1, max: 10, step: 0.1},
    // TODO colors, etc.

    opacity: {letter: "X", description: "opacity of line segments", min: 0, max: 1, step: 0.01, class: "halftransparent"},

    segments: {letter: "𐡔", description: "number of line segments the circle is comprised of", min: 100, max: 10000, step: 100},
    skipchance: {letter: "𐡜", description: "chance each line segment will be skipped during drawing in each iteration", min: 0, max: 1, step: 0.01},

    fps: {letter: "𐡚", description: "frames per second", min: 1, max: 240, step: 1},
    iterations: {letter: "𐡘", description: "iterations before stopping", min: 10, max: 2000, step: 1},
    width: {letter: "𐡏", description: "canvas width in pixels", min: 500, max: 2560, step: 1},
    height: {letter: "𐡉", description: "canvas height in pixels", min: 500, max: 2560, step: 1},
    horicenter: {letter: "X", description: "horizontal center as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    vericenter: {letter: "X", description: "vertical center as a fraction of the canvas height", min: 0, max: 1, step: 0.01},

    canvasred: {letter: "R", description: "red component of background color", min: 0, max: 255, step: 1, class: "red"},
    canvasgreen: {letter: "G", description: "green component of background color", min: 0, max: 255, step: 1, class: "green"},
    canvasblue: {letter: "B", description: "blue component of background color", min: 0, max: 255, step: 1, class: "blue"},
    // TODO binary: draw background at all? (or white)

    linered: {letter: "R", description: "red component of line color", min: 0, max: 255, step: 1, class: "red"},
    linegreen: {letter: "G", description: "green component of line color", min: 0, max: 255, step: 1, class: "green"},
    lineblue: {letter: "B", description: "blue component of line color", min: 0, max: 255, step: 1, class: "blue"},

    blendmode: {letter: "M", description: "blend mode used during line drawing (0: source-over, 1: multiply, 2: screen, 3: overlay, 4: darken, 5: lighten, 6: color-dodge, 7: color-burn, 8: hard-light, 9: soft-light, 10: difference, 11: exclusion)", min: 0, max: 11, step: 1},
};

const optionSections = {
    "": ["shape", "radius", "horicenter", "vericenter"],
    "expansion": ["expansionhori", "expansionverti"],
    "rotation": ["rotationspeed", "rotationoriginhori", "rotationoriginverti"],
    "line drawing": ["segments", "skipchance", "thickness", "linered", "linegreen", "lineblue", "opacity", "blendmode"],
    "canvas": ["width", "height", "canvasred", "canvasgreen", "canvasblue"],
    "nitpicky details": ["fps", "iterations"],

};

// TODO integrate into options?
const defaults = {
    shape: 2,
    radius: 1000,
    rotationspeed: 0.01,
    rotationoriginhori: 0.5,
    rotationoriginverti: 0.5,
    expansionhori: 0.999,
    expansionverti: 0.999,
    thickness: 1,

    opacity: 0.2,

    segments: 1000,
    skipchance: 0.4,

    fps: 60,
    iterations: 200,
    width: 1024,
    height: 1024,
    horicenter: 0.5,
    vericenter: 0.5,

    canvasred: 255,
    canvasgreen: 255,
    canvasblue: 255,

    linered: 0,
    linegreen: 0,
    lineblue: 0,

    blendmode: 0,
};

let optionValues = JSON.parse(JSON.stringify(defaults));

function setupOptions() {
    let rendered = "";
    Object.keys(optionSections).forEach(s => {
        rendered += `<hr><h2>${s}</h2>`;
        optionSections[s].forEach(n => {
            const o = options[n];
            const v = optionValues[n];
            let c = "";
            if (o.hasOwnProperty("class")) {
                c = o.class;
            }
            rendered += `<label><div class="letter">${o.letter}</div><input type="range" min="${o.min}" max="${o.max}" step="${o.step}" value="${v}" name="${n}" oninput="handleOptionInput(this)" class="${c}"><div class="value">${v}</div><div class="description">${o.description}</div></label>`;
        });
    });
    document.querySelector(".bitsnbobs").innerHTML = rendered;
}
setupOptions();

function handleOptionInput(e) {
    unselectPreset();
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
    Object.keys(optionValues).forEach(refreshRenderedOption);
}

const presets = {
    "ⴻ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⴼ": "{\"shape\":1,\"radius\":290,\"rotationspeed\":0.005,\"rotationoriginhori\":0.24,\"rotationoriginverti\":0.13,\"expansionhori\":1.001,\"expansionverti\":0.9935,\"thickness\":0.2,\"opacity\":0.9,\"segments\":8900,\"skipchance\":0.4,\"fps\":28,\"iterations\":29,\"width\":1519,\"height\":1791,\"horicenter\":0.5,\"vericenter\":0.53,\"canvasred\":32,\"canvasgreen\":47,\"canvasblue\":47,\"linered\":28,\"linegreen\":174,\"lineblue\":125,\"blendmode\":5}",
    "ⴽ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⴾ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵃ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵅ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵉ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵋ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵌ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵒ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵚ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "ⵣ": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "A": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "B": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "C": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "D": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "E": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "F": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "G": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "H": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "I": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "J": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "K": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "L": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "=": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "+": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "-": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
    "no": "{\"shape\":2,\"radius\":1000,\"rotationspeed\":-0.085,\"rotationoriginhori\":0.32,\"rotationoriginverti\":0.5,\"expansionhori\":0.999,\"expansionverti\":0.999,\"opacity\":0.2,\"segments\":1000,\"skipchance\":0.4,\"fps\":60,\"iterations\":1000,\"width\":1024,\"height\":1024,\"horicenter\":0.5,\"vericenter\":0.5}",
};

function setupPresets() {
    let rendered = "";
    Object.keys(presets).forEach(n => {
        const p = presets[n];
        rendered += `<button name="${n}" onclick="handlePresetClick(this)">${n}</button>`;
    });
    document.querySelector(".presets").innerHTML = rendered;
}
setupPresets();

function handlePresetClick(e) {
    unselectPreset();
    const preset = JSON.parse(presets[e.name]);
    applyPreset(preset);
    e.classList.add("selected");
}
function applyPreset(preset) {
    optionValues = Object.assign(optionValues, preset);
    refreshAllRenderedOptions();
    restartRendering(optionValues);
}
function unselectPreset() {
    const selectedPreset = document.querySelector(".presets .selected");
    if (selectedPreset) {
        selectedPreset.classList.remove("selected");
    }
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

function randomize() {
    // TODO exclude fps/iterations/size/etc.? only randomize a few sliders at a time?
    let randomized = JSON.parse(JSON.stringify(optionValues));
    Object.keys(options).forEach(n => {
        const o = options[n];
        const v = optionValues[n];

        const minScaled = o.min / o.step;
        const maxScaled = o.max / o.step;
        let rand = parseInt(minScaled + Math.random() * (maxScaled - minScaled)) * o.step;
        // TODO deal with dumb floating point stringification stuff
        if (!o.step.toString().includes(".")) {
            rand = parseInt(rand);
        }
        randomized[n] = rand;
    });
    applyPreset(randomized);
}

function generateShareURL(options) {
    // TODO for each option, output char and value, append to url of current html doc?
}

function parseShareURL(url) {
    // TODO regex maybe: (.[0-9.]+)+
}

function share() {
    // TODO generate url (also, if the page was opened with such an url, load that thing)
    // TODO set url of page to that (or maybe do that on every change?)
    // TODO copy to clipboard (see mddb)

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
let blendModes = ["source-over", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion"];

function restartRendering(opts) {
    let w = opts.width;
    let h = opts.height;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    // TODO for export's sake, actually draw a rect with this color
    canvas.setAttribute("style", `background-color: rgb(${opts.canvasred},${opts.canvasgreen},${opts.canvasblue})`);

    clearInterval(inter);
    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = blendModes[opts.blendmode];

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

        line = line.map((p, i) => {

            let x = p[0];
            let y = p[1];

            if (i == 0 || r() < opts.skipchance) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x = center[0] + (x - center[0] + r() - 0.5) * opts.expansionhori ** n + Math.cos(n/100);
            y = center[1] + (y - center[1] + r() - 0.5) * opts.expansionverti ** n - Math.sin(i/100);

            return rotate([w * opts.rotationoriginhori, h * opts.rotationoriginverti], [x,y], opts.rotationspeed);
        });
        ctx.strokeStyle = `rgba(${opts.linered},${opts.linegreen},${opts.lineblue},${opts.opacity})`;
        ctx.lineWidth = opts.thickness;
        ctx.stroke();
    }, 1000 / opts.fps);
}

restartRendering(optionValues);
