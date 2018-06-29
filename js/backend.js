'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
  var errorElement = errorTemplate.cloneNode(true);

  document.body.appendChild(errorElement);

  window.load = {
    errorHandler: function (errorMessage) {
      var errorAlert = document.querySelector('.img-upload__message--error');
      var errorLink = document.querySelector('.error__link');
      var node = document.createElement('div');

      node.style = 'margin-top: 70px; color: white; font-size: 30px; font-weight: bold; text-align: center;';

      node.textContent = errorMessage;
      errorAlert.appendChild(node);

      errorAlert.classList.remove('hidden');

      errorLink.addEventListener('click', function () {
        errorAlert.classList.add('hidden');
      });
    },

    download: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };

})();
