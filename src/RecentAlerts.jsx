// src/RecentAlerts.jsx
import React from "react";
import { Card } from "./components/ui/card";
import { AlertTriangle, Clock, CheckCircle, Bell } from "lucide-react";


/* Small icon wrapper to ensure consistent size */
function AlertIcon({ type }) {
  const common = { size: 18 };
  if (type === "critical") return <Bell {...common} className="icon-critical" />;
  if (type === "warning") return <AlertTriangle {...common} className="icon-warning" />;
  if (type === "info") return <CheckCircle {...common} className="icon-info" />;
  return null;
}

function AlertBadge({ type }) {
  if (type === "critical") return <span className="badge badge-critical">Critical</span>;
  if (type === "warning") return <span className="badge badge-warning">Warning</span>;
  return <span className="badge badge-info">Info</span>;
}

export function RecentAlerts({ alerts = [] }) {
  return (
    <Card>
      <div className="recent-alerts-header">
        <h3 className="panel-title">Recent Alerts &amp; Notifications</h3>
      </div>

      <div className="alert-list" role="list" aria-label="Recent alerts" tabIndex={0}>
        {alerts.length === 0 && (
          <div className="no-alerts">No recent alerts</div>
        )}

        {alerts.map((alert) => (
          <div key={alert.id} className="alert-item" role="listitem" aria-label={`Alert ${alert.id}`}>
            <div className="alert-left">
              <div className="alert-icon" aria-hidden="true">
                <AlertIcon type={alert.type} />
              </div>
            </div>

            <div className="alert-right">
              <div className="alert-row">
                <AlertBadge type={alert.type} />
                <div className="alert-meta">
                  <Clock size={14} className="meta-clock" />
                  <span className="meta-time">{alert.time}</span>
                </div>
              </div>

              <div className="alert-message">{alert.message}</div>

              {alert.location && (
                <div className="alert-location">Location: <span className="location-text">{alert.location}</span></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentAlerts;
