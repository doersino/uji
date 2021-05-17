// don't rearrange and append only at the bottom (since prefixes generated in optionShorts are used in share urls), use only a-z in keys, obviously no duplicate keys
const options = {
    // TODO replace letters
    shape: {letter: "𐡎", description: "shape (1: circle, 2: square)", min: 1, max: 2, step: 1},
    radius: {letter: "𐡀", description: "radius of circle", min: 0, max: 3000, step: 10},
    rotationspeed: {letter: "𐤒‎", description: "rotation speed", min: -0.15, max: 0.15, step: 0.005},
    rotationoriginhori: {letter: "𐤈", description: "horizontal origin of rotation as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    rotationoriginverti: {letter: "𐤊", description: "vertical origin of rotation as a fraction of the canvas height", min: 0, max: 1, step: 0.01},
    expansionhori: {letter: "𐤗‎", description: "horizontal rate of expansion or contraction per iteration", min: 0.97, max: 1.03, step: 0.0005},
    expansionverti: {letter: "𐤓‎", description: "horizontal rate of expansion or contraction per iteration", min: 0.97, max: 1.03, step: 0.0005},
    thickness: {letter: "𐤇", description: "line thiccness in pixels", min: 0.1, max: 4, step: 0.1},

    segments: {letter: "𐡔", description: "number of line segments the circle is comprised of", min: 100, max: 10000, step: 100},
    skipchance: {letter: "𐡜", description: "chance each line segment will be skipped during drawing in each iteration", min: 0, max: 1, step: 0.01},

    fps: {letter: "𐡚", description: "frames/iterations per second (probably limited by your system at the high end of the scale)", min: 1, max: 240, step: 1},
    iterations: {letter: "𐡘", description: "iterations before stopping", min: 10, max: 2000, step: 1},
    width: {letter: "𐡏", description: "canvas width in pixels", min: 500, max: 2560, step: 1},
    height: {letter: "𐡉", description: "canvas height in pixels", min: 500, max: 2560, step: 1},
    horicenter: {letter: "𐤔", description: "horizontal center as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    vericenter: {letter: "𐤘‎", description: "vertical center as a fraction of the canvas height", min: 0, max: 1, step: 0.01},

    canvasred: {letter: "𐤏", description: "red component of background color", min: 0, max: 255, step: 1, class: "red"},
    canvasgreen: {letter: "𐤏", description: "green component of background color", min: 0, max: 255, step: 1, class: "green"},
    canvasblue: {letter: "𐤏", description: "blue component of background color", min: 0, max: 255, step: 1, class: "blue"},
    canvasopacity: {letter: "𐤑‎", description: "opacity of background color", min: 0, max: 1, step: 0.01, class: "halftransparent"},

    linered: {letter: "𐤟‎", description: "red component of line color", min: 0, max: 255, step: 1, class: "red"},
    linegreen: {letter: "𐤟‎", description: "green component of line color", min: 0, max: 255, step: 1, class: "green"},
    lineblue: {letter: "𐤟‎", description: "blue component of line color", min: 0, max: 255, step: 1, class: "blue"},
    lineopacity: {letter: "𐤑‎", description: "opacity of line segments", min: 0, max: 1, step: 0.01, class: "halftransparent"},

    blendmode: {letter: "𐤀", description: "blend mode used during line drawing (0: source-over, 1: multiply, 2: screen, 3: overlay, 4: darken, 5: lighten, 6: color-dodge, 7: color-burn, 8: hard-light, 9: soft-light, 10: difference, 11: exclusion)", min: 0, max: 11, step: 1},

    fadeoutspeed: {letter: "𐡞", description: "TODO (-1 to disable)", min: -1, max: 1000, step: 1},
};

let optionShorts = {};
Object.keys(options).forEach(n => {
    for (let i = 1; i < n.length; i++) {
        let prefix = n.substring(0, i);
        if (!Object.values(optionShorts).includes(prefix)) {
            optionShorts[n] = prefix;
            break;
        }
    }
});

const optionSections = {
    "": ["shape", "radius", "horicenter", "vericenter"],
    "expansion": ["expansionhori", "expansionverti", "fadeoutspeed"],
    "rotation": ["rotationspeed", "rotationoriginhori", "rotationoriginverti"],
    "line drawing": ["segments", "skipchance", "thickness", "linered", "linegreen", "lineblue", "lineopacity", "blendmode"],
    "canvas": ["width", "height", "canvasred", "canvasgreen", "canvasblue", "canvasopacity"],
    "nitpicky details": ["fps", "iterations"],

};

// TODO integrate into options, or as a preset?
const defaults = {
    shape: 2,
    radius: 1000,
    rotationspeed: 0.01,
    rotationoriginhori: 0.5,
    rotationoriginverti: 0.5,
    expansionhori: 0.999,
    expansionverti: 0.999,
    thickness: 1,

    segments: 1000,
    skipchance: 0.4,

    fps: 60,
    iterations: 100,
    width: 1024,
    height: 1024,
    horicenter: 0.5,
    vericenter: 0.5,

    canvasred: 255,
    canvasgreen: 255,
    canvasblue: 255,
    canvasopacity: 1,

    linered: 0,
    linegreen: 0,
    lineblue: 0,
    lineopacity: 0.4,

    blendmode: 0,

    fadeoutspeed: 1000,
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
            rendered += `<label class="${c}"><div class="letter">${o.letter}</div><input type="range" min="${o.min}" max="${o.max}" step="${o.step}" value="${v}" name="${n}" oninput="handleOptionInput(this)"><div class="value">${v}</div><div class="description">${o.description}</div></label>`;
        });
    });
    document.querySelector(".bitsnbobs").innerHTML = rendered;
}

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
    "ⴰ": "s2r1000ro0.05rot0.39rota0.65e0.999ex0.999t0.5se1000sk0.5f60i115w1024h1024ho0.5v0.5c74ca83can87canv1l217li235lin255line0.69b0fa-1",
    "ⴱ": "",
    "ⴲ": "",
    "ⴳ": "",
    "ⴴ": "",
    "ⴵ": "",
    "ⴶ": "",
    "ⴷ": "",
    "ⴸ": "",
    "ⴹ": "",
    "ⴺ": "",
    "ⴻ": "",
    "ⴼ": "",
    "ⴽ": "",
    "ⴾ": "",
    "ⴿ": "",
    "ⵀ": "",
    "ⵁ": "",
    "ⵂ": "",
    "ⵃ": "",
    "ⵄ": "",
    "ⵅ": "",
    "ⵆ": "",
    "ⵇ": "",
    "ⵈ": "",
    "ⵉ": "",
    "ⵊ": "",
    "ⵋ": "",
    "ⵌ": "",
    "ⵍ": "",
    "ⵎ": "",
    "ⵏ": "",
    "ⵐ": "",
    "ⵑ": "",
    "ⵒ": "",
    "ⵓ": "",
    "ⵔ": "",
    "ⵕ": "",
    "ⵖ": "",
    "ⵗ": "",
    "ⵘ": "",
    "ⵙ": "",
    "ⵚ": "",
    "ⵛ": "",
    "ⵜ": "",
    "ⵝ": "",
    "ⵞ": "",
    "ⵟ": "",
    "ⵠ": "",
    "ⵡ": "",
    "ⵢ": "",
    "ⵣ": "",
    "ⵤ": "",
    "ⵥ": "",
    "ⵦ": "",
    "ⵧ": "",
};

function setupPresets() {
    let rendered = "";
    Object.keys(presets).forEach(n => {
        const p = presets[n];
        rendered += `<button name="${n}" onclick="handlePresetClick(this)">${n}</button>`;
    });
    document.querySelector(".presets").innerHTML = rendered;
}

function handlePresetClick(e) {
    unselectPreset();
    const preset = parseShareHash(presets[e.name]);
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

function downloadFile(hrefData, filename) {
    let a = document.createElement("a");
    a.href = hrefData;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.outerHTML = "";
}
function download() {
    // TODO also include share url hash in filename
    const date = new Date().toISOString().replace(/\:/g, ".");
    const hash = generateShareHash(optionValues);
    let filename = `uji_${date}_${hash}.png`;
    downloadFile(canvas.toDataURL(), filename);
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

function generateShareHash(opts) {
    let hash = "";
    Object.keys(opts).forEach(n => {
        const l = optionShorts[n];
        const v = opts[n];
        hash += `${l}${v}`;
    });
    return hash;
}

// TODO maybe pass base url as parameter?
function generateShareURL(opts) {
    const baseUrl = window.location.href.replace(window.location.hash, "");
    const hash = generateShareHash(opts);
    const url = `${baseUrl}#${hash}`;
    return url;
}

function parseShareHash(hash) {
    const matches = [...hash.matchAll(/([a-z]+)([0-9.]+)/g)];
    if (!matches) return false;
    let opts = {};
    matches.forEach(m => {
        const n = Object.keys(optionShorts).find(n => optionShorts[n] == m[1]);  // TODO maybe also generate inverted optionShorts to make this more elegant?
        if (!n) return false;
        const v = parseFloat(m[2]);
        if (!v) return false;
        opts[n] = v;
    })
    return opts;
}

function parseShareURL(url) {
    const hash = url.split('#')[1];
    if (!hash) return false;
    const opts = parseShareHash(hash);
    return opts;
}

// TODO rename
function tryApplyingOptionsFromUrl() {
    const opts = parseShareURL(window.location.href);
    if (opts) {
        optionValues = Object.assign(optionValues, opts);
    }
    // TODO else defaults or random preset that would also be selected in the presets interface?
}

window.addEventListener('load', e => {
    tryApplyingOptionsFromUrl();

    setupPresets();
    setupOptions();

    restartRendering(optionValues);
});

function share() {
    console.log(generateShareURL(optionValues));
    // TODO copy to clipboard (see mddb), show centered message on success or preselected noneditable text field on failure
    /*
    // ...create text input field...

    textfield.focus();
    textfield.select();

    var successful = false;
    try {
        successful = document.execCommand("copy");
    } catch (err) {
        console.log("Unable to copy to clipboard: " + err);
    }

    button.querySelector("b").innerHTML = successful ? "✅" : "❌";
    setTimeout(function() {
        button.querySelector("b").innerHTML = "";
    }, 1000);
    */
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

    clearInterval(inter);
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = `rgba(${opts.canvasred},${opts.canvasgreen},${opts.canvasblue},${opts.canvasopacity})`;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = `rgba(${opts.linered},${opts.linegreen},${opts.lineblue},${opts.lineopacity})`;

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

            if (i == 0 || r() < opts.skipchance || (opts.fadeoutspeed > -1 && n > i % r() * opts.fadeoutspeed)) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x = center[0] + (x - center[0] + r() - 0.5) * opts.expansionhori ** n;
            y = center[1] + (y - center[1] + r() - 0.5) * opts.expansionverti ** n;

            return rotate([w * opts.rotationoriginhori, h * opts.rotationoriginverti], [x,y], opts.rotationspeed);
        });

        ctx.lineWidth = opts.thickness;
        ctx.stroke();

    }, 1000 / opts.fps);
}
