import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { ChatService } from './chat.service.js';

type AuthUser = { id: string };

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversation')
  getConversation(@CurrentUser() user: AuthUser) {
    return this.chatService.getOrCreateConversation(user.id);
  }

  @Get('conversation/:id/messages')
  getMessages(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.chatService.getMessages(user.id, id);
  }

  @Post('message')
  sendMessage(@CurrentUser() user: AuthUser, @Body() body: { content: string }) {
    return this.chatService.sendMessage(user.id, body.content);
  }

  @Get('conversations')
  listConversations(@CurrentUser() user: AuthUser) {
    return this.chatService.listConversations(user.id);
  }
}
