import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      // {
      //   usernameField: "email",
      // },
      async function verify(username, password, callback) {
        console.log(">>> Checking user login: ", username, password);
        // check user exits in db
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) {
          return callback(null, false, { message: "Incorrect username or password." });
        }
        // check password
        const isMatch = comparePassword(password, user.password);
        if (!isMatch) {
          return callback(null, false, { message: "Incorrect username or password." });
        }
        return callback(null, user);
      }
    )
  );
};

export default configPassportLocal;
