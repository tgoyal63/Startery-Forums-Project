class ControllerUtils {
  static controllerResponse(statusCode, message, data) {
    return {
      statusCode,
      message,
      data,
    };
  }

  static controllerBoilerPlate(wrapped) {
    return (req, res, next) =>
      wrapped(req, res, next)
        .then((response) => res.status(response.statusCode).send(response))
        .catch((err) => {
          next(err);
        });
  }
}

module.exports = ControllerUtils;
