# Cosmic Castaways
An original browser exploration game inspired by the offbeat exploration of classic console games. No Sega characters, artwork, music, or assets are used.

## Play on Windows
Install Node.js 20 or newer. Open a terminal in this folder and run `npm start`. Open http://localhost:3000 in your browser. No dependency installation is needed.

Move with WASD or arrow keys. Collect three golden ship parts on each of three islands, then enter the elevator at the north end. Collect wrapped presents and press Space for rocket sneakers, health, or a shield. Avoid the purple-hatted locals. P pauses; New Expedition restarts.

## Development
`npm test` runs gameplay tests. The game uses native Canvas and JavaScript modules with a small Node static server. Edit `public/world.js` for simulation and `public/game.js` for rendering. `PORT` optionally sets the server port.

This first prototype is single player with three difficulty levels using the same island layout. Co-op, audio, procedural islands, and gamepad/touch support are future features. No external assets or credentials are required.
