import { DocumentType, Priority, ReviewRequest, Status } from "@/types";

export const SAMPLE_CLIENTS = [
  "Acme Financial",
  "Birch Investments",
  "Coral Capital Management",
  "Diamond Trust",
  "Eagle Asset Advisors",
];

export const DOCUMENT_TYPES: DocumentType[] = [
  "Financial Promotion",
  "DDQ Response",
  "Risk Assessment",
];

export const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export const STATUSES: Status[] = ["Pending", "In Review", "Completed"];

export const SAMPLE_REVIEW_REQUESTS: ReviewRequest[] = [
  {
    id: "1",
    clientName: "Acme Financial",
    documentTitle: "Q1 Investment Newsletter",
    documentType: "Financial Promotion",
    priority: "High",
    dueDate: "2025-04-15",
    notes: "Needs urgent review for FCA compliance",
    status: "Pending",
    createdAt: "2025-03-28",
  },
  {
    id: "2",
    clientName: "Birch Investments",
    documentTitle: "Annual Risk Assessment",
    documentType: "Risk Assessment",
    priority: "Medium",
    dueDate: "2025-04-30",
    notes: "Standard annual review",
    status: "In Review",
    createdAt: "2025-03-25",
  },
  {
    id: "3",
    clientName: "Coral Capital Management",
    documentTitle: "ESG Investment Strategy",
    documentType: "DDQ Response",
    priority: "Low",
    dueDate: "2025-05-10",
    notes: "Quarterly update for investors",
    status: "Completed",
    createdAt: "2025-03-15",
  },
  {
    id: "4",
    clientName: "Diamond Trust",
    documentTitle: "Retirement Product Brochure",
    documentType: "Financial Promotion",
    priority: "Medium",
    dueDate: "2025-04-20",
    notes: "New product launch materials",
    status: "In Review",
    createdAt: "2025-03-22",
  },
  {
    id: "5",
    clientName: "Eagle Asset Advisors",
    documentTitle: "Cybersecurity Assessment",
    documentType: "Risk Assessment",
    priority: "High",
    dueDate: "2025-04-05",
    notes: "Urgent review after security incident",
    status: "Pending",
    createdAt: "2025-03-30",
  },
];
