import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import * as crypto from 'crypto';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MarvelApiService {
  private readonly baseUrl = 'https://gateway.marvel.com:443/v1/public';
  private readonly apiKey = 'b5bcf0ce911b2c47e82d34ea7ca52847'; 
  private readonly privateKey = '905e25f59c5323d9bbf0d5958e50bc16d94f781b'; 

  constructor(private readonly httpService: HttpService) {}

  getCharacters(): Observable<any> {
    const hash = crypto
      .createHash('md5')
      .update(1 + this.privateKey + this.apiKey)
      .digest('hex');

    const url = `${this.baseUrl}/characters?&ts=1&apikey=${this.apiKey}&hash=${hash}`;

    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new HttpException(
            {
              statusCode: response.status,
              message: 'Error al obtener datos de la API de Marvel',
              error: 'Bad Request',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const data = response.data.data.results;
        return data.map(character => ({
          id: character.id,
          nombre: character.name,
          descripcion: character.description,
          image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }));
      }),
    );
  }


}
