export function createError(errorMsg = "Something went wrong", status = 500) {
  const error = new Error(errorMsg);
  error.status = status;
  return error;
}

export function throwError(error) {
  throw error;
}
