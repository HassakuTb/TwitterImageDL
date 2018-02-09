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

    var imageIndex;
    mediaContainer.find('[data-image-url]').each(function(index, element){
        if($(element).attr('data-image-url') === srcUrl){
            imageIndex = index;
        }
    });

    var tweet = imageContainer.closest(`[data-screen-name][data-tweet-id]`);
    var username = tweet.attr('data-screen-name');
    var tweetId = tweet.attr('data-tweet-id');

    sendResponse({
        "username": username,
        "tweetId": tweetId,
        "imageIndex": imageIndex
    });
    return true;
}
