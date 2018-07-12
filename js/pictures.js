'use strict';

// Попап с большой фотографией и отображение других фото

(function () {
  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var NEWS_PHOTOS_AMOUNT = 10;

  var onBigPictureEscPress = function (evt) {
    window.utils.isEscEvent(evt, onClosebigPicture);
  };

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var createPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    document.querySelector('.social__caption').innerHTML = '';

    return photoElement;
  };

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var numberShownComments;
  var onShowComments;

  var otherCommentsButton = document.querySelector('.social__loadmore');

  var onClosebigPicture = function () {
    bigPicture.classList.add('hidden');
    numberShownComments = 0;
    otherCommentsButton.removeEventListener('click', onShowComments);
    bigPictureCloseButton.removeEventListener('click', onClosebigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var picturesContainer = document.querySelector('.pictures');

  var renderedPhotos = [];

  var showPhoto = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (elem) {
      var photo = createPhoto(elem);
      renderedPhotos.push(photo);
      fragment.appendChild(photo);
    });
    picturesContainer.appendChild(fragment);
  };

  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

  var createComments = function (photos, photoNumber, commentNumber) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandom(1, 6) + '.svg';
    commentElement.querySelector('span').textContent = photos[photoNumber].comments[commentNumber];
    return commentElement;
  };

  var showComments = function (photos, startNumber, index, commentsBigImage) {
    var fragment = document.createDocumentFragment();
    var socialComments = document.querySelector('.social__comments');

    if ((startNumber + 5) < commentsBigImage) {
      for (var j = startNumber; j < startNumber + 5; j++) {
        fragment.appendChild(createComments(photos, index, j));
      }

      numberShownComments += 5;
      commentCounter.textContent = numberShownComments + ' из ' + commentsBigImage;
      otherCommentsButton.classList.remove('visually-hidden');
      socialComments.appendChild(fragment);

    } else {
      commentCounter.textContent = commentsBigImage + ' из ' + commentsBigImage;
      for (var k = startNumber; k < commentsBigImage; k++) {
        fragment.appendChild(createComments(photos, index, k));
        otherCommentsButton.classList.add('visually-hidden');
      }
      socialComments.appendChild(fragment);
    }
  };

  var commentCounter = document.querySelector('.social__comment-count');

  commentCounter.innerHTML = '';

  var setBigPicture = function (photos) {
    var allPhotos = document.querySelectorAll('.picture__link');

    var showBigPicture = function () {
      bigPicture.classList.remove('hidden');
      bigPictureCloseButton.addEventListener('click', onClosebigPicture);
      document.addEventListener('keydown', onBigPictureEscPress);
    };

    allPhotos.forEach(function (elem, index) {
      allPhotos[index].addEventListener('click', function () {
        showBigPicture();

        var urlBigImage = allPhotos[index].querySelector('img');
        var likesBigImage = allPhotos[index].querySelector('.picture__stat--likes').textContent;
        var commentsBigImage = allPhotos[index].querySelector('.picture__stat--comments').textContent;
        var socialComments = document.querySelector('.social__comments');
        socialComments.innerHTML = '';
        document.querySelector('.big-picture__img img').src = urlBigImage.src;
        document.querySelector('.likes-count').textContent = likesBigImage;

        onShowComments = function () {
          showComments(photos, numberShownComments, index, commentsBigImage);
        };

        if (commentsBigImage <= 5) {
          commentCounter.textContent = commentsBigImage + ' из ' + commentsBigImage;
          otherCommentsButton.classList.add('visually-hidden');
          showComments(photos, 0, index, commentsBigImage);
        } else {
          showComments(photos, 0, index, 5);
          numberShownComments = 5;
          commentCounter.textContent = numberShownComments + ' из ' + commentsBigImage;
          otherCommentsButton.classList.remove('visually-hidden');
          otherCommentsButton.addEventListener('click', onShowComments);
        }

        document.querySelector('.social__caption').textContent = DESCRIPTION[window.utils.getRandom(0, DESCRIPTION.length - 1)];
      });
    });
  };

  var imgFilters = document.querySelector('.img-filters');

  var deletePhotos = function () {
    renderedPhotos.forEach(function (photo) {
      photo.remove();
    });
  };

  var imgFiltersButtons = imgFilters.querySelectorAll('button');

  var showActiveElement = function () {
    for (var i = 0; i < imgFiltersButtons.length; i++) {
      if (imgFiltersButtons[i].classList.contains('img-filters__button--active')) {
        imgFiltersButtons[i].classList.remove('img-filters__button--active');
      }
    }
  };

  var filterImages = function (array) {
    showActiveElement();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    var lastTimeout = window.setTimeout(function () {
      deletePhotos();
      showPhoto(array);
      setBigPicture(array);
    }, 600);
  };

  var filterPopularsImages = function (array) {
    filterImages(array);
    return;
  };

  var filterNewImages = function (array) {
    var mixedPhotosIndexes = window.utils.getRandomUnique(0, 24);
    var newPhotos = [];
    for (var i = 0; i < NEWS_PHOTOS_AMOUNT; i++) {
      newPhotos[i] = array[mixedPhotosIndexes[i]];
    }
    filterImages(newPhotos);
    return;
  };

  var discussedImages = function (array) {
    var photosCopy = array.slice();
    photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    filterImages(photosCopy);
    return;
  };

  var filterForm = document.querySelector('.img-filters__form');

  var onPicturesSuccess = function (photos) {
    showPhoto(photos);

    imgFilters.classList.remove('img-filters--inactive');

    filterForm.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.id === 'filter-popular') {
        filterPopularsImages(photos);
      } else if (evt.target.id === 'filter-new') {
        filterNewImages(photos);
      } else if (evt.target.id === 'filter-discussed') {
        discussedImages(photos);
      }
      evt.target.classList.add('img-filters__button--active');
    });

    setBigPicture(photos);
  };

  var onPicturesError = function (errorMessage) {
    nodeError.classList.remove('hidden');
    imgFilters.classList.add('img-filters--inactive');
    nodeError.textContent = errorMessage;
  };

  var nodeError = document.createElement('div');

  nodeError.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 500px; min-height: 400px; padding-top: 100px; color: black; font-size: 30px; font-weight: bold; text-align: center; background-color: white;';

  nodeError.classList.add('hidden');

  document.body.appendChild(nodeError);

  window.load.download(onPicturesSuccess, onPicturesError);
})();
