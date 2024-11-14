import { create } from "zustand";

const initialState = {
  listAnswer: [],
  selectedListAnswer: [],
  bodyAnswer: "",
  selectedListItems: [],
}

const chatStore = create((set) => ({
  ...initialState,
  updateSelectedListAnswer: (listAnswer) =>
    set(() => ({ listAnswer: listAnswer })),

  updateListAnswer: (listAnswer) => set(() => ({ listAnswer: listAnswer })),
  updateBodyAnswer: (bodyAnswer) => set(() => ({ bodyAnswer: bodyAnswer })),
  resetListAnswer: () => {
    set(initialState.listAnswer)
  },
}));

export default chatStore;
