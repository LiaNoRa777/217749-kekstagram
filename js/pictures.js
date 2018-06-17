'use strict';

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomUnique = function (min, max) {
  var uniqueNumber = [];
  for (var i = 0; i <= (max - min); i++) {
    var randomNumber = getRandom(min, max);
    if (uniqueNumber.indexOf(randomNumber) === -1) {
      uniqueNumber[i] = randomNumber;
    } else {
      i -= 1;
    }
  }
  return uniqueNumber;
};

var ESC_KEYCODE = 27;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var urlIndexes = getRandomUnique(1, 25);

var photos = [];

var PHOTOS_AMOUNT = 25;

for (var h = 0; h < PHOTOS_AMOUNT; h++) {
  photos[h] = {
    url: 'photos/' + urlIndexes[h] + '.jpg',
    likes: getRandom(15, 200),
    comments: getRandom(1, 6),
    description: DESCRIPTION[getRandom(0, DESCRIPTION.length - 1)]
  };
}

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

var createPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;

  return photoElement;
};

var showPhoto = function () {
  var fragment = document.createDocumentFragment();
  photos.forEach(function (elem, index) {
    fragment.appendChild(createPhoto(photos[index]));
  });
  document.querySelector('.pictures').appendChild(fragment);
};

var getComments = function (photo) {
  var commentsNumber = getRandomUnique(0, 5);
  var commentsTexts = [];
  for (var i = 0; i < photo.comments; i++) {
    commentsTexts[i] = COMMENTS[commentsNumber[i]];
  }
  return commentsTexts;
};

var avatarPhoto = getRandomUnique(1, 6);

showPhoto();

var commentsList = [];

var createCommentsList = function () {
  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    commentsList[i] = getComments(photos[i]);
  }
};

createCommentsList();

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

    bigPictureCloseButton.addEventListener('click', onClosebigPicture);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onClosebigPicture();
      }
    });
  });
});

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    onCloseOverlay();
  }
};

var formPhotoEffects = document.querySelector('.img-upload__form');
var overlayPhotoEffects = formPhotoEffects.querySelector('.img-upload__overlay');
var closeOverlayButton = overlayPhotoEffects.querySelector('.img-upload__cancel');

var onOpenOverlay = function (evt) {
  evt.preventDefault();
  overlayPhotoEffects.classList.remove('hidden');
  closeOverlayButton.addEventListener('click', onCloseOverlay);
  document.addEventListener('keydown', onSetupEscPress);
  formPhotoEffects.removeEventListener('change', onOpenOverlay);
};

var onCloseOverlay = function () {
  overlayPhotoEffects.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  closeOverlayButton.removeEventListener('click', onCloseOverlay);
  formPhotoEffects.addEventListener('change', onOpenOverlay);
  newImg.classList.remove(currentEffect);
  currentEffect = null;
  newImg.style = null;
  formPhotoEffects.reset();
};

formPhotoEffects.addEventListener('change', onOpenOverlay);

var currentEffect = null;
var newImg = formPhotoEffects.querySelector('.img-upload__preview img');

var scaleValue = formPhotoEffects.querySelector('.scale__value');
var scalePin = formPhotoEffects.querySelector('.scale__pin');

var MAXES = {
  chrome: 1,
  sepia: 1,
  marvin: '100',
  phobos: '3',
  heat: 3
};

var FILTERS = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

var scale = formPhotoEffects.querySelector('.img-upload__scale');
scaleValue.value = '100';

formPhotoEffects.addEventListener('change', function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.type === 'radio' && target.name === 'effect') {
    var effect = target.id.slice(target.id.indexOf('-') + 1);

    if (effect === 'none') {
      scale.style = 'display: none';
    } else {
      scale.style = null;
    }

    if (currentEffect) {
      newImg.classList.remove(currentEffect);
      newImg.style = null;
      scaleValue.value = '100';
    }
    currentEffect = 'effects__preview--' + effect;

    newImg.classList.add(currentEffect);

    scalePin.addEventListener('mouseup', function () {
      var max = MAXES[effect];
      var totalWidth = getComputedStyle(scalePin).width.slice(0, -2);
      var positionLeft = getComputedStyle(scalePin).left.slice(0, -2);
      var positionX = Math.round((totalWidth / positionLeft) * 100);
      scaleValue.value = positionX;
      var currentPosition = (max * positionX / 100);

      if (effect === 'marvin') {
        currentPosition += '%';
      }

      if (effect === 'phobos') {
        currentPosition += 'px';
      }

      newImg.style = 'filter: ' + FILTERS[effect] + '(' + currentPosition + ')';
    });
  }
});

