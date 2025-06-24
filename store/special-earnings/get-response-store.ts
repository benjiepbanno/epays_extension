import { getSpecialEarnings } from "@/actions/special-earnings-actions";
import { create } from "zustand";

type Response = {
  body: any;
};

type ResponseState = {
  response: Response;
  is_loading: boolean;
  error: string | null;

  fetchAndSetResponse: (params: { special_earnings_id: number }) => Promise<void>;
};

export const useGetResponseStore = create<ResponseState>()((set) => ({
  response: { body: null },
  is_loading: false,
  error: null,

  fetchAndSetResponse: async (params) => {
    set({ response: { body: null }, is_loading: true, error: null });

    try {
      const { body, error } = await getSpecialEarnings(params);

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
