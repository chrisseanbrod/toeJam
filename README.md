# Cosmic Castaways
An original browser exploration game inspired by the offbeat exploration of classic console games. All graphics are drawn in code; no extracted console artwork, music, or assets are used.

## Play on Windows
Install Node.js 20 or newer. Open a terminal in this folder and run `npm start`. Open http://localhost:3000 in your browser. No dependency installation is needed.

Choose the funky or big alien using the PLAYER menu. Move with WASD or arrow keys. Collect three golden ship parts on each of three islands, then enter the elevator at the north end. Collect wrapped presents to add identified items to the top-right gift toolbar. Click a gift to use it, or select with 1/2/3 and press Space. Rocket sneakers increase speed, snacks restore two hearts, and shields protect you. Unused gifts carry between islands. The toolbar shows the actual item icons; the ACTIVE PRESENTS panel animates running effects and counts down their duration. Ground presents have distinct packaging and matching content icons. Avoid dancers, lawnmower locals, devils, walking mailboxes, and bees. P pauses; New Expedition restarts.

## Development
`npm test` runs gameplay tests. The game uses native Canvas and JavaScript modules with a small Node static server. Edit `public/world.js` for simulation and `public/game.js` for rendering. `PORT` optionally sets the server port.

This first prototype is single player with three difficulty levels using the same island layout. Co-op, audio, procedural islands, and gamepad/touch support are future features. No external assets or credentials are required.
