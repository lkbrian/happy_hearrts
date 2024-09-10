import {create} from "zustand";

export const useParentStore = create((set) => ({
  id: localStorage.getItem("id"),
  parent: [],
  setParent: (parentsData) => set({ parent: parentsData }),
  
}));
