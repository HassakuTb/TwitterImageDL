chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name === 'twitterImageDL'){
        getImageInfo(request.srcUrl, sendResponse);
        return true;
    }
});

function getImageInfo(srcUrl, sendResponse){
    console.log(srcUrl);
    sendResponse({test: 'its test'});
}
