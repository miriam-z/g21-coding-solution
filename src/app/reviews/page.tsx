"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StatusFilter from "./StatusFilter";
import ReviewRequestTable from "./ReviewRequestTable";
import { SAMPLE_CLIENTS, DOCUMENT_TYPES } from "@/data/sample-data";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ReviewsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [clientFilter, setClientFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Review Requests</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Review Requests</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          <div>
            <label className="block font-medium mb-1">Filter by Client</label>
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {SAMPLE_CLIENTS.map(client => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-medium mb-1">Filter by Document Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {DOCUMENT_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <ReviewRequestTable statusFilter={statusFilter} clientFilter={clientFilter} typeFilter={typeFilter} />
      </div>
    </main>
  );
}
