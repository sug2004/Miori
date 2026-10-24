var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { UTApi, UTFile } from 'uploadthing/server';
let UploadsService = class UploadsService {
    utapi = new UTApi();
    async uploadImage(file) {
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
        const utFile = new UTFile([file.buffer], name, {
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
        }
        catch {
            throw new BadRequestException('Image upload failed');
        }
    }
};
UploadsService = __decorate([
    Injectable()
], UploadsService);
export { UploadsService };
//# sourceMappingURL=uploads.service.js.map