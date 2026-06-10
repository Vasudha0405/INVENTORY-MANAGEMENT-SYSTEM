import "./EditInventory.scss";
import TitleComponent from "../TitleComponent/TitleComponent";
import InputComponent from "../Input/Input";
import DropdownSelect from "../Dropdown/Dropdown";
import RadioButtons from "../RadioButton/RadioButton";
import ButtonEl from "../Button/Button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const WAREHOUSES = {};

function EditInventory(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuantity, setShowQuantity] = useState(true);
  const [warehouseNames, setWarehouseNames] = useState([]);
  const [warehouseMap, setWarehouseMap] = useState(WAREHOUSES);

  let formData = useRef({
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
    warehouse_id: "",
    warehouse_name: "",
  });

  function setFormData(newFormData) {
    formData.current = newFormData;
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [itemRes, whRes] = await Promise.all([
        axios.get(`${API_URL}/inventories/${params.itemId}`),
        axios.get(`${API_URL}/warehouses`),
      ]);

      // Build warehouse map
      const map = {};
      const names = [];
      whRes.data.forEach((w) => {
        map[w.warehouse_name] = w.id;
        names.push(w.warehouse_name);
      });
      setWarehouseMap(map);
      setWarehouseNames(names);

      const item = itemRes.data[0];
      setItemData(item);
      setFormData({
        ...formData.current,
        item_name: item.item_name,
        description: item.description,
        category: item.category,
        status: item.status,
        quantity: item.quantity,
        warehouse_name: item.warehouse_name,
        warehouse_id: map[item.warehouse_name] || item.warehouse_id,
      });
      setShowQuantity(item.status === "In Stock");
      setIsLoading(false);
    } catch (err) {
      console.error(`Error fetching data: ${err}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.itemId]);

  const editFormHandler = (event) => {
    event.preventDefault();

    const currentData = { ...formData.current };

    // Resolve warehouse_id from warehouse_name
    if (currentData.warehouse_name && warehouseMap[currentData.warehouse_name]) {
      currentData.warehouse_id = warehouseMap[currentData.warehouse_name];
    }

    // Validate required fields
    if (
      !currentData.warehouse_id ||
      !currentData.item_name ||
      !currentData.category ||
      !currentData.description ||
      !currentData.status
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const quantity =
      currentData.status === "Out of Stock"
        ? 0
        : parseInt(currentData.quantity) || 0;

    const payload = {
      warehouse_id: currentData.warehouse_id,
      item_name: currentData.item_name,
      description: currentData.description,
      category: currentData.category,
      status: currentData.status,
      quantity: quantity,
    };

    axios
      .put(`${API_URL}/inventories/${params.itemId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Item updated successfully!");
        navigate(-1);
      })
      .catch((err) => {
        const errorMessage = err.response?.data || err.message || "Unknown error";
        alert(`Error updating item: ${errorMessage}`);
        console.error("Error details:", err);
      });
  };

  const backButtonHandler = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const onChangeFormhandler = (event) => {
    setFormData({
      ...formData.current,
      [event.target.name]: event.target.value,
    });
  };

  function showQuantityFunc(show) {
    if (show === "In Stock") {
      setShowQuantity(true);
    } else {
      setShowQuantity(false);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!itemData) {
    return <h1>Item not found</h1>;
  }

  return (
    <>
      <TitleComponent title='Edit Inventory Item' backButton={true} />

      <section className='card-container__background'>
        <div className='card-container__card'>
          <div className='inventory-edit__container'>
            <form
              className='inventory-edit__form'
              onSubmit={editFormHandler}
              onChange={onChangeFormhandler}>
              <div className='inventory-edit__form__row'>
                <div className='inventory-edit__form__column'>
                  <h2 className='inventory-edit__form__header'>Item Details</h2>
                  <InputComponent
                    labelName='Item Name'
                    fieldName='item_name'
                    defaultValue={itemData.item_name}
                  />
                  <InputComponent
                    labelName='Description'
                    type='textarea'
                    fieldName='description'
                    defaultValue={itemData.description}
                  />
                  <DropdownSelect
                    labelName='Category'
                    items={[
                      "Electronics",
                      "Gear",
                      "Apparel",
                      "Accessories",
                      "Health",
                    ]}
                    defaultValue={itemData.category}
                    fieldName='category'
                  />
                </div>

                <div className='inventory-edit__form__column'>
                  <h2 className='inventory-edit__form__header'>
                    Item Availability
                  </h2>

                  <RadioButtons
                    labelName='Status'
                    items={["In Stock", "Out of Stock"]}
                    defaultValue={itemData.status}
                    fieldName='status'
                    onChange={(event) => showQuantityFunc(event.target.value)}
                  />

                  {showQuantity && (
                    <InputComponent
                      labelName='Quantity'
                      defaultValue={String(itemData.quantity)}
                      fieldName='quantity'
                    />
                  )}

                  <DropdownSelect
                    labelName='Warehouse'
                    items={warehouseNames}
                    defaultValue={itemData.warehouse_name}
                    fieldName='warehouse_name'
                  />
                </div>
              </div>
              <div className='inventory-edit__form__row'>
                <div className='inventory-edit__form__buttons'>
                  <ButtonEl
                    title='Cancel'
                    buttonType='cancel'
                    onClick={backButtonHandler}
                  />
                  <ButtonEl title='Save' type='submit' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditInventory;
