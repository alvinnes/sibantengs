import { body } from "express-validator";

export const validateUsername = () => {
  return body("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter")
    .isAlphanumeric("en-IN")
    .withMessage("Username tidak boleh menggunakan symbol!")
    .trim()
    .escape();
};

export const validatePassword = () => {
  return body("password")
    .notEmpty()
    .withMessage("Password minimal harus 8 karakter dan tidak boleh kosong!")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 3,
      minSymbols: 1,
    })
    .withMessage("Password  harus mengandung karakter kecil,angka,dan simbol!")
    .isLowercase()
    .withMessage("Password harus huruf kecil semua")
    .trim()
    .escape();
};
