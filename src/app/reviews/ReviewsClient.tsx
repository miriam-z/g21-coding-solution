"use client";
import { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import Spinner from "@/components/ui/spinner";
import ReviewRequestTable from "./ReviewRequestTable";
import { DOCUMENT_TYPES, STATUSES } from "@/app/domain";
import { SAMPLE_CLIENTS } from "@/app/mockData";
import { ReviewRequest } from "@/types";

export default function ReviewsClient() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/review-requests", {
          method: "GET",
        });
        const data = await res.json()
        setRequests(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch review requests");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(r => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (clientFilter !== "All" && r.clientName !== clientFilter) return false;
    if (typeFilter !== "All" && r.documentType !== typeFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <main className="container mx-auto p-4 flex items-center justify-center min-h-[300px]">
        <Spinner size={36} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4 flex items-center justify-center min-h-[300px]">
        <div className="text-red-600">{error}</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Review Requests</h1>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Review Requests</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Dropdown
            label="Filter by Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={["All", ...STATUSES]}
          />
          <Dropdown
            label="Filter by Client"
            value={clientFilter}
            onChange={setClientFilter}
            options={["All", ...SAMPLE_CLIENTS]}
          />
          <Dropdown
            label="Filter by Document Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={["All", ...DOCUMENT_TYPES]}
          />
        </div>
        <ReviewRequestTable requests={filteredRequests} />
      </div>
    </main>
  );
}
