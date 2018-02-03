//  show icon only in http://twitter,com/*/status/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    console.log(changeInfo);
    if(changeInfo.status === "loading"){
        if(createTwitterUrlRegexPattern().test(tab.url)){
            chrome.pageAction.show(tabId);
        }
        else{
            chrome.pageAction.hide(tabId);
        }
    }
});


//  create tweet detail url pattern
function createTwitterUrlRegexPattern(){
    return /https:\/\/twitter.com\/\w*\/status\/\d*/;
}
