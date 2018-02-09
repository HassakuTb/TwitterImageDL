function downloadOriginalImage(info, tab){
    console.log(info);
    //  do something
}

chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({
        type: 'normal',
        id: 'downloadTwitterImage',
        title: 'download original image',
        contexts: [
            'image'
        ],
        documentUrlPatterns: [
            '*://twitter.com/*'
        ]
    });

    chrome.contextMenus.onClicked.addListener(downloadOriginalImage);
});


// //  show icon only in http://twitter,com/*/status/*
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
//     console.log(changeInfo);
//     if(changeInfo.status === 'loading'){
//         if(createTwitterUrlRegexPattern().test(tab.url)){
//             chrome.pageAction.show(tabId);
//         }
//         else{
//             chrome.pageAction.hide(tabId);
//         }
//     }
// });
//
//
// //  create tweet detail url pattern
// function createTwitterUrlRegexPattern(){
//     return /https:\/\/twitter.com\/\w*\/status\/\d*/;
// }
