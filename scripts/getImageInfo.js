chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'twitterImageDL'){
        return getImageInfo(request.srcUrl, sendResponse);
    }
    return true;
});

function getImageInfo(srcUrl, sendResponse){
    console.log(srcUrl);

    var imageContainer = $(`[data-image-url*="${srcUrl}"]:first`);
    var mediaContainer = imageContainer.closest('.AdaptiveMedia-container');

    var imageIndex = 0;
    mediaContainer.find('[data-image-url]').each(function(index, element){
        if($(element).attr('data-image-url') === srcUrl){
            imageIndex = index;
        }
    });

    var username = imageContainer.closest(`[data-screen-name]`).attr('data-screen-name');
    var tweetId = imageContainer.closest(`[data-item-id]`).attr('data-item-id');

    sendResponse({
        "username": username,
        "tweetId": tweetId,
        "imageIndex": imageIndex
    });
    return true;
}
