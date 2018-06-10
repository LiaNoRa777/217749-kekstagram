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
  photoElement.querySelector('img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;

  document.querySelector('.big-picture__img').setAttribute('src', photos[0].url);
  document.querySelector('.likes-count').textContent = photos[0].likes;
  document.querySelector('.comments-count').textContent = photos[0].comments;
  document.querySelector('.social__caption').textContent = photos[0].description;

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

var commentsList = getComments(photos[0]);
var avatarPhoto = getRandomUnique(1, 6);

var createComments = function (i) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + avatarPhoto[i] + '.svg');
  commentElement.querySelector('span').textContent = commentsList[i];
  return commentElement;
};

var showComments = function () {
  var fragment = document.createDocumentFragment();
  var socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';
  for (var i = 0; i < photos[0].comments; i++) {
    fragment.appendChild(createComments(i));
  }
  socialComments.appendChild(fragment);
};

showPhoto();
showComments();


document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('.visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('.visually-hidden');
