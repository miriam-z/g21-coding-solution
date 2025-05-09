"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { ReviewRequest } from "@/types";
import { STATUSES } from "@/data/sample-data";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ReviewRequestTableProps {
  statusFilter: string;
  clientFilter: string;
  typeFilter: string;
}

type SortKey = "clientName" | "documentTitle" | "documentType" | "priority" | "dueDate" | "status" | "createdAt";

type SortDirection = "asc" | "desc";

export default function ReviewRequestTable({ statusFilter, clientFilter, typeFilter }: ReviewRequestTableProps) {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    setLoading(true);
    fetch("/api/review-requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load review requests");
        setLoading(false);
      });
  }, []);

  let filtered = requests;
  if (statusFilter !== "All") {
    filtered = filtered.filter(r => r.status === statusFilter);
  }
  if (clientFilter !== "All") {
    filtered = filtered.filter(r => r.clientName === clientFilter);
  }
  if (typeFilter !== "All") {
    filtered = filtered.filter(r => r.documentType === typeFilter);
  }
  if (search.trim() !== "") {
    filtered = filtered.filter(r => r.documentTitle.toLowerCase().includes(search.trim().toLowerCase()));
  }

  // Sorting
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "dueDate" || sortKey === "createdAt") {
      // Handle empty or invalid dates gracefully
      const aTime = aValue ? new Date(aValue as string).getTime() : 0;
      const bTime = bValue ? new Date(bValue as string).getTime() : 0;
      if (aTime === bTime) return 0;
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    } else {
      // Compare as lowercase strings for consistency
      const aStr = (aValue ?? "").toString().toLowerCase();
      const bStr = (bValue ?? "").toString().toLowerCase();
      if (aStr === bStr) return 0;
      return sortDirection === "asc" ? (aStr > bStr ? 1 : -1) : (aStr < bStr ? 1 : -1);
    }
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by document title..."
          className="border rounded px-3 py-2 w-full max-w-xs shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="overflow-x-auto">
      {loading ? (
        <div className="p-6 flex flex-col items-center justify-center text-gray-500">
          <span className="mb-2"><Spinner size={32} /></span>
          <span>Loading...</span>
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("clientName")}>Client {sortKey === "clientName" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("documentTitle")}>Title {sortKey === "documentTitle" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("documentType")}>Type {sortKey === "documentType" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("priority")}>Priority {sortKey === "priority" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("dueDate")}>Due Date {sortKey === "dueDate" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("status")}>Status {sortKey === "status" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort("createdAt")}>Created {sortKey === "createdAt" && (sortDirection === "asc" ? "▲" : "▼")}</th>
              <th scope="col" className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">No review requests found.</td>
              </tr>
            ) : (
              sorted.map(req => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{req.clientName}</td>
                  <td className="px-4 py-2">{req.documentTitle}</td>
                  <td className="px-4 py-2">{req.documentType}</td>
                  <td className="px-4 py-2">{req.priority}</td>
                  <td className="px-4 py-2">{req.dueDate}</td>
                  <td className="px-4 py-2">
                    <Select value={req.status} onValueChange={newStatus => {
                      setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: newStatus as typeof STATUSES[number] } : r));
                    }}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">{new Date(req.createdAt).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <Button size="sm" variant="outline" disabled>View</Button>
                    <Button size="sm" variant="secondary" disabled>Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}
