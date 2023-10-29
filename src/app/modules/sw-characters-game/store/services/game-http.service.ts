import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Person } from '../../models/person.models';
import { SwapiPagedResponse, SwapiResponse } from '../../models/swapi.models';
import { HttpClient } from '@angular/common/http';
import { objectKeysToCamelCase } from '../../../../shared/functions/object-keys-to-camel-case/object-keys-to-camel-case.function';

@Injectable()
export class GameHttpService {
  private swapiURL = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  getPerson(number: number): Observable<SwapiResponse<Person>> {
    return this.http
      .get<SwapiResponse<Person>>(`${this.swapiURL}/people/${number}`)
      .pipe(map((res) => objectKeysToCamelCase(res)));
  }

  getNumberOfPeople(): Observable<number> {
    return this.http
      .get<SwapiPagedResponse<any>>(`${this.swapiURL}/people`, {
        params: { page: 0, limit: 0 },
      })
      .pipe(
        map((res) => objectKeysToCamelCase(res)),
        map((res: SwapiPagedResponse<any>) => +res.totalRecords),
      );
  }
}
