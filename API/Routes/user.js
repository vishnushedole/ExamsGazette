const express = require('express');
const Router = express.Router();
const Controller = require('../Controller/user.js')


Router.get('/',Controller.test);

Router.get('/fetch',Controller.getNews);

Router.post('/postArticle',Controller.postArticle);

Router.get('/getArticles',Controller.getArticles);

Router.get('/ArticlebyId',Controller.ArticlebyId);

Router.get('/getStream',Controller.getStream);

Router.post('/postComment',Controller.postComment);

Router.post('/signup',Controller.CreateUser);

Router.post('/login',Controller.Login);

Router.get('/logout',Controller.Logout);

Router.post('/getUser',Controller.getUser);

Router.post('/postLike',Controller.postLike);

Router.post('/postLike',Controller.postDislike);

Router.get('/getUser',Controller.getUserByName);

Router.post('/SaveExam',Controller.SaveExam);

module.exports = Router;