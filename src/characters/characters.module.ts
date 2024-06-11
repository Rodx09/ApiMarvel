import { Module } from '@nestjs/common';
import { CharactersService } from './services/characters/characters.service';
import { CharactersController } from './controllers/characters.controller';

@Module({
  providers: [CharactersService],
  controllers: [CharactersController]
})
export class CharactersModule {}
