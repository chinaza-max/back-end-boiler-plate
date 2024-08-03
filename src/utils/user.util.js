import Joi from 'joi';

class UserUtil {
  validateCreate = Joi.object({
    id: Joi.number().integer().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    profileId: Joi.string().required()
  });

  validateUpdate = Joi.object({
    id: Joi.number().integer().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    profileId: Joi.string().required()
  });
}

export default new UserUtil();