"use client";
import React, { useState } from "react";
import { SAMPLE_CLIENTS, DOCUMENT_TYPES, PRIORITIES } from "@/data/sample-data";
import { ReviewRequest } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";


const initialForm = {
  clientName: SAMPLE_CLIENTS[0],
  documentTitle: "",
  documentType: DOCUMENT_TYPES[0],
  priority: PRIORITIES[0],
  dueDate: "",
  notes: "",
  file: null as File | null,
};

const schema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  documentTitle: z.string().min(1, "Document title is required"),
  documentType: z.string().min(1, "Document type is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.string().min(1, "Due date is required").refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "Due date must be a valid date" }
  ),
  notes: z.string().optional(),
});

export default function ReviewRequestForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, file: e.target.files?.[0] ?? null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setValidationErrors({});
    try {
      // Validate form with Zod
      const { file, ...payload } = form;
      const result = schema.safeParse(payload);
      if (!result.success) {
        const fieldErrors: { [key: string]: string } = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setValidationErrors(fieldErrors);
        setLoading(false);
        return;
      }
      // File upload is simulated, not sent
      const res = await fetch("/api/review-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="space-y-6 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      {/* Validation errors */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="mb-4 text-red-600">
          {Object.entries(validationErrors).map(([field, msg]) => (
            <div key={field}>{msg}</div>
          ))}
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Client Name</label>
        <Select value={form.clientName} onValueChange={v => handleSelect("clientName", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {SAMPLE_CLIENTS.map(client => (
              <SelectItem key={client} value={client}>{client}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block font-medium mb-1">Document Title</label>
        <Input name="documentTitle" value={form.documentTitle} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium mb-1">Document Type</label>
        <Select value={form.documentType} onValueChange={v => handleSelect("documentType", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block font-medium mb-1">Priority</label>
        <Select value={form.priority} onValueChange={v => handleSelect("priority", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium mb-1">Notes</label>
        <Textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
      </div>
      <div>
        <label className="block font-medium mb-1">File Upload (simulated)</label>
        <Input type="file" name="file" onChange={handleFile} disabled />
        <p className="text-xs text-gray-400">File upload is not implemented in this demo.</p>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
      {success && <p className="text-green-600">Review request submitted!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
