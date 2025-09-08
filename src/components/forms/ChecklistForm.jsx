import React, { useState } from "react";

/**
 * ChecklistForm (Bootstrap)
 * Props:
 *  - onBack(): navigate back
 *  - onSave(data): called with new checklist data
 */
export function ChecklistForm({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    assignedTo: "",
    dueDate: "",
    dueTime: "",
    description: "",
  });

  const [tasks, setTasks] = useState([{ id: 1, task: "", critical: false }]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    setTasks((prev) => [...prev, { id: Date.now(), task: "", critical: false }]);
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id, field, value) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.location &&
      formData.dueDate &&
      formData.dueTime &&
      tasks.some((t) => t.task.trim() !== "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill Title, Location, Due Date, Due Time and add at least one task.");
      return;
    }

    const checklistData = {
      ...formData,
      tasks: tasks.filter((t) => t.task.trim() !== ""),
    };

    onSave?.(checklistData);
  };

  return (
    <div className="container my-4">
      <div className="mb-3 d-flex align-items-center gap-2">
        <button type="button" className="btn btn-link p-0" onClick={onBack} aria-label="Back">
          ← Back to Checklists
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Create New Checklist</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Title */}
            <div className="col-12 col-md-6">
              <label htmlFor="title" className="form-label">Checklist Title</label>
              <input
                id="title"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Daily Biosecurity - Pig House #1"
                required
                aria-required="true"
              />
            </div>

            {/* Location */}
            <div className="col-12 col-md-6">
              <label htmlFor="location" className="form-label">Location</label>
              <select
                id="location"
                className="form-select"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              >
                <option value="">Select location</option>
                <option value="Pig House #1">Pig House #1</option>
                <option value="Pig House #2">Pig House #2</option>
                <option value="Poultry Coop A">Poultry Coop A</option>
                <option value="Poultry Coop B">Poultry Coop B</option>
                <option value="Dairy Barn">Dairy Barn</option>
              </select>
            </div>

            {/* Assigned To */}
            <div className="col-12 col-md-6">
              <label htmlFor="assignedTo" className="form-label">Assign To Worker</label>
              <select
                id="assignedTo"
                className="form-select"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange("assignedTo", e.target.value)}
              >
                <option value="">Select worker (optional)</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Mike Wilson">Mike Wilson</option>
                <option value="Lisa Brown">Lisa Brown</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="col-6 col-md-3">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                id="dueDate"
                type="date"
                className="form-control"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                required
              />
            </div>

            {/* Due Time */}
            <div className="col-6 col-md-3">
              <label htmlFor="dueTime" className="form-label">Due Time</label>
              <input
                id="dueTime"
                type="time"
                className="form-control"
                value={formData.dueTime}
                onChange={(e) => handleInputChange("dueTime", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label htmlFor="description" className="form-label">Description (Optional)</label>
              <textarea
                id="description"
                className="form-control"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Additional instructions for this checklist..."
                rows={2}
              />
            </div>

            {/* Tasks header */}
            <div className="col-12 d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Checklist Tasks</h6>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addTask}
                aria-label="Add Task"
              >
                + Add Task
              </button>
            </div>

            {/* Tasks list */}
            <div className="col-12">
              <div className="d-flex flex-column gap-2">
                {tasks.map((task, index) => (
                  <div key={task.id} className="card p-2">
                    <div className="d-flex gap-2 align-items-start">
                      <div className="me-2 text-muted" style={{ minWidth: 28 }}>
                        {index + 1}.
                      </div>

                      <div className="flex-grow-1">
                        <input
                          className="form-control mb-2"
                          value={task.task}
                          onChange={(e) => updateTask(task.id, "task", e.target.value)}
                          placeholder="Enter task description..."
                          aria-label={`Task ${index + 1}`}
                        />

                        <div className="form-check form-switch d-inline-block me-3">
                          <input
                            className="form-check-input"
                            id={`critical-${task.id}`}
                            type="checkbox"
                            checked={task.critical}
                            onChange={(e) => updateTask(task.id, "critical", e.target.checked)}
                            aria-label={`Mark task ${index + 1} as critical`}
                          />
                          <label className="form-check-label" htmlFor={`critical-${task.id}`}>
                            Critical
                          </label>
                        </div>
                      </div>

                      <div className="d-flex align-items-start">
                        {tasks.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeTask(task.id)}
                            aria-label={`Remove task ${index + 1}`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-12 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary flex-grow-1"
                disabled={!isFormValid()}
                aria-disabled={!isFormValid()}
              >
                Create Checklist
              </button>

              <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
