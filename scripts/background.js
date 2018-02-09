function downloadImage(srcUrl, response){
    console.log(response);
    var directory = 'TwitterImageDL'
    var split = srcUrl.split('.');
    var extension = split[split.length - 1].toLowerCase();
    var filename = `${response.username}-${response.tweetId}-${response.imageIndex}.${extension}`;
    chrome.downloads.download({
        url: (srcUrl + ':orig'),
        filename: directory + '/' + filename,
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
            '*://pbs.twimg.com/media/*.jpg',
            '*://pbs.twimg.com/media/*.png'
        ]
    });
});

chrome.contextMenus.onClicked.addListener(messageToGetTweetInfo);
