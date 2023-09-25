import { createApi } from "unsplash-js";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID as string;

const unsplashApi = createApi({
  accessKey,
});

export default unsplashApi;
