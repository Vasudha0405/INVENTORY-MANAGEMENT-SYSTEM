import "./Inventory.scss";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Inventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInventoryName, setSelectedInventoryName] = useState(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // This useEffect is used to set the viewWidth state to the current window width
  useEffect(() => {
    const resize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [viewWidth]);

  // Function to fetch the list of inventories from the API
  const fetchInventories = () => {
    setIsLoading(true);
    axios
      .get(API_URL + "/inventories")
      .then((response) => {
        setInventoryList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // This useEffect is used to fetch the list of inventories from the API
  useEffect(() => {
    fetchInventories();
  }, []);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = [...new Set(inventoryList.map((item) => item.category))];
    return cats.sort();
  }, [inventoryList]);

  // Filter inventory based on search and category
  const filteredInventory = useMemo(() => {
    return inventoryList.filter((item) => {
      const matchesSearch = item.item_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter
        ? item.category === categoryFilter
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [inventoryList, searchQuery, categoryFilter]);

  return (
    <>
      {!showModal ? (
        !isLoading ? (
          <InventoryList
            inventoryList={filteredInventory}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            setShowModal={setShowModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        ) : (
          <div className="isLoading">Loading...</div>
        )
      ) : viewWidth < 768 ? (
        <DeleteInventoryModal
          selectedInventoryName={selectedInventoryName}
          selectedInventoryId={selectedInventoryId}
          setShowModal={setShowModal}
          setSelectedInventoryName={setSelectedInventoryName}
          setSelectedInventoryId={setSelectedInventoryId}
          onDeleteSuccess={fetchInventories}
        />
      ) : !isLoading ? (
        <>
          <DeleteInventoryModal
            selectedInventoryName={selectedInventoryName}
            selectedInventoryId={selectedInventoryId}
            setShowModal={setShowModal}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            onDeleteSuccess={fetchInventories}
          />{" "}
          <InventoryList
            inventoryList={filteredInventory}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            setShowModal={setShowModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        </>
      ) : (
        <div className="isLoading">Loading...</div>
      )}
    </>
  );
}

export default Inventory;
