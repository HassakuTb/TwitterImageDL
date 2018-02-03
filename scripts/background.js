//  show icon only in http://twitter,com/*/status/*
chrome.tabs.onUpload.addListener((tabId, changeInfo, tab) =>{
  if(/https:\/\/twitter.com\/*\/status\/*/.test(tab.url)){
    chrome.pageAction.show(tabId);
  }
});
