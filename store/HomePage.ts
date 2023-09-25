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

export {
  useCoverTypeState,
  useBlogTitleState,
  useBlogAuthorState,
  useBlogAbstractState,
  useAvatarImageState,
};
