import React from "react";

export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
      style={{ width: size, height: size, borderWidth: size / 12 }}
      role="status"
      aria-label="Loading"
    />
  );
}
