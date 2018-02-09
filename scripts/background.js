function downloadImage(srcUrl, response){
    console.log(response);
    chrome.downloads.download({
        url: (srcUrl + ':orig'),
        saveAs: false
    });
}

function messageToGetTweetInfo(info, tab){
    console.log(info);
    chrome.tabs.sendMessage(
        tab.id,
        {name: 'twitterImageDL', srcUrl: info.srcUrl},
        function(response) {downloadImage(info.srcUrl, response);}
    );
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
        ],
        targetUrlPatterns: [
            '*://pbs.twimg.com/media/*.jpg'
        ]
    });

    chrome.contextMenus.onClicked.addListener(messageToGetTweetInfo);
});
