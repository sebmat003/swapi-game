import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameHttpService } from './game-http.service';

const url = 'https://www.swapi.tech/api';

describe('GameHttpService', () => {
  let spectator: SpectatorService<GameHttpService>;
  let service: GameHttpService;
  let http: HttpClient;
  const createService = createServiceFactory({
    service: GameHttpService,
    imports: [HttpClientModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    http = spectator.inject(HttpClient);

    jest.spyOn(http, 'get');
  });

  it('Should get person by requesting GET method to API', () => {
    const id = 1;

    service.getPerson(id).subscribe();

    expect(http.get).toHaveBeenCalledWith(`${url}/people/${id}`);
  });

  it('Should get all people by requesting GET method to API', () => {
    service.getNumberOfPeople().subscribe();

    expect(http.get).toHaveBeenCalledWith(`${url}/people`, {
      params: { page: 0, limit: 0 },
    });
  });
});
