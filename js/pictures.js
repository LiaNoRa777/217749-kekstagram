'use strict';

// Попап с большой фотографией и отображение других фото

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var PHOTOS_AMOUNT = 25;

  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var urlIndexes = window.random.getRandomUnique(1, 25);

  var photos = [];

  for (var h = 0; h < PHOTOS_AMOUNT; h++) {
    photos[h] = {
      url: 'photos/' + urlIndexes[h] + '.jpg',
      likes: window.random.getRandom(15, 200),
      comments: window.random.getRandom(1, 6),
      description: DESCRIPTION[window.random.getRandom(0, DESCRIPTION.length - 1)]
    };
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var createPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
    document.querySelector('.social__caption').innerHTML = '';

    return photoElement;
  };

  var showPhoto = function () {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (elem, index) {
      fragment.appendChild(createPhoto(photos[index]));
    });
    document.querySelector('.pictures').appendChild(fragment);
  };

  showPhoto();

  var getComments = function (photo) {
    var commentsNumber = window.random.getRandomUnique(0, 5);
    var commentsTexts = [];
    for (var i = 0; i < photo.comments; i++) {
      commentsTexts[i] = COMMENTS[commentsNumber[i]];
    }
    return commentsTexts;
  };

  var avatarPhoto = window.random.getRandomUnique(1, 6);

  var commentsList = [];

  var createCommentsList = function () {
    for (var i = 0; i < PHOTOS_AMOUNT; i++) {
      commentsList[i] = getComments(photos[i]);
    }
  };

  createCommentsList();

  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

  var createComments = function (photoNumber, commentNumber) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + avatarPhoto[commentNumber] + '.svg';
    commentElement.querySelector('span').textContent = commentsList[photoNumber][commentNumber];
    return commentElement;
  };

  var showComments = function (index, commentsBigImage) {
    var fragment = document.createDocumentFragment();
    var socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';
    for (var i = 0; i < commentsBigImage; i++) {
      fragment.appendChild(createComments(index, i));
    }
    socialComments.appendChild(fragment);
  };

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');

  var allPhotos = document.querySelectorAll('.picture__link');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var onShowbigPicture = function () {
    bigPicture.classList.remove('hidden');
  };

  var onClosebigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  allPhotos.forEach(function (elem, index) {
    allPhotos[index].addEventListener('click', function () {
      onShowbigPicture();

      var urlBigImage = allPhotos[index].querySelector('img');
      var likesBigImage = allPhotos[index].querySelector('.picture__stat--likes').textContent;
      var commentsBigImage = allPhotos[index].querySelector('.picture__stat--comments').textContent;

      document.querySelector('.big-picture__img img').src = urlBigImage.src;
      document.querySelector('.likes-count').textContent = likesBigImage;
      showComments(index, commentsBigImage);

      document.querySelector('.social__caption').textContent = photos[index].description;

      bigPictureCloseButton.addEventListener('click', onClosebigPicture);

      document.addEventListener('keydown', function (evt) {
        window.isEscEvent(evt, onClosebigPicture);
      });
    });
  });
})();
