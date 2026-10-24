var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Body, Controller, Get, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from '../uploads/uploads.service.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { StylePreferencesDto } from './dto/style-preferences.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';
let ProfileController = class ProfileController {
    profileService;
    uploadsService;
    constructor(profileService, uploadsService) {
        this.profileService = profileService;
        this.uploadsService = uploadsService;
    }
    overview(user) {
        return this.profileService.overview(user.id);
    }
    update(user, dto) {
        return this.profileService.updateProfile(user.id, dto);
    }
    async uploadAvatar(user, file) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        const image = await this.uploadsService.uploadImage(file);
        return this.profileService.updateAvatar(user.id, image.url);
    }
    stylePreferences(user) {
        return this.profileService.getStylePreferences(user.id);
    }
    setStylePreferences(user, dto) {
        return this.profileService.upsertStylePreferences(user.id, dto);
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "overview", null);
__decorate([
    Patch(),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "update", null);
__decorate([
    Post('avatar'),
    UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } })),
    __param(0, CurrentUser()),
    __param(1, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadAvatar", null);
__decorate([
    Get('style-preferences'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "stylePreferences", null);
__decorate([
    Put('style-preferences'),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, StylePreferencesDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "setStylePreferences", null);
ProfileController = __decorate([
    Controller('profile'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [ProfileService,
        UploadsService])
], ProfileController);
export { ProfileController };
//# sourceMappingURL=profile.controller.js.map