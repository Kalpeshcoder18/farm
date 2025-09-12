import React, { useState } from "react";
import { Plus, Search, LogIn, LogOut, Clock, Users } from "lucide-react";

export function VisitorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock visitors data
  const mockVisitors = [
    {
      id: "V-001",
      name: "Dr. Emily Carter",
      company: "Veterinary Services Inc.",
      type: "Veterinarian",
      purpose: "Routine health inspection",
      checkInTime: "2024-01-15 09:00",
      checkOutTime: null,
      status: "On Site",
      contactNumber: "+1-555-0123",
      vehiclePlate: "VET-123",
      areasVisited: ["Pig House #1", "Pig House #2"],
    },
    {
      id: "V-002",
      name: "Mark Johnson",
      company: "Feed Supply Co.",
      type: "Supplier",
      purpose: "Feed delivery and quality check",
      checkInTime: "2024-01-15 07:30",
      checkOutTime: "2024-01-15 08:45",
      status: "Checked Out",
      contactNumber: "+1-555-0456",
      vehiclePlate: "FEED-789",
      areasVisited: ["Storage Area", "Pig House #1"],
    },
    {
      id: "V-003",
      name: "Sarah Williams",
      company: "Agricultural Inspectors",
      type: "Inspector",
      purpose: "Biosecurity compliance audit",
      checkInTime: "2024-01-14 14:00",
      checkOutTime: "2024-01-14 17:30",
      status: "Checked Out",
      contactNumber: "+1-555-0789",
      vehiclePlate: "INSP-456",
      areasVisited: ["All Areas"],
    },
    {
      id: "V-004",
      name: "Tom Brown",
      company: "Equipment Maintenance Ltd.",
      type: "Maintenance",
      purpose: "Ventilation system repair",
      checkInTime: "2024-01-15 10:30",
      checkOutTime: null,
      status: "On Site",
      contactNumber: "+1-555-0321",
      vehiclePlate: "MAINT-654",
      areasVisited: ["Poultry Coop A"],
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "On Site":
        return <span className="badge bg-success">On Site</span>;
      case "Checked Out":
        return <span className="badge bg-secondary">Checked Out</span>;
      case "Overdue":
        return <span className="badge bg-danger">Overdue</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Veterinarian":
        return "🩺";
      case "Supplier":
        return "🚛";
      case "Inspector":
        return "🔍";
      case "Maintenance":
        return "🔧";
      default:
        return "👤";
    }
  };

  const filteredVisitors = mockVisitors.filter((visitor) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      visitor.name.toLowerCase().includes(q) ||
      visitor.company.toLowerCase().includes(q) ||
      visitor.purpose.toLowerCase().includes(q) ||
      visitor.contactNumber.toLowerCase().includes(q);

    const matchesStatus = filterStatus === "all" || visitor.status === filterStatus;
    const matchesType = filterType === "all" || visitor.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const currentVisitors = mockVisitors.filter((v) => v.status === "On Site");
  const todayVisitors = mockVisitors.filter((v) => v.checkInTime.startsWith("2024-01-15"));

  // Example checkout handler (updates mock data locally)
  const handleCheckOut = (visitorId) => {
    // For demo: confirm and show an alert (real app would update state/backend)
    if (window.confirm("Check out this visitor?")) {
      alert(`Visitor ${visitorId} checked out (demo).`);
    }
  };

  return (
    <div className="container my-2">
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          {/* <h2 className="h4 fw-bold">Visitor Management</h2> */}
          <p className="text-bold mb-0 mt-0">Track and manage farm visitors for biosecurity</p>
        </div>
        <div>
          <button className="btn btn-primary">
            <Plus size={16} className="me-2" /> Register Visitor
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4 ">
        <div className="col-12 col-md-3 ">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">Current Visitors</h6>
                </div>
                <Users size={18} className="text-muted" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">{currentVisitors.length}</div>
                <div className="small text-muted">Currently on site</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">Today's Visitors</h6>
                </div>
                <LogIn size={18} className="text-muted" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">{todayVisitors.length}</div>
                <div className="small text-muted">Visited today</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">Average Visit Time</h6>
                </div>
                <Clock size={18} className="text-muted" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">2.5h</div>
                <div className="small text-muted">Average duration</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">This Week</h6>
                </div>
                <LogOut size={18} className="text-muted" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">12</div>
                <div className="small text-muted">Total visitors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-6 position-relative">
              <Search size={18} className="position-absolute" style={{ left: 12, top: 12, color: "#6c757d" }} />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-6 col-sm-3 col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="On Site">On Site</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="col-6 col-sm-3 col-md-3">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Veterinarian">Veterinarian</option>
                <option value="Supplier">Supplier</option>
                <option value="Inspector">Inspector</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Visitor Log</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Visitor</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Areas Visited</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>
                      <div className="fw-semibold">{visitor.name}</div>
                      <div className="small text-muted">{visitor.company}</div>
                      <div className="small text-muted">{visitor.contactNumber}</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ fontSize: 18 }}>{getTypeIcon(visitor.type)}</div>
                        <div>{visitor.type}</div>
                      </div>
                    </td>
                    <td style={{ maxWidth: 240 }}>{visitor.purpose}</td>
                    <td className="small text-muted">{visitor.checkInTime}</td>
                    <td className="small text-muted">{visitor.checkOutTime || "-"}</td>
                    <td>{getStatusBadge(visitor.status)}</td>
                    <td className="small">{visitor.areasVisited.join(", ")}</td>
                    <td>
                      {visitor.status === "On Site" ? (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCheckOut(visitor.id)}
                        >
                          <LogOut size={14} className="me-1" />
                          Check Out
                        </button>
                      ) : (
                        <button className="btn btn-outline-primary btn-sm">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVisitors.length === 0 && (
            <div className="py-5 text-center">
              <p className="text-muted mb-0">No visitors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
