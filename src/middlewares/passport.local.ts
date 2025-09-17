import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleByID } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
          session.messages = [];
        }
        console.log(">>> Checking user login: ", username, password);
        // check user exits in db
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) {
          console.log(">>> User not found");
          return callback(null, false, { message: "Username/Password invalid." });
        }
        // check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return callback(null, false, { message: "Username/Password invalid." });
        }
        return callback(null, user as any);
      }
    )
  );
  passport.serializeUser(function (user: any, cb) {
    cb(null, { id: user.id, username: user.username });
  });

  passport.deserializeUser(async function (user: any, cb) {
    const { id } = user;
    const userInDB: any = await getUserWithRoleByID(id);
    const sumCart = await getUserSumCart(id);
    console.log(">>> Sum cart: ", sumCart);
    return cb(null, { ...userInDB, sumCart: sumCart });
  });
};

export default configPassportLocal;
