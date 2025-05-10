import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReviewRequestForm from "./ReviewRequestForm";

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
        <ReviewRequestForm />
      </div>
    </main>
  );
}
