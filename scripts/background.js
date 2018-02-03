//  show icon only in http://twitter,com/*/status/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
  var match = /https:\/\/twitter.com\/*\/status\/*/.test(tab.url);
  console.log(match);
  if(match){
    chrome.pageAction.show(tabId);
  }
});
