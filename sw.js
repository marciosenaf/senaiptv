// service-worker.js

const swRegistration = await navigator.serviceWorker.register("/sw.js");

swRegistration.onupdatefound = () => {
  const installingWorker = swRegistration.installing;

  // Atualize o app com o novo service worker
  installingWorker.update();
};
