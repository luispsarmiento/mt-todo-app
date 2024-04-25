/// <reference lib="webworker" />

/*addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});*/

/*async function requestBackgroundSync() {
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('my-tag-name');
}*/

addEventListener('sync', event => {
});