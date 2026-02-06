import { useEffect, useState } from "react";
import "./App.css";
import FishList from "./components/FishList/FishList";
import fishData from "./fishData.json";
import FishForm from "./components/FishForm/FishForm";

function App() {
  const [listOfFish, setListOfFish] = useState(fishData.fish);
  const [activeTab, setActiveTab] = useState(1);
  const [dimensions, setDimensions] = useState({
    width: "",
    length: "",
    heigth: "",
  });

  const [requiredLiters, setRequiredLiters] = useState(0);
  const [totalLiters, setTotalLiters] = useState(0);

  useEffect(() => {
    const smallFish = listOfFish.filter((fish) => fish.size === "malá").length;
    const bigFish = listOfFish.filter((fish) => fish.size === "velká").length;
    setRequiredLiters(bigFish * 20 + smallFish * 10);
  }, [listOfFish]);

  const handleDelete = (id) => {
    const temp = listOfFish.filter((item) => item.id !== id);
    setListOfFish(temp);
  };

  const handleAdd = (addFish) => {
    setListOfFish([...listOfFish, addFish]);
  };

  const handleAkvarium = (e) => {
    const source = e.target.name;
    const val = e.target.value;
    const numVal = parseInt(val) || 0;

    let temp;

    switch (source) {
      case "width": {
        temp = { ...dimensions, width: parseInt(val) || 0 };
        break;
      }
      case "heigth": {
        temp = { ...dimensions, heigth: parseInt(val) || 0 };
        break;
      }
      case "length": {
        temp = { ...dimensions, length: parseInt(val) || 0 };
        break;
      }
      default:
        break;
    }
    setDimensions(temp);
    setTotalLiters((temp.width * temp.heigth * temp.length) / 1000);
  };

  const handleAddAkvarium = () => {
    alert("Akvárium přidáno");
  };

  const disablility = totalLiters < requiredLiters;

  return (
    <>
      <div className="page-container">
        <div className="page-toggler">
          <button
            className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
            name="list-of-dogs"
            onClick={() => setActiveTab(1)}
          >
            Seznam rybiček
          </button>
          <button
            className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
            name="shelter-storage"
            onClick={() => setActiveTab(2)}
          >
            Akvárium
          </button>
        </div>
        {activeTab === 1 && (
          <>
            <FishList data={listOfFish} onDelete={handleDelete} />
            <FishForm data={listOfFish} onAdd={handleAdd} />
          </>
        )}
        {activeTab === 2 && (
          <>
            <h3>Velikost</h3>
            <h1>{totalLiters} L</h1>
            <div className="akvarium-form">
              <input
                type="number"
                name="width"
                id="width"
                placeholder="Zadej šířku v cm"
                onChange={handleAkvarium}
                value={dimensions.width}
                min={0}
              />
              <input
                type="number"
                name="length"
                id="length"
                placeholder="Zadej délku v cm"
                onChange={handleAkvarium}
                value={dimensions.length}
                min={0}
              />
              <input
                type="number"
                name="heigth"
                id="heigth"
                placeholder="Zadej výšku v cm"
                onChange={handleAkvarium}
                value={dimensions.heigth}
                min={0}
              />
              <button
                className={`btn-addAkvarium ${disablility ? "btn-disabled" : "btn-enabled"}`}
                onClick={() => handleAddAkvarium()}
                disabled={disablility}
              >
                Přidej Akvárium
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
