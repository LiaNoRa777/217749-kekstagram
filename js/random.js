'use strict';

(function () {
  window.random = {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomUnique: function (min, max) {
      var uniqueNumber = [];
      for (var i = 0; i <= (max - min); i++) {
        var randomNumber = window.random.getRandom(min, max);
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
