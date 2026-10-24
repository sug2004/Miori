import { BadRequestException, Injectable } from '@nestjs/common';
import { UTApi, UTFile } from 'uploadthing/server';

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

@Injectable()
export class UploadsService {
  private readonly utapi = new UTApi();

  async uploadImage(file: ImageFile): Promise<UploadedImage> {
    if (!file) {
      throw new BadRequestException('A file is required');
    }
    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('Image must be 5MB or smaller');
    }

    const name = file.originalname?.trim() || 'avatar.jpg';
    const utFile = new UTFile([file.buffer as unknown as BlobPart], name, {
      type: file.mimetype,
    });

    try {
      const uploaded = await this.utapi.uploadFiles(utFile);
      if (uploaded.error) {
        throw new BadRequestException('Image upload failed');
      }
      return {
        url: uploaded.data.ufsUrl,
        key: uploaded.data.key,
        name: uploaded.data.name,
        size: uploaded.data.size,
      };
    } catch {
      throw new BadRequestException('Image upload failed');
    }
  }
}