'use strict';

// Проверка хэштега на валидность

(function () {
  window.hashtags = window.formPhotoEffects.querySelector('.text__hashtags');
  var buttonSubmitNewImage = window.formPhotoEffects.querySelector('.img-upload__submit');

  buttonSubmitNewImage.addEventListener('click', function () {
    var hashtagValue = window.hashtags.value.split(' ');

    hashtagValue.forEach(function (elem, index) {
      hashtagValue[index] = hashtagValue[index].toLowerCase();
    });

    if (window.hashtags.value.length > 0) {

      var countHash = function (i) {
        var count = 0;
        for (var j = 0; j < hashtagValue[i].length; j++) {
          if (hashtagValue[i][j] === '#') {
            count += 1;
          }
        }
        return count;
      };

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

      for (var i = 0; i < hashtagValue.length; i++) {

        if (hashtagValue.length > 5) {
          window.hashtags.setCustomValidity('Максимальное количество хэштегов - 5');
          return;
        } else if (hashtagValue[i][0] !== '#') {
          window.hashtags.setCustomValidity('Хэштег должен начинаться с символа решетки "#"');
          return;
        } else if (hashtagValue[i].length < 2) {
          window.hashtags.setCustomValidity('Хэштег не должен состоять из одной решетки');
          return;
        } else if (countHash(i) > 1) {
          window.hashtags.setCustomValidity('Хэштеги должны разделяться пробелами');
          return;
        } else if (hashtagValue[i].length > 20) {
          window.hashtags.setCustomValidity('Максимальная длина хэштега - 20 символов');
          return;
        } else if (checkHashtagUniqueness(i)) {
          window.hashtags.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
          return;
        } else {
          window.hashtags.setCustomValidity('');
        }
      }
    }
  });
})();
