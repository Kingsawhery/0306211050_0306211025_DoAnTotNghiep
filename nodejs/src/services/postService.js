import { where } from "sequelize";
import db from "../models";
import { xuLyTenFile } from "../function/generalFunction";
let getPosts = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let posts = await db.post.findAll({
            attributes: ['id','title', 'summary','image','createdAt','slug'],
            limit:8
        });
      
        if (posts) {
          resolve(posts);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let getListPost = async (page) => {
    return new Promise(async (resolve, reject) => {
      try {
        let posts = await db.post.findAndCountAll({
            attributes: ['id','title', 'summary','createdAt','slug'],
            limit: 10,
          offset: (page - 1) * 10,
        });
      
        if (posts) {
          resolve(posts);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let getPost = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let posts = await db.post.findOne({
            attributes: ['id','title', 'summary','image','createdAt','content'],
            where:{
                id:id
            }
        });
        if (posts) {
          resolve(posts);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let handlePutPost = async (data) => {
    return new Promise(async (resolve, reject) => {      
      try {
        let posts = await db.post.findOne({
          where:{
            id:data.id
          }
        
        });
        let imageHandle = xuLyTenFile(data.image)
        if (posts) {
          posts.title = data.title
          posts.content = data.content
          posts.summary = data.sum
          posts.image =imageHandle
          await posts.save();
          resolve(posts);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  
  let handleCreatePost = async (data) => {
    return new Promise(async (resolve, reject) => {      
      try {
        let imageHandle = xuLyTenFile(data.image)

        let posts = await db.post.create({
          title:data.title,
          summary:data.sum,
          content:data.content,
          image:imageHandle
        });
        if (posts) {
          resolve(posts);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  
  module.exports = {
    getPosts,
    getPost,
    handleCreatePost,
    getListPost,
    handlePutPost
  }
