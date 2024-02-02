import {Interaction, Pact} from "@pact-foundation/pact";
import {BundesligaTableService} from "./bundesliga-table.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Team} from "../models/team.ui.model";
import {HttpClientModule} from "@angular/common/http";
import {integer, like, string, term} from "@pact-foundation/pact/src/dsl/matchers";

const provider = new Pact({
  dir: './pacts',
  consumer: 'BundesligaFrontend',
  provider: 'BundesligaBackend'
});
describe('BundesligaTabelleUIService', () => {
  let service: BundesligaTableService;

  beforeAll(async() => {
    await provider.setup();
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BundesligaTableService);
  });

  afterAll(() => provider.finalize());

  afterEach(() => provider.verify());

  it('should provide bundesliga data', (done) => {
    provider.addInteraction(new Interaction()
      .given('matchday #3 team has won on matchday #1, draw on matchday #2 and loss on day #3')
      .uponReceiving('a request to get the bundesliga standings')
      .withRequest({
        method: 'GET',
        path: '/tabelle/bl1/2023',
        headers: {Accept: 'application/json'}
      })
      .willRespondWith({
        status: 200,
        headers: {'Content-Type': 'application/json'},
        body: [
          {
            "platz": integer(1),
            "team": "anyTeamName",
            "spiele": 3,
            "punkte": 4,
            "tore": integer(3),
            "gegentore": integer(3),
            "tordifferenz": integer(0),
            "siege": 1,
            "unentschieden": 1,
            "niederlagen": 1,
            "letzte5": term({
              generate: 'NUSxx',
              matcher: 'NUS|^NUS[^NUS]{2}'
            })
          },
          {
            "platz": integer(),
            "team": string(),
            "spiele": integer(),
            "punkte": integer(),
            "tore": integer(),
            "gegentore": integer(),
            "tordifferenz": integer(),
            "siege": integer(),
            "unentschieden": integer(),
            "niederlagen": integer(),
            "letzte5": string()
          },
          {
            "platz": integer(),
            "team": string(),
            "spiele": integer(),
            "punkte": integer(),
            "tore": integer(),
            "gegentore": integer(),
            "tordifferenz": integer(),
            "siege": integer(),
            "unentschieden": integer(),
            "niederlagen": integer(),
            "letzte5": string()
          },
          {
            "platz": integer(),
            "team": string(),
            "spiele": integer(),
            "punkte": integer(),
            "tore": integer(),
            "gegentore": integer(),
            "tordifferenz": integer(),
            "siege": integer(),
            "unentschieden": integer(),
            "niederlagen": integer(),
            "letzte5": string()
          },

        ]
      }));
    service.getTableFromServer("bl1", "2023", provider.mockService.baseUrl).subscribe(table => {
      expect(table.length).toBe(4);
      expect(table[0].letzte5).toEqual(['../../assets/niederlage.svg', '../../assets/unentschieden.svg', '../../assets/sieg.svg']);
      done();
    });
  });

});
