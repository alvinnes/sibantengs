import { body } from "express-validator";

export const validateRegister = () => {
  return (
    // Validasi Nama Lengkap
    body("fullname")
      .notEmpty()
      .withMessage("Nama tidak boleh kosong!")
      .isLength({ min: 3 })
      .withMessage("Nama minimal 3 karakter!"),
    // Validasi Nomor HP
    body("phone")
      .notEmpty()
      .withMessage("Nomor hp tidak boleh kosong!")
      .isMobilePhone("id-ID")
      .withMessage("Format nomor harus indonesia!")
      .blacklist("e"),
    // Validasi Email
    body("email")
      .notEmpty()
      .withMessage("email tidak boleh kosong!")
      .isEmail()
      .withMessage("Format email anda salah!")
      .normalizeEmail({
        gmail_remove_dots: true,
        gmail_remove_subaddress: true,
        gmail_convert_googlemaildotcom: true,
      }),
    // Validasi Alamat
    body("addres")
      .notEmpty()
      .withMessage("Alamat tidak boleh kosong!")
      .blacklist("!$%^&*+<>?~"),
    body("password")
      .notEmpty()
      .withMessage("Password tidak boleh kosong!")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter!")
      .custom(async () => {
        const hasSymbol = symbols && symbols.length > 0;
        if (!hasSymbol) {
          throw new error("Password harus memiliki symbol!");
        }
      })
      .custom(async () => {
        const hasNumbers = digits && digits.length > 2;
        if (!hasNumbers) {
          throw new error("Password harus memiliki minimal 3 angka");
        }
      }),
    body("repeat_password").custom(async (prev, { req }) => {
      if (prev !== req.body.password) {
        throw new error("Password tidak sama!");
      }
    }),
    // Validasi Nomor KTP
    body("ktp_number")
      .notEmpty()
      .withMessage("Nomor ktp tidak boleh kosong!")
      .isLength({ max: 16 })
      .withMessage("Format ktp salah!"),
    // Validasi Nomor KK
    body("kk_number")
      .notEmpty()
      .withMessage("Nomor kk tidak boleh kosong!")
      .isLength({ max: 16 })
      .withMessage("Format kk salah!"),
    // Validasi File KTP
    body("img_ktp").notEmpty().withMessage("Foto ktp tidak boleh kosong!"),
    // Validasi File KK
    body("img_kk").notEmpty().withMessage("Foto kk tidak boleh kosong!"),
    // Validasi File Selfie Dengan KTP
    body("img_ktp_person")
      .notEmpty()
      .withMessage("Foto selfie dengan ktp tidak boleh kosong!")
  );
};
