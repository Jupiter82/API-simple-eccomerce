const router = require("express").Router();
const { USER_ROLES } = require("../../config/constants.config");
const authCheck = require("../../middlewares/auth.middleware");
const PermissionCheck = require("../../middlewares/rbac.middleware");
const { validator } = require("../../middlewares/validator.middleware");
const brandCtrl = require("./brand.controller");
const { brandCreateSchema } = require("./brand.request");
const uploader = require("../../middlewares/uploader.middleware");

// router.post('/',authCheck, PermissionCheck('admin'), "control")

//brand/view
router.get("/home", brandCtrl.listForHome);

// brand/post/dashboard
router
  .route("/")
  .post(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(brandCreateSchema),
    brandCtrl.createBrand
  )

  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    brandCtrl.listAllBrands
  );
router
  .route("/:id")
  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    brandCtrl.getBrandDetail
  )
  .put(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(brandCreateSchema),
    brandCtrl.updateById
  )
  .delete(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    brandCtrl.deleteById
  );
module.exports = router;
