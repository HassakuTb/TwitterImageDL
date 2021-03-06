function downloadImage(srcUrl, response){
    console.log(response);
    chrome.storage.local.get({
        download_to : 'TwitterImageDLer',
        open_save_as : false
    }, function(items) {
        var useDirectory = items.download_to.length > 0;
        var directory = items.download_to;
        var split = srcUrl.split('.');
        var extension = split[split.length - 1].toLowerCase();
        var extensionSplit = extension.split(':');
        if(extensionSplit.length >= 2){
            extension = extensionSplit[0];
            var suffixLength = extensionSplit[1].length + 1;
            srcUrl = srcUrl.slice(0, -suffixLength);
        }
        var filename = response.result
                ? `${response.username}-${response.tweetId}-${response.imageIndex}.${extension}`
                : `cannot-resolve.${extension}`
        chrome.downloads.download({
            url: (srcUrl + ':orig'),
            filename: useDirectory ? (directory + '/' + filename) : filename,
            saveAs: items.open_save_as
        });
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
            '*://pbs.twimg.com/media/*'
        ]
    });
});

chrome.contextMenus.onClicked.addListener(messageToGetTweetInfo);
