const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const { ValidateF, validator } = require("../src/middleware/validate");
const userById = require("../src/middleware/gets/userById");
const isUnique = require("../src/middleware/isUnique");

const {
  register,
  authornticate,
  oneTimeLogin,
  oneTimeConfirm,
} = require("../src/services/auth");

/**************************/
/*   validation schemas   */
/**************************/
const registerSchema = new ValidateF()
  .param("username", "نام کاربری")
  .requiredString()
  .param("password", "رمز عبور")
  .requiredString()
  .minimum(6)
  .param("repassword", "تکرار رمز عبور")
  .requiredString()
  .minimum(6)
  .theSameAs("password", "تکرار رمز عبور", "رمز عبور")
  .done();

const loginSchema = new ValidateF()
  .phoneSchema()
  .param("password", "رمز عبور")
  .required()
  .done();

const phoneSchema = new ValidateF().phoneSchema().done();

const confirmCodeSchema = new ValidateF()
  .param("confirmCode", "کد تایید")
  .required()
  .length(6)
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/register",
  use(validator(registerSchema)),
  use(isUnique("User", "کاربر", "username", "نام کاربری")),
  register,
  serveJson
);

router.post(
  "/login",
  use(validator(loginSchema)),
  use(authornticate),
  serveJson
);

router.post("/", use(validator(phoneSchema)), use(oneTimeLogin), serveJson);

router.post(
  "/:userId",
  use(validator(confirmCodeSchema)),
  use(userById),
  use(oneTimeConfirm),
  serveJson
);

module.exports = router;
