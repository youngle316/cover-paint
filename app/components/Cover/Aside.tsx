import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import "cropperjs/dist/cropper.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useAvatarImageState,
  useBlogAbstractState,
  useBlogAuthorState,
  useBlogTitleState,
  useCoverTypeState,
} from "@/store/HomePage";

const CoverTypeButton = [
  { label: "graphic", key: "graphic" },
  { label: "solidColor", key: "solid" },
];

function Aside() {
  const t = useTranslations("HomePage");

  const { coverType, setCoverType } = useCoverTypeState();
  const { blogTitle, setBlogTitle } = useBlogTitleState();
  const { blogAuthor, setBlogAuthor } = useBlogAuthorState();
  const { blogAbstract, setBlogAbstract } = useBlogAbstractState();
  const { setAvatarImage } = useAvatarImageState();

  const avatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files as FileList;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const deleteAvatarImage = () => {
    setAvatarImage(undefined);
    const avatarImageId = document.getElementById("avatar") as HTMLInputElement;
    avatarImageId.value = "";
  };

  return (
    <div>
      <div>
        <div className="grid w-full items-center gap-5">
          <div className="flex gap-4">
            {CoverTypeButton.map((item) => {
              return (
                <Button
                  key={item.key}
                  variant={item.key === coverType ? "default" : "outline"}
                  onClick={() => setCoverType(item.key)}
                >
                  {t(item.label)}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="blogTitle">{t("blogTitle")}</Label>
            <Textarea
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              id="blogTitle"
              placeholder={t("blogTitlePlaceholder")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="blogAuthor">{t("blogAuthor")}</Label>
            <Input
              value={blogAuthor}
              onChange={(e) => setBlogAuthor(e.target.value)}
              id="blogAuthor"
              placeholder={t("blogAuthorPlaceholder")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="blogAbstract">{t("blogAbstract")}</Label>
            <Textarea
              value={blogAbstract}
              onChange={(e) => setBlogAbstract(e.target.value)}
              id="blogAbstract"
              placeholder={t("blogAbstractPlaceholder")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="avatar">{t("avatar")}</Label>
            <div className="flex gap-4">
              <Input id="avatar" type="file" onChange={avatarUpload} />
              <Button variant="destructive" onClick={deleteAvatarImage}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aside;
