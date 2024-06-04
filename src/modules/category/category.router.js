const router = require("express").Router();
const { USER_ROLES } = require("../../config/constants.config");
const authCheck = require("../../middlewares/auth.middleware");
const PermissionCheck = require("../../middlewares/rbac.middleware");
const { validator } = require("../../middlewares/validator.middleware");
const categoryCtrl = require("./category.controller");
const { categoryCreateSchema } = require("./category.request");
const uploader = require("../../middlewares/uploader.middleware");

// router.post('/',authCheck, PermissionCheck('admin'), "control")

//category/view
router.get("/home", categoryCtrl.listForHome);

// category/post/dashboard
router
  .route("/")
  .post(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(categoryCreateSchema),
    categoryCtrl.createCategory
  )

  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    categoryCtrl.listAllCategories
  );
router
  .route("/:id")
  .get(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    categoryCtrl.getCategoryDetail
  )
  .put(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    uploader.single("image"),
    validator(categoryCreateSchema),
    categoryCtrl.updateById
  )
  .delete(
    authCheck,
    PermissionCheck(USER_ROLES.superadmin),
    categoryCtrl.deleteById
  );
module.exports = router;
