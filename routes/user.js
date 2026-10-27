const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router
  .route("/signup")
  .get(userController.renderNewSignUpForm) //signup form route
  .post(wrapAsync(userController.newUser)); //create user route

router
  .route("/login")
  .get(userController.loginForm) //login form
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.loginValidation), //login validation
  );

//logout
router.get("/logout", userController.logout);
module.exports = router;
