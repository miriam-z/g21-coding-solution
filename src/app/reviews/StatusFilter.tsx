"use client";
import React from "react";
import { STATUSES } from "@/data/sample-data";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Filter by Status</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {STATUSES.map(status => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
