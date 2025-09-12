import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, Heart, AlertTriangle, TrendingUp, Plus } from "lucide-react";

const mockHealthRecords = [
  { id: "HR-001", animalId: "PIG-001", animalName: "Pig #001", type: "Vaccination", date: "Sept 1, 2024", description: "PRRS Vaccination", veterinarian: "Dr. Smith", status: "Completed", notes: "No adverse reactions observed", location: "Pig House #1" },
  { id: "HR-002", animalId: "BR-002", animalName: "Broiler #002", type: "Treatment", date: "Sept 4, 2024", description: "Respiratory infection treatment", veterinarian: "Dr. Johnson", status: "Ongoing", notes: "Started antibiotic course, monitoring closely", location: "Poultry Coop A" },
  { id: "HR-003", animalId: "COW-001", animalName: "Cow #001", type: "Checkup", date: "Sept 6, 2024", description: "Quarantine health screening", veterinarian: "Dr. Wilson", status: "Scheduled", notes: "New arrival health assessment", location: "Dairy Barn" },
];

const healthStats = { totalRecords: 234, scheduledToday: 5, ongoingTreatments: 3, overdueCheckups: 2 };

export function HealthPage({ onNavigate }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <span className="badge bg-success">Completed</span>;
      case "Ongoing":
        return <span className="badge secondary">Ongoing</span>;
      case "Scheduled":
        return <span className="badge outline">Scheduled</span>;
      default:
        return <span className="badge outline">{status}</span>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Vaccination": return "💉";
      case "Treatment": return "🩺";
      case "Checkup": return "🔍";
      case "Surgery": return "⚕️";
      default: return "🩺";
    }
  };

  return (
    <div className="container">
      {/* header */}
      <div className="page-header">
        <div>
          {/* <h1 className="page-title">Health Records</h1> */}
          <p className="page-sub">Track animal health, treatments, and veterinary care</p>
        </div>
        <div>
          <button className="btn" onClick={() => onNavigate?.("log-health")}>
            <Plus className="h-4 w-4" /> <span style={{marginLeft:6}}>Add Health Record</span>
          </button>
        </div>
      </div>

      {/* KPI row */}
      {/* KPI row (icons on right corner) */}
<div className="row g-4 mb-4">
  <div className="col-6 col-md-3">
    <div className="card kpi-card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="kpi-title">Total Records</div>
            <div className="kpi-value">{healthStats.totalRecords}</div>
          </div>
          <Calendar size={26} className="kpi-icon" />
        </div>
      </div>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="card kpi-card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="kpi-title">Scheduled Today</div>
            <div className="kpi-value">{healthStats.scheduledToday}</div>
          </div>
          <TrendingUp size={26} className="kpi-icon" />
        </div>
      </div>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="card kpi-card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="kpi-title ">Ongoing Treatments</div>
            <div className="kpi-value ">{healthStats.ongoingTreatments}</div>
          </div>
          <Heart size={26} className="kpi-icon" />
        </div>
      </div>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="card kpi-card shadow-sm h-100 overdue">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="kpi-title">Overdue Checkups</div>
            <div className="kpi-value text-danger">{healthStats.overdueCheckups}</div>
          </div>
          <AlertTriangle size={26} className="kpi-icon text-danger" />
        </div>
      </div>
    </div>
  </div>
</div>


      {/* tabs / controls */}
      <div className="tabs" role="tablist" aria-label="Health tabs">
        <button className="tab active">Recent Records</button>
        <button className="tab">Scheduled</button>
        <button className="tab">Ongoing Treatments</button>
        <button className="tab">Analytics</button>
      </div>

      <div className="controls">
        <input className="input" placeholder="Search health records..." />
        <div className="select">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vaccination">Vaccination</SelectItem>
              <SelectItem value="treatment">Treatment</SelectItem>
              <SelectItem value="checkup">Checkup</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* records list */}
      <div className="records-list">
        {mockHealthRecords.map((record) => (
          <div key={record.id} className="record">
            <div className="record-top">
              <div className="record-left">
                <div className="type-icon">{getTypeIcon(record.type)}</div>
                <div>
                  <h4 className="desc">{record.description}</h4>
                  <p className="sub">{record.animalName} • {record.location}</p>
                </div>
              </div>
              <div>{getStatusBadge(record.status)}</div>
            </div>

            <div className="record-grid">
              <div>
                <div className="muted">Date:</div>
                <div>{record.date}</div>
              </div>
              <div>
                <div className="muted">Veterinarian:</div>
                <div>{record.veterinarian}</div>
              </div>
              <div>
                <div className="muted">Animal ID:</div>
                <div className="mono">{record.animalId}</div>
              </div>
            </div>

            {record.notes && (
              <div className="notes">
                <div className="muted">Notes:</div>
                <div>{record.notes}</div>
              </div>
            )}

            <div className="actions">
              <button className="btn outline">View Details</button>
              <button className="btn outline">Edit Record</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
