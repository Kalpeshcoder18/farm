import React from "react";
import { Calendar, MapPin, Scale, Stethoscope, Syringe, FileText, Edit } from "lucide-react";

/**
 * AnimalDetailModal (fixed status class names)
 * - animal.healthStatus (expects strings like "Healthy", "Under Treatment", "Critical", "Quarantine")
 * - open: boolean
 * - onClose: fn
 */

function statusToClass(status) {
  if (!status) return "status-unknown";
  return (
    "status-" +
    status
      .toLowerCase()
      .replace(/\s+/g, "-") // "Under Treatment" -> "under-treatment"
      .replace(/[^a-z0-9-]/g, "")
  );
}

export function AnimalDetailModal({ animal, open, onClose }) {
  if (!animal || !open) return null;

  const calculateDaysOld = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const badgeClass = statusToClass(animal.healthStatus);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>{animal.name}</h2>
            <span className={`badge ${badgeClass}`}>{animal.healthStatus}</span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn small ghost">
              <Edit size={14} /> Edit
            </button>
            <button className="btn small" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="modal-body">
          {/* Basic Info */}
          <div className="grid-2">
            <div className="info-block">
              <div className="info-item">
                <Calendar size={16} />
                <div>
                  <p className="muted">Age & Birth Date</p>
                  <p>
                    {animal.age} ({calculateDaysOld(animal.birthDate)} days old)
                  </p>
                  <small className="muted">Born: {animal.birthDate}</small>
                </div>
              </div>

              <div className="info-item">
                <Scale size={16} />
                <div>
                  <p className="muted">Weight</p>
                  <p>{animal.weight} kg</p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <div className="info-item">
                <MapPin size={16} />
                <div>
                  <p className="muted">Location & Batch</p>
                  <p>{animal.location}</p>
                  <small className="mono">{animal.batchId}</small>
                </div>
              </div>

              <div>
                <p className="muted">Breed & Type</p>
                <p>
                  {animal.breed} ({animal.type})
                </p>
              </div>
            </div>
          </div>

          <hr />

          {/* Health Info */}
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>
            <Stethoscope size={16} style={{ marginRight: 8 }} /> Health Information
          </h3>

          <div className="card-row" style={{ marginBottom: 8 }}>
            <div className="card" style={{ flex: 1 }}>
              <p className="muted">Health Status</p>
              <div style={{ marginTop: 6 }}>
                <span className={`badge ${badgeClass}`}>{animal.healthStatus}</span>
              </div>
            </div>

            <div className="card" style={{ width: 160 }}>
              <p className="muted">Last Checkup</p>
              <p style={{ marginTop: 6 }}>{animal.lastCheckup}</p>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 8 }}>
            <p className="muted">Notes</p>
            <p style={{ marginTop: 6 }}>{animal.notes}</p>
          </div>

          <hr />

          {/* Vaccinations */}
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>
            <Syringe size={16} style={{ marginRight: 8 }} /> Vaccination Records
          </h3>
          <div className="vaccinations">
            {animal.vaccinations && animal.vaccinations.length > 0 ? (
              animal.vaccinations.map((v, i) => (
                <div key={i} className="vaccination">
                  <span className="dot" /> {v}
                </div>
              ))
            ) : (
              <p className="muted">No vaccination records available</p>
            )}
          </div>

          <hr />

          {/* Actions */}
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn">
              <Stethoscope size={16} /> Schedule Health Check
            </button>
            <button className="btn ghost">
              <Syringe size={16} /> Record Vaccination
            </button>
            <button className="btn ghost">
              <FileText size={16} /> View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailModal;
