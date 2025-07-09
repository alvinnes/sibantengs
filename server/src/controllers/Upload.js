export const getImage = (req, res) => {
  res.json("Berhasil");
};

export const postImage = (req, res) => {
  res.json(req.file);
};
