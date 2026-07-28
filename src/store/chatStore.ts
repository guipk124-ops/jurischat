import { create } from 'zustand';
import { ChatMessage } from '@/types';

interface ChatStoreState {
  currentCaseId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  legalArea: string | null;
  clientData: Record<string, any>;
  currentQuestionIndex: number;

  setCurrentCase: (caseId: string) => void;
  setLegalArea: (area: string) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setIsLoading: (loading: boolean) => void;
  updateClientData: (data: Record<string, any>) => void;
  setCurrentQuestionIndex: (index: number) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  currentCaseId: null,
  messages: [],
  isLoading: false,
  legalArea: null,
  clientData: {},
  currentQuestionIndex: 0,

  setCurrentCase: (caseId: string) => set({ currentCaseId: caseId }),
  setLegalArea: (area: string) => set({ legalArea: area }),
  addMessage: (message: ChatMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages: ChatMessage[]) => set({ messages }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  updateClientData: (data: Record<string, any>) =>
    set((state) => ({
      clientData: { ...state.clientData, ...data },
    })),
  setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
  reset: () =>
    set({
      currentCaseId: null,
      messages: [],
      isLoading: false,
      legalArea: null,
      clientData: {},
      currentQuestionIndex: 0,
    }),
}));
