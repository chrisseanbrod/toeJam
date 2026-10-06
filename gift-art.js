export const giftIcons={
 sneakers:'<path fill="#ff7867" d="M4 10h12v7l12 3v6H3v-8h1z"/><path fill="#fff7dc" d="M3 26h27v4H3zM8 12h9v3H8zM9 17h9v3H9z"/><path fill="#ffdb53" d="M0 19h3v7H0zM0 22h-3v3h3z"/>',
 snack:'<path fill="#ed9c4c" d="M3 12h26v4H3z"/><path fill="#ffd76b" d="M5 5h22v7H5z"/><path fill="#69cd62" d="M2 16h28v4H2z"/><path fill="#be563e" d="M4 20h24v4H4z"/><path fill="#ed9c4c" d="M3 24h26v5H3z"/>',
 shield:'<path fill="#77caff" d="M16 2L3 7v12l13 12 13-12V7z"/><path fill="#d7f5ff" d="M16 6l-8 4v8l8 7 8-7v-8z"/><path fill="#a578ef" d="M15 10h3v11h-3zM11 14h11v3H11z"/>'
 ,spring:'<path fill="#cd80ee" d="M3 4h12v8l14 4v6H3z"/><path fill="#eeeaff" d="M4 23h24v3H4zM8 27h17v3H8zM4 31h24v3H4z"/>',
 tomatoes:'<path fill="#f94c61" d="M5 9h23v19H5zM9 5h15v27H9z"/><path fill="#78cb4e" d="M15 0h4v10h-4zM7 6h20v4H7z"/><path fill="#ffae93" d="M9 12h4v7H9z"/>',
 boombox:'<path fill="#9a99ba" d="M0 9h32v23H0z"/><path fill="#272746" d="M3 12h9v17H3zM20 12h9v17h-9zM13 15h6v10h-6z"/><path fill="#eee4bd" d="M5 16h5v5H5zM22 16h5v5h-5z"/><path fill="#cbcbdf" d="M6 4h20v3H6zM6 4h3v8H6zM23 4h3v8h-3z"/>',
 invisible:'<path fill="#cbdcf1" d="M9 3h15v4H9zM5 7h23v17H5zM5 24h5v5H5zM14 24h5v5h-5zM23 24h5v5h-5z"/><path fill="#574380" d="M10 10h4v5h-4zM20 10h4v5h-4z"/>',
 teleport:'<path fill="#f3c56e" d="M4 1h25v32H4z"/><path fill="#442976" d="M8 5h17v27H8z"/><path fill="#a372f1" d="M12 8h10v21H12z"/><path fill="#f8edb8" d="M18 18h3v3h-3z"/>',
 umbrella:'<path fill="#ff84b6" d="M13 2h8v4h-8zM6 6h22v5H6zM1 11h32v6H1z"/><path fill="#fff1c3" d="M15 3h4v14h-4z"/><path fill="#83cee9" d="M16 17h3v12h-3zM10 29h9v4h-9zM8 25h3v6H8z"/>'
};

export function giftSvg(kind){return `<svg viewBox="-4 0 38 34" aria-hidden="true">${giftIcons[kind]}</svg>`;}
