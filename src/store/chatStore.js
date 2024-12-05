import { create } from "zustand";
import { SECTION } from "../constants/constants";

const initialState = {
  selectedState: SECTION.NONE,
  image: null,
  listAnswer: [],
  breadTextList: [
    "Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum?",
  ],
  selectedListItems: [],
};

const chatStore = create((set) => ({
  ...initialState,
  updateImage: (image) => set(() => ({ image: image })),

  updateSelectedListItems: (newItem) =>
    set((state) => ({
      selectedListItems: [...state.selectedListItems, newItem],
    })),

  updateListAnswer: (listAnswer) => set(() => ({ listAnswer: listAnswer })),
  updateSelectedState: (selectedState) =>
    set(() => ({ selectedState: selectedState })),

  updateBreadTextList: (breadTextList) =>
    set(() => ({ breadTextList: breadTextList })),
}));

export default chatStore;
