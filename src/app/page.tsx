import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">G21 Document Review Portal</h1>

      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="p-6 bg-white rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold mb-4">Document Reviews</h2>
          <p className="mb-4">View and filter all document review requests.</p>
          <Link href="/reviews">
            <Button>View Reviews</Button>
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold mb-4">Submit New Request</h2>
          <p className="mb-4">Create a new document review request.</p>
          <Link href="/submit">
            <Button>New Request</Button>
          </Link>
        </div>
      </div>

      <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-2">G21 Portal Documentation</h2>
        <p>
          The G21 Portal helps compliance officers manage document reviews for
          financial promotions, due diligence questionnaires, and risk
          assessments.
        </p>
      </div>
    </main>
  );
}
