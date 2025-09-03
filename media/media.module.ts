
import { MediaController } from './media.controller'
;import { Module } from '@nestjs/common';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService], // importante para usar no UsersService
})
export class MediaModule {}
