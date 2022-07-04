import { main } from './main.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator
      .serviceWorker
      .register('./sw.js')
      .then(() => console.log('[INFO] Service worker registered!'))
      .catch(() => console.warn("[WARK] Ops, service worker wasn't registered!"));
  });
}

main();
