export function validateStringInput(req, res, next) {
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).json({
      error: 'Missing required field: value',
    });
  }

  if (typeof value !== 'string') {
    return res.status(422).json({
      error: 'Invalid data type for "value" (must be string)',
    });
  }

  if (value.trim().length === 0) {
    return res.status(400).json({
      error: 'String value cannot be empty or only whitespace',
    });
  }

  next();
}
