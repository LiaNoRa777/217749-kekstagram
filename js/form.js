'use strict';

// Открытие и закрытие popup с формой загрузки новой фотографии, отправка данных формы на сервер

(function () {
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

  var onCloseOverlay = function () {
    if (commentField !== document.activeElement && window.hashtags !== document.activeElement) {
      overlayPhotoEffects.classList.add('hidden');
      document.removeEventListener('keydown', onSetupEscPress);
      closeOverlayButton.removeEventListener('click', onCloseOverlay);
      window.formPhotoEffects.addEventListener('change', onOpenOverlay);
      window.effectsVars.newImg.classList.remove(window.effectsVars.currentEffect);
      window.effectsVars.currentEffect = null;
      window.effectsVars.newImg.style = null;
      window.formPhotoEffects.reset();
    }
  };

  window.formPhotoEffects.addEventListener('change', function () {
    onOpenOverlay();
    var inputLoadNewFile = document.querySelector('.img-upload__input');
    window.effectsVars.newImg.src = 'img/' + inputLoadNewFile.files[0].name;
  });

  window.formPhotoEffects.addEventListener('submit', function (evt) {
    window.load.upload(new FormData(window.formPhotoEffects), onCloseOverlay, window.load.errorHandler);
    evt.preventDefault();
  });
})();
