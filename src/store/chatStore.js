import { create } from "zustand";
import { SECTION } from "../constants/constants";

const initialState = {
  selectedState: SECTION.NONE,
  image: null,
  listAnswer: [],
  breadTextList: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quia impedit nihil provident atque eaque quisquam vero hic autem tempora, doloremque veniam, deserunt asperiores tempore? Recusandae animi consequatur laboriosam delectus! Voluptas dolorum quis cupiditate adipisci eaque temporibus, tenetur perspiciatis dolores aliquam, ipsa facere, eius atque non. Totam, ducimus, accusantium nihil at enim porro dicta voluptatum voluptate vel nostrum provident neque modi autem consequuntur consectetur accusamus blanditiis. Debitis, eius iste. Illo necessitatibus voluptates repellat voluptatum consectetur laborum nesciunt, deserunt quasi fugiat sint. Minus adipisci natus in a amet, expedita nihil pariatur eligendi iste repellendus autem alias, deserunt distinctio atque hic dolores fuga dolorem odio ducimus odit molestiae. Sed reprehenderit, dicta incidunt impedit facilis dolor culpa veniam esse aliquid sint earum, autem a vitae magnam consectetur provident excepturi rerum fuga eos asperiores laborum quaerat? Vero recusandae eaque beatae id voluptas quasi eveniet ipsam et suscipit asperiores expedita dolor, fuga eius maxime consequatur eligendi unde temporibus accusantium. Id atque accusamus ullam odit, quibusdam adipisci aperiam animi molestias a error nesciunt, porro quidem aliquid? Aliquid ipsam, amet odit dolorum quos assumenda? Numquam, rerum optio. Illum natus necessitatibus, quo repudiandae obcaecati quae, pariatur tempora et quasi voluptas non, reiciendis voluptatum fugiat enim explicabo quod unde.",
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
