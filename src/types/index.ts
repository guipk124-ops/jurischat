import { MessageRole, UserRole, CaseStatus, Priority } from '@prisma/client';

export type { MessageRole, UserRole, CaseStatus, Priority };

export interface ChatMessage {
  id: string;
  caseId: string;
  userId: string;
  message: string;
  response?: string;
  role: MessageRole;
  createdAt: Date;
}

export interface CaseData {
  id: string;
  userId: string;
  legalArea: string;
  title: string;
  description?: string;
  status: CaseStatus;
  priority: Priority;
  clientData?: Record<string, any>;
  caseData?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalTemplate {
  area: string;
  displayName: string;
  description: string;
  initialMessage: string;
  questions: Question[];
  requiredFields: string[];
}

export interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio';
  required: boolean;
  options?: string[];
  followUp?: string[];
  conditional?: {
    field: string;
    value: string;
  };
}

export interface ChatRequest {
  caseId: string;
  userId: string;
  message: string;
  legalArea?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
  response: string;
  nextQuestion?: string;
  metadata?: Record<string, any>;
}

export interface PdfData {
  caseId: string;
  title: string;
  clientData: Record<string, any>;
  chatHistory: ChatMessage[];
  summary: string;
  recommendations: string[];
}