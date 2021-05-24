const options = {

    // Note: When adding more options, only add to the bottom in order not to
    // break the prefixing used to shorten option keys in presets and shared
    // links. Option keys should use only a-z, and obviously there shouldn't be
    // any duplicate keys (not like that would work). The keys shouldn't be
    // changed. The defaults should be zero values, effectively no-ops, or,
    // where that doesn't make sense, sensible defaults since newly added
    // options must not modify the behavior of existing presets or shared links.

    shape: {letter: "𐡎", description: "shape (1: circle, 2: square, 3: triangle, 4: line)", min: 1, max: 4, step: 1, default: 1},
    radius: {letter: "𐤕", description: "radius of shape", min: 0, max: 3000, step: 10, default: 500},
    rotationspeed: {letter: "𐤒", description: "rotation speed (in degrees per iteration)", min: -5, max: 5, step: 0.05, default: 0},
    rotationoriginhori: {letter: "𐡄", description: "horizontal origin of rotation as a fraction of the canvas width", min: 0, max: 1, step: 0.01, default: 0.5},
    rotationoriginverti: {letter: "𐤊", description: "vertical origin of rotation as a fraction of the canvas height", min: 0, max: 1, step: 0.01, default: 0.5},
    expansionhori: {letter: "𐤗", description: "horizontal rate of expansion or contraction per iteration", min: 0.95, max: 1.05, step: 0.001, default: 1},
    expansionverti: {letter: "𐤓", description: "vertical rate of expansion or contraction per iteration", min: 0.95, max: 1.05, step: 0.001, default: 1},
    thickness: {letter: "𐤇", description: "line thiccness in pixels", min: 0.1, max: 4, step: 0.1, default: 1},
    segments: {letter: "𐡔", description: "number of line segments the shape is comprised of", min: 100, max: 20000, step: 100, default: 1000},
    skipchance: {letter: "𐡛", description: "chance each line segment will be skipped during drawing in each iteration", min: 0, max: 1, step: 0.01, default: 0},
    iterations: {letter: "𐡘", description: "iterations before stopping", min: 10, max: 2000, step: 1, default: 500},
    width: {letter: "𐤑", description: "canvas width in pixels", min: 500, max: 2560, step: 1, default: 1024},
    height: {letter: "𐡉", description: "canvas height in pixels", min: 500, max: 2560, step: 1, default: 1024},
    horicenter: {letter: "𐤔", description: "horizontal center as a fraction of the canvas width", min: 0, max: 1, step: 0.01, default: 0.5},
    vericenter: {letter: "𐤘", description: "vertical center as a fraction of the canvas height", min: 0, max: 1, step: 0.01, default: 0.5},
    canvasred: {letter: "𐤏", description: "red component of background color", min: 0, max: 255, step: 1, default: 255, class: "red"},
    canvasgreen: {letter: "𐤏", description: "green component of background color", min: 0, max: 255, step: 1, default: 255, class: "green"},
    canvasblue: {letter: "𐤏", description: "blue component of background color", min: 0, max: 255, step: 1, default: 255, class: "blue"},
    canvasopacity: {letter: "𐡈", description: "opacity of background color", min: 0, max: 1, step: 0.01, default: 1, class: "halftransparent"},
    linered: {letter: "𐤟", description: "red component of line color", min: 0, max: 255, step: 1, default: 0, class: "red"},
    linegreen: {letter: "𐤟", description: "green component of line color", min: 0, max: 255, step: 1, default: 0, class: "green"},
    lineblue: {letter: "𐤟", description: "blue component of line color", min: 0, max: 255, step: 1, default: 0, class: "blue"},
    lineopacity: {letter: "𐡈", description: "opacity of line segments", min: 0, max: 1, step: 0.01, default: 1, class: "halftransparent"},
    blendmode: {letter: "𐤀", description: "blend mode used during line drawing (0: source-over, 1: multiply, 2: screen, 3: overlay, 4: darken, 5: lighten, 6: color-dodge, 7: color-burn, 8: hard-light, 9: soft-light, 10: difference, 11: exclusion)", min: 0, max: 11, step: 1, default: 0},
    fadeoutspeed: {letter: "𐡞", description: "rate at which line segments disappear in later iterations (-1 to disable)", min: -1, max: 1000, step: 1, default: -1},
    initialrotation:  {letter: "𐤈", description: "initial rotation of shape (in degrees)", min: 0, max: 359, step: 1, default: 0},
    revealspeed: {letter: "𐡗", description: "rate at which line segments are added (-1 to disable)", min: -1, max: 500, step: 1, default: -1},
    translationhori: {letter: "𐡝", description: "horizontal rate of linear movement per iteration (in pixels)", min: -10, max: 10, step: 0.1, default: 0},
    translationverti: {letter: "𐡍", description: "vertical rate of linear movement per iteration (in pixels)", min: -10, max: 10, step: 0.1, default: 0},
    rotationperiod: {letter: "𐤙", description: "period of sinusoidal rotation variance (in iterations, -1 to disable)", min: -1, max: 1000, step: 1, default: -1},
    wavinessphori: {letter: "𐤉", description: "period of horizontal sinusoidal expansion variance (in line segments, -1 to disable)", min: -1, max: 10000, step: 1, default: -1},
    wavinesspverti: {letter: "𐡇", description: "period of vertical sinusoidal expansion variance (in line segments, -1 to disable)", min: -1, max: 10000, step: 1, default: -1},
    wavinessahori: {letter: "𐡒", description: "amplitude of horizontal sinusoidal expansion variance", min: 0, max: 10, step: 0.1, default: 1},
    wavinessaverti: {letter: "𐡅", description: "amplitude of vertical sinusoidal expansion variance", min: 0, max: 10, step: 0.1, default: 1},
    jitter: {letter: "𐡕", description: "jitter added to the shape in each iteration", min: 0, max: 10, step: 0.1, default: 1},
    rotationuntil: {letter: "𐡐", description: "until which iteration should the rotation fade to zero? (-1 to disable)", min: -1, max: 2000, step: 1, default: -1},
    fadeoutstart: {letter: "𐡂", description: "iteration where line segments begin disappearing", min: 0, max: 1000, step: 1, default: 0},
    sawtoothfadeoutsize: {letter: "𐡚", description: "size of \"saw teeth\" that disappear (in line segments, -1 to disable)", min: -1, max: 5000, step: 10, default: -1},
    sawtoothfadeoutstart: {letter: "𐤋", description: "iteration where line segments begin disappearing, saw-tooth-style", min: 0, max: 1000, step: 1, default: 0},
    expansionhoriexp: {letter: "𐡜", description: "exponential factor added to horizontal rate of expansion or contraction", min: -100, max: 300, step: 1, default: 0},
    expansionvertiexp: {letter: "𐡙", description: "exponential factor added to vertical rate of expansion or contraction", min: -100, max: 300, step: 1, default: 0},
    canvasnoise: {letter: "𐡀", description: "intensity of salt-and-pepper noise applied to canvas", min: 0, max: 1, step: 0.01, default: 0},
    shadowblur: {letter: "𐤎", description: "size of blurry shadow applied to line segments (in pixels, non-zero values might not play well with some blend modes)", min: 0, max: 50, step: 0.1, default: 0},
    linecap: {letter: "𐤂", description: "line cap (1: butt, 2: round, 3: squre)", min: 1, max: 3, step: 1, default: 1},

    // See note above when adding more.
};

let optionShorts = {};
let shortsOptions = {};
Object.keys(options).forEach(n => {
    for (let i = 1; i < n.length; i++) {
        let prefix = n.substring(0, i);
        if (!Object.values(optionShorts).includes(prefix)) {
            optionShorts[n] = prefix;
            shortsOptions[prefix] = n;
            break;
        }
    }
    // could handle case where all prefixes already exist, but that's not gonna happen here, so whatever
});

const optionSections = {
    "": ["shape", "radius", "horicenter", "vericenter", "iterations"],
    "expansion": ["expansionhori", "expansionverti", "expansionhoriexp", "expansionvertiexp"],
    "rotation": ["initialrotation", "rotationspeed", "rotationoriginhori", "rotationoriginverti", "rotationperiod", "rotationuntil"],
    "movement": ["translationhori", "translationverti"],
    "waviness": ["jitter", "wavinessphori", "wavinessahori", "wavinesspverti", "wavinessaverti"],
    "fade": ["revealspeed", "fadeoutspeed", "fadeoutstart", "sawtoothfadeoutsize", "sawtoothfadeoutstart"],
    "line": ["segments", "skipchance", "thickness", "linecap", "linered", "linegreen", "lineblue", "lineopacity", "blendmode", "shadowblur"],
    "canvas": ["width", "height", "canvasred", "canvasgreen", "canvasblue", "canvasopacity", "canvasnoise"],
};

const defaults = Object.fromEntries(Object.entries(options).map(([n, o]) => [n, o.default]));

let optionValues = JSON.parse(JSON.stringify(defaults));

function setupOptions() {
    let rendered = "";
    Object.keys(optionSections).forEach(s => {
        rendered += `<hr><h2>${s}</h2>`;
        optionSections[s].forEach(n => {
            const o = options[n];
            let c = "";
            if (o.hasOwnProperty("class")) {
                c = o.class;
            }
            rendered += `<label class="${c}"><div class="letter">${o.letter}</div><input type="range" min="${o.min}" max="${o.max}" step="${o.step}" value="${o.default}" name="${n}" class="slider" oninput="handleOptionInput(this)"><input type="text" value="${o.default}" name="${n}" class="value" oninput="handleOptionValueInput(this)"><div class="description">${o.description}</div></label>`;
        });
    });
    document.querySelector(".bitsnbobs").innerHTML = rendered;
}

function handleOptionInput(e) {
    divergePreset();
    const v = parseFloat(e.value);
    optionValues[e.name] = v;
    refreshRenderedOptionValue(e.name);
    refreshShareSheetUrl();
    restartRendering(optionValues);
}
function handleOptionValueInput(e) {
    divergePreset();
    const v = parseFloat(e.value);
    optionValues[e.name] = v;
    refreshRenderedOptionValue(e.name);
    e.parentElement.querySelector(".slider").value = v;
    refreshShareSheetUrl();
    restartRendering(optionValues);
}
function refreshRenderedOptionValue(name) {
    const e = document.querySelector(`.bitsnbobs .value[name=${name}]`);
    const v = optionValues[name];

    // avoid possibly making the cursor jump to the end
    if (v != e.value) {
        e.value = v;
    }

    if (v != Math.min(Math.max(v, options[e.name].min), options[e.name].max)) {
        e.classList.add("out-of-bounds");
    } else {
        e.classList.remove("out-of-bounds");
    }
}
function refreshRenderedOption(name) {
    const e = document.querySelector(`.bitsnbobs .slider[name=${name}]`);
    const v = optionValues[name];
    e.value = v;
    refreshRenderedOptionValue(name);
}
function refreshAllRenderedOptions() {
    Object.keys(optionValues).forEach(refreshRenderedOption);
}

const presets = {
    "ⵋ": "s4r320ro-0.2ex1.003t0.5se5000i450v0.13c223ca216can168l201li96lin34line0.25b10f711re100tra1.1rotat100wav2740wavi0.8wavin0.1sa460saw168",
    "ⴼ": "s2r1250ro0.025e0.994ex0.994t0.5se8000sk0.74i1388w2560h2560line0.35wav1300",
    "ⵛ": "s3r1560ro-0.4e0.988ex0.988t0.2se8000i297c170ca181can180l232li255lin222b3tr-0.9wa239wav95wavi0.3wavin2j4.7",
    "ⵍ": "s4r460ro0.05rot0.68rota1e0.999ex1.05t2se3000sk0.5i201v0.94c0ca34can28l238li169lin54line0.75b3f196rotat9j0.2",
    "ⵟ": "r170ro-0.4e1.013ex1.01t1.8se9000i192w2560h2560c16ca12can26l159li157lin161b3f153j2fa77sa170saw58",
    "ⵥ": "s4r1080ro-0.9t0.5se5600sk0.31i201w2560h2560c44ca55can78l163li183lin201b6f201re172tr0.9wav2200",
    "ⵣ": "s2r820ro-0.55e0.996ex0.996t0.8sk0.47i192w2095h2104ho0.46v0.58c0ca0can0l200li233lin255in21re18wav336j1.5sa70saw72exp-10expa58canva0.4",
    "ⵠ": "r590ro-0.5e0.995ex0.995t0.8se4000i134w1659h1381c81ca91can103l255li255lin255line0.8f129in150wa913wav1586wavi0.2wavin0.3j0.5fa14sa70saw34exp15expa183sh20",
    "ⵒ": "s3r1820ro5rot0.46rota0.22e0.96ex0.965t1.5se4000i297w2560h2560ho0.77v0.52c0ca0can0l233li243lin255b8f384rotat192wa432wav143wavi1.2wavin0.5j0.1",
    "ⴱ": "s2r320ro0.15e0.997ex0.997se10510i1474line0.02f1000re37canva0.04",
    "ⴶ": "r1080ro-0.9e0.999ex0.997t0.5se5600sk0.31i201w2560h2560c44ca55can78l192li183lin201b6f201re172tr0.9wav2200",
    "ⵅ": "s2r100ro-1e1.01ex1.01t0.3se10000sk0.5i259ho0.56v0.46c13ca13can51l238li243lin230f302tr1tra1rotat500j0.1",
    "ⵙ": "r10ro2.55rot0.51rota0e1.05ex1.05t0.2se5000i100w1342h1342ho1v0c177ca63can32l227li173lin99rotat100wa47wavi8j0.1canva0.08",
    "ⵢ": "r2550ro-3.2rot0.19rota0.53e0.97ex0.97t0.4se5700sk0.27i48w2300h2218ho0.89v0.43c194ca248can190canv0l254li218lin66line0.8tr0.5tra2j8sa0exp48expa-13",
    "ⵉ": "s2r300ro-0.2e1.002ex0.995t0.5se5000i460c42ca47can72l158li180lin212line0.25b3tra0.9rotat100wav576wavin0.1j1.3sa100saw53canva0.04",
    "ⵚ": "r250ro1.9e1.007ex1.01se10000i402w2560h2560c77ca89can167l183li173lin194b3tr2.2rotat201wa4615wav2932wavi0.5j0.1",
    "ⴳ": "s4r550t4se100i335v0c151ca172can207l201li230lin255line0.66b9f336in180tra-3wa150wav24wavi0.1wavin0.1j0.5",
    "ⵞ": "r160ro-0.65e1.005ex1.006t0.5i402w2560h2560c0ca0can17l255li244lin204line0.05f1000wa300j10",
    "ⵓ": "s4r390ro0.15e0.994se5000i565w857h1372v0.04c53ca39can48l255li255lin255line0.24b3f803tra1.8wa6000wav6000wavi0.1wavin0.4j0.1",
    "ⵘ": "s4ro4e0.99ex0.983t0.8i278v0.01c16ca26can27l173li179lin147b8in183tr-3.7wa50wav40j0.2",
    "ⵆ": "s3r650ro5t2se400sk0.25i77w1995h1995c20ca23can39l227li235lin255b8in41j0sh5",
    "ⵐ": "s2r1010ro-0.95rot0.65rota0.2e0.977ex0.969i58w1401h1401ho0.33v0.31f384re35wa95wav47wavi1.2wavin2j0.1",
    "ⵖ": "r400ro-0.4rota0.64e1.01ex1.01se10000i192h2560v0.64c229ca210can136l172li102lin194b7f71tra-1.3rotat201wa1874wav3557wavi1.2wavin0.9j0.2fa82",
    "ⵤ": "s4r330ro-0.45ex1.022t0.3se4000sk0.2i316w1679h2164ho0.29v0.97c66ca69can71l218li223lin218line0.7in3re66tr2.5tra-5rotat33wa1634wav864wavi0.1wavin0.2j0.4rotati220sa120saw183expa-6canva0.05sh10",
    "ⴵ": "s4r100ro-2.5e0.98ex1.01i1005ho0.22v0.22c7ca10can16l196li219lin255line0.16f1000rotat384wa287wav576wavi3wavin3j0.2",
    "ⴻ": "s3r550ro-0.2e0.999ex0.985t0.5se2900i335ho0.36v0.42c26ca22can47l204li181lin145line0.66f336in238tra-3wa150wav24wavi0.1wavin0.1j0.7",
    "ⵡ": "s3r360ro-0.95e0.995ex0.997t1.5i460v0.46c33ca33can89l194li202lin255b8f105j0.2fa34sa120saw10exp17expa-25",
    "ⴸ": "s3r1600ro0.2e0.99ex0.998se6400i402w1114h1580v0c5ca23can37l175li141lin140line0.27b8f403wav747j3.4sa410",
    "ⴲ": "r1850ro0.7rot0.25rota0.25e0.994ex0.994t0.5se11000sk0.74i603w2560h2560ho0.52ca238can239l172li168lin168line0.04b10rotat170wav1300j8",
    "ⵌ": "r200ro4e1.05ex0.958se5000sk0.8i508w1580h1580ho0.51v0.52c44ca55can96l126li164lin240b2tr10tra10j0.2",
    "ⴷ": "r10ro-1e1.037ex1.037t2se1300sk0.1i220w946h946ho0.43c11ca15can20l159li204lin148re13rotat60wa358wav415wavi0.4wavin0.3j0canva0.1sh30linec2",
    "ⵎ": "s4r630ro0.1t0.3se4000i1206v0c244ca242can222l53lin12line0.3tr-0.1tra1rotat403wav3749wavin0.1j0.4",
    "ⴿ": "r30ro2.75e1.05ex1.05t0.2se2000sk0.5i58w2005c16ca21can60l130li163lin199b6wa432wav47wavi5wavin5j10canva0.3sh7.5",
    "ⵄ": "s2r520ro0.15e0.996ex0.997se10510i1474canv0line0.02f1000wa398wav268wavi0.1wavin0.1",
    "ⵇ": "s4r980ro-4.65e0.995ex0.995t4se100sk0.5i240w2372h1708c89ca107can72l255li255lin255line0.66b3rotat730j0canva0.07linec3",
    "ⴾ": "r200ro0.3rota0.4e1.007ex1.007t0.8se8000i508w2560ho0.14c4ca4can12l196li174lin211line0.8b6f658in357tr4rotat66wa1970wav2643wavi0.2wavin0.2j0.5sh15",
    "ⴴ": "s2r1280ro-0.35rot0.12rota0.13e0.989ex0.989t4se100sk0.67i450w2560h2560c38ca18can10l188li72b6f1000rotat600wa18wav47wavi0.1wavin0.1",
    "ⵁ": "r200e1.002ex1.002t0.5se10000sk0.5i470w1920h1280ho0.3canv0li10lin66line0.1f33tr0.6j0.5fa420",
    "ⵃ": "s2r130ro-0.1t0.4i259w1698c44ca44can44l179li179lin179b6f225re25wa816wav336wavi3.2sa140saw48canva0.05",
    "⌘": "",
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
    applyPreset(presets[e.name]);
    e.classList.add("selected");
}
function applyPreset(preset) {
    const opts = parseShareHash(preset);
    applyOptions(opts);
}
function applyOptions(opts) {

    // first reset everything to defaults...
    optionValues = Object.assign(optionValues, defaults);

    // then apply the new, possibly-incomplete options
    optionValues = Object.assign(optionValues, opts);

    refreshAllRenderedOptions();
    refreshShareSheetUrl();
    restartRendering(optionValues);
}
function applyRandomPreset() {

    // exclude last preset since it's empty on purpose
    const i = Math.floor(Math.random() * (Object.keys(presets).length - 1));
    const l = Object.keys(presets)[i];
    const p = presets[l];
    applyPreset(p);
    const e = document.querySelector(`.presets button[name=${l}]`)
    e.classList.add("selected");
}
function unselectPreset() {
    const selectedPreset = document.querySelector(".presets .selected");
    if (selectedPreset) {
        selectedPreset.classList.remove("selected");
    }
    const divergedPreset = document.querySelector(".presets .diverged");
    if (divergedPreset) {
        divergedPreset.classList.remove("diverged");
    }
}
function divergePreset() {
    const selectedPreset = document.querySelector(".presets .selected");
    if (selectedPreset) {
        selectedPreset.classList.remove("selected");
        selectedPreset.classList.add("diverged");
    }
}

// commented-out since it only very rarely produces interesting results – the
// space is just way too n-dimensional. also, would need to deal with floating
// point stringification stuff, which ugh
/*function randomize() {
    let randomized = JSON.parse(JSON.stringify(defaults));
    Object.keys(options).forEach(n => {
        const o = options[n];
        const v = optionValues[n];

        const minScaled = o.min / o.step;
        const maxScaled = o.max / o.step;
        let rand = parseInt(minScaled + Math.random() * (maxScaled - minScaled)) * o.step;
        if (!o.step.toString().includes(".")) {
            rand = parseInt(rand);
        }
        randomized[n] = rand;
    });
    applyOptions(randomized);
}*/

function downloadFile(hrefData, filename) {
    const a = document.createElement("a");
    a.href = hrefData;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.outerHTML = "";
}
function download() {
    const date = new Date().toISOString().replace(/\:/g, ".");
    const hash = generateShareHash(optionValues);
    const filename = `uji_${date}_${hash}.png`;

    // poor man's async
    setTimeout(() => {
        downloadFile(canvas.toDataURL(), filename);
    }, 1);
}

function generateShareHash(opts) {
    let hash = "";
    Object.keys(opts).forEach(n => {

        // omit values identical to defaults
        if (opts[n] === defaults[n]) {
            return;
        }

        const l = optionShorts[n];
        const v = opts[n];
        hash += `${l}${v}`;
    });
    return hash;
}
function generateShareURL(opts) {
    const baseUrl = window.location.href.replace(window.location.hash, "");
    const hash = generateShareHash(opts);
    const url = `${baseUrl}#${hash}`;
    return url;
}
function parseShareHash(hash) {
    //const matches = [...hash.matchAll(/([a-z]+)([0-9.\-]+)/g)];
    let matches = [];
    const regex = /([a-z]+)([0-9.\-]+)/g;
    let temp;
    while ((temp = regex.exec(hash)) !== null) {
        matches.push(temp);
    }

    if (!matches) return false;
    let opts = {};
    matches.forEach(m => {
        const n = shortsOptions[m[1]];
        if (!n) return false;
        const v = parseFloat(m[2]);
        if (v === undefined) return false;  // important not to use !v here since !0 => true
        opts[n] = v;
    })
    return opts;
}
function parseShareURL(url) {
    const hash = url.split("#")[1];
    if (!hash) return false;
    return parseShareHash(hash);
}
function tryExtractingOptionsFromUrl() {
    return parseShareURL(window.location.href);
}
function showShareStatus(text) {
    const shareStatus = document.querySelector(".share-status");
    shareStatus.innerText = text;
    shareStatus.style.display = "block";
}
function clearShareStatus() {
    document.querySelector(".share-status").style.display = "none";
}
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

    if (successful) {
        showShareStatus("Success!");
    } else {
        let text = "Couldn't copy"
        if (error) text += ` (${err})`
        text += " – try copying the URL manually."

        showShareStatus(text);
    }
}
function openShareLink() {
    const caring = document.querySelector(".caring");
    window.location = caring.value;
}
async function shareShareLink() {
    const url = document.querySelector(".caring").value;

    try {
        await navigator.share({url: url});
    } catch(err) {
        if (err.name != "AbortError") {
            showShareStatus(`Couldn't share (${err}) – try copying the URL manually.`);
        }
    }
}
function tweetShareLink() {
    const url = document.querySelector(".caring").value;
    const text = "I've created some generative art, take a look!"

    let link = document.createElement("a");
    link.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    link.target = "_blank";
    link.click();
}
function refreshShareSheetUrl() {
    const shareUrl = generateShareURL(optionValues);
    document.querySelector(".caring").value = shareUrl;
    clearShareStatus();
}
function share() {
    const shareButton = document.querySelector(".share");
    const shareSheet = document.querySelector(".share-sheet");

    if (shareSheet.style.display == "block") {
        shareSheet.style.display = "none";
        shareButton.classList.remove("active");
    } else {
        refreshShareSheetUrl();
        clearShareStatus();
        shareSheet.style.display = "block";
        shareButton.classList.add("active");
    }
}

// out-of-place rotation of p = [x₁,y₁] around o = [x₂,y₂], based on
// http://stackoverflow.com/a/2259502
function rotate(o, p, angle) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    // copy point
    p = [p[0],p[1]];

    // translate point back to origin
    p[0] -= o[0];
    p[1] -= o[1];

    // rotate point
    const xnew = p[0] * c - p[1] * s;
    const ynew = p[0] * s + p[1] * c;

    // translate point back
    p[0] = xnew + o[0];
    p[1] = ynew + o[1];

    return p;
}

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
let inter = null;
let line = null;

const r = Math.random;

function restartRendering(opts) {
    clearInterval(inter);

    // reset canvas
    const w = opts.width;
    const h = opts.height;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    ctx.clearRect(0, 0, w, h);

    // generate initial line
    const center = [w * opts.horicenter, h * opts.vericenter];
    const radius = opts.radius;
    const segments = opts.segments;
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

    // draw background
    if (opts.canvasnoise > 0) {

        // get some pixels for making noise (this tile size has proven a good
        // compromise between performance and non-repetitiveness)
        let tileSize = 512;
        let imageData = ctx.createImageData(tileSize, tileSize);

        // prepare for light and dark pixels: linear interpolation between
        // canonical color and halfway to black/white
        const dark = [
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasred),
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasgreen),
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasblue),
        ];
        const light = [
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasred + opts.canvasnoise / 2 * 255),
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasgreen + opts.canvasnoise / 2 * 255),
            parseInt((1 - opts.canvasnoise / 2) * opts.canvasblue + opts.canvasnoise / 2 * 255),
        ];

        // make noise
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (r() < 0.5) {
                imageData.data[i] = dark[0];
                imageData.data[i+1] = dark[1];
                imageData.data[i+2] = dark[2];
            } else {
                imageData.data[i] = light[0];
                imageData.data[i+1] = light[1];
                imageData.data[i+2] = light[2];
            }
            imageData.data[i+3] = parseInt(opts.canvasopacity * 255);
        }

        // apply to image
        for (let x = 0; x < w; x += tileSize) {
            for (let y = 0; y < h; y += tileSize) {
                ctx.putImageData(imageData, x, y);
            }
        }
    } else {
        ctx.fillStyle = `rgba(${opts.canvasred},${opts.canvasgreen},${opts.canvasblue},${opts.canvasopacity})`;
        ctx.fillRect(0, 0, w, h);
    }

    // setup line drawing settings
    ctx.strokeStyle = `rgba(${opts.linered},${opts.linegreen},${opts.lineblue},${opts.lineopacity})`;

    const blendModes = ["source-over", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion"];
    ctx.globalCompositeOperation = blendModes[opts.blendmode];

    const lineCaps = ["butt", "round", "square"];
    ctx.lineCap = lineCaps[opts.linecap - 1];

    if (opts.shadowblur > 0) {
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = opts.shadowblur;
    }

    const iterationsMeter = document.querySelector(".iterations i");
    let lastIterationsMeterUpdate = Date.now();

    // thing goes brr
    let n = 0;
    inter = setInterval(() => {

        // update iterations meter every 200ms (frequent dom updates are performance poison!), "transition: 0.2s linear" takes care of making things look smooth
        if (Date.now() >= lastIterationsMeterUpdate + 200) {
            iterationsMeter.style.width = `${100 * n / opts.iterations}%`;
            lastIterationsMeterUpdate = Date.now();
        }

        if (++n > opts.iterations) {
            clearInterval(inter);
            iterationsMeter.style.width = "0";
        }

        ctx.beginPath();

        line = line.map((p, i) => {
            let x = p[0];
            let y = p[1];

            if (   i == 0
                || r() < opts.skipchance
                || (opts.fadeoutspeed > -1 && n - opts.fadeoutstart > i % r() * opts.fadeoutspeed)
                || (opts.sawtoothfadeoutsize > -1 && n - opts.sawtoothfadeoutstart > i % opts.sawtoothfadeoutsize)
                || (opts.revealspeed > -1 && i / opts.revealspeed > n)
                ) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x = center[0] + (x - center[0] + (r() - 0.5) * opts.jitter) * opts.expansionhori ** (1 + opts.expansionhoriexp * n / 1000) + opts.translationhori + ((opts.wavinessphori > -1) ? (opts.wavinessahori * Math.sin(2 * Math.PI * i / opts.wavinessphori)) : 0);
            y = center[1] + (y - center[1] + (r() - 0.5) * opts.jitter) * opts.expansionverti ** (1 + opts.expansionvertiexp * n / 1000) + opts.translationverti + ((opts.wavinesspverti > -1) ? (opts.wavinessaverti * Math.sin(2 * Math.PI * i / opts.wavinesspverti)) : 0);

            let angle = opts.rotationspeed * (Math.PI / 180);
            if (opts.rotationperiod > -1) angle *= Math.sin(2 * Math.PI * n / opts.rotationperiod);
            if (opts.rotationuntil > -1) angle *= (opts.rotationuntil - Math.min(n, opts.rotationuntil)) / opts.rotationuntil;
            p = rotate([w * opts.rotationoriginhori, h * opts.rotationoriginverti], [x, y], angle);

            return p;
        });

        ctx.lineWidth = opts.thickness;
        ctx.stroke();

    }, 1000 / 60);
}

window.addEventListener("load", e => {
    setupPresets();
    setupOptions();

    const opts = tryExtractingOptionsFromUrl();
    if (opts) {
        applyOptions(opts);
    } else {
        applyRandomPreset();
    }
});
