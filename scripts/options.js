//  save
function save_options() {
    var download_to = document.getElementById('download_to').value;
    var open_save_as = document.getElementById('open_save_as').checked;
    chrome.storage.local.set({
        download_to: download_to,
        open_save_as: open_save_as
    }, function() {
        window.close();
    });
}

//  restore to page
function restore_options() {
    chrome.storage.local.get({
        download_to: 'TwitterImageDLer',
        open_save_as: false
    }, function(items) {
        document.getElementById('download_to').value = items.download_to;
        document.getElementById('open_save_as').checked = items.open_save_as;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
