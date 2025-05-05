const images = require.context(`/public/assets/images`, true);
export const video = require.context(`/public/assets/video`, true);

export const dynamicImage = (image: string | undefined) => {
    return images(`./${image}`);
};
export const dynamicVideo = (video: any | undefined) => {
    return video(`./${video}`);
};