const fs = require("fs");
const router = require("express").Router();
const inventoriesController = require("../controllers/inventories-controller");
const { authenticate, authorizeEmployee } = require("../middleware/auth");

//routes

router.route("/").get(inventoriesController.index);

router.route("/:id").get(inventoriesController.singleInventoryItem);

router.route("/:id").delete(authenticate, authorizeEmployee, inventoriesController.deleteInventoryItem);

router.route("/").post(authenticate, authorizeEmployee, inventoriesController.createInventoryItem);

router.route("/:id").put(authenticate, authorizeEmployee, inventoriesController.updateInventoryItem);


module.exports = router;
