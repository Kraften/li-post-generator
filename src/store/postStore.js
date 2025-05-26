import { create } from "zustand";

const initialPostState = {
  image: null,
  imageSize: { width: 0, height: 0 },
  editedImage: null,
  isHelpOverlayOpen: false,
  listOfPerks: [],
  selectedPerksList: [],
  introText: `Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and Lorem`,
  mainText:
    "Sarah's resume didn't scream rock climber, but her problem-solving skills certainly did.  Years spent scaling cliffs had honed a unique ability to dissect complex challenges, mirroring the meticulous route planning she employed on the rock face.  Where others saw insurmountable obstacles, Sarah saw a series of manageable problems.  A sudden project deadline?  She approached it with the same methodical precision used to secure a precarious handhold, breaking it into smaller, achievable tasks.  An unexpected budget shortfall?  Her creative solutions, born from years of adapting to unpredictable weather and equipment malfunctions on the mountain, unearthed cost-saving strategies her colleagues hadn't considered.  Her critical thinking wasn't just about finding answers; it was about anticipating potential pitfalls and mitigating risks proactively.  Sarah's unique perspective, forged in the crucible of challenging climbs, made her an invaluable asset, bringing a refreshing blend of strategic thinking and adaptable resilience to any situation.  She didn't just solve problems; she prevented them.",
};
const postStore = create((set) => ({
  ...initialPostState,

  updateImage: (image, size) => set(() => ({ image, imageSize: size })),
  updateEditedImage: (editedImage) => set(() => ({ editedImage: editedImage })),
  updateIsHelpOverlayOpen: (isHelpOverlayOpen) =>
    set(() => ({ isHelpOverlayOpen: isHelpOverlayOpen })),
  updateIntroText: (introText) => set(() => ({ introText: introText })),
  updateMainText: (mainText) => set(() => ({ mainText: mainText })),
  updateListOfPerks: (listOfPerks) => set(() => ({ listOfPerks: listOfPerks })),
  updateSelectedPerksList: (newItem) =>
    set(() => ({
      selectedPerksList: newItem,
    })),
}));

export default postStore;
