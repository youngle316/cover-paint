import { ChangeEvent, useEffect, useState, useRef } from "react";
import { RotateCw, X } from "lucide-react";
import { toPng } from "html-to-image";
import { useTranslations } from "next-intl";
import Chrome from "@uiw/react-color-chrome";
import { Palette } from "lucide-react";
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
  useCoverFontState,
  useCoverInfoState,
  useCoverTypeState,
  useCoverUploadState,
  useGraphicTypeState,
  useIsEditState,
  useSolidColorState,
} from "@/store/HomePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FontSelector from "@/app/components/FontSelector";

function Editor() {
  const [data, setPhotosResponse] = useState<ApiResponse<Photos>>();
  const [searchVal, setSearchVal] = useState("dev");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCover, setEditingCover] = useState("");

  const { blogTitle } = useBlogTitleState();
  const { blogAuthor } = useBlogAuthorState();
  const { blogAbstract } = useBlogAbstractState();
  const { avatarImage } = useAvatarImageState();
  const { coverType } = useCoverTypeState();
  const { isEdit, setIsEdit } = useIsEditState();
  const { solidColor, setSolidColor } = useSolidColorState();
  const { graphicType, setGraphicType } = useGraphicTypeState();
  const { coverUpload, setCoverUpload } = useCoverUploadState();
  const { coverFont } = useCoverFontState();
  const { coverInfo, setCoverInfo } = useCoverInfoState();

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

  const editCover = (urls: string, username: string) => {
    setEditingCover(urls);
    setIsEdit(true);
    setCoverInfo(username);
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

  const changeCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files as FileList;
    const reader = new FileReader();
    reader.onload = () => {
      setCoverUpload(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
    setIsEdit(true);
  };

  const closeEditCover = () => {
    setIsEdit(false);
  };

  return (
    <div className="mx-auto flex h-full max-h-[485px] max-w-2xl flex-col rounded-sm border p-2 md:w-[40rem]">
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
              {coverType === "graphic" && (
                <div className="absolute z-20 mx-auto h-full w-full bg-gradient-to-b from-gray-50/10 to-gray-950/90" />
              )}

              <div className="inline-flex h-full w-full justify-center overflow-hidden">
                <div className="relative inline-flex h-full w-full justify-center">
                  {coverType === "graphic" ? (
                    <>
                      <img
                        className="absolute mx-auto h-full w-full object-cover object-center"
                        alt="cover"
                        src={
                          graphicType === "unsplash"
                            ? editingCover
                            : coverUpload
                        }
                      />
                      {/* close button*/}
                      <div
                        className="absolute right-4 top-4 z-40 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-slate-100
            bg-white shadow group-hover:flex"
                        onClick={closeEditCover}
                      >
                        <X className="absolute h-6 w-6 text-black" />
                      </div>
                    </>
                  ) : (
                    <div
                      className="absolute mx-auto h-full w-full"
                      style={{ backgroundColor: solidColor }}
                    />
                  )}
                </div>
              </div>

              <div
                className={`absolute left-0 top-0 z-30 h-full w-full text-neutral-400 ${coverFont}`}
              >
                <div className="flex h-full w-full flex-col-reverse gap-1 p-1 md:gap-2 md:p-2">
                  {/* author */}
                  {(blogAuthor || avatarImage) && (
                    <div className="flex items-center gap-1 text-xs md:gap-2 md:text-lg">
                      {avatarImage && (
                        <Avatar className="h-5 w-5 md:h-10 md:w-10">
                          <AvatarImage src={avatarImage} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      )}
                      <span>{blogAuthor}</span>
                    </div>
                  )}

                  {/* abstract */}
                  {blogAbstract && (
                    <div className="text-xs md:text-lg">{blogAbstract}</div>
                  )}

                  {/* title */}
                  {blogTitle && (
                    <div className="text-sm text-slate-50 md:text-xl">
                      {blogTitle}
                    </div>
                  )}

                  {/* username */}
                  {coverInfo && (
                    <div className="absolute bottom-2 right-2 z-30 hidden text-xs text-neutral-400/60 group-hover:flex">
                      by {coverInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="unsplash" value={graphicType}>
                <TabsList>
                  <TabsTrigger
                    onClick={() => setGraphicType("upload")}
                    value="upload"
                  >
                    {t("upload")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setGraphicType("unsplash")}
                    value="unsplash"
                  >
                    Unsplash
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <div className="flex flex-col gap-2">
                    <Input
                      id="uploadCover"
                      type="file"
                      onChange={changeCoverUpload}
                    />
                    <div className="flex justify-center text-sm text-neutral-400">
                      {t("uploadDes")}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="unsplash">
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
                            onClick={() => editCover(urls.regular, user.name)}
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
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
        {/* config */}
        <div className="flex items-center justify-center gap-4">
          {/* common config */}
          {isEdit && <FontSelector />}

          {/* solid color config*/}
          {coverType === "solid" && isEdit && (
            <div>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" className="flex gap-2">
                    <Palette
                      className="h-4 w-4"
                      style={{ color: solidColor }}
                    />
                    {solidColor}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Chrome
                    color={solidColor}
                    onChange={(color) => {
                      setSolidColor(color.hexa);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        {isEdit && (
          <div className="mt-4 flex justify-center">
            <Button onClick={downloadCover}>{t("download")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
