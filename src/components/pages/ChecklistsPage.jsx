import React, { useState } from "react";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
} from "lucide-react";

/* --- mock data (kept as-is) --- */
const mockChecklists = [
  {
    id: "CL-001",
    title: "Daily Biosecurity - Pig House #1",
    location: "Pig House #1",
    assignedTo: "John Smith",
    dueDate: "Sept 5, 2024 - 6:00 PM",
    status: "In Progress",
    completionRate: 80,
    items: [
      {
        id: "item-1",
        task: "Disinfect entrance footbath",
        completed: true,
        completedBy: "John Smith",
        completedAt: "Sept 5, 2024 - 9:00 AM",
        critical: true,
      },
      {
        id: "item-2",
        task: "Check water system sanitization",
        completed: true,
        completedBy: "John Smith",
        completedAt: "Sept 5, 2024 - 9:15 AM",
        critical: true,
      },
      {
        id: "item-3",
        task: "Verify feed storage cleanliness",
        completed: true,
        completedBy: "John Smith",
        completedAt: "Sept 5, 2024 - 9:30 AM",
        critical: false,
      },
      {
        id: "item-4",
        task: "Clean and disinfect feeding equipment",
        completed: true,
        completedBy: "John Smith",
        completedAt: "Sept 5, 2024 - 10:00 AM",
        critical: false,
      },
      {
        id: "item-5",
        task: "Complete daily animal health observation",
        completed: false,
        critical: true,
      },
    ],
  },
  {
    id: "CL-002",
    title: "Daily Biosecurity - Poultry Coop A",
    location: "Poultry Coop A",
    assignedTo: "Sarah Johnson",
    dueDate: "Sept 5, 2024 - 6:00 PM",
    status: "Overdue",
    completionRate: 40,
    items: [
      {
        id: "item-6",
        task: "Disinfect entrance footbath",
        completed: true,
        completedBy: "Sarah Johnson",
        completedAt: "Sept 5, 2024 - 8:30 AM",
        critical: true,
      },
      {
        id: "item-7",
        task: "Check ventilation system",
        completed: true,
        completedBy: "Sarah Johnson",
        completedAt: "Sept 5, 2024 - 8:45 AM",
        critical: true,
      },
      {
        id: "item-8",
        task: "Monitor water quality and flow",
        completed: false,
        critical: true,
      },
      {
        id: "item-9",
        task: "Inspect feed for contamination",
        completed: false,
        critical: false,
      },
      {
        id: "item-10",
        task: "Record mortality if any",
        completed: false,
        critical: true,
      },
    ],
  },
  {
    id: "CL-003",
    title: "Weekly Deep Clean - Dairy Barn",
    location: "Dairy Barn",
    assignedTo: "Mike Wilson",
    dueDate: "Sept 6, 2024 - 12:00 PM",
    status: "Pending",
    completionRate: 0,
    items: [
      { id: "item-11", task: "Deep clean milking equipment", completed: false, critical: true },
      { id: "item-12", task: "Sanitize stall areas", completed: false, critical: true },
      { id: "item-13", task: "Replace bedding materials", completed: false, critical: false },
      { id: "item-14", task: "Check and clean water troughs", completed: false, critical: false },
    ],
  },
];

const mockProblems = [
  {
    id: "PR-001",
    reportedBy: "John Smith",
    location: "Pig House #1",
    type: "Equipment Issue",
    description: "Water dispenser is leaking in section B",
    reportedAt: "Sept 5, 2024 - 10:30 AM",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "PR-002",
    reportedBy: "Sarah Johnson",
    location: "Poultry Coop A",
    type: "Biosecurity Issue",
    description: "Footbath solution needs replacement - appears contaminated",
    reportedAt: "Sept 5, 2024 - 8:15 AM",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "PR-003",
    reportedBy: "Mike Wilson",
    location: "Dairy Barn",
    type: "Animal Health",
    description: "Cow #003 showing signs of lameness in left hind leg",
    reportedAt: "Sept 4, 2024 - 3:45 PM",
    priority: "High",
    status: "Resolved",
  },
];

/* --- Bootstrap-based component --- */
export function ChecklistsPage() {
  const [checklists, setChecklists] = useState(mockChecklists);
  const [activeTab, setActiveTab] = useState("active");

  const getStatusBadge = (status) => {
    const base = "badge rounded-pill px-2 py-1";
    switch (status) {
      case "Completed":
        return <span className={`${base} bg-success text-white`}>Completed</span>;
      case "In Progress":
        return <span className={`${base} bg-primary text-white`}>In Progress</span>;
      case "Pending":
        return <span className={`${base} bg-secondary text-white`}>Pending</span>;
      case "Overdue":
        return <span className={`${base} bg-danger text-white`}>Overdue</span>;
      default:
        return <span className={base}>{status}</span>;
    }
  };

  const getStatusIcon = (status) => {
    const iconProps = { size: 18 };
    switch (status) {
      case "Completed":
        return <CheckCircle {...iconProps} className="text-success" />;
      case "In Progress":
        return <Clock {...iconProps} className="text-primary" />;
      case "Pending":
        return <ClipboardList {...iconProps} className="text-muted" />;
      case "Overdue":
        return <AlertTriangle {...iconProps} className="text-danger" />;
      default:
        return <ClipboardList {...iconProps} className="text-muted" />;
    }
  };

  const toggleChecklistItem = (checklistId, itemId) => {
    setChecklists((prev) =>
      prev.map((cl) => {
        if (cl.id === checklistId) {
          const items = cl.items.map((it) =>
            it.id === itemId
              ? {
                  ...it,
                  completed: !it.completed,
                  completedBy: !it.completed ? "Current User" : undefined,
                  completedAt: !it.completed ? new Date().toLocaleString() : undefined,
                }
              : it
          );
          const completionRate = Math.round(
            (items.filter((it) => it.completed).length / items.length) * 100
          );
          return {
            ...cl,
            items,
            completionRate,
            status:
              completionRate === 100
                ? "Completed"
                : completionRate > 0
                ? "In Progress"
                : "Pending",
          };
        }
        return cl;
      })
    );
  };

  const stats = {
    total: checklists.length,
    completed: checklists.filter((c) => c.status === "Completed").length,
    inProgress: checklists.filter((c) => c.status === "In Progress").length,
    overdue: checklists.filter((c) => c.status === "Overdue").length,
  };

  return (
    <div className="container my-2">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          <p className="text-muted mb-0">Manage daily worker protocols and compliance tracking</p>
        </div>
        <div>
          <button className="btn btn-primary">
            <Plus size={16} className="me-2" /> Create Checklist
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">Total Checklists</h6>
                </div>
                <ClipboardList size={18} className="text-muted" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">{stats.total}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">Completed</h6>
                </div>
                <CheckCircle size={18} className="text-success" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">{stats.completed}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0">In Progress</h6>
                </div>
                <Clock size={18} className="text-primary" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0">{stats.inProgress}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card h-100 shadow-sm border-danger card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-0 text-danger">Overdue</h6>
                </div>
                <AlertTriangle size={18} className="text-danger" />
              </div>
              <div className="mt-3">
                <div className="h3 mb-0 text-danger">{stats.overdue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "templates" ? "active" : ""}`}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </button>
        </li>
      </ul>

      {/* Tab content */}
      {activeTab === "active" && (
        <>
          {checklists
            .filter((c) => c.status !== "Completed")
            .map((cl) => (
              <div key={cl.id} className={`card mb-3 shadow-sm ${cl.status === "Overdue" ? "border-danger bg-white" : ""}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex gap-3 align-items-center">
                      <div>{getStatusIcon(cl.status)}</div>
                      <div>
                        <h5 className="h6 mb-0">{cl.title}</h5>
                        <div className="small text-muted">{cl.location} • Assigned to {cl.assignedTo}</div>
                      </div>
                    </div>

                    <div className="text-end">
                      <div>{getStatusBadge(cl.status)}</div>
                      <div className="small text-muted mt-1">Due: {cl.dueDate}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small text-muted">
                      <span>Progress</span>
                      <span>{cl.completionRate}%</span>
                    </div>
                    <div className="progress" style={{ height: 8 }}>
                      <div
                        className={`progress-bar ${cl.completionRate === 100 ? "bg-success" : "bg-dark"}`}
                        role="progressbar"
                        style={{ width: `${cl.completionRate}%` }}
                        aria-valuenow={cl.completionRate}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="list-group mb-3">
                    {cl.items.map((it) => (
                      <div
                        key={it.id}
                        className={`list-group-item d-flex align-items-start justify-content-between ${it.completed ? "bg-light" : ""}`}
                      >
                        <div className="d-flex align-items-start gap-3">
                          <div className="form-check mt-1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={!!it.completed}
                              onChange={() => toggleChecklistItem(cl.id, it.id)}
                              id={`${cl.id}-${it.id}`}
                            />
                          </div>

                          <div>
                            <div className={it.completed ? "text-decoration-line-through text-muted" : ""}>
                              {it.task}{" "}
                              {it.critical && <span className="badge bg-danger ms-2">Critical</span>}
                            </div>
                            {it.completed && it.completedBy && (
                              <div className="small text-muted mt-1">
                                Done by {it.completedBy} at {it.completedAt}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-end small text-muted">
                          {/* place for actions if needed */}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">Add Note</button>
                    <button className="btn btn-outline-secondary btn-sm">View History</button>
                    {cl.completionRate === 100 && (
                      <button className="btn btn-primary btn-sm">Submit</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}

      {activeTab === "completed" && (
        <>
          {checklists
            .filter((c) => c.status === "Completed")
            .map((cl) => (
              <div key={cl.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="h6 mb-0">{cl.title}</h5>
                  <div className="small text-muted">{cl.location} • {cl.assignedTo}</div>
                </div>
              </div>
            ))}
        </>
      )}

      {activeTab === "templates" && (
        <div className="card mb-3 shadow-sm">
          <div className="card-body">
            <p className="mb-0 text-muted">No templates yet.</p>
          </div>
        </div>
      )}

      {/* Problems */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="h6">Problems Reported by Workers</h5>
          <div className="mt-3">
            {mockProblems.map((p) => (
              <div key={p.id} className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded bg-white">
                <div>
                  <div className="d-flex gap-2 mb-2">
                    <span className={`badge ${p.priority === "High" ? "bg-danger" : p.priority === "Medium" ? "bg-warning text-dark" : "bg-secondary"}`}>
                      {p.priority}
                    </span>
                    <span className={`badge ${p.status === "Open" ? "bg-danger" : p.status === "In Progress" ? "bg-primary" : "bg-success"}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="fw-medium">{p.description}</div>
                  <div className="small text-muted">{p.location} • Reported by {p.reportedBy} • {p.reportedAt}</div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">View</button>
                  {p.status === "Open" && <button className="btn btn-primary btn-sm">Assign</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
