export class ErrorHandling {
  static async errorHandler(err, req, res, next) {
    console.log('error handling ',err.status);
    res
      .status(err.status ? err.status : 500)
      .json({ error: err.message ? err.message : "Internal Server Error" });
  }
}
