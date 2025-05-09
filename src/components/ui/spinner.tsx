import { Loader2 } from "lucide-react";
import React from "react";

export default function Spinner({ size = 24 }: { size?: number }) {
  return <Loader2 className="animate-spin text-blue-600" size={size} />;
}
