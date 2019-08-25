let cssOptions = {
    backgroundColor: '', left: '50%', width: 'auto', border: 'none'
};
let loadingMessage = '<div class="lds-rolling"><div></div></div>';

exports.blockUI = function (message) {
    message = message || loadingMessage

    $.blockUI({
        message: message,
        css: cssOptions
    });

    //unblockUI
};

exports.unblockUI = function () {
  $.unblockUI()
}
