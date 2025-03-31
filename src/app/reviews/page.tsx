import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
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
        {/* TODO: Add status filter component here */}
        <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            Replace this placeholder with your status filter component.
          </p>
        </div>

        {/* TODO: Add ReviewRequestTable component here */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            Replace this placeholder with your ReviewRequestTable component.
            <br />
            Fetch data from the API endpoint at /api/review-requests
          </p>
        </div>
      </div>
    </main>
  );
}
