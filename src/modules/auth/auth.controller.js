require("dotenv").config();
const { required } = require("joi");
const { randomString } = require("../../config/helpers.config");
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { forgetPassword } = require("./auth.request");

class AuthController {
  //TODO: functions
  register = async (req, res, next) => {
    try {
      const payload = req.body;

      // images
      // none, single, array
      console.log(req.files);
      if (req.files) {
        payload.image = req.files[0].filename;
      }
      // if (req.files) {
      //   const images = req.files.map((img) => img.filename);
      //   payload.image = images;
      // }

      // Data mapping
      payload.activationToken = randomString(100);
      payload.status = "notactivated";

      // DB store: mangodb
      // TODO: DB Operation
      console.log(payload, "payload");
      const dbStatus = await authSvc.registerUser(payload);

      res.json({
        result: dbStatus,
        message: "Register Data",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next({
        code: 422,
        message: exception.message,
        result: null,
      });
    }
    //TODO : User Register
    // Validation // payload
    // DB store
    // Activation process
    // response
  };

  verifyActivationToken = async (req, res, next) => {
    try {
      let data = await authSvc.getUserByActivationToken(req.params.token);
      res.json({
        result: data,
        message: "User Verified",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      const userDetail = await authSvc.getUserByActivationToken(
        req.params.token
      );
      const data = {
        password: bcrypt.hashSync(req.body.password, 10),
        activationToken: null,
        status: "activated",
      }; //password
      console.log(data);
      const response = await authSvc.updateUserById(userDetail._id, data);
      res.json({
        result: response,
        message: "Your account has been updated successfully.",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userDetail = await authSvc.getSingleUserByFilter({ email });
      if (!userDetail) {
        throw { code: 422, message: "User does not exists", result: { email } };
      }
      if (userDetail && userDetail.status === "activated") {
        //login
        if (bcrypt.compareSync(password, userDetail.password)) {
          //password
          const token = jwt.sign(
            {
              userId: userDetail._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1 day",
              subject: `${userDetail._id}`,
            }
          );
          res.json({
            result: {
              token: token,
              type: "Bearer",
              userDetail: {
                userId: userDetail._id,
                name: userDetail.name,
                role: userDetail.role,
                image: userDetail.image,
              },
            },
            message: "User Logged in successfully.",
            meta: null,
          });
        } else {
          //
          throw { code: 422, message: "Credentails does not match" };
        }
        res.json(userDetail);
        console.log(userDetail);
      } else {
        throw {
          code: 422,
          message: "User is not activated or is suspended",
          result: { email },
        };
      }
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUse = (req, res, next) => {
    const loggedInUser = req.authUser;
    res.json({
      result: loggedInUser,
      message: "I am on me route",
      meta: null,
    });
  };

  logOutUser = (req, res, next) => {
    //TODO: Logout logged in user
  };

  sendEmailForForgetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const userDetail = await authSvc.getSingleUserByFilter({
        email: email,
      });
      if (!userDetail) {
        throw { code: 422, message: "User does not exists", result: { email } };
      } else {
        //mail to reset password
        await authSvc.sendForgetPasswordMail(userDetail);
        res.json({
          result: null,
          message:
            "An email has been sent to the registered email. PLease check your email for further processing.",
          meta: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgetPasswordToken = async (req, res, next) => {
    try {
      let userDetail = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: req.params.token,
      });
      if (userDetail) {
        res.json({
          result: userDetail,
          meta: null,
          msg: "User does exists and verified",
        });
      } else {
        throw { code: 422, message: "Token does not exists or expired" };
      }
    } catch (exception) {
      throw exception;
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const userDetail = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: req.params.token,
      });
      if (!userDetail) {
        throw { code: 422, message: "Token does not exists or expired" };
      } else {
        const data = {
          password: bcrypt.hashSync(req.body.password, 10),
          forgetPasswordToken: null,
        }; //password
        console.log(data);
        const response = await authSvc.updateUserById(userDetail._id, data);
        res.json({
          result: response,
          message: "Your Password has been updated successfully.",
          meta: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };
}

//object = // class
const authCtrl = new AuthController();
module.exports = authCtrl;
