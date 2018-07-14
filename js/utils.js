'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var SUCCESS_CODE = 200;

  window.utils = {
    getAjax: function (onLoad, onError, url, method, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          window.load.errorAlert.classList.add('hidden');
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

      xhr.open(method, url);
      xhr.send(data);
    },

    isEscEvent: function (evt, action) {
      var commentField = window.formNewImg.querySelector('.text__description');
      if (evt.keyCode === ESC_KEYCODE && commentField !== document.activeElement && window.hashtags.fild !== document.activeElement) {
        action();
      }
    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomUnique: function (min, max) {
      var uniqueNumber = [];
      for (var i = 0; i <= (max - min); i++) {
        var randomNumber = window.utils.getRandom(min, max);
        if (uniqueNumber.indexOf(randomNumber) === -1) {
          uniqueNumber[i] = randomNumber;
        } else {
          i -= 1;
        }
      }
      return uniqueNumber;
    }
  };
})();
