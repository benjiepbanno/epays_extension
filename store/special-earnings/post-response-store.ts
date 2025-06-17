import { postSpecialEarnings } from "@/actions/special-earnings-actions";
import { create } from "zustand";

type Response = {
  body: any;
};

type ResponseState = {
  response: Response;
  is_loading: boolean;
  error: string | null;

  fetchAndSetResponse: (params: {
    employee_number: string;
    appointment_status_code: string;
    earnings_status_code: string;
    earnings_code: string;
    amount: number;
    year_from: string;
    month_from: string;
    year_to: string;
    month_to: string;
  }) => Promise<void>;
};

export const usePostResponseStore = create<ResponseState>()((set) => ({
  response: { body: null },
  is_loading: false,
  error: null,

  fetchAndSetResponse: async (params) => {
    set({ response: { body: null }, is_loading: true, error: null });

    try {
      const { body, error } = await postSpecialEarnings(params);

      if (error) {
        set({
          error: error,
        });
      } else {
        set({
          response: { body },
        });
      }
    } catch (error) {
      set({
        error: "An error occurred while fetching data",
      });
    } finally {
      set({
        is_loading: false,
      });
    }
  },
}));
