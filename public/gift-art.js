export const giftIcons={
 sneakers:'<path fill="#ff7867" d="M4 10h12v7l12 3v6H3v-8h1z"/><path fill="#fff7dc" d="M3 26h27v4H3zM8 12h9v3H8zM9 17h9v3H9z"/><path fill="#ffdb53" d="M0 19h3v7H0zM0 22h-3v3h3z"/>',
 snack:'<path fill="#ed9c4c" d="M3 12h26v4H3z"/><path fill="#ffd76b" d="M5 5h22v7H5z"/><path fill="#69cd62" d="M2 16h28v4H2z"/><path fill="#be563e" d="M4 20h24v4H4z"/><path fill="#ed9c4c" d="M3 24h26v5H3z"/>',
 shield:'<path fill="#77caff" d="M16 2L3 7v12l13 12 13-12V7z"/><path fill="#d7f5ff" d="M16 6l-8 4v8l8 7 8-7v-8z"/><path fill="#a578ef" d="M15 10h3v11h-3zM11 14h11v3H11z"/>'
};

export function giftSvg(kind){return `<svg viewBox="-4 0 38 34" aria-hidden="true">${giftIcons[kind]}</svg>`;}
