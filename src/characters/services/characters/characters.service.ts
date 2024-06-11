import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarvelApiService } from 'src/characters/class/MarvelApiService';

@Injectable()
export class CharactersService {
  constructor(private readonly marvelApiService: MarvelApiService) {}

  getCharacters(limit: number): Observable<any> {
    return this.marvelApiService.getCharacters(limit).pipe(
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

  async getCharacterById(id: string): Promise<any> {
    return await this.marvelApiService.getCharacterById(id).toPromise();
  }


}
