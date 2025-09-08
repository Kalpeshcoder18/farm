import React, { useState } from "react";

export function HealthRecordForm({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    animalId: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    veterinarian: "",
    notes: "",
    medication: "",
    dosage: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="container my-5">
      {/* Back button */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
        >
          ← Back to Health Records
        </button>
      </div>

      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-light border-0 py-3 d-flex align-items-center">
          <span className="me-2 fs-4"></span>
          <h5 className="mb-0 fw text-dark">
            Farm Operations — Health Record
          </h5>
        </div>

        <div className="card-body p-4 bg-white">
          <form onSubmit={handleSubmit} className="row g-4">
            {/* Animal ID */}
            <div className="col-md-6">
              <label htmlFor="animalId" className="form-label fw-semibold">
                Animal ID
              </label>
              <select
                id="animalId"
                className="form-select"
                value={formData.animalId}
                onChange={(e) => handleInputChange("animalId", e.target.value)}
                required
              >
                <option value="">Select animal</option>
                <option value="PIG-001">Pig #001 (PIG-001)</option>
                <option value="PIG-002">Pig #002 (PIG-002)</option>
                <option value="BR-001">Broiler #001 (BR-001)</option>
                <option value="BR-002">Broiler #002 (BR-002)</option>
                <option value="COW-001">Cow #001 (COW-001)</option>
              </select>
            </div>

            {/* Record Type */}
            <div className="col-md-6">
              <label htmlFor="type" className="form-label fw-semibold">
                Record Type
              </label>
              <select
                id="type"
                className="form-select"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Treatment">Treatment</option>
                <option value="Checkup">Checkup</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>

            {/* Date */}
            <div className="col-md-6">
              <label htmlFor="date" className="form-label fw-semibold">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>

            {/* Veterinarian */}
            <div className="col-md-6">
              <label
                htmlFor="veterinarian"
                className="form-label fw-semibold"
              >
                Veterinarian
              </label>
              <input
                id="veterinarian"
                className="form-control"
                value={formData.veterinarian}
                onChange={(e) => handleInputChange("veterinarian", e.target.value)}
                placeholder="Dr. Smith"
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label htmlFor="description" className="form-label fw-semibold">
                Description
              </label>
              <input
                id="description"
                className="form-control"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="e.g., PRRS Vaccination"
                required
              />
            </div>

            {/* Medication */}
            <div className="col-md-6">
              <label htmlFor="medication" className="form-label fw-semibold">
                Medication (if applicable)
              </label>
              <input
                id="medication"
                className="form-control"
                value={formData.medication}
                onChange={(e) => handleInputChange("medication", e.target.value)}
                placeholder="Medication name"
              />
            </div>

            {/* Dosage */}
            <div className="col-md-6">
              <label htmlFor="dosage" className="form-label fw-semibold">
                Dosage
              </label>
              <input
                id="dosage"
                className="form-control"
                value={formData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
                placeholder="Dosage amount"
              />
            </div>

            {/* Notes */}
            <div className="col-12">
              <label htmlFor="notes" className="form-label fw-semibold">
                Notes
              </label>
              <textarea
                id="notes"
                className="form-control"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes about the treatment..."
                rows={3}
              />
            </div>

            {/* Divider */}
            <div className="col-12">
              <hr />
            </div>

            {/* Actions */}
            <div className="col-12 d-flex gap-3 justify-content-end">
              <button type="submit" className="btn btn-primary px-4 py-2">
                 Save Health Record
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={onBack}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
