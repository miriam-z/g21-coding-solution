import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface DropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export default function Dropdown({ label, value, onChange, options, className }: DropdownProps) {
  return (
    <div className={`mb-4 ${className || ""}`}>
      {label ? <label className="block font-medium mb-1">{label}</label> : null}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder={label || "Select..."} />
        </SelectTrigger>
        <SelectContent className="bg-gray-50">
          {options.map(option => (
            <SelectItem key={option} value={option} className="hover:bg-gray-50 focus:bg-gray-100 focus:outline-none">{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
