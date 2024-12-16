import { create } from "zustand";
import { SECTION } from "../constants/constants";

const initialState = {
  selectedState: SECTION.NONE,
  image: null,
  listAnswer: [],
  breadTextList: [
    " Sarah's resume didn't scream rock climber, but her problem-solving skills certainly did.  Years spent scaling cliffs had honed a unique ability to dissect complex challenges, mirroring the meticulous route planning she employed on the rock face.  Where others saw insurmountable obstacles, Sarah saw a series of manageable problems.  A sudden project deadline?  She approached it with the same methodical precision used to secure a precarious handhold, breaking it into smaller, achievable tasks.  An unexpected budget shortfall?  Her creative solutions, born from years of adapting to unpredictable weather and equipment malfunctions on the mountain, unearthed cost-saving strategies her colleagues hadn't considered.  Her critical thinking wasn't just about finding answers; it was about anticipating potential pitfalls and mitigating risks proactively.  Sarah's unique perspective, forged in the crucible of challenging climbs, made her an invaluable asset, bringing a refreshing blend of strategic thinking and adaptable resilience to any situation.  She didn't just solve problems; she prevented them.",
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
