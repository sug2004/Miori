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
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { InspirationService } from './inspiration.service.js';
let InspirationController = class InspirationController {
    inspirationService;
    constructor(inspirationService) {
        this.inspirationService = inspirationService;
    }
    list(style, occasion, search, page, bookmarks, gender) {
        return this.inspirationService.list({ style, occasion, search, page, bookmarks, gender });
    }
    styles() {
        return { styles: this.inspirationService.styles };
    }
    get(id) {
        return this.inspirationService.get(id);
    }
};
__decorate([
    Get(),
    __param(0, Query('style')),
    __param(1, Query('occasion')),
    __param(2, Query('search')),
    __param(3, Query('page')),
    __param(4, Query('bookmarks')),
    __param(5, Query('gender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], InspirationController.prototype, "list", null);
__decorate([
    Get('styles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InspirationController.prototype, "styles", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InspirationController.prototype, "get", null);
InspirationController = __decorate([
    UseGuards(JwtAuthGuard),
    Controller('inspiration'),
    __metadata("design:paramtypes", [InspirationService])
], InspirationController);
export { InspirationController };
//# sourceMappingURL=inspiration.controller.js.map