import React, { useState } from "react";
import { Search, Eye, Plus, Brain, X } from "lucide-react";

/* mockAnimals truncated here for brevity — replace with your full mock array */
const mockAnimals = [
  {
    id: "PIG-001",
    name: "Pig #001",
    type: "Pig",
    breed: "Yorkshire",
    age: "6 months",
    weight: 85,
    healthStatus: "Healthy",
    batchId: "PIG-2024-001",
    location: "Pig House #1",
    lastCheckup: "Sept 1, 2024",
    vaccinations: ["PRRS", "Mycoplasma", "PCV2"],
    notes: "Growing well, good appetite",
    birthDate: "Mar 1, 2024",
    symptoms: [],
    imageUrl:
      "https://images.unsplash.com/photo-1712732249476-83f7568a0b70?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "PIG-002",
    name: "Pig #002",
    type: "Pig",
    breed: "Yorkshire",
    age: "6 months",
    weight: 82,
    healthStatus: "Under Treatment",
    batchId: "PIG-2024-001",
    location: "Pig House #1",
    lastCheckup: "Sept 3, 2024",
    vaccinations: ["PRRS", "Mycoplasma", "PCV2"],
    notes: "Treating respiratory infection, improving",
    birthDate: "Mar 1, 2024",
    symptoms: ["Coughing", "Reduced appetite", "Lethargy"],
    imageUrl:
      "https://images.unsplash.com/photo-1712732249476-83f7568a0b70?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "BR-002",
    name: "Broiler #002",
    type: "Broiler",
    breed: "Ross 308",
    age: "4 weeks",
    weight: 1.1,
    healthStatus: "Critical",
    batchId: "POULTRY-2024-003",
    location: "Poultry Coop A",
    lastCheckup: "Sept 4, 2024",
    vaccinations: ["Newcastle", "Infectious Bronchitis"],
    notes: "Showing signs of respiratory distress, isolated",
    birthDate: "Aug 8, 2024",
    symptoms: ["Respiratory distress", "Weakness", "Loss of appetite", "Difficulty breathing"],
    imageUrl:
      "https://images.unsplash.com/photo-1708254837326-8cd56e4fad41?auto=format&fit=crop&w=600&q=80",
  },
  // add the rest of your mock data here...
];

export function AnimalsPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterHealth, setFilterHealth] = useState("all");

  const filteredAnimals = mockAnimals.filter((animal) => {
    const s = searchTerm.trim().toLowerCase();
    const matchesSearch =
      animal.name.toLowerCase().includes(s) ||
      animal.batchId.toLowerCase().includes(s) ||
      animal.location.toLowerCase().includes(s);

    const matchesType = filterType === "all" || animal.type === filterType;
    const matchesHealth = filterHealth === "all" || animal.healthStatus === filterHealth;

    return matchesSearch && matchesType && matchesHealth;
  });

  const badgeClass = (status) => {
    switch (status) {
      case "Healthy":
        return "badge bg-success";
      case "Under Treatment":
        return "badge bg-warning text-dark";
      case "Critical":
        return "badge bg-danger";
      case "Quarantine":
        return "badge bg-secondary";
      default:
        return "badge bg-light text-dark";
    }
  };

  return (
    <div className="container py-4">
      {/* header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Animal Management</h2>
          <p className="text-muted">Monitor and manage all animals on the farm</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary d-flex align-items-center">
            <Plus size={16} className="me-2" />
            Add New Animal
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center">
            <Brain size={16} className="me-2" />
            Predict AI Disease
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search animals, batch ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Pig">Pigs</option>
            <option value="Broiler">Broilers</option>
            <option value="Layer">Layers</option>
            <option value="Cattle">Cattle</option>
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-select" value={filterHealth} onChange={(e) => setFilterHealth(e.target.value)}>
            <option value="all">All Health Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Critical">Critical</option>
            <option value="Quarantine">Quarantine</option>
          </select>
        </div>
      </div>

      {/* cards */}
      <div className="row g-4">
        {filteredAnimals.map((animal) => (
          <div key={animal.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div
              className="card h-100 shadow-sm animal-card"
              onClick={() => setSelectedAnimal(animal)}
            >
              <img
                src={animal.imageUrl}
                className="card-img-top"
                alt={animal.name}
                style={{ height: 160, objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="card-title mb-0">{animal.name}</h5>
                    <div className="text-muted small">{animal.breed}</div>
                  </div>
                  <div>
                    <span className={badgeClass(animal.healthStatus)}>{animal.healthStatus}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between small mb-2">
                  <div>Age: {animal.age}</div>
                  <div>Weight: {animal.weight}{typeof animal.weight === "number" ? " kg" : ""}</div>
                </div>

                <div className="small text-muted">Location: <span className="text-dark">{animal.location}</span></div>
                <div className="small text-muted">Batch: <span className="mono text-dark">{animal.batchId}</span></div>
                <div className="small text-muted mb-2">Last Checkup: <span className="text-dark">{animal.lastCheckup}</span></div>

                {animal.symptoms && animal.symptoms.length > 0 && (
                  <div className="mt-2">
                    <div className="small text-muted">Symptoms:</div>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {animal.symptoms.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="badge bg-danger-subtle text-danger px-2 py-1">
                          {s}
                        </span>
                      ))}
                      {animal.symptoms.length > 3 && (
                        <span className="badge bg-secondary text-dark px-2 py-1">+{animal.symptoms.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Ensure button aligns bottom on all cards */}
                <div className="mt-3 mt-auto">
                  <button
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAnimal(animal);
                    }}
                  >
                    <Eye size={16} className="me-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No animals found matching your criteria.</p>
        </div>
      )}

      {/* Modal with blurred backdrop and centered card */}
      {selectedAnimal && (
        <div className="custom-modal-backdrop show" onClick={() => setSelectedAnimal(null)}>
          <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-content">
              <div className="d-flex justify-content-between align-items-start pb-2">
                <div>
                  <h4 className="mb-1">{selectedAnimal.name} <span className="badge bg-light text-dark ms-2">{selectedAnimal.healthStatus}</span></h4>
                  <div className="text-muted small">Breed: {selectedAnimal.breed} • {selectedAnimal.location}</div>
                </div>
                <button className="btn btn-sm btn-light" onClick={() => setSelectedAnimal(null)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <hr />

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="small text-muted mb-2">Age & Birth Date</div>
                  <div className="fw-semibold">{selectedAnimal.age}</div>
                  <div className="text-muted small">Born: {selectedAnimal.birthDate || "—"}</div>

                  <hr />

                  <div className="small text-muted mb-2">Current Weight</div>
                  <div className="fw-semibold">{selectedAnimal.weight}{typeof selectedAnimal.weight === "number" ? " kg" : ""}</div>
                </div>

                <div className="col-md-6">
                  <div className="small text-muted mb-2">Location & Batch</div>
                  <div className="fw-semibold">{selectedAnimal.location}</div>
                  <div className="text-muted small">{selectedAnimal.batchId}</div>

                  <hr />

                  <div className="small text-muted mb-2">Breed & Type</div>
                  <div className="fw-semibold">{selectedAnimal.breed} ({selectedAnimal.type})</div>
                </div>
              </div>

              <div className="mt-4">
                <h6 className="mb-3">Health Information</h6>
                <div className="p-3 border rounded mb-3">
                  <div className="small text-muted">Health Status</div>
                  <div className="mt-2"><span className={badgeClass(selectedAnimal.healthStatus)}>{selectedAnimal.healthStatus}</span></div>
                </div>

                <div className="p-3 border rounded mb-3">
                  <div className="small text-muted">Current Notes</div>
                  <div className="mt-2">{selectedAnimal.notes || "—"}</div>
                </div>

                <h6 className="mb-3">Vaccination Records</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(selectedAnimal.vaccinations || []).map((v, i) => (
                    <div key={i} className="vaccine-chip border rounded px-3 py-2">
                      <span className="dot bg-success me-2" /> {v}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 d-flex gap-2 justify-content-end">
                <button className="btn btn-dark d-flex align-items-center">
                  <span className="me-2">🩺</span>
                  Schedule Health Check
                </button>
                <button className="btn btn-outline-primary">Record Vaccination</button>
                <button className="btn btn-outline-secondary" onClick={() => setSelectedAnimal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimalsPage;
