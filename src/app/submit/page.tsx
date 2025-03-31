import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubmitPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Submit New Review Request</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* TODO: Add ReviewRequestForm component here */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            Replace this placeholder with your ReviewRequestForm component.
            <br />
            Submit data to the API endpoint at /api/review-requests
          </p>
        </div>
      </div>
    </main>
  );
}
