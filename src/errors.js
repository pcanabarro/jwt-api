class InvalidArgumentError extends Error {
  constructor(msg) {
    super(msg);
    this.nameError = 'InvalidArgumentError';
  }
}

class InternalServerError extends Error {
  constructor(msg) {
    super(msg);
    this.nameError = 'InternalServerError';
  }
}

module.exports = {
  InvalidArgumentError: InvalidArgumentError,
  InternalServerError: InternalServerError
};
