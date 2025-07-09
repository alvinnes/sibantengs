import { body } from "express-validator";

export const validateLogin = () => {
  return (
    body("username")
      .notEmpty()
      .withMessage("Username tidak boleh kosong!")
      .isLength({ min: 3 })
      .withMessage("Username minimal 3 karakter")
      .isAlphanumeric("en-IN")
      .withMessage("Username tidak boleh menggunakan symbol!")
      .trim()
      .escape(),
    body("password")
      .notEmpty()
      .withMessage("Password minimal harus 8 karakter dan tidak boleh kosong!")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 3,
      })
      .withMessage("Password  harus mengandung karakter kecil,dan angka!")
      .isLowercase()
      .withMessage("Password harus huruf kecil semua")
      .trim()
      .escape()
  );
};

export default validateLogin;
