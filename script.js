// don't rearrange and append only at the bottom (since prefixes generated in optionShorts are used in share urls), use only a-z in keys, obviously no duplicate keys
const options = {
    // TODO replace letters, fix invisibly zero-width spaces or whatever after some of them
    shape: {letter: "𐡎", description: "shape (1: circle, 2: square, 3: triangle, 4: line)", min: 1, max: 4, step: 1},
    radius: {letter: "𐡀", description: "radius of circle", min: 0, max: 3000, step: 10},
    rotationspeed: {letter: "𐤒", description: "rotation speed (in degrees per iteration)", min: -5, max: 5, step: 0.05},
    rotationoriginhori: {letter: "𐤈", description: "horizontal origin of rotation as a fraction of the canvas width", min: 0, max: 1, step: 0.01},
    rotationoriginverti: {letter: "𐤊", description: "vertical origin of rotation as a fraction of the canvas height", min: 0, max: 1, step: 0.01},
    expansionhori: {letter: "𐤗‎", description: "horizontal rate of expansion or contraction per iteration", min: 0.95, max: 1.05, step: 0.001},
    expansionverti: {letter: "𐤓‎", description: "horizontal rate of expansion or contraction per iteration", min: 0.95, max: 1.05, step: 0.001},
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

    fadeoutspeed: {letter: "𐡞", description: "rate at which line segments disappear in later iterations (-1 to disable)", min: -1, max: 1000, step: 1},

    initialrotation:  {letter: "I", description: "initial rotation of shape (in degrees)", min: 0, max: 359, step: 1},

    revealspeed: {letter: "R", description: "rate at which line segments are added (-1 to disable)", min: -1, max: 2000, step: 1},

    translationhori: {letter: "H", description: "horizontal rate of linear movement per iteration (in pixels)", min: -10, max: 10, step: 0.1},
    translationverti: {letter: "V", description: "vertical rate of linear movement per iteration (in pixels)", min: -10, max: 10, step: 0.1},

    rotationperiod: {letter: "P", description: "period of sinusoidal rotation variance (in iterations, -1 to disable)", min: -1, max: 1000, step: 1},

    wavinesshori: {letter: "W", description: "period of horizontal sinusoidal expansion variance (in line segments, -1 to disable)", min: -1, max: 1000, step: 1},
    wavinessverti: {letter: "V", description: "period of vertical sinusoidal expansion variance (in line segments, -1 to disable)", min: -1, max: 1000, step: 1},
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
    "expansion": ["expansionhori", "expansionverti", "wavinesshori", "wavinessverti", "revealspeed", "fadeoutspeed"],
    "rotation": ["initialrotation", "rotationspeed", "rotationoriginhori", "rotationoriginverti", "rotationperiod"],
    "movement": ["translationhori", "translationverti"],
    "line drawing": ["segments", "skipchance", "thickness", "linered", "linegreen", "lineblue", "lineopacity", "blendmode"],
    "canvas": ["width", "height", "canvasred", "canvasgreen", "canvasblue", "canvasopacity"],
    "nitpicky details": ["fps", "iterations"],

};

// TODO integrate into options, or as a preset?
const defaults = {
    shape: 1,
    radius: 500,
    rotationspeed: 0,
    rotationoriginhori: 0.5,
    rotationoriginverti: 0.5,
    expansionhori: 1,
    expansionverti: 1,
    thickness: 1,

    segments: 1000,
    skipchance: 0,

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
    lineopacity: 1,

    blendmode: 0,

    fadeoutspeed: -1,

    initialrotation: 0,

    revealspeed: -1,

    translationhori: 0,
    translationverti: 0,

    rotationperiod: -1,

    wavinesshori: -1,
    wavinessverti: -1,
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
    "ⴰ": "s4r1080ro-0.9rot0.5rota0.5e1ex1t0.5se5600sk0.31f60i201w2560h2560ho0.5v0.5c44ca55can78canv1l163li183lin201line1b6fa201in0re172tr0.9tra0rotat-1wa-1wav355",
    "ⴱ": "s1r140ro0.025rot0.5rota0.5e0.9995ex0.9985t0.5se1600sk0.4f60i100w1024h1024ho0.5v0.5c208ca211can223canv1l50li29lin78line1b6fa302in243",
    "ⴲ": "s4r200ro0.035rot0.44rota0.48e1.0005ex1.0005t1se1800sk0.14f60i100w1024h1024ho0.5v0.5c233ca199can177canv1l166li21lin33line0.45b0fa71in173",
    "ⴳ": "s4r500ro-0.025rot0.75rota0.44e0.9975ex0.9895t1.2se8400sk0.66f60i125w2134h2134ho0.69v0.49c243ca215can228canv1l85li20lin55line0.52b0fa939in223",
    "ⴴ": "s1r2870ro0.005rot0.5rota0.44e0.983ex0.985t0.7se4100sk0f60i613w2134h2134ho0.49v0.49c243ca215can228canv1l85li20lin55line0.52b0fa-1in223re-1tr0tra5.1rotat-1wa966wav268",
    "ⴵ": "s1r610ro0.03rot0.5rota0.44e0.998ex1.002t0.7se7900sk0.62f212i1407w2134h2134ho0.49v0.25c0ca0can0canv1l255li255lin255line1b0fa533in205re18tr0.4tra-2.5rotat-1wa759wav779",
    "ⴶ": "s2r3000ro0.025rot0.5rota0.5e0.994ex0.994t0.5se8000sk0.74f60i1388w2560h2560ho0.5v0.5c255ca255can255canv1l0li0lin0line0.35b0fa-1in0re-1tr0tra0rotat-1wa-1wav206",
    "ⴷ": "s2r1560ro0.005rot0.31rota0.69e0.994ex0.994t0.5se8000sk0.74f60i1388w2560h2560ho0.5v0.5c255ca255can255canv1l0li0lin0line0.35b0fa-1in0re-1tr0tra0rotat201wa-1wav206",
    "ⴸ": "s1r610ro0.03rot0.5rota0.59e0.999ex0.994t2.9se100sk0.62f212i1407w2134h2134ho0.49v0.25c20ca13can6canv1l238li228lin208line1b6fa533in283re18tr0.4tra0rotat158wa759wav779",
    "ⴹ": "s4r1830ro-0.025rot0.75rota0.44e0.9975ex0.9895t1.2se8400sk0.66f60i2000w2134h2134ho0.91v0.07c243ca215can228canv1l85li20lin55line0.52b0fa939in223re18tr0.4tra0rotat158wa759wav779",
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
    /*"ⵇ": "",
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
    "ⵧ": "",*/
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
    optionValues = Object.assign(optionValues, defaults);  // TODO this can be removed if it's clear that no more options will be added and all presets supply all options
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
    const matches = [...hash.matchAll(/([a-z]+)([0-9.\-]+)/g)];
    if (!matches) return false;
    let opts = {};
    matches.forEach(m => {
        const n = Object.keys(optionShorts).find(n => optionShorts[n] == m[1]);  // TODO maybe also generate inverted optionShorts to make this more elegant?
        if (!n) return false;
        const v = parseFloat(m[2]);
        if (v === undefined) return false;  // important not to use !v here since !0 => true
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

function copyShareLink() {
    const caring = document.querySelector(".caring");
    caring.focus();
    caring.select();

    let successful = false;
    let error = "";
    try {
        successful = document.execCommand("copy");
    } catch (err) {
        error = err;
    }

    const shareStatus = document.querySelector(".share-status");
    if (successful) {
        shareStatus.innerText = "Success!";
    } else {
        let text = "Couldn't copy"
        if (error) text += `(${err})`
        text += " – try copying the URL manually."

        shareStatus.innerText = text;
    }
    shareStatus.style.display = "block";
}

function share() {
    const shareButton = document.querySelector(".share");
    const shareSheet = document.querySelector(".share-sheet");

    if (shareSheet.style.display == "block") {
        shareSheet.style.display = "none";
        shareButton.classList.remove("active");
    } else {
        const shareUrl = generateShareURL(optionValues);
        document.querySelector(".caring").value = shareUrl;

        document.querySelector(".share-status").style.display = "none";
        shareSheet.style.display = "block";
        shareButton.classList.add("active");
    }
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
let line = null;

const r = Math.random;
const blendModes = ["source-over", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion"];

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
            x = center[0] + radius * Math.cos((i / segments) * 2 * Math.PI);
            y = center[1] + radius * Math.sin((i / segments) * 2 * Math.PI);
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
        } else if (opts.shape == 3) {
            if (i < segments / 3) {
                x = center[0] - radius + 2 * radius * (i / (segments / 3));
                y = center[1] + radius;
            } else if (i < 2 * segments / 3) {
                x = center[0] + radius - radius * ((i - segments / 3) / (segments / 3));
                y = center[1] + radius - 2 * radius * ((i - segments / 3) / (segments / 3));
            } else {
                x = center[0] - radius * ((i - 2 * segments / 3) / (segments / 3));
                y = center[1] - radius + 2 * radius * ((i - 2 * segments / 3) / (segments / 3));
            }
        } else if (opts.shape == 4) {
            x = center[0] - radius + 2 * radius * (i / segments);
            y = center[1];
        }

        line.push([x,y]);
    }

    if (opts.initialrotation > 0) {
        line = line.map(p => {
            return rotate([w / 2, h / 2], p, opts.initialrotation * (Math.PI / 180));
        });
    }

    // thing goes brr
    let n = 0;
    inter = setInterval(() => {
        if (n++ > opts.iterations) clearInterval(inter);

        ctx.beginPath();

        line = line.map((p, i) => {
            let x = p[0];
            let y = p[1];

            if (i == 0 || r() < opts.skipchance || (opts.fadeoutspeed > -1 && n > i % r() * opts.fadeoutspeed) || (opts.revealspeed > -1 && i / opts.revealspeed > n)) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x = center[0] + (x - center[0] + r() - 0.5) * opts.expansionhori + opts.translationhori + ((opts.wavinesshori > -1) ? Math.sin(i / opts.wavinesshori) : 0);  // TODO also amplitude of waviness
            y = center[1] + (y - center[1] + r() - 0.5) * opts.expansionverti + opts.translationverti + ((opts.wavinessverti > -1) ? Math.sin(i / opts.wavinessverti) : 0);

            return rotate([w * opts.rotationoriginhori, h * opts.rotationoriginverti], [x, y], (opts.rotationspeed * (Math.PI / 180)) * ((opts.rotationperiod > -1) ? Math.sin(n / opts.rotationperiod) : 1));
        });

        ctx.lineWidth = opts.thickness;
        ctx.stroke();

    }, 1000 / opts.fps);
}
