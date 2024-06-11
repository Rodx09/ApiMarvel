import { Controller, Get, Query, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { CharactersService } from '../services/characters/characters.service';


@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters(@Query('limit') limit: string) {
    const limitNumber = parseInt(limit, 10);

    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El parámetro "limit" debe estar entre 1 y 100.',
        error: 'Bad Request',
      });
    }

    return await this.charactersService.getCharacters(limitNumber);
  }

  @Get(':id')
  async getCharacterById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El parámetro "id" es requerido.',
        error: 'Bad Request',
      });
    }

    const character = await this.charactersService.getCharacterById(id);
    if (!character) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Personaje con id ${id} no encontrado.`,
        error: 'Not Found',
      });
    }

    return character;
  }
}
