const categorySvc = require("./category.service");

class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      const data = categorySvc.transformRequest(req);
      const succcess = await categorySvc.createdCategory(data);
      res.json({
        result: succcess,
        message: "Category stored successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("CategoryCreate", exception);
      next(exception);
    }
  };
  listAllCategories = async (req, res, next) => {
    try {
      // /category?limit=10&page=2&search=category
      const query = req.query;
      let limit = +query.limit || 10;
      let page = +query.page || 1;
      let skip = 0;

      if (page > 1) {
        skip = (page - 1) * limit;
      }
      let filter = {};
      if (query.search) {
        filter = {
          title: new RegExp(query.search, "i"),
        };
      }
      // skip = 0 , page 1
      //page = 2, skip = 10
      const count = await categorySvc.getCount(filter);
      const data = await categorySvc.getAllCategories({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      res.json({
        result: data,
        message: "Category Fetched",
        meta: {
          currentPage: page,
          total: count,
          limit: limit,
        },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
  getCategoryDetail = async (req, res, next) => {
    try {
      const data = await categorySvc.getOneByFilter({ _id: req.params.id });
      if (!data) {
        throw { code: 404, message: "Category does not exists" };
      } else {
        res.json({
          result: data,
          message: "Category Fetched",
          meta: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const categoryDetail = await categorySvc.getOneByFilter({
        _id: req.params.id,
      });
      if (!categoryDetail) {
        throw { code: 404, message: "Category not found" };
      }
      const data = categorySvc.transformRequest(req, true);
      if (!data.image) {
        data.image = categoryDetail.image;
      }

      const success = await categorySvc.updateCategory(req.params.id, data);
      if (!success) {
        throw { code: 400, message: "Problem while updating category" };
      }
      res.json({
        result: success,
        message: "Category Updated successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("CategoryUpdate", exception);
      next(exception);
    }
  };
  deleteById = async (req, res, next) => {
    try {
      let response = await categorySvc.deleteById(req.params.id);
      if (!response) {
        throw { code: 400, message: "Problem while deleting category" };
      } else {
        res.json({
          result: response,
          message: "Category Deleted successfully",
          meta: null,
        });
      }
    } catch (exception) {
      console.log("deleteById", exception);
      next(exception);
    }
  };

  listForHome = async (req, res, next) => {
    try {
      const data = await categorySvc.getAllCategories({
        limit: 10,
        skip: 0,
        filter: {
          status: "active",
        },
      });
      if (!data || data.length <= 0) {
        throw { code: 400, message: "Empty category list" };
      }
      res.json({
        result: data,
        message: "Category Fetched",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;
