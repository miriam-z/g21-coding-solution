"use client";
import React, { useState } from "react";
import { DOCUMENT_TYPES, PRIORITIES } from "@/app/domain";

import { SAMPLE_CLIENTS } from "@/app/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Dropdown from "@/components/Dropdown";
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

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <label className="block font-medium mb-1">{title}</label>
    {children}
  </div>
)

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
      // File upload is simulated, not sent to the API in this demo
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
      <FormSection title="Client Name">
        <Dropdown
          value={form.clientName}
          onChange={(value) => handleSelect("clientName", value)}
          options={SAMPLE_CLIENTS}
        />
      </FormSection>
      <FormSection title="Document Title">
        <Input name="documentTitle" value={form.documentTitle} onChange={handleChange} required />
      </FormSection>
      <FormSection title="Document Type">
        <Dropdown
          value={form.documentType}
          onChange={(value) => handleSelect("documentType", value)}
          options={DOCUMENT_TYPES}
        />
      </FormSection>
      <FormSection title="Priority">
        <Dropdown
          value={form.priority}
          onChange={(value) => handleSelect("priority", value)}
          options={PRIORITIES}
        />
      </FormSection>
      <FormSection title="Due Date">
        <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
      </FormSection>
      <FormSection title="Notes">
        <Textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
      </FormSection>
      <FormSection title="File Upload (simulated)">
        <>
          <Input type="file" name="file" onChange={handleFile} disabled />
          <p className="text-xs text-gray-400">File upload is not implemented in this demo.</p>
        </>
      </FormSection>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
      {success && <p className="text-green-600">Review request submitted!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
