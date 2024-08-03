import Joi from 'joi';

class ProfileUtil {
  validateCreate = Joi.object({
    id: Joi.number().integer().required(),
    bio: Joi.string()
  });

  validateUpdate = Joi.object({
    id: Joi.number().integer().required(),
    bio: Joi.string()
  });
}

export default new ProfileUtil();