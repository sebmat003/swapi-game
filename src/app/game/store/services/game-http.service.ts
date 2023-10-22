import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BasicPersonProperties, Person } from "../../game/person.models";
import { SwapiPagedResponse, SwapiResponse } from "../../game/swapi.models";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GameHttpService {
  private swapiURL = 'https://www.swapi.tech/api/';

  constructor(private http: HttpClient) {
  }

  getPerson(number: number): Observable<SwapiResponse<Person>> {
    return this.http.get<SwapiResponse<Person>>(`${this.swapiURL}/people/${number}`);
  }

  getAllPeople(page = 0, limit = 100): Observable<SwapiPagedResponse<BasicPersonProperties>> {
    return this.http.get<SwapiPagedResponse<BasicPersonProperties>>(`${this.swapiURL}/people/`, { params: { page, limit }});
  }
}
