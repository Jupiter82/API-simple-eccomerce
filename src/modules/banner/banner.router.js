const router = require("express").Router();
const { USER_ROLES } = require("../../config/constants.config");
const authCheck = require("../../middlewares/auth.middleware");
const PermissionCheck = require("../../middlewares/rbac.middleware");
const { validator } = require("../../middlewares/validator.middleware");
const bannerCtrl = require("./banner.controller");
const { bannerCreateSchema } = require("./banner.request");
const uploader = require("../../middlewares/uploader.middleware");

// router.post('/',authCheck, PermissionCheck('admin'), "control")

//banner/view
router.get("/home", bannerCtrl.listForHome)

// banner/post/dashboard
router
  .route("/")
  .post(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(bannerCreateSchema),
    bannerCtrl.createBanner
  )

  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    bannerCtrl.listAllBanners
  )
router.route("/:id")
  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    bannerCtrl.getBannerDetail
  )
  .put(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(bannerCreateSchema),
    bannerCtrl.updateById
  )
  .delete(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    bannerCtrl.deleteById
  )
module.exports = router;
