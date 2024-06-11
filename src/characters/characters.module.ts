
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CharactersController } from './controllers/characters.controller';
import { MarvelApiService } from './class/MarvelApiService';
import { CharactersService } from './services/characters/characters.service';

@Module({
  imports: [HttpModule],
  controllers: [CharactersController],
  providers: [CharactersService, MarvelApiService],
})
export class CharactersModule {}
