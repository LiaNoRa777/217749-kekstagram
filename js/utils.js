'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
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
