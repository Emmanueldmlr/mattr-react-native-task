import { PhotoType } from "@/types/UserType";

export const getPhotosPaths = (photos: PhotoType[]) => {
    return photos.map((photo) => photo.path);
}