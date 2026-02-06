import React from "react";
import "./FishList.css";

function FishList({ data, onDelete }) {
  return (
    <div className="class-body">
      <div className="container py-5">
        <div className="glass-container shadow-lg">
          <table className="table table-hover align-middle custom-glass-table mb-0">
            <thead>
              <tr>
                <th>Jméno</th>
                <th>Druh</th>
                <th>Velikost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.size}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-glass btn-sm"
                        onClick={() => onDelete(item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default FishList;
