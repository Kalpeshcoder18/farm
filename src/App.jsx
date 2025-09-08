import { useState } from "react";
import { Sidebar } from "./Sidebar"; // <-- adjust path if your Sidebar is in components/ui

import { DashboardPage } from "./components/pages/DashboardPage";
// other pages left available but not used heavily
import { AnimalsPage } from "./components/pages/AnimalsPage";
import { HealthPage } from "./components/pages/HealthPage";
import { ChecklistsPage } from "./components/pages/ChecklistsPage";
import { VisitorsPage } from "./components/pages/VisitorsPage";
import { ReportsPage } from "./components/pages/ReportsPage";
import { HealthRecordForm } from "./components/forms/HealthRecordForm";
import { ChecklistForm } from "./components/forms/ChecklistForm";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [navigationData, setNavigationData] = useState(null);

  const handleSectionChange = (section, data) => {
    setActiveSection(section);
    setNavigationData(data);
  };

  const handleSaveHealthRecord = (data) => {
    console.log("Saving health record:", data);
    setActiveSection("health");
  };

  const handleSaveChecklist = (data) => {
    console.log("Saving checklist:", data);
    setActiveSection("checklists");
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardPage onNavigate={handleSectionChange} />;
      case "animals":
        return <AnimalsPage selectedUnit={navigationData?.selectedUnit} onNavigate={handleSectionChange} />;
      case "health":
        return <HealthPage onNavigate={handleSectionChange} />;
      case "checklists":
        return <ChecklistsPage />;
      case "visitors":
        return <VisitorsPage />;
      case "reports":
        return <ReportsPage />;
      case "log-health":
        return <HealthRecordForm onBack={() => setActiveSection("health")} onSave={handleSaveHealthRecord} />;
      case "new-checklist":
        return <ChecklistForm onBack={() => setActiveSection("checklists")} onSave={handleSaveChecklist} />;
      default:
        return <DashboardPage onNavigate={handleSectionChange} />;
    }
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Farm Manager Dashboard";
      case "animals": return "Animal Management";
      case "health": return "Health Records";
      case "checklists": return "Worker Checklist";
      case "visitors": return "Visitor Management";
      case "reports": return "Manager Reports";
      case "log-health": return "Log Health Record";
      case "new-checklist": return "Create New Checklist";
      default: return "Farm Manager Dashboard";
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <div>
            <h1>{getPageTitle()}</h1>
            <div className="muted">Today: {new Date().toLocaleDateString()}</div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* simple icon placeholders */}
            <button className="btn.ghost" style={{ border: "none", background: "transparent", cursor: "pointer" }}>🔔</button>
            <button className="btn.ghost" style={{ border: "none", background: "transparent", cursor: "pointer" }}>⚙️</button>
            <button className="btn.ghost" style={{ border: "none", background: "transparent", cursor: "pointer" }}>👤</button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="content">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
