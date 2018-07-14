'use strict';

// Проверка хэштега на валидность

(function () {
  window.hashtags = {
    fild: window.formNewImg.querySelector('.text__hashtags'),

    onCheck: function () {
      var hashtagValue = window.hashtags.fild.value.split(' ');

      hashtagValue.forEach(function (elem, index) {
        hashtagValue[index] = elem.toLowerCase();
      });

      if (window.hashtags.fild.value.length > 0) {
        var checkHashtagUniqueness = function (i) {
          var flagNotUnique = 0;
          for (var j = 0; j < hashtagValue.length; j++) {
            flagNotUnique = hashtagValue[i] === hashtagValue[j] && i !== j ? 1 : 0;
          }
          return flagNotUnique;
        };

        var colorizeToRed = function () {
          window.hashtags.fild.style = 'border-color: red;';
        };

        for (var i = 0; i < hashtagValue.length; i++) {
          if (hashtagValue.length > 5) {
            window.hashtags.fild.setCustomValidity('Максимальное количество хэштегов - 5');
            colorizeToRed();
            return;
          }

          if (hashtagValue[i][0] !== '#') {
            window.hashtags.fild.setCustomValidity('Хэштег должен начинаться с символа решетки "#"');
            colorizeToRed();
            return;
          }

          if (hashtagValue[i].length < 2) {
            window.hashtags.fild.setCustomValidity('Хэштег не должен состоять из одной решетки');
            colorizeToRed();
            return;
          }

          if (hashtagValue[i].lastIndexOf('#') !== 0) {
            window.hashtags.fild.setCustomValidity('Хэштеги должны разделяться пробелами');
            colorizeToRed();
            return;
          }

          if (hashtagValue[i].length > 20) {
            window.hashtags.fild.setCustomValidity('Максимальная длина хэштега - 20 символов');
            colorizeToRed();
            return;
          }

          if (checkHashtagUniqueness(i)) {
            window.hashtags.fild.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
            colorizeToRed();
            return;
          }
        }
      } else {
        window.hashtags.fild.setCustomValidity('');
        window.hashtags.fild.style = null;
      }
    }
  };
})();
