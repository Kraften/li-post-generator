import { create } from "zustand";

const initialState = {
  listAnswer: [],
  selectedListAnswer: [],
  breadTextList: [],
  selectedListItems: [],
};

const chatStore = create((set) => ({
  ...initialState,
  updateSelectedListAnswer: (selectedListItems) =>
    set(() => ({ selectedListItems: selectedListItems })),

  updateListAnswer: (listAnswer) => set(() => ({ listAnswer: listAnswer })),
  updateBreadTextList: (breadTextList) =>
    set(() => ({ breadTextList: breadTextList })),
}));

export default chatStore;
