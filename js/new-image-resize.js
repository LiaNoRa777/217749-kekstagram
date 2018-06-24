'use strict';

// Изменение размера изображения при загрузке новой фотографии

(function () {
  var MIN_SIZE_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var STEP_SIZE_VALUE = 25;

  var buttonSizeReduce = window.formPhotoEffects.querySelector('.resize__control--minus');
  var buttonSizeIncrease = window.formPhotoEffects.querySelector('.resize__control--plus');

  buttonSizeReduce.addEventListener('click', function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent <= MIN_SIZE_VALUE) {
      sizeValueWithoutPercent = MIN_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(0.25)';
    } else {
      sizeValueWithoutPercent -= STEP_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  });

  buttonSizeIncrease.addEventListener('click', function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent >= MAX_SIZE_VALUE) {
      sizeValueWithoutPercent = MAX_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(1)';
    } else {
      sizeValueWithoutPercent = parseInt(sizeValueWithoutPercent, 10) + STEP_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  });
})();
