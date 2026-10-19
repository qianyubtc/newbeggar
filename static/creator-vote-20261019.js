(function () {
  'use strict';
  var dialog = document.getElementById('creatorVote');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var storageKey = 'beggar.creatorVote.2026';
  var cookieName = 'beggar_creator_vote_2026';
  var dayMs = 86400000;
  var shown = '';
  var timer;

  // UTC 零点就是北京时间 08:00，和访客设备的时区无关。
  function period(now) { return String(Math.floor(now / dayMs)); }
  function seen(day) {
    if (shown === day) return true;
    try { if (localStorage.getItem(storageKey) === day) return true; } catch (e) {}
    try {
      return document.cookie.split(';').some(function (c) {
        return c.trim() === cookieName + '=' + day;
      });
    } catch (e) { return false; }
  }
  function remember(day) {
    shown = day;
    try { localStorage.setItem(storageKey, day); } catch (e) {}
    try {
      document.cookie = cookieName + '=' + day + '; Path=/; SameSite=Lax; Expires=' +
        new Date((Number(day) + 1) * dayMs).toUTCString() +
        (location.protocol === 'https:' ? '; Secure' : '');
    } catch (e) {}
  }
  function check() {
    clearTimeout(timer);
    var now = Date.now(), day = period(now);
    timer = setTimeout(check, (Number(day) + 1) * dayMs - now + 50);
    if (document.visibilityState === 'hidden' || dialog.open || seen(day)) return;
    if (document.querySelector('dialog[open], .modal:not([hidden])')) return;
    dialog.showModal();
    remember(day);
  }
  function close() { if (dialog.open) dialog.close(); }
  dialog.querySelector('[data-vote-close]').addEventListener('click', close);
  dialog.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', close); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
  });
  window.addEventListener('pageshow', check);
  window.addEventListener('focus', check);
  document.addEventListener('visibilitychange', check);
  check();
})();
