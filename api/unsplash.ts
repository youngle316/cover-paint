import unsplashApi from "@/lib/createUnsplash";

const getPhotos = async (query: string) => {
  return await unsplashApi.search.getPhotos({
    query,
    page: 1,
    perPage: 30,
    orderBy: "editorial",
  });
};

const trackDownload = async (downloadLocation: string) => {
  return await unsplashApi.photos.trackDownload({
    downloadLocation,
  });
};

export { getPhotos, trackDownload };
