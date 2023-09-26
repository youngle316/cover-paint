import { create } from "zustand";

type CoverType = {
  coverType: string;
  setCoverType: (val: string) => void;
};

type BlogTitle = {
  blogTitle: string;
  setBlogTitle: (val: string) => void;
};

type BlogAuthor = {
  blogAuthor: string;
  setBlogAuthor: (val: string) => void;
};

type BlogAbstract = {
  blogAbstract: string;
  setBlogAbstract: (val: string) => void;
};

type AvatarImage = {
  avatarImage: string | undefined;
  setAvatarImage: (val: string | undefined) => void;
};

type IsEdit = {
  isEdit: boolean;
  setIsEdit: (val: boolean) => void;
};

type SolidColor = {
  solidColor: string;
  setSolidColor: (val: string) => void;
};

type GraphicType = {
  graphicType: string;
  setGraphicType: (val: string) => void;
};

type CoverUpload = {
  coverUpload: string | undefined;
  setCoverUpload: (val: string | undefined) => void;
};

type CoverFont = {
  coverFont: string;
  setCoverFont: (val: string) => void;
};

type CoverInfo = {
  coverInfo: string;
  setCoverInfo: (val: string) => void;
};

const useCoverTypeState = create<CoverType>()((set) => ({
  coverType: "graphic",
  setCoverType: (val: string) => set(() => ({ coverType: val })),
}));

const useBlogTitleState = create<BlogTitle>()((set) => ({
  blogTitle: "",
  setBlogTitle: (val: string) => set(() => ({ blogTitle: val })),
}));

const useBlogAbstractState = create<BlogAbstract>()((set) => ({
  blogAbstract: "",
  setBlogAbstract: (val: string) => set(() => ({ blogAbstract: val })),
}));

const useBlogAuthorState = create<BlogAuthor>()((set) => ({
  blogAuthor: "",
  setBlogAuthor: (val: string) => set(() => ({ blogAuthor: val })),
}));

const useAvatarImageState = create<AvatarImage>()((set) => ({
  avatarImage: undefined,
  setAvatarImage: (val: string | undefined) =>
    set(() => ({ avatarImage: val })),
}));

const useIsEditState = create<IsEdit>()((set) => ({
  isEdit: false,
  setIsEdit: (val: boolean) => set(() => ({ isEdit: val })),
}));

const useSolidColorState = create<SolidColor>()((set) => ({
  solidColor: "#3b82f6",
  setSolidColor: (val: string) => set(() => ({ solidColor: val })),
}));

const useGraphicTypeState = create<GraphicType>()((set) => ({
  graphicType: "unsplash",
  setGraphicType: (val: string) => set(() => ({ graphicType: val })),
}));

const useCoverUploadState = create<CoverUpload>()((set) => ({
  coverUpload: undefined,
  setCoverUpload: (val: string | undefined) =>
    set(() => ({ coverUpload: val })),
}));

const useCoverFontState = create<CoverFont>()((set) => ({
  coverFont: "",
  setCoverFont: (val: string) => set(() => ({ coverFont: val })),
}));

const useCoverInfoState = create<CoverInfo>()((set) => ({
  coverInfo: "",
  setCoverInfo: (val: string) => set(() => ({ coverInfo: val })),
}));

export {
  useCoverTypeState,
  useBlogTitleState,
  useBlogAuthorState,
  useBlogAbstractState,
  useAvatarImageState,
  useIsEditState,
  useSolidColorState,
  useGraphicTypeState,
  useCoverUploadState,
  useCoverFontState,
  useCoverInfoState,
};
