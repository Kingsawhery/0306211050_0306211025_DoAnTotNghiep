import { where } from "sequelize";
import db from "../models";
let getPosts = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let posts = await db.post.findAll({
            attributes: ['id','title', 'summary','image','createdAt','slug'],
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
  module.exports = {
    getPosts,
    getPost
  }