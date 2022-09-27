const { InvalidArgumentError } = require('./errors');


module.exports = {
  stringNotNullField: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`Must fill the ${name} field!`);
  },

  minLengthField: (value, name, min) => {
    if (value.length < min)
      throw new InvalidArgumentError(
        `The ${name} field must be greater than ${min} characters!`
      );
  },

  maxLengthField: (value, name, max) => {
    if (value.length > max)
      throw new InvalidArgumentError(
        `The ${name} field must be least than ${max} characters!`
      );
  }
};
