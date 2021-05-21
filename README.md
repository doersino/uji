# uji

*A minimalist generative art thing – play with the sliders and press the buttons.*

TODO the interface is designed(or rather, deliberately not designed) for exploration through play – both for you, as the user, and me, as the person who made the weird-ass interface. maybe link to place where/if i strung together development screenshots/states

TODO meditative, just play with the sliders etc.

TODO if you find that changing one slider slightly modifies some behavior you'd expect to be the domain of other sliders: let's just say that's a constraint designed to send your creative mind down fresh paths (and not lazy implementation details).

TODO some demo images or gif/video

TODO ...

TODO name: https://en.wikipedia.org/wiki/Uji_(Being-Time), but really something i made in brachiosaurus (https://github.com/doersino/brachiosaurus/blob/24fb60c86e037053ed1003a356a7ca1d8135c5fd/examples.py#L413) and later made the logo of this tool using mddb

## Things I wanted to add but didn't because I would've gotten bored of it and never released this thing

Perhaps I'll revisit this list at some point if motivation strikes.

* More shapes and options, of course.
* Allowing fine-grained adjustment of the options via keyboard shortcuts – when hovering over a slider, press <kbd>+</kbd> or <kbd>-</kbd> to increment and decrement its value according to its `step` attribute, perhaps with <kbd>shift</kbd> for a 10× larger change.
* History: I think keeping the *current* action along with the *last* instance `optionValues` should suffice? If a user keeps adjusting the same value, the history would stay constant, then. The thinking needs to a be a bit more fleshed out than this, though.
* Keeping option values in local storage and restoring them on load if no URL hash present.
* WebGL rendering (although blend modes and blurring might not be so easy there).


known bugs: chrome often less distinct/clear/bright lines than other browsers


## License

Not sure how much legal weight the following sentence has (if any): This license doesn't apply if you're using this tool to generate art intended for distribution as an NFT. TODO link, etc. As a result, it is prohibited to TODO, although I'll make an exception if you invest 100% of your revenue into bird seed and disperse said bird seed around your area for the local birds to feed on, take pictures of all that, and send them to me so I can look at birbs.

THE MIT LICENSE EXCEPT YOU'RE NOT ALLOWED TO MAKE AN NFT UNLESS YOU USE THE PROCEEDS TO FEED BIRDS

TODO license stuff
