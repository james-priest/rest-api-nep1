class Response {
  constructor(
    status = false,
    code = 400,
    message = 'An error occurred',
    data = null
  ) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

module.exports = Response;
