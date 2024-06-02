const brandSvc = require("./brand.service");

class BrandController {
  createBrand = async (req, res, next) => {
    try {
      const data = brandSvc.transformRequest(req);
      const succcess = await brandSvc.createdBrand(data);
      res.json({
        result: succcess,
        message: "Brand stored successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("BrandCreate", exception);
      next(exception);
    }
  };
  listAllBrands = async (req, res, next) => {
    try {
      // /brand?limit=10&page=2&search=brand
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
      const count = await brandSvc.getCount(filter);
      const data = await brandSvc.getAllBrands({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      res.json({
        result: data,
        message: "Brand Fetched",
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
  getBrandDetail = async (req, res, next) => {
    try {
      const data = await brandSvc.getOneByFilter({ _id: req.params.id });
      if (!data) {
        throw { code: 404, message: "Brand does not exists" };
      } else {
        res.json({
          result: data,
          message: "Brand Fetched",
          meta: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const brandDetail = await brandSvc.getOneByFilter({ _id: req.params.id });
      if (!brandDetail) {
        throw { code: 404, message: "Brand not found" };
      }
      const data = brandSvc.transformRequest(req, true);
      if (!data.image) {
        data.image = brandDetail.image;
      }

      const success = await brandSvc.updateBrand(req.params.id, data);
      if (!success) {
        throw { code: 400, message: "Problem while updating brand" };
      }
      res.json({
        result: success,
        message: "Brand Updated successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("BrandUpdate", exception);
      next(exception);
    }
  };
  deleteById = async (req, res, next) => {
    try {
      let response = await brandSvc.deleteById(req.params.id);
      if (!response) {
        throw { code: 400, message: "Problem while deleting brand" };
      } else {
        res.json({
          result: response,
          message: "Brand Deleted successfully",
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
      const data = await brandSvc.getAllBrands({
        limit: 10,
        skip: 0,
        filter: {
          status: "active",
        },
      });
      if (!data || data.length <= 0) {
        throw { code: 400, message: "Empty brand list" };
      }
      res.json({
        result: data,
        message: "Brand Fetched",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;
