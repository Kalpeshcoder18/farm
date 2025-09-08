// src/RecentAlerts.jsx
import React from "react";
import { Card } from "./components/ui/card";
import { AlertTriangle, Clock, CheckCircle, Bell } from "lucide-react";

/**
 * RecentAlerts
 * Props:
 *  - alerts: array of { id, type, message, time, location }
 *
 * Uses CSS classes:
 *  .alert-list .alert-item .alert-content .alert-meta .badge.{critical|warning|info}
 */

function AlertIcon({ type }) {
  const common = { size: 18 };
  if (type === "critical") return <Bell {...common} style={{ color: "#b91c1c" }} />;
  if (type === "warning") return <AlertTriangle {...common} style={{ color: "#b45309" }} />;
  if (type === "info") return <CheckCircle {...common} style={{ color: "#1E3A8A" }} />;
  return null;
}

function AlertBadge({ type }) {
  if (type === "critical") return <span className="badge critical">Critical</span>;
  if (type === "warning") return <span className="badge warning">Warning</span>;
  return <span className="badge info">Info</span>;
}

export function RecentAlerts({ alerts = [] }) {
  return (
    <Card>
      <div style={{ marginBottom: 8 }}>
        <h3 className="panel-title" style={{ margin: 0 }}>Recent Alerts & Notifications</h3>
      </div>

      <div className="alert-list" style={{ maxHeight: 300, overflow: "auto", paddingRight: 6 }}>
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-item">
            <div style={{ marginTop: 6 }}>
              <AlertIcon type={alert.type} />
            </div>

            <div className="alert-content">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AlertBadge type={alert.type} />
                <div className="alert-meta" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={14} />
                  <span>{alert.time}</span>
                </div>
              </div>

              <div style={{ marginTop: 8, fontWeight: 600 }}>{alert.message}</div>

              {alert.location && (
                <div className="alert-meta" style={{ marginTop: 6 }}>
                  Location: {alert.location}
                </div>
              )}
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div style={{ padding: 12, color: "var(--muted-2)" }}>No recent alerts</div>
        )}
      </div>
    </Card>
  );
}

export default RecentAlerts;
