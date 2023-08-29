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
        .catch((err) => {
          next(err);
        })
        .then((response) => res.status(response.statusCode).send(response));
  }
}

module.exports = ControllerUtils;
