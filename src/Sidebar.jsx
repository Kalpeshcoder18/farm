// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  Users,
  Heart,
  ClipboardList,
  BarChart3,
  LogIn,
  Stethoscope,
  Plus
} from "lucide-react";

/**
 * Sidebar component (plain JSX)
 * - Place this file at: src/components/Sidebar.jsx
 * - Uses CSS class names: .sidebar, .sidebar-title, .sidebar-sub, .menu, .menu-item, .menu-item.active
 */

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "animals", label: "Animal Management", icon: Users },
  { id: "health", label: "Health Records", icon: Heart },
  { id: "checklists", label: "Worker Checklist", icon: ClipboardList },
  { id: "visitors", label: "Visitor Management", icon: LogIn },
  { id: "reports", label: "Manager Reports", icon: BarChart3 },
];

export function Sidebar({ activeSection = "dashboard", onSectionChange = () => {} }) {
  return (
    <aside className="sidebar sticky-top" aria-label="Main sidebar">
      <div style={{ padding: 2 }}>
        <div className="sidebar-title" style={{ fontSize:20}}>Farm Manager</div>
        <div className="sidebar-sub">Biosecurity System</div>
      </div>

      <nav className="menu" style={{ padding: "0 12px 20px" }}>
        <div style={{ padding: "8px 0 12px", color: "#6b7280", fontSize: 14, fontWeight: 600 }}>
          Main Menu
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => onSectionChange(item.id)}
                type="button"
                aria-current={isActive ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: isActive ? "var(--primary-100)" : "transparent",
                  border: isActive ? "1px solid var(--primary-600)" : "none",
                  cursor: "pointer",
                  color: "#111827",
                  textAlign: "left",
                  fontSize: 15,
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
