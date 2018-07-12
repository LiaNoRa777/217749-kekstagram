'use strict';

// Проверка хэштега на валидность

(function () {
  window.hashtags = {
    hashtagsFild: window.formPhotoEffects.querySelector('.text__hashtags'),

    onCheckHashtags: function () {
      var hashtagValue = window.hashtags.hashtagsFild.value.split(' ');

      hashtagValue.forEach(function (elem, index) {
        hashtagValue[index] = elem.toLowerCase();
      });

      if (window.hashtags.hashtagsFild.value.length > 0) {
        var checkHashtagUniqueness = function (i) {
          var flagNotUnique = 0;
          for (var j = 0; j < hashtagValue.length; j++) {
            if (hashtagValue[i] === hashtagValue[j] && i !== j) {
              flagNotUnique = 1;
            } else {
              flagNotUnique = 0;
            }
          }
          return flagNotUnique;
        };

        var colorizeToRed = function () {
          window.hashtags.hashtagsFild.style = 'border-color: red;';
        };

        for (var i = 0; i < hashtagValue.length; i++) {
          if (hashtagValue.length > 5) {
            window.hashtags.hashtagsFild.setCustomValidity('Максимальное количество хэштегов - 5');
            colorizeToRed();
            return;
          } else if (hashtagValue[i][0] !== '#') {
            window.hashtags.hashtagsFild.setCustomValidity('Хэштег должен начинаться с символа решетки "#"');
            colorizeToRed();
            return;
          } else if (hashtagValue[i].length < 2) {
            window.hashtags.hashtagsFild.setCustomValidity('Хэштег не должен состоять из одной решетки');
            colorizeToRed();
            return;
          } else if (hashtagValue[i].lastIndexOf('#') !== 0) {
            window.hashtags.hashtagsFild.setCustomValidity('Хэштеги должны разделяться пробелами');
            colorizeToRed();
            return;
          } else if (hashtagValue[i].length > 20) {
            window.hashtags.hashtagsFild.setCustomValidity('Максимальная длина хэштега - 20 символов');
            colorizeToRed();
            return;
          } else if (checkHashtagUniqueness(i)) {
            window.hashtags.hashtagsFild.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
            colorizeToRed();
            return;
          } else {
            window.hashtags.hashtagsFild.setCustomValidity('');
          }
        }
      } else {
        window.hashtags.hashtagsFild.setCustomValidity('');
        window.hashtags.hashtagsFild.style = null;
      }
    }
  };
})();
