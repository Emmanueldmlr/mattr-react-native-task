import { PhotoType } from "@/types/UserType";

export const getPhotosPath = (photos: PhotoType[]) => {
    return photos.map((photo) => photo.path);
}