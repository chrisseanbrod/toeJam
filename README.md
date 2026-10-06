# Cosmic Castaways
A retro browser exploration game with hand-drawn Canvas graphics. No extracted console artwork, music, or assets are used.

## Play
Online: https://chrisseanbrod.github.io/toeJam/

For Windows development, install Node.js 20 or newer, open a terminal in this folder, run `npm start`, and open http://localhost:3000. No package installation or credentials are needed.

## Campaign
Explore ten islands, growing from 3,200 × 3,200 to 4,100 × 4,100. Each island has a different coastline, item and enemy placement, and rotating landscape colours. Find three ship parts, then enter the elevator in the north. Landing, elevator journeys, and the final escape are animated. The minimap marks your position, remaining ship parts, and the elevator.

Choose the funky or big alien in PLAYER. Move with WASD/arrows; select gifts with 1–9, then Space, or click an icon. P pauses; New Expedition restarts. Health, gifts, and remaining effect durations carry between levels.

## Gifts
1. Rocket sneakers: run faster for 8 seconds.
2. Cosmic snack: restore two hearts.
3. Disco shield: protection for 10 seconds.
4. Spring shoes: bounce faster and avoid contact damage for 12 seconds.
5. Tomato launcher: automatically shoot nearby locals for 15 seconds.
6. Boom box: make locals within 420 units stop and dance for 10 seconds.
7. Invisibility: break pursuit and avoid detection/contact damage for 10 seconds.
8. Doorway: teleport safely near an uncollected part (or the exit).
9. Umbrella: float above locals and avoid contact damage for 12 seconds.

Ground presents show matching item icons. The compact top-right toolbar shows only icons for owned or active gifts, hiding empty slots. Active icons animate and have a small duration bar; hover for item names and remaining time. The toolbar disappears when empty. Locals patrol around their home, notice you only inside a 120–190 unit radius depending on type, and give up beyond 330 units. Exclamation marks show active pursuit. Enemies spawn at least 600 units away from your landing point.

## Development
`npm test` runs gameplay and transition tests. `public/world.js` contains simulation and generation; `public/game.js` renders the game; `public/transition.js` controls travel timing. The static Node server uses port 3000, configurable with `PORT`.

Single-player prototype; co-op, audio, gamepads, and touch controls are future features. GitHub Pages serves the contents of `public/` from the `gh-pages` branch.
