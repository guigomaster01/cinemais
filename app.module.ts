import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MediaModule, UsersModule],
})
export class AppModule {}
