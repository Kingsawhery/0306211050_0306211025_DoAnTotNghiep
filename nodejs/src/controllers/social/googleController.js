require("dotenv").config;
import passport from "passport";
import loginRegisterService from "../../services/loginRegisterService";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const configLoginWithGG = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET_CLIENT,
        callbackURL: process.env.GOOGLE_APP_REDIRECT_CLIENT,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const typeAcc = "GOOGLE";
        let dataRaw = {
          username: profile.displayName,
          email:
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : "",
          googleId: profile.id,
        };
        let user = await loginRegisterService.upsertUserGG(typeAcc, dataRaw);
        return cb(null, user);
      }
    )
  );
};
export default configLoginWithGG;
