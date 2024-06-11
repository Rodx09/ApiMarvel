// src/characters/characters.controller.ts
import { Controller, Get, Query, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { CharactersService } from '../services/characters/characters.service';


@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters() {
   


    return await this.charactersService.getCharacters();
  }

}
