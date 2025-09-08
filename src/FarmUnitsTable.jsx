import React from "react";
import { Eye } from "lucide-react";

export function FarmUnitsTable({ units, onViewUnit }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "complete":
        return <span className="badge complete">Complete</span>;
      case "incomplete":
        return <span className="badge incomplete">Incomplete</span>;
      case "pending":
        return <span className="badge pending">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="panel">
      <h3 className="panel-title">Farm Units Overview</h3>

      <div className="table-wrap">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>Batch ID</th>
              <th>Animals</th>
              <th>Last Disinfection</th>
              <th>Today's Checklist</th>
              <th style={{ width: "100px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td>
                  <div>
                    <div className="font-medium">{unit.name}</div>
                    <div className="muted">{unit.animalType}</div>
                  </div>
                </td>
                <td className="mono">{unit.batchId}</td>
                <td>{unit.animalCount.toLocaleString()}</td>
                <td>{unit.lastDisinfection}</td>
                <td>{getStatusBadge(unit.checklistStatus)}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => onViewUnit(unit.id)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
