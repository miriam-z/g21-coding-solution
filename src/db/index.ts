import { ReviewRequest} from "@/types";
import { supabase } from "@/db/supabase";
export { SAMPLE_CLIENTS } from "@/app/mockData";

// Fetch all review requests
export async function getReviewRequests(): Promise<ReviewRequest[]> {
  const { data, error } = await supabase
    .from("g21")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return data as ReviewRequest[];
}

// Add a new review request
export async function addReviewRequest(request: Omit<ReviewRequest, "id" | "status" | "createdAt">) {
  const { data, error } = await supabase
    .from("g21")
    .insert([{ ...request, status: "Pending", createdAt: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return data as ReviewRequest;
}

// Update the status of a review request
export async function updateReviewRequest(id: string, status: string) {
  const { data, error } = await supabase
    .from("g21")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ReviewRequest;
}

// Delete a review request
export async function deleteReviewRequest(id: string) {
  const { error } = await supabase
    .from("g21")
    .delete()
    .eq("id", id);
  if (error) throw error;
}