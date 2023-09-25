import { ChangeEvent, useEffect, useState, useRef } from "react";
import { RotateCw, X } from "lucide-react";
import { toPng } from "html-to-image";
import { useTranslations } from "next-intl";
import getPhotos from "@/api/getPhotos";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "unsplash-js/src/helpers/response";
import { Photos } from "unsplash-js/src/methods/search/types/response";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAvatarImageState,
  useBlogAbstractState,
  useBlogAuthorState,
  useBlogTitleState,
} from "@/store/HomePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Editor() {
  const [data, setPhotosResponse] = useState<ApiResponse<Photos>>();
  const [searchVal, setSearchVal] = useState("dev");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingCover, setEditingCover] = useState("");

  const { blogTitle } = useBlogTitleState();
  const { blogAuthor } = useBlogAuthorState();
  const { blogAbstract } = useBlogAbstractState();
  const { avatarImage } = useAvatarImageState();

  const coverRef = useRef<HTMLDivElement>(null);

  const debouncedValue = useDebounce(searchVal, 1000);

  const t = useTranslations("HomePage");

  useEffect(() => {
    fetchPhotos();
  }, [debouncedValue]);

  const fetchPhotos = () => {
    setIsLoading(true);
    getPhotos(debouncedValue)
      .then((res) => {
        setPhotosResponse(res);
      })
      .catch(() => {
        console.log("something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const editCover = (urls: string) => {
    setEditingCover(urls);
    setIsEdit(true);
  };

  const downloadCover = () => {
    const ref = coverRef?.current as HTMLDivElement;
    if (ref === null) {
      return;
    }

    toPng(ref, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `coverImage.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto flex h-full max-h-[485px] w-[18rem] max-w-2xl flex-col rounded-sm border p-2 md:w-[40rem]">
      <div
        className={`relative z-10 mb-0 mr-0 min-h-0 grow overflow-y-auto overflow-x-hidden ${
          isEdit ? "" : ""
        }`}
      >
        <div className="pb-2">
          {isEdit ? (
            <div
              className="group relative aspect-[16/9] overflow-hidden"
              ref={coverRef}
            >
              {/* shadow */}
              <div className="absolute z-20 mx-auto h-full w-full bg-gradient-to-b from-gray-50/10 to-gray-950/90" />
              <div className="inline-flex h-full w-full justify-center overflow-hidden">
                <div className="relative inline-flex h-full w-full justify-center">
                  <img
                    className="absolute mx-auto h-full w-full object-cover object-center"
                    alt="cover"
                    src={editingCover}
                  />
                </div>
                {/* close button*/}
                <div
                  className="absolute right-4 top-4 z-30 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-slate-100
            bg-white shadow group-hover:flex"
                  onClick={() => setIsEdit(false)}
                >
                  <X className="absolute h-6 w-6 text-black" />
                </div>
              </div>

              {/* title */}
              <span className="absolute bottom-24 left-5 z-30 text-xl text-slate-50">
                {blogTitle}
              </span>
              {/* abstract */}
              <span className="absolute bottom-16 left-5 z-30 text-neutral-400">
                {blogAbstract}
              </span>
              {/* author */}
              <div
                className={`absolute left-5 z-30 flex items-center gap-2 ${
                  avatarImage ? "bottom-4" : "bottom-8"
                }`}
              >
                {avatarImage && (
                  <Avatar>
                    <AvatarImage src={avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}

                <span className="text-neutral-400">{blogAuthor}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2 mt-2 pb-2 pt-2">
                <div className="mx-3">
                  <Input
                    value={searchVal}
                    onChange={searchValChange}
                    placeholder="Search for an image..."
                  />
                </div>
              </div>
              {isLoading && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/50 dark:bg-black/50">
                  <RotateCw className="h-6 w-6 animate-spin" />
                </div>
              )}
              <div className="flex min-h-[400px] flex-wrap content-start bg-white px-3 dark:bg-black">
                {data?.response?.results.map((photo) => {
                  const { urls, user } = photo;
                  return (
                    <div
                      className="w-[50%] p-1 md:w-[25%]"
                      key={photo.id}
                      onClick={() => editCover(urls.regular)}
                    >
                      <div className="cursor-pointer select-none">
                        <div className="h-full w-full">
                          <img
                            className="block h-16 w-full rounded object-cover object-center"
                            src={urls.regular}
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div className="mb-1 mt-[2px] truncate text-xs leading-4 text-neutral-500">
                        by{" "}
                        <a
                          className="inline cursor-pointer select-none text-inherit underline"
                          target="_blank"
                          href={`https://unsplash.com/@${user.username}`}
                        >
                          {user.name}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={downloadCover}>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
