import mime from "mime";

export function createFileFilter(type) {
  return function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith(type)) {
      cb(null, true);
    } else {
      cb("Invalid file type. Only images are allowed");
    }
  };
}

export function customName(req, file, cb) {
  const { username } = req.params;
  const extension = mime.getExtension(file.mimetype);
  const filename = `${username}.${extension}`;
  cb(null, filename);
}
