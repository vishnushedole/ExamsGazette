const express = require('express');
const Router = express.Router();
const Controller = require('../Controller/user.js')
var cacheService = require("express-api-cache");
var cache = cacheService.cache;

Router.get('/',Controller.test);

Router.get('/fetch',cache("30 minutes"),Controller.getNews);

Router.post('/postArticle',Controller.postArticle);

Router.get('/getArticles',cache("30 minutes"),Controller.getArticles);

Router.get('/ArticlebyId',Controller.ArticlebyId);

Router.get('/getStream',cache("30 minutes"),Controller.getStream);

Router.post('/postComment',Controller.postComment);

Router.post('/signup',Controller.CreateUser);

Router.post('/login',Controller.Login);

Router.get('/logout',Controller.Logout);

Router.post('/getUser',Controller.getUser);

Router.post('/postLike',Controller.postLike);

Router.post('/postLike',Controller.postDislike);

Router.get('/getUser',Controller.getUserByName);

Router.post('/SaveExam',Controller.SaveExam);

Router.get('/isLoggedin',Controller.isLoggedin);

module.exports = Router;