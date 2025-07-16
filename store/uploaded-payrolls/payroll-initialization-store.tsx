import { create } from "zustand";

type Fields = {
  folder_name: string;
  payroll_files: File[];
  appointment_status_code: string;
  period_year: string;
  period_month: string;
  transaction_type: string;
  sequence_number: string;
  claim_type: string;
};

type FieldsState = {
  fields: Partial<Fields>;
  setFields: (data: Partial<Fields>) => void;
};

export const usePayrollInitializationStore = create<FieldsState>()((set) => ({
  fields: {},
  setFields: (data) =>
    set((state) => ({
      fields: { ...state.fields, ...data },
    })),
}));
