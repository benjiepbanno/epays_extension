import { create } from "zustand";

type Fields = {
  period_year: string;
  period_month: string;
};

type FieldsState = {
  fields: Partial<Fields>;
  setFields: (data: Partial<Fields>) => void;
};

export const usePeriodStore = create<FieldsState>()((set) => ({
  fields: {},
  setFields: (data) =>
    set((state) => ({
      fields: { ...state.fields, ...data },
    })),
}));
