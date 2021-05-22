# UJI

*A minimalist generative art thing – press the buttons and play with the sliders.*

The interface is designed (or, rather, deliberately *not designed*) for **exploration through play** – both for you, as the user, and me, as the person who made the weird-ass interface. It's intended to facilitate a vaguely meditative and creative environment.

![It's not desktop-only, by the way!](example-laptop.jpg)

The **tiled buttons at the top are presets** – use them as jumping-off points, or click your way through them to see what's possible before starting afresh by yourself. The "⌘" preset has all options set to their defaults, so it's a good starting point once you've played around a bit.

The **sliders control every aspect of the generated images**. Hover over the icons next to them (which feature glyphs from [Imperial Aramaic](https://en.wikipedia.org/wiki/Imperial_Aramaic#Unicode) and [Phoenician](https://en.wikipedia.org/wiki/Phoenician_alphabet#Unicode)) for descriptions of what each slider does.

#### [🎨 Play around with the various options at `doersino.github.io/uji/`!](https://doersino.github.io/uji/)

If you find that changing a slider slightly modifies some behavior you'd expect to be the domain of other sliders: Let's just say that's a constraint designed to send your creativity down fresh paths (and not lazy implementation details).

![This is how your apartment could look with one simple trick! (The trick is: Makin' stuff with this tool.)](example-frames.jpg)

*About the name:* I could pretend that it's referring to the concept of [*uji* in Zen Buddhism](https://en.wikipedia.org/wiki/Uji_(Being-Time)), but really, the letters just lend themselves to a pretty logo, an [initial iteration](https://github.com/doersino/brachiosaurus/blob/24fb60c86e037053ed1003a356a7ca1d8135c5fd/examples.py#L413) of which I had previously cobbled together with my pen plotting tool [Brachiosaurus](https://github.com/doersino/brachiosaurus/) and later made the [final logo](https://gist.github.com/doersino/c2c4e3f110b75ac8eef3b46a8ee30d36) using the [Markdeep Diagram Drafting Board](https://github.com/doersino/markdeep-diagram-drafting-board).


## Notes

### Setup

It's just some HTML, JavaScript, an image, and a few webfonts – so no setup is required! If you want to run this tool locally, simply `git clone` this repository or [download a ZIP](https://github.com/doersino/uji/archive/refs/heads/main.zip), then open `index.html` in your favorite browser. Of course, link sharing doesn't make a whole lot of sense in that context, but the rest should work just fine.


### Features I wanted to add but didn't because I would've gotten bored of it and never released this thing in the first place

Perhaps I'll knock some of those down at some point if motivation strikes. In the meantime, feel free to [file an issue](http://github.com/doersino/uji/issues) if you really want one of them to be implemented (or do it yourself and send a pull request!).

* Allowing fine-grained adjustment of the options via keyboard shortcuts – when hovering over a slider, press <kbd>+</kbd> or <kbd>-</kbd> to increment and decrement its value according to its `step` attribute, perhaps with <kbd>shift</kbd> for a 10× larger change.
* Maintaining an *undo*/*redo* history. I think keeping the *current* action along with the *last* instance of `optionValues` should suffice? If a user keeps adjusting the same value, the history would stay constant, then. The thinking needs to a be a bit more fleshed out than this, though.
* Keeping option values in local storage and restoring them on load if no URL hash present.
* WebGL rendering (although blend modes and blurring might not be so easy there).
* Video export, see [here](https://stackoverflow.com/questions/19235286/convert-html5-canvas-sequence-to-a-video-file/62065826#62065826) – this might be worth revisiting later since it's only been made possible at all somewhat recently.
* The possibility to export the result as a minimal JavaScript file with all `opts.*` references in the render loop substituted? That might help folks adapt their results for, say, pen plotting.


### Known bugs

Chrome tends to draw less distinct/clear/bright lines than other browsers.


## License

You may use this repository's contents under the terms of the bespoke *It's the MIT License Except You're Not Allowed to Make an NFT Unless You Use the Proceeds to Feed Birds*, see `LICENSE`.

However, the subdirectory `fonts/` contains **third-party webfonts with their own licenses**:

* Renzhi Li's **Iosevka Aile**, the typeface used throughout the interface, is licensed under the *SIL Open Font License Version 1.1*, see [here](https://github.com/be5invis/Iosevka/blob/master/LICENSE.md).
* Google's **Noto Sans**, which provides the glyphs of the ancient scripts used for presets and slider labels, is also used in accordance with its *SIL Open Font License Version 1.1*, see [here](https://github.com/googlefonts/noto-fonts/blob/main/LICENSE).

Further, the **general layout has been adapted from [Markdeep Diagram Drafting Board](https://github.com/doersino/markdeep-diagram-drafting-board) and [Crop Circles](https://github.com/doersino/cropcircles)**, both are previous projects of mine.

Finally, the **stock photo** of the laptop was taken by [Howard Bouchevereau](https://unsplash.com/photos/RSCirJ70NDM), the one showing the chair and the picture frames was captured by [Christopher Burns](https://unsplash.com/photos/BdVQU-NDtA8), and both have been sourced from [Unsplash](https://unsplash.com/).
