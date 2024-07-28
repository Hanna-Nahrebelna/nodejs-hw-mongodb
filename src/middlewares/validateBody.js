import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.error({ message: error.message });
      console.error({ details: error.details });

      next(
        createHttpError(400, error.details.map((err) => err.message).join(', '),
        ),
      );
    }
  };
}
