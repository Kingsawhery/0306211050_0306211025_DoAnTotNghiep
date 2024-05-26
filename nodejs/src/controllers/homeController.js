import userServices from "../services/userService";

let getHomePage = (req, res) => {
  return res.render("homePage.ejs");
};

const handleUserPage = async (req, res) => {
  const page = await req.query.page;
  if (page > 0) {
    let { count, rows } = await userServices.getUserList(page);
    return res.status(200).json({
      data: {
        total: count,
        totalPages: Math.ceil(count / 10),
        currentPage: page,
        data: rows,
      },
    });
  } else {
    return res.status(200).json({
      message: "Cannot search for number page less than 1",
    });
  }
};

let handleCreatUser = (req, res) => {
  return res.render("user.ejs");
};

let handlePostUser = async (req, res) => {
  let email = await req.body.email;
  let password = await req.body.password;
  let username = await req.body.username;

  //check password xem đúng với mã hóa chưa
  // let someOtherPlaintextPassword = bcrypt.compareSync(
  //   password,
  //   myPlaintextPassword
  // );

  await userServices.createUser(email, password, username);
  return res.status(200).json({
    message: "Create user successfully!",
  });
};

const handleDeleteUser = async (req, res) => {
  try {
    let id = await req.params.id;
    if (id) {
      await userServices.deleteUser(id);
      return res.status(200).json({
        message: "Delete successfully!",
      });
    } else {
      return res.status(200).json({
        message: "Id is not define!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      message: "Somthing wrong!",
    });
  }
};

const getUser = async (req, res) => {
  let id = await req.query.id;
  if (id) {
    console.log(id);
    let user = await userServices.getUserById(id);
    // console.log(userData);
    return res.status(200).json({
      data: user,
    });
  } else {
    return res.status(200).json({
      message: "Id is not define!",
    });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    let { email, username, id } = await req.body;
    if (!email || !username || !id) {
      return res.status(200).json({
        message: "Missing required fields!",
      });
    } else {
      await userServices.updateUser(email, username, id);
      return res.status(200).json({
        message: "Edit Successfully!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      message: "Something wrong!",
    });
  }
};

module.exports = {
  getHomePage,
  handleCreatUser,
  handlePostUser,
  handleUserPage,
  handleDeleteUser,
  getUser,
  handleUpdateUser,
};
