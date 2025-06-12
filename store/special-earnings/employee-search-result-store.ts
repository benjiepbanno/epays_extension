import { fetchEmployee } from "@/actions/special-earnings-actions";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EmployeeSearchResult = {
  body: any;
};

type EmployeeSearchResultState = {
  employee_search_result: EmployeeSearchResult;
  is_loading: boolean;
  error: string | null;

  setEmployeeSearchResult: (data: EmployeeSearchResult) => void;
  fetchAndSetEmployeeSearchResult: (params: {
    employee_number: string;
  }) => Promise<void>;
};

export const useEmployeeSearchResultStore = create<EmployeeSearchResultState>()(
  (set) => ({
    employee_search_result: { body: {} },
    is_loading: false,
    error: null,

    setEmployeeSearchResult: (data) => set({ employee_search_result: data }),

    fetchAndSetEmployeeSearchResult: async (params) => {
      set({ is_loading: true, error: null });

      try {
        const { body, error } = await fetchEmployee(params);

        if (error) {
          set({ employee_search_result: { body: {} }, error: error, is_loading: false });
        } else {
          set({ employee_search_result: { body }, error: null, is_loading: false });
        }
      } catch (error) {
        set({
          error: "An error occurred while fetching data",
          is_loading: false,
        });
      }
    },
  })
);
