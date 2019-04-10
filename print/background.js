// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

function query_str(str) {
  const key =    'AIzaSyAXN4fGhe1QQ4IzmHmP3k41GisPZWKZ0AM';
  const oldkey = 'AIzaSyAniCHF1d7zJWlzyW4wOcAw5M-BTOQapPk';

  let query = 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=001108766585115529364:fmf2vab7yci&q='
  query += str;
  query += '&%20searchType=%E2%80%9Cimage%E2%80%9D&%20num=1'
  var xhr = new XMLHttpRequest();

  xhr.open("GET", query, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);
  console.log(result);
  const url = result.items[0].pagemap.cse_thumbnail[0].src;
  document.getElementById("img").src = url;

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