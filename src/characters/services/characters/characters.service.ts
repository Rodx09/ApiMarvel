// src/characters/characters.service.ts
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarvelApiService } from 'src/characters/class/MarvelApiService';

@Injectable()
export class CharactersService {
  constructor(private readonly marvelApiService: MarvelApiService) {}

  getCharacters(): Observable<any> {
    return this.marvelApiService.getCharacters().pipe(
      map(characters => ({
        type: 'Success',
        action: 'CONTINUE',
        data: {
          items: characters.length,
          characters: characters,
        },
      })),
    );
  }


}
