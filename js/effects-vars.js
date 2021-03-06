'use strict';

(function () {
  var MaxFilterValue = {
    chrome: 1,
    sepia: 1,
    marvin: '100',
    phobos: '3',
    heat: 3
  };

  var FilterNameEffect = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };

  var scaleValue = window.formNewImg.querySelector('.scale__value');
  var scalePin = window.formNewImg.querySelector('.scale__pin');

  var scale = window.formNewImg.querySelector('.img-upload__scale');
  scaleValue.setAttribute('value', '100');

  scalePin.style.left = 100 + '%';

  // Перемещение ползунка

  var onSliderMove = function (downEvt) {
    downEvt.preventDefault();

    var scaleLine = window.formNewImg.querySelector('.scale__line');

    var totalWidth = getComputedStyle(scaleLine).width.slice(0, -2);

    var effect = window.effectsVars.newImg.classList.value.slice(window.effectsVars.newImg.classList.value.indexOf('w') + 3);

    var startCoords = {
      x: downEvt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var positionLeftInPercent = Math.round((scalePin.offsetLeft - shift.x) * 100 / totalWidth);

      setScaleLevel(positionLeftInPercent);

      if (positionLeftInPercent <= '0') {
        setScaleLevel(0);
      }

      if (positionLeftInPercent >= '100') {
        setScaleLevel(100);
      }

      var max = MaxFilterValue[effect];
      var positionLeft = getComputedStyle(scalePin).left.slice(0, -2);
      var positionX = Math.round((positionLeft / totalWidth) * 100);
      scaleValue.setAttribute('value', positionX);
      var currentPosition = (max * positionX / 100);

      if (effect === 'marvin') {
        currentPosition += '%';
      }

      if (effect === 'phobos') {
        currentPosition += 'px';
      }

      window.effectsVars.newImg.style.filter = FilterNameEffect[effect] + '(' + currentPosition + ')';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Смена эффекта

  var scaleLevel = window.formNewImg.querySelector('.scale__level');

  scaleLevel.style.width = '100%';

  var setScaleLevel = function (x) {
    scalePin.style.left = x + '%';
    scaleLevel.style.width = x + '%';
  };

  window.effectsVars = {
    newImg: window.formNewImg.querySelector('.img-upload__preview img'),
    newImgContainer: window.formNewImg.querySelector('.img-upload__preview'),
    sizeValue: window.formNewImg.querySelector('.resize__control--value'),
    currentEffect: 'null'
  };

  window.formNewImg.addEventListener('change', function (evt) {
    evt.preventDefault();

    scale.style = 'display: none';
    window.effectsVars.newImg.style = null;
    window.effectsVars.newImgContainer.style = null;

    var target = evt.target;
    if (target.type === 'radio' && target.name === 'effect') {
      var effect = target.id.slice(target.id.indexOf('-') + 1);

      window.effectsVars.sizeValue.value = '100%';

      if (effect === 'none') {
        scale.style = 'display: none';
        scalePin.removeEventListener('mousedown', onSliderMove);
      } else {
        scale.style = null;
        setScaleLevel(100);
        scaleValue.setAttribute('value', '100');
        scalePin.addEventListener('mousedown', onSliderMove);
      }

      if (window.effectsVars.currentEffect) {
        window.effectsVars.newImg.classList.remove(window.effectsVars.currentEffect);
        window.effectsVars.newImg.style = null;
        scaleValue.setAttribute('value', '100');
        window.effectsVars.newImgContainer.style = null;
      }

      window.effectsVars.currentEffect = 'effects__preview--' + effect;

      window.effectsVars.newImg.classList.add(window.effectsVars.currentEffect);
    }
  });
})();
