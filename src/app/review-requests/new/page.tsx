import React from "react";
import ReviewRequestForm from "./ReviewRequestForm";

export default function NewReviewRequestPage() {
  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Submit Document Review Request</h1>
      <ReviewRequestForm />
    </main>
  );
}
