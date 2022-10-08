const { Op } = require("sequelize");
const Models = require("../../db/mysql/models");
const fError = require("../utils/fError");

const createIncludeArray = (str) => {
  if (!str) return { include: [] };

  return {
    include: str.split(",").map((item) => Models[item]),
  };
};

const doesExist =
  (model, modelFa, param = "uuid", paramFa = "شناسه", location = "params", includeModels) =>
  async (req, res, next) => {
    const keyParam = req[location][param];

    if (!keyParam) return next();


    // const item = await Models[model].findOne({ where: { [param]: keyParam } });
    const item = await Models["Package"].findOne({
      where: { uuid: keyParam },
      ...createIncludeArray(includeModels),
    });

    if (!item)
      return next(
        fError(
          400,
          `Does not exit: '${model}' with id: '${keyParam}' does not exist`,
          `${modelFa} با ${paramFa}  فراخوانی شده، وجود ندارد`
        )
      );

    res[model] = item;
    return next();
  };

module.exports = doesExist;
