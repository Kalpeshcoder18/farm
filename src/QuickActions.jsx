// src/QuickActions.jsx
import React from "react";
import { Card } from "./components/ui/card";
import { Plus, Heart, Users, FileText } from "lucide-react";

export function QuickActions({ 
  onAddBatch, 
  onLogHealth, 
  onViewVisitors, 
  onGenerateReport 
}) {
  return (
    <Card>
      <div style={{ marginBottom: 8 }}>
        <h3 className="panel-title">Quick Actions</h3>
      </div>

      <div className="quick-actions">
        <button onClick={onAddBatch} className="quick-btn">
          <Plus size={18} />
          Add New Animal Batch
        </button>

        <button onClick={onLogHealth} className="quick-btn">
          <Heart size={18} />
          Log Health Record
        </button>

        <button onClick={onViewVisitors} className="quick-btn">
          <Users size={18} />
          View Visitor Logs
        </button>

        <button onClick={onGenerateReport} className="quick-btn">
          <FileText size={18} />
          Generate Full Report
        </button>
      </div>
    </Card>
  );
}
