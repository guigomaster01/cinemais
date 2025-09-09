import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('users/:userId/favorites')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addFavorite(@Param('userId') userId: string, @Body() dto: AddFavoriteDto) {
    this.usersService.addFavorite(userId, dto.mediaId);
    return { status: 'ok' };
  }

  @Get()
  listFavorites(@Param('userId') userId: string) {
    return this.usersService.listFavorites(userId);
  }

  @Delete(':mediaId')
  removeFavorite(@Param('userId') userId: string, @Param('mediaId') mediaId: string) {
    this.usersService.removeFavorite(userId, mediaId);
    return { status: 'ok' };
  }
}
