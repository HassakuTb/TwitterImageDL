chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'twitterImageDL'){
        getImageInfo(request.srcUrl, sendResponse);
    }
    return true;    //  sync
});

function getImageInfo(srcUrl, sendResponse){
    console.log(`src = ${srcUrl}`);

    var images = $(`img[src*="${srcUrl}"]`);

    var isAdaptiveImage = false;
    var targetImage = images.first();
    var i, len;
    for(i = 0, len = images.length; i < len; ++i){
        var target = images.eq(i);
        if(target.closest('.AdaptiveMedia-container').length > 0){
            isAdaptiveImage = true;
            targetImage = target;
            break;
        }
    }

    if(isAdaptiveImage){
        sendResponse(getInfoFromTimeline(targetImage, srcUrl));
    }
    else if(targetImage.parent('.QuoteMedia-photoContainer').length > 0){
        sendResponse(getinfoFromNotification(targetImage));
    }
    else if(targetImage.hasClass('MomentMediaItem-entity')){
        sendResponse(getInfoFromMoment(targetImage, srcUrl));
    }
    else{
        sendResponse({ result : false });
    }
}

//  download from timeline of tweet detail
//  param image : jquery object <img>
//  param srcUrl : twimg url
//  returns {username, tweetId, imageIndex}
function getInfoFromTimeline(image, srcUrl){
    console.log("download from timeline")

    var mediaContainer = image.closest('.AdaptiveMedia-container');
    //  in notification, there is only single image
    var imageIndex = 0;
    mediaContainer.find('[data-image-url]').each(function(index, element){
        if($(element).attr('data-image-url') === srcUrl){
            imageIndex = index;
        }
    });

    var username = image.closest(`[data-screen-name]`).attr('data-screen-name');
    var tweetId = image.closest(`[data-item-id]`).attr('data-item-id');

    return {
        result : true,
        username : username,
        tweetId : tweetId,
        imageIndex : imageIndex
    };
}

//  download from notification and quote
//  param image : jquery object <img>
//  returns {username, tweetId, imageIndex}
function getinfoFromNotification(image){
    console.log("download from quote")

    var imageIndex = 0; //  in notification, always single image
    var username = image.closest(`[data-screen-name]`).attr('data-screen-name');
    var tweetId = image.closest(`[data-item-id]`).attr('data-item-id');

    return {
        result : true,
        username : username,
        tweetId : tweetId,
        imageIndex : imageIndex
    };
}

//  download from moment cover
//  moment contents is not image
//  param image : jquery object <img>
//  param srcUrl : twimg url
//  returns {username, tweetId, imageIndex}
function getInfoFromMoment(image, srcUrl){
    console.log("download from moment cover")

    var coverContainer = image.closest('.MomentCapsuleCover-media');
    var username = coverContainer.find('[data-screen-name]').attr('data-screen-name');
    var tweetId = coverContainer.find('[data-tweet-id]').attr('data-tweet-id');

    var imageIndex = 'unknown'; //  cover image is not certain index

    return {
        result : true,
        username : username,
        tweetId : tweetId,
        imageIndex : imageIndex
    };
}
