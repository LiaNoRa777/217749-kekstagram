'use strict';

// Открытие и закрытие popup с формой загрузки новой фотографии, отправка данных формы на сервер, изменение размера изображения

(function () {
  var MIN_SIZE_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var STEP_SIZE_VALUE = 25;

  var onSetupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onCloseOverlay);
  };

  window.formPhotoEffects = document.querySelector('.img-upload__form');
  var overlayPhotoEffects = window.formPhotoEffects.querySelector('.img-upload__overlay');
  var closeOverlayButton = overlayPhotoEffects.querySelector('.img-upload__cancel');

  var onOpenOverlay = function () {
    overlayPhotoEffects.classList.remove('hidden');
    closeOverlayButton.addEventListener('click', onCloseOverlay);
    document.addEventListener('keydown', onSetupEscPress);
    window.formPhotoEffects.removeEventListener('change', onOpenOverlay);
  };

  var commentField = window.formPhotoEffects.querySelector('.text__description');

  var buttonSubmitNewImage = window.formPhotoEffects.querySelector('.img-upload__submit');

  var onCloseOverlay = function () {
    if (commentField !== document.activeElement && window.hashtags.hashtagsFild !== document.activeElement) {
      overlayPhotoEffects.classList.add('hidden');
      document.removeEventListener('keydown', onSetupEscPress);
      closeOverlayButton.removeEventListener('click', onCloseOverlay);
      window.formPhotoEffects.addEventListener('change', onOpenOverlay);
      window.effectsVars.newImg.classList.remove(window.effectsVars.currentEffect);
      window.effectsVars.currentEffect = null;
      window.effectsVars.newImg.style = null;
      window.formPhotoEffects.reset();
      buttonSizeReduce.removeEventListener('click', onbuttonSizeReduce);
      buttonSizeIncrease.removeEventListener('click', onbuttonSizeIncrease);
      buttonSubmitNewImage.removeEventListener('click', window.hashtags.onCheckHashtags);
      window.hashtags.hashtagsFild.style = 'border: 1px solid rgb(169, 169, 169);';
    }
  };

  // Изменение размера изображения при загрузке новой фотографии

  var buttonSizeReduce = window.formPhotoEffects.querySelector('.resize__control--minus');
  var buttonSizeIncrease = window.formPhotoEffects.querySelector('.resize__control--plus');

  var onbuttonSizeReduce = function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent <= MIN_SIZE_VALUE) {
      sizeValueWithoutPercent = MIN_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(0.25)';
    } else {
      sizeValueWithoutPercent -= STEP_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  };

  var onbuttonSizeIncrease = function () {
    var sizeValueWithoutPercent = window.effectsVars.sizeValue.value.slice(0, -1);
    if (sizeValueWithoutPercent >= MAX_SIZE_VALUE) {
      sizeValueWithoutPercent = MAX_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(1)';
    } else {
      sizeValueWithoutPercent = parseInt(sizeValueWithoutPercent, 10) + STEP_SIZE_VALUE;
      window.effectsVars.newImg.style.transform = 'scale(' + sizeValueWithoutPercent / 100 + ')';
      window.effectsVars.sizeValue.value = sizeValueWithoutPercent + '%';
    }
  };

  // Загрузка новой фотографии

  window.formPhotoEffects.addEventListener('change', function () {
    onOpenOverlay();

    buttonSubmitNewImage.addEventListener('click', window.hashtags.onCheckHashtags);

    buttonSizeReduce.addEventListener('click', onbuttonSizeReduce);
    buttonSizeIncrease.addEventListener('click', onbuttonSizeIncrease);

    var inputLoadNewFile = document.querySelector('.img-upload__input');
    var fileDownloaded = inputLoadNewFile.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      window.effectsVars.newImg.src = reader.result;
    };

    if (fileDownloaded) {
      reader.readAsDataURL(fileDownloaded);
    } else {
      window.effectsVars.newImg.src = '';
    }
  });

  var onFormError = function (errorMessage) {
    nodeError.textContent = errorMessage;
    window.load.errorAlert.classList.remove('hidden');
  };

  var nodeError = document.createElement('div');

  nodeError.style = 'margin-top: 70px; color: white; font-size: 30px; font-weight: bold; text-align: center;';

  window.load.errorAlert.appendChild(nodeError);

  var onSendData = function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(window.formPhotoEffects), onCloseOverlay, onFormError);
    onCloseOverlay();
  };

  window.formPhotoEffects.addEventListener('submit', onSendData);

  var errorLink = document.querySelector('.error__link:first-child');

  errorLink.addEventListener('click', onSendData);

  var buttonRepeatDownLoad = document.querySelector('.error__link:last-child');

  buttonRepeatDownLoad.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.load.errorAlert.classList.add('hidden');
  });
})();