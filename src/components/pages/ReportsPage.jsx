import React, { useState } from "react";
import { FileText, Send, Download, Calendar, BarChart3 } from "lucide-react";


export function ReportsPage() {
  const [reportData, setReportData] = useState({
    reportPeriod: "weekly",
    totalAnimals: "1150",
    complianceCheck: "94",
    monthlyVisitors: "45",
    criticalIssues: "2",
    additionalNotes: ""
  });

  const mockReports = [
    {
      id: "RPT-001",
      period: "Weekly",
      submittedDate: "2024-01-08",
      totalAnimals: 1145,
      complianceRate: 96,
      visitors: 38,
      criticalIssues: 1,
      status: "Reviewed"
    },
    {
      id: "RPT-002",
      period: "Weekly",
      submittedDate: "2024-01-01",
      totalAnimals: 1140,
      complianceRate: 92,
      visitors: 42,
      criticalIssues: 3,
      status: "Approved"
    },
    {
      id: "RPT-003",
      period: "Monthly",
      submittedDate: "2023-12-31",
      totalAnimals: 1135,
      complianceRate: 89,
      visitors: 156,
      criticalIssues: 8,
      status: "Pending"
    }
  ];

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
    setReportData({
      reportPeriod: "weekly",
      totalAnimals: "",
      complianceCheck: "",
      monthlyVisitors: "",
      criticalIssues: "",
      additionalNotes: ""
    });
  };

  const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return <span className="badge status-badge bg-success">Approved</span>;
    case "Reviewed":
      return <span className="badge status-badge bg-reviewed">Reviewed</span>;
    case "Pending":
      return <span className="badge status-badge bg-warning">Pending</span>;
    case "Rejected":
      return <span className="badge status-badge bg-rejected">Rejected</span>;
    default:
      return <span className="badge status-badge bg-neutral">{status}</span>;
  }
};

  return (
    <div className="container my-4">
      {/* Header */}

      {/* Submit Report Form - Full width */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light text-brand fw-semibold">
          <Send size={18} className="me-2" />
          Submit New Report
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitReport} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Report Period</label>
              <select
                className="form-select"
                value={reportData.reportPeriod}
                onChange={(e) => handleInputChange("reportPeriod", e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Total Animals</label>
              <input
                type="number"
                className="form-control"
                value={reportData.totalAnimals}
                onChange={(e) => handleInputChange("totalAnimals", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Compliance Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={reportData.complianceCheck}
                onChange={(e) => handleInputChange("complianceCheck", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Period Visitors</label>
              <input
                type="number"
                className="form-control"
                value={reportData.monthlyVisitors}
                onChange={(e) => handleInputChange("monthlyVisitors", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Critical Issues</label>
              <input
                type="number"
                className="form-control"
                value={reportData.criticalIssues}
                onChange={(e) => handleInputChange("criticalIssues", e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={reportData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-brand w-100">
                <Send size={16} className="me-2" />
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Current Period Summary */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light text-brand fw-semibold">
          <BarChart3 size={18} className="me-2" />
          Current Period Summary
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-3">
              <div className="text-muted small">Total Animals</div>
              <div className="fw-bold text-brand fs-5">1150</div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="text-muted small">Compliance Rate</div>
              <div className="fw-bold text-brand fs-5">94%</div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="text-muted small">Visitors</div>
              <div className="fw-bold text-brand fs-5">45</div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="text-muted small">Critical Issues</div>
              <div className="fw-bold text-danger fs-5">2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Reports BELOW */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center bg-light text-brand fw-semibold">
          <div>
            <FileText size={18} className="me-2" />
            Previous Reports
          </div>
          <button className="btn btn-outline-brand btn-sm">
            <Download size={14} className="me-1" />
            Export All
          </button>
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Period</th>
                <th>Date</th>
                <th>Animals</th>
                <th>Compliance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <Calendar size={14} className="me-2 text-muted" />
                    {report.period}
                  </td>
                  <td>{report.submittedDate}</td>
                  <td>{report.totalAnimals}</td>
                  <td>
                    {report.complianceRate}%{" "}
                    <span
                      className="ms-2 d-inline-block rounded-circle"
                      style={{
                        width: 10,
                        height: 10,
                        background: report.complianceRate >= 90 ? "#B0712F" : "#ef4444"
                      }}
                    />
                  </td>
                  <td>{getStatusBadge(report.status)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-brand">
                      <FileText size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines */}
      <div className="card shadow-sm">
        <div className="card-header bg-light text-brand fw-semibold">
          Report Guidelines
        </div>
        <div className="card-body small text-muted">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">• <strong>Weekly Reports:</strong> Submit every Monday by 10:00 AM.</li>
            <li className="mb-2">• <strong>Compliance Rate:</strong> Based on checklists & protocols.</li>
            <li className="mb-2">• <strong>Critical Issues:</strong> Include alerts or breaches.</li>
            <li>• <strong>Additional Notes:</strong> Provide context for unusual metrics.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
