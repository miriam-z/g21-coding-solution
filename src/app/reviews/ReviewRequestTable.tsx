"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReviewRequest } from "@/types";


type SortKey = "clientName" | "documentTitle" | "documentType" | "priority" | "dueDate" | "status" | "createdAt";

type SortDirection = "asc" | "desc";

type ReviewRequestTableProps = {
  requests: ReviewRequest[];
};

const parseDateValue = (value: string | undefined) => value ? new Date(value).getTime() : 0;
const parseStringValue = (value: string | undefined) => (value ?? "").toString().toLowerCase();

export default function ReviewRequestTable({ requests }: ReviewRequestTableProps) {
  // State for filtering, sorting, and search
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Filtering helpers
  function applyFilters(requests: ReviewRequest[]) {
    // For now, only filter by search (status/client/type filters can be added as local state if needed)
    return requests.filter(r => {
      if (search.trim() && !r.documentTitle.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
  }

  // Sorting helpers
  function compareRequests(a: ReviewRequest, b: ReviewRequest) {
    let aValue = a[sortKey];
    let bValue = b[sortKey];
    if (sortKey === "dueDate" || sortKey === "createdAt") {
      const aTime = parseDateValue(aValue)
      const bTime = parseDateValue(bValue)
      if (aTime === bTime) return 0;
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    } else {
      const aStr = parseStringValue(aValue)
      const bStr = parseStringValue(bValue)
      if (aStr === bStr) return 0;
      return sortDirection === "asc" ? (aStr > bStr ? 1 : -1) : (aStr < bStr ? 1 : -1);
    }
  }

  const filtered = applyFilters(requests);
  const sorted = [...filtered].sort(compareRequests);

  // Sorting interaction
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const renderTableHeader = ({ key, title }: { key: SortKey, title: string }) => <th scope="col" className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => handleSort(key)}>{title} {sortKey === key && (sortDirection === "asc" ? "▲" : "▼")}</th>

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by document title..."
          className="border rounded px-3 py-2 w-full max-w-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-50">
              {renderTableHeader({ key: "clientName", title: "Client" })}
              {renderTableHeader({ key: "documentTitle", title: "Title" })}
              {renderTableHeader({ key: "documentType", title: "Type" })}
              {renderTableHeader({ key: "priority", title: "Priority" })}
              {renderTableHeader({ key: "dueDate", title: "Due Date" })}
              {renderTableHeader({ key: "status", title: "Status" })}
              {renderTableHeader({ key: "createdAt", title: "Created" })}
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
                  <td className="px-4 py-2">
                    {req.priority === "High" && (
                      <Badge className="bg-red-200 text-red-900 border-none shadow-sm">High</Badge>
                    )}
                    {req.priority === "Medium" && (
                      <Badge className="bg-amber-200 text-amber-900 border-none shadow-sm">Medium</Badge>
                    )}
                    {req.priority === "Low" && (
                      <Badge className="bg-lime-200 text-lime-900 border-none shadow-sm">Low</Badge>
                    )}
                  </td>
                  <td className="px-4 py-2">{req.dueDate}</td>
                  <td className="px-4 py-2">
                    <Button variant="outline" size="sm" disabled className="w-32 cursor-not-allowed select-none">{req.status}</Button>
                  </td>
                  <td className="px-4 py-2">{new Date(req.createdAt).toISOString().replace('T', ' ').slice(0, 16)}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <Button size="sm" variant="outline" disabled>View</Button>
                    <Button size="sm" variant="secondary" disabled>Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
