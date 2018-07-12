'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
  var errorElement = errorTemplate.cloneNode(true);

  document.body.appendChild(errorElement);

  window.load = {
    errorAlert: document.querySelector('.img-upload__message--error'),

    download: function (onLoad, onError) {
      window.utils.getAjax(onLoad, onError, URL_DOWNLOAD, 'GET');
    },

    upload: function (data, onLoad, onError) {
      window.utils.getAjax(onLoad, onError, URL_UPLOAD, 'POST', data);
    }
  };
})();
