// Bump IMAGE_VERSION whenever image files on the server are replaced under the same file name.
// The mobile apps show questions in a WebView whose disk cache keeps images for a long time
// (the image server sends no cache headers); a new query string forces a fresh download.
export const IMAGE_VERSION = "20261116";

export const imageSrc = (resourceUrl: string, img: string) =>
  `${resourceUrl}/${img}?v=${IMAGE_VERSION}`;
