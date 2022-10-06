const { Op } = require("sequelize");
const Models = require("../../db/models");
const fError = require("../utils/fError");

const createIncludeArray = (str) => {
  if (!str) return { include: [] };

  return {
    include: str.split(",").map((item) => Models[item]),
  };
};

const getDataList =
  (model, modelFa, includeModels, orderColumn = "createdAt") =>
  async (req, res, next) => {
    const defaultOptions = res?.dbOptions?.defaultOptions ?? {};
    const paginationedOptions = res?.dbOptions?.paginationedOptions ?? {};

    const { sortOptions } = res;

    console.log({
      ...defaultOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
    });

    const items = await Models[model].findAll({
      ...defaultOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
    });

    const pagedItems = await Models[model].findAll({
      ...paginationedOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
      subQuery: false,
    });

    if (items.length === 0)
      return next(
        fError(404, `There are not ${model}s yet`, `${modelFa} ای وجود ندارد`)
      );

    res.jsonData = {
      data: pagedItems,
      total: items.length,
    };

    return next();
  };

module.exports = getDataList;
