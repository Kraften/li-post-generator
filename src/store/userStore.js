import { create } from "zustand";
import { SECTION } from "../constants/constants";
import { EDIT_SECTION } from "./../constants/constants";

const initialUserState = {
  selectedStep: SECTION.NONE,
  selectedEditSection: EDIT_SECTION.NONE,

  user: {
    firstName: "Johannes ",
    lastName: "Kraft",
    occupation: "Software Engineer",
    hobby: "Climbing",
  },
};
const userStore = create((set) => ({
  ...initialUserState,

  updateSelectedStep: (selectedStep) =>
    set(() => ({ selectedStep: selectedStep })),

  updateSelectedEditSection: (selectedEditSection) =>
    set(() => ({ selectedEditSection: selectedEditSection })),

  setUser: (updatedFields) =>
    set((state) => ({
      user: { ...state.user, ...updatedFields },
    })),
}));

export default userStore;
