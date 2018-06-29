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

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var createPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    document.querySelector('.social__caption').innerHTML = '';

    return photoElement;
  };

  var successHandler = function (photos) {
    var showPhoto = function () {
      var fragment = document.createDocumentFragment();
      photos.forEach(function (elem, index) {
        fragment.appendChild(createPhoto(photos[index]));
      });
      document.querySelector('.pictures').appendChild(fragment);
    };
    showPhoto();

    document.querySelector('.social__comment-count').classList.add('visually-hidden');

    var allPhotos = document.querySelectorAll('.picture__link');

    var bigPicture = document.querySelector('.big-picture');
    var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

    var onShowbigPicture = function () {
      bigPicture.classList.remove('hidden');
    };

    var numberShownComments;
    var onShowComments;
    var onClosebigPicture = function () {
      bigPicture.classList.add('hidden');
      numberShownComments = 0;
      otherCommentsButton.removeEventListener('click', onShowComments);
    };

    var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

    var createComments = function (photoNumber, commentNumber) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandom(1, 6) + '.svg';
      commentElement.querySelector('span').textContent = photos[photoNumber].comments[commentNumber];
      return commentElement;
    };

    var otherCommentsButton = document.querySelector('.social__loadmore');

    var showComments = function (startNumber, index, commentsBigImage) {
      var fragment = document.createDocumentFragment();
      var socialComments = document.querySelector('.social__comments');

      if ((startNumber + 5) < commentsBigImage) {
        for (var j = startNumber; j < startNumber + 5; j++) {
          fragment.appendChild(createComments(index, j));
        }

        numberShownComments += 5;
        otherCommentsButton.classList.remove('visually-hidden');
        socialComments.appendChild(fragment);

      } else {
        for (var k = startNumber; k < commentsBigImage; k++) {
          fragment.appendChild(createComments(index, k));
          otherCommentsButton.classList.add('visually-hidden');
        }
        socialComments.appendChild(fragment);
      }
    };

    allPhotos.forEach(function (elem, index) {
      allPhotos[index].addEventListener('click', function () {
        onShowbigPicture();

        var urlBigImage = allPhotos[index].querySelector('img');
        var likesBigImage = allPhotos[index].querySelector('.picture__stat--likes').textContent;
        var commentsBigImage = allPhotos[index].querySelector('.picture__stat--comments').textContent;
        var socialComments = document.querySelector('.social__comments');
        socialComments.innerHTML = '';
        document.querySelector('.big-picture__img img').src = urlBigImage.src;
        document.querySelector('.likes-count').textContent = likesBigImage;

        onShowComments = function () {
          showComments(numberShownComments, index, commentsBigImage);
        };

        if (commentsBigImage <= 5) {
          otherCommentsButton.classList.add('visually-hidden');
          showComments(0, index, commentsBigImage);
        } else {
          showComments(0, index, 5);
          numberShownComments = 5;
          otherCommentsButton.classList.remove('visually-hidden');
          otherCommentsButton.addEventListener('click', onShowComments);
        }

        document.querySelector('.social__caption').textContent = DESCRIPTION[window.utils.getRandom(0, DESCRIPTION.length - 1)];

        bigPictureCloseButton.addEventListener('click', onClosebigPicture);

        document.addEventListener('keydown', function (evt) {
          window.utils.isEscEvent(evt, onClosebigPicture);
        });
      });
    });
  };

  window.load.download(successHandler, window.load.errorHandler);
})();
