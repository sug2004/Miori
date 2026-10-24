export interface UploadedImage {
    url: string;
    key: string;
    name: string;
    size: number;
}
export interface ImageFile {
    buffer: Buffer;
    originalname?: string;
    mimetype?: string;
    size: number;
}
export declare class UploadsService {
    private readonly utapi;
    uploadImage(file: ImageFile): Promise<UploadedImage>;
}
