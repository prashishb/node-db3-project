const Scheme = require('./scheme-model');

const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.scheme_id);
    if (!scheme) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      req.scheme = scheme;
      next();
    }
  } catch (err) {
    next({
      status: 500,
      message: err.message,
    });
  }
};

const validateScheme = (req, res, next) => {
  if (
    !req.body.scheme_name ||
    typeof req.body.scheme_name !== 'string' ||
    req.body.scheme_name.length === 0
  ) {
    next({
      status: 400,
      message: 'invalid scheme_name',
    });
  } else {
    next();
  }
};

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    !instructions ||
    instructions.length === 0 ||
    typeof instructions !== 'string' ||
    typeof step_number !== 'number' ||
    isNaN(step_number) ||
    step_number < 1
  ) {
    next({
      status: 400,
      message: 'invalid step',
    });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
