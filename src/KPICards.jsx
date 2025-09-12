import { PawPrint, CheckCircle, AlertTriangle, LogIn } from "lucide-react";

export function KPICards({
  totalAnimals = 0,
  checklistCompletion = 0,
  activeAlerts = 0,
  currentVisitors = 0,
}) {
  const getChecklistStatus = (completion) => {
    if (completion === 100) return { cls: "bg-success", text: "Complete" };
    if (completion >= 80) return { cls: "bg-warning text-dark", text: "In Progress" };
    return { cls: "bg-danger", text: "Behind" };
  };

  const checklistStatus = getChecklistStatus(checklistCompletion);

  return (
    <div className="row g-3 mb-4">
      {/* Total Animals */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card kpi-card shadow-sm h-100 border-0">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="text-muted mb-0">Total Animals</h6>
              <PawPrint size={18} className="text-secondary" />
            </div>
            <div className="d-flex align-items-baseline">
              <div className="display-6 fw-bold">
                {Number(totalAnimals).toLocaleString()}
              </div>
            </div>
            <div className="text-muted small mt-2">Active on farm</div>
          </div>
        </div>
      </div>

      {/* Today's Checklists */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card kpi-card shadow-sm h-100 border-0">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="text-muted mb-0">Today's Checklists</h6>
              <CheckCircle size={18} className="text-secondary" />
            </div>
            <div className="d-flex align-items-center">
              <div className="display-6 fw-bold">{checklistCompletion}%</div>
              <span
                className={`badge rounded-pill ms-auto ${checklistStatus.cls}`}
                style={{ fontSize: "0.75rem", padding: "0.35em 0.6em" }}
              >
                {checklistStatus.text}
              </span>
            </div>
            <div className="text-muted small mt-2">Completion rate</div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="col-12 col-md-6 col-lg-3">
        <div
          className={`card kpi-card shadow-sm h-100 border-0 ${
            activeAlerts > 0 ? "alert-card" : ""
          }`}
        >
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="text-muted mb-0">Active Alerts</h6>
              <AlertTriangle
                size={18}
                className={activeAlerts > 0 ? "text-danger" : "text-secondary"}
              />
            </div>
            <div className="d-flex align-items-baseline">
              <div
                className={`display-6 fw-bold ${
                  activeAlerts > 0 ? "text-danger" : ""
                }`}
              >
                {activeAlerts}
              </div>
            </div>
            <div className="text-muted small mt-2">
              {activeAlerts > 0 ? "Requires attention" : "All clear"}
            </div>
          </div>
        </div>
      </div>

      {/* Current Visitors */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card kpi-card shadow-sm h-100 border-0">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="text-muted mb-0">Current Visitors</h6>
              <LogIn size={18} className="text-secondary" />
            </div>
            <div className="d-flex align-items-baseline">
              <div className="display-6 fw-bold">{currentVisitors}</div>
            </div>
            <div className="text-muted small mt-2">On premises</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KPICards;
