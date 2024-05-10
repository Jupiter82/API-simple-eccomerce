const bannerSvc = require("./banner.service");

class BannerController {
  createBanner = async (req, res, next) => {
    try {
      const data = bannerSvc.transformRequest(req);
      const succcess = await bannerSvc.createdBanner(data);
      res.json({
        result: succcess,
        message: "Banner stored successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("BannerCreate", exception);
      next(exception);
    }
  };
  listAllBanners = async (req, res, next) => {
    try {
      // /banner?limit=10&page=2&search=banner
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
      const count = await bannerSvc.getCount(filter);
      const data = await bannerSvc.getAllBanners({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      res.json({
        result: data,
        message: "Banner Fetched",
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
  getBannerDetail = async (req,res,next) => {
    try{
        const data = await bannerSvc.getOneByFilter({_id: req.params.id})
        if(!data){
            throw{code: 404, message:"Banner does not exists"}
        }else{
            res.json({
                result: data,
                message: "Banner Fetched",
                meta:null
            })
        }
    }catch(exception){
        next(exception)
    }
  }
  updateById = async (req,res,next) => {
    try {
        const bannerDetail = await bannerSvc.getOneByFilter({_id: req.params.id});
        if(!bannerDetail){
            throw {code: 404, message: "Banner not found"}
        }
        const data = bannerSvc.transformRequest(req, true);
        if(!data.image){
            data.image = bannerDetail.image
        }
        
        const success = await bannerSvc.updateBanner(req.params.id,data);
        if(!success) {
            throw {code:400, message: "Problem while updating banner"}
        }
        res.json({
          result: success,
          message: "Banner Updated successfully",
          meta: null,
        });
      } catch (exception) {
        console.log("BannerUpdate", exception);
        next(exception);
      }
  }
  deleteById = async (req, res, next) =>{
    try {
        let response = await bannerSvc.deleteById(req.params.id)
        if(!response){
            throw {code:400, message: "Problem while deleting banner"}
        }
        else{
        res.json({
            result:response,
            message: "Banner Deleted successfully",
            meta: null
        })
    }
    } catch (exception) {
        console.log("deleteById",exception);
        next(exception)
    }
  }

  listForHome = async (req, res, next) =>{
    try {
        const data = await bannerSvc.getAllBanners({
          limit: 10,
          skip: 0,
          filter: {
            status: "active"
          }
        });
        if(!data || data.length <= 0){
            throw{code:400, message:"Empty banner list"}
        }
        res.json({
          result: data,
          message: "Banner Fetched",
          meta: null
        });
      } catch (exception) {
        console.log(exception);
        next(exception);
      }
  }
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
