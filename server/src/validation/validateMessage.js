import { body } from "express-validator";

export const validateMessage = () => {
  return (
    body("fullname").notEmpty().withMessage("nama lengkap tidak boleh kosong!"),
    body("email")
      .notEmpty()
      .withMessage("Email tidak boleh kosong!")
      .isEmail()
      .withMessage("Format email salah!"),
    body("phone").notEmpty().withMessage("Nomor hp tidak boleh kosong"),
    body("message").notEmpty().withMessage("Pesan tidak boleh kosong!")
  );
};
