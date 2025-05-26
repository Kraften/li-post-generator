export interface Section {
  sectionNumber: string;
  title: string;
  isNumberLeft: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  occupation: string;
}

export interface PostStore {
  editedImage: string | null;
  image: string | null;
  mainText: string;
  introText: string;
  isHelpOverlayOpen: boolean;
  updateIsHelpOverlayOpen: (isOpen: boolean) => void;
}

export interface UserStore {
  user: User;
  selectedStep: string;
  updateSelectedStep: (step: string) => void;
  selectedEditSection: string;
  updateSelectedEditSection: (section: string) => void;
}
