const fs = require("fs");
const router = require("express").Router();
const warehousesController = require("../controllers/warehouses-controller");
const { v4: uuidv4 } = require('uuid');
const { authenticate, authorizeEmployee } = require("../middleware/auth");

//routes

router.route("/").get(warehousesController.index);

router.route("/:warehouse_id").get(warehousesController.singleWarehouse);

router.route("/:warehouse_id/inventories").get(warehousesController.singleWarehouseInventory);

router.route("/").post(authenticate, authorizeEmployee, warehousesController.createWarehouse);

router.route("/:warehouse_id").put(authenticate, authorizeEmployee, warehousesController.updateWarehouse);

router.route("/:warehouse_id").delete(authenticate, authorizeEmployee, warehousesController.deleteWarehouse);

module.exports = router;
