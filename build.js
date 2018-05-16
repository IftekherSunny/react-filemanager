import initFM from './src';

window.openFileManager = initFM('/react-filemanager-server/', document.querySelector('.app'));

["//try.getquix.net/libraries/quix/assets/css/qxbs.css", "//try.getquix.net/libraries/quix/assets/css/qxui.css"].forEach(href=>{
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.insertBefore(link, document.head.firstChild);
});
