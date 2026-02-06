import React, { useState } from "react";
import "./FishForm.css";

function FishForm({ data, onAdd }) {
  const sizes = [...new Set(data.map((item) => item.size))];
  const [newFish, setNewFish] = useState({
    id: data.length > 0 ? Math.max(...data.map((fish) => fish.id)) + 1 : 1,
    name: "",
    type: "",
    size: sizes[0],
  });

  const resetInputFish = () => {
    const temp = {
      id: newFish.id + 1,
      name: "",
      type: "",
      size: size[0],
    };
    setNewFish(temp);
  };

  const handleChange = (e) => {
    const source = e.target.name;
    const val = e.target.value;

    let updateFish;

    switch (source) {
      case "name": {
        updateFish = { ...newFish, name: val };
        break;
      }
      case "type": {
        updateFish = { ...newFish, type: val };
        break;
      }
      case "size": {
        updateFish = { ...newFish, size: val };
        break;
      }

      default:
        break;
    }
    setNewFish(updateFish);
  };

  return (
    <div className="form-wrapper">
      <div className="fish-form">
        <h2 className="form-title">Nová rybička</h2>

        <div className="input-field">
          <label htmlFor="name">Jméno</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="např. Nemo"
            value={newFish.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="type">Druh</label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="např. Klaun"
            value={newFish.type}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="size">Velikost</label>
          <select
            className="form-select"
            name="size"
            id="size"
            onChange={handleChange}
            value={newFish.size}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button
          className="add-button"
          onClick={() => {
            onAdd(newFish);
            resetInputFish();
          }}
        >
          Přidat do seznamu
        </button>
      </div>
    </div>
  );
}

export default FishForm;
