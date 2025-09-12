import React from "react";
import { KPICards } from "../../KPICards";
import { ComplianceChart } from "../../ComplianceChart";
import { RecentAlerts } from "../../RecentAlerts";
import { QuickActions } from "../../QuickActions";
import { FarmUnitsTable } from "../../FarmUnitsTable";

const mockComplianceData = [
  { day: "Mon", completion: 95 },
  { day: "Tue", completion: 88 },
  { day: "Wed", completion: 92 },
  { day: "Thu", completion: 85 },
  { day: "Fri", completion: 96 },
  { day: "Sat", completion: 89 },
  { day: "Sun", completion: 93 },
];

const mockAlerts = [
  { id: "1", type: "critical", message: "Abnormal mortality detected in Poultry Coop A - 3 birds reported dead", time: "2 minutes ago", location: "Poultry Coop A" },
  { id: "2", type: "warning", message: "Checklist for Pig House #3 not completed by assigned worker", time: "15 minutes ago", location: "Pig House #3" },
  { id: "3", type: "info", message: "Vaccination for Batch B-102 due in 3 days", time: "1 hour ago", location: "Pig House #1" },
  { id: "4", type: "warning", message: "Feed inventory running low - reorder required within 48 hours", time: "2 hours ago" },
  { id: "5", type: "info", message: "New visitor John Smith checked in at main gate", time: "3 hours ago", location: "Main Gate" },
];

const mockFarmUnits = [
  { id: "1", name: "Pig House #1", batchId: "PIG-2024-001", animalCount: 150, lastDisinfection: "Sept 4, 2024", checklistStatus: "complete", animalType: "Pigs" },
  { id: "2", name: "Poultry Coop A", batchId: "POULTRY-2024-003", animalCount: 500, lastDisinfection: "Sept 3, 2024", checklistStatus: "incomplete", animalType: "Broilers" },
  { id: "3", name: "Pig House #2", batchId: "PIG-2024-002", animalCount: 120, lastDisinfection: "Sept 4, 2024", checklistStatus: "complete", animalType: "Pigs" },
  { id: "4", name: "Dairy Barn", batchId: "DAIRY-2024-001", animalCount: 80, lastDisinfection: "Sept 3, 2024", checklistStatus: "pending", animalType: "Cattle" },
  { id: "5", name: "Poultry Coop B", batchId: "POULTRY-2024-004", animalCount: 300, lastDisinfection: "Sept 4, 2024", checklistStatus: "complete", animalType: "Layers" },
];

export function DashboardPage({ onNavigate }) {
  const totalAnimals = mockFarmUnits.reduce((sum, unit) => sum + unit.animalCount, 0);
  const completedChecklists = mockFarmUnits.filter((u) => u.checklistStatus === "complete").length;
  const checklistCompletion = Math.round((completedChecklists / mockFarmUnits.length) * 100);
  const activeAlerts = mockAlerts.filter((a) => a.type === "critical" || a.type === "warning").length;
  const currentVisitors = 3;

  const handleQuickAction = (action) => {
    console.log("Quick action:", action);
    if (onNavigate) onNavigate(action);
  };

  const handleViewUnit = (unitId) => {
    console.log("View unit:", unitId);
    if (onNavigate) onNavigate("animals", { selectedUnit: unitId });
  };

  return (
    <div className="dashboard-container">
      {/* KPI row (cards) */}
      <KPICards
        totalAnimals={totalAnimals}
        checklistCompletion={checklistCompletion}
        activeAlerts={activeAlerts}
        currentVisitors={currentVisitors}
      />

      {/* Operational overview: left = chart + alerts, right = summary panels (grid-2) */}
      <div className="grid-1 ">
        <div>
          

          {/* RecentAlerts outputs .alert-list / .alert-item with badges */}
          <RecentAlerts alerts={mockAlerts} />
        </div>

      
      </div>
    </div>
  );
}

export default DashboardPage;
