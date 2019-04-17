// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

function query_str(str) {
  const key =    'AIzaSyAXN4fGhe1QQ4IzmHmP3k41GisPZWKZ0AM';
  const oldkey = 'AIzaSyAniCHF1d7zJWlzyW4wOcAw5M-BTOQapPk';
  const cx = '001108766585115529364:gjel7ctrn4m';
  const num = 4;

  let query = 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&q='
  query += str +  '%20clipart';
  query += '&%20searchType=%E2%80%9Cimage%E2%80%9D&%20num=' + num
  var xhr = new XMLHttpRequest();

  xhr.open("GET", query, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);
  console.log(result);

  for (i = 1; i < 5; i++) {
      const url = result.items[i-1].pagemap.cse_thumbnail[0].src;
      document.getElementById("img" + String(i)).src = url;
  }

  return query;
}

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  selection = selection[0];
  console.log(selection);
  document.getElementById("search").innerHTML = selection;
  query_str(selection);
  //document.getElementById("output").value = selection[0];
});

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Define";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    chrome.tabs.executeScript({
          code: 'search();'
        });
};
