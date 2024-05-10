require("dotenv").config();
const { randomString } = require("../../config/helpers.config");
const EmailService = require("../common/mail/email.service");
const UserModel = require("../user/user.model");
const { forgetPassword } = require("./auth.request");

class AuthService {
  //constructor(),connect(),db

  registerUser = async (data) => {
    try {
      const user = new UserModel(data); //object UserModel
      const response = await user.save(); //insert operation

      // const response =await this.db.collection('users').insertOne(data);

      let link = process.env.FRONTEND_URL + "/activate/" + data.activationToken;
      let message = `Dear ${data.name},<br/>
                                          <p>Your account has been successfully registered. Please click the link below: or copy paste
                                          the url in the browser to activate your account</p>
                                          <a href="${link}">
                                              ${link}
                                          </a> 
                                          <br/>
                                          Regard, <br/>
                                          System Admin <br/>
                                          <small>
                                          <em>Please do not reply to this email.</em>
                                          </small>`;

      //SMTP(Simple Mail Transfer Protocol)
      await new EmailService().sendEmail(
        data.email,
        "Activate Your account",
        message
      );

      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserByActivationToken = async (token) => {
    try {
      let data = await this.getSingleUserByFilter({ activationToken: token });
      if (!data) {
        throw { code: 400, message: "Token does not exit" };
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  updateUserById = async (id, data) => {
    try {
      const response = await UserModel.findByIdAndUpdate(id, { $set: data }); //working with primary key
      // const response = await UserModel.findOneAndUpdate({_id:id},{$set: data});
      // const response = await UserModel.updateOne({_id:id},{$set: data});
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  getSingleUserByFilter = async (filter) => {
    try {
      const userDetail = await UserModel.findOne(filter);
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  };
  sendForgetPasswordMail = async (user) => {
    try {
      const forgetToken = randomString(100);
      const status = await UserModel.findOneAndUpdate(
        {
          email: user.email,
        },
        {
          $set: {
            forgetPasswordToken: forgetToken,
          },
        }
      );
      const link = process.env.FRONTEND_URL+"/reset-password/"+forgetToken;
      const msg = `Dear ${user.name}, <br/>
            If you have requested to reset the password, please click the link below.
            Or you can ignore this message.
            <br/>
            <a href="${link}">
            ${link}
        </a> 
            <br/>
            <strong>Regards</strong>
            <br/>
            <strong><small>${process.env.FROM_ADDRESS}</small></strong>
          `;
      new EmailService().sendEmail(user.email, "Reset Password email", msg);
      return status;
    } catch (exception) {
      throw exception;
    }
  };
}

const authSvc = new AuthService(); //singleton pattern
module.exports = authSvc;
//services used for database update
