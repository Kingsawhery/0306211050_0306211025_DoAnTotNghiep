import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";

const saltRounds = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, saltRounds); // Băm nhỏ password để mã hóa
  return hashPassword;
};
function random(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const createUser = async (email, password, username, type_ = "LOCAL") => {
  let hashPass = hashUserPassword(password);
  const token = await random(200);

  try {
    let user = null;
    if (type_ === "LOCAL") {
      user = await db.User.create({
        email: email,
        username: username,
        password: hashPass,
        token: token,
        type: type_,
      });
    } else {
      user = await db.User.create({
        email: email,
        token: token,
        username: username,
        type: type_,
      });
    }

    return user.dataValues;
  } catch (err) {
    console.log(err);
  }
};
const lockUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where:{
          id:id
        }
      });

      if (user) {
        user.status = !user.status;
        user.save();
        resolve({
          errCode:0
        });
      } else {
        resolve({
          errCode:1
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
// const getUserList = async (page) => {
//   return new Promise(async (resolve, reject) => {
//     console.log(page);
//     try {
//       let users = await db.User.findAndCountAll({
//         limit: 10,
//         offset: (page - 1) * 10,
//         attributes: ["id", "email", "username", "phone", "createdAt"],
//         include:{
//           model:db.role,
//           where: {
//             name: {
//               [db.Sequelize.Op.ne]: "admin", // khác 'admin'
//             },
//           },
//         }
//       });

//       if (users) {
//         resolve(users);
//       } else {
//         resolve();
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
const getUserList = async (page, keyword) => {
  return new Promise(async (resolve, reject) => {
    console.log("Page:", page, "Keyword:", keyword);

    try {
      let whereCondition = {};
      
      if (keyword !== "null") {
        console.log(keyword !== "null");
        console.log(keyword);

        
        whereCondition[db.Sequelize.Op.or] = [
          { username: { [db.Sequelize.Op.like]: `%${keyword}%` } },
          { email: { [db.Sequelize.Op.like]: `%${keyword}%` } },
          { phone: { [db.Sequelize.Op.like]: `%${keyword}%` } },
        ];
      }

      let users = await db.User.findAndCountAll({
        where: whereCondition,
        limit: 10,
        offset: (page - 1) * 10,
        attributes: ["id", "email", "username", "phone","address","gender","status", "createdAt"],
        include: {
          model: db.role,
          where: {
            name: {
              [db.Sequelize.Op.ne]: "admin",
            },
          },
          attributes: []
        },
      });

      resolve(users || []);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
};
const getUserByEmail = async (email) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  return user.get({ plain: true });
};
const updateUser = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
const getDataUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data); 
      const dataUser = await db.User.findOne({
        where: {
          id: data.id,
          token: data.token
        },
        attributes:["username","email","phone","birthday","address","gender","image"]
      });
      resolve(dataUser);
    } catch (err) {
      reject(err);
    }
  });
};


module.exports = {
  getDataUser,
  createUser,
  hashUserPassword,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
  random,
  lockUser
};
