var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { UploadsModule } from '../uploads/uploads.module.js';
import { WardrobeController } from './wardrobe.controller.js';
import { WardrobeService } from './wardrobe.service.js';
let WardrobeModule = class WardrobeModule {
};
WardrobeModule = __decorate([
    Module({
        imports: [AuthModule, UploadsModule, AiModule],
        controllers: [WardrobeController],
        providers: [WardrobeService],
    })
], WardrobeModule);
export { WardrobeModule };
//# sourceMappingURL=wardrobe.module.js.map