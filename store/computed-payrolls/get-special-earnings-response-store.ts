import { getSpecialEarningsWherePeriod } from "@/actions/computed-payrolls-actions";
import { create } from "zustand";

type Dictionary = {
  special_earnings_id: number;
  amount: number;
  [key: string]: any; // in case there are other fields
};

type Response = {
  body: Dictionary[] | null;
};

type ResponseState = {
  response: Response;
  is_loading: boolean;
  error: string | null;

  fetchAndSetResponse: (params: {
    period_year: string;
    period_month: string;
  }) => Promise<void>;

  updateAmount: (special_earnings_id: number, new_amount: number) => void;
};

export const useGetSpecialEarningsResponseStore = create<ResponseState>()(
  (set, get) => ({
    response: { body: null },
    is_loading: false,
    error: null,

    fetchAndSetResponse: async (params) => {
      set({ response: { body: null }, is_loading: true, error: null });

      try {
        const { body, error } = await getSpecialEarningsWherePeriod(params);

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

    updateAmount: (special_earnings_id: number, new_amount: number) => {
      const current = get().response.body;

      if (!current) return;

      const updated = current.map((item) =>
        item.special_earnings_id === special_earnings_id
          ? { ...item, amount: new_amount }
          : item
      );

      set({
        response: { body: updated },
      });
    },
  })
);
