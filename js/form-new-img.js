'use strict';

// Открытие и закрытие popup с формой загрузки новой фотографии, отправка данных формы на сервер, изменение размера изображения

(function () {
  var MIN_SIZE_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var STEP_SIZE_VALUE = 25;

  var onSetupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onOverlayClose);
  };

  window.formNewImg = document.querySelector('.img-upload__form');
  var overlayPhotoEffects = window.formNewImg.querySelector('.img-upload__overlay');
  var closeOverlayButton = overlayPhotoEffects.querySelector('.img-upload__cancel');

  var onOverlayOpen = function () {
    overlayPhotoEffects.classList.remove('hidden');
    closeOverlayButton.addEventListener('click', onOverlayClose);
    document.addEventListener('keydown', onSetupEscPress);
    window.formNewImg.removeEventListener('change', onOverlayOpen);
  };

  var onOverlayClose = function () {
    overlayPhotoEffects.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    closeOverlayButton.removeEventListener('click', onOverlayClose);
    window.formNewImg.addEventListener('change', onOverlayOpen);
    window.effectsVars.newImg.classList.remove(window.effectsVars.currentEffect);
    window.effectsVars.currentEffect = null;
    window.effectsVars.newImg.style = null;
    window.formNewImg.reset();
    window.formNewImg.removeEventListener('click', onImgResize);
    window.formNewImg.removeEventListener('submit', onDataSend);
    window.hashtags.hashtagsFild.style = 'border: 1px solid rgb(169, 169, 169);';
    window.hashtags.fild.setCustomValidity('');
  };

  // Изменение размера изображения при загрузке новой фотографии

  var reduceSizeImg = function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent <= MIN_SIZE_VALUE) {
      sizeValueWithoutPercent = MIN_SIZE_VALUE;
      window.effectsVars.newImgContainer.style.transform = 'scale(0.25)';
    } else {
      sizeValueWithoutPercent -= STEP_SIZE_VALUE;
      window.effectsVars.newImgContainer.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  };

  var increaseSizeImg = function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent >= MAX_SIZE_VALUE) {
      sizeValueWithoutPercent = MAX_SIZE_VALUE;
      window.effectsVars.newImgContainer.style.transform = 'scale(1)';
    } else {
      sizeValueWithoutPercent = parseInt(sizeValueWithoutPercent, 10) + STEP_SIZE_VALUE;
      window.effectsVars.newImgContainer.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  };

  // Загрузка новой фотографии

  var onFormError = function (errorMessage) {
    nodeError.textContent = errorMessage;
    window.load.errorAlert.classList.remove('hidden');
  };

  var nodeError = document.createElement('div');

  nodeError.style = 'margin-top: 70px; color: white; font-size: 30px; font-weight: bold; text-align: center;';

  window.load.errorAlert.appendChild(nodeError);

  var onDataSend = function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(window.formNewImg), onOverlayClose, onFormError);
    onOverlayClose(evt);
  };

  var errorLink = document.querySelector('.error__link:first-child');

  errorLink.addEventListener('click', onDataSend);

  var buttonRepeatDownLoad = document.querySelector('.error__link:last-child');

  buttonRepeatDownLoad.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.load.errorAlert.classList.add('hidden');
  });

  var buttonSizeReduce = window.formNewImg.querySelector('.resize__control--minus');
  var buttonSizeIncrease = window.formNewImg.querySelector('.resize__control--plus');

  var onImgResize = function (evt) {
    if (evt.target === buttonSizeReduce) {
      reduceSizeImg();
    } else if (evt.target === buttonSizeIncrease) {
      increaseSizeImg();
    }
  };

  var effectPreviews = window.formNewImg.querySelectorAll('.effects__preview');

  window.formNewImg.addEventListener('change', function () {
    onOverlayOpen();

    window.formNewImg.addEventListener('click', onImgResize);

    window.hashtags.fild.addEventListener('change', window.hashtags.onCheck);

    window.formNewImg.addEventListener('submit', onDataSend);

    var inputLoadNewFile = document.querySelector('.img-upload__input');
    var fileDownloaded = inputLoadNewFile.files[0];

    var reader = new FileReader();

    reader.addEventListener('loadend', function () {
      var widthImg = window.effectsVars.newImg.scrollWidth;
      var heightImg = window.effectsVars.newImg.scrollHeight;

      if (widthImg > heightImg) {
        window.effectsVars.newImg.style = 'width: 100%;';
      } else {
        window.effectsVars.newImg.style = 'height: 100%;';
      }

      window.effectsVars.newImg.src = reader.result;
      for (var i = 0; i < effectPreviews.length; i++) {
        effectPreviews[i].style = 'background-image: url("' + reader.result + '");';
      }
    });

    if (fileDownloaded) {
      reader.readAsDataURL(fileDownloaded);
    } else {
      window.effectsVars.newImg.src = '';
    }
  });
})();
