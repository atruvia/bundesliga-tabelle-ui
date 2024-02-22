import {Interaction, Pact} from "@pact-foundation/pact";
import {BundesligaTableService} from "./bundesliga-table.service";
import {TestBed} from "@angular/core/testing";
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
            "platz": integer(12),
            "team": "any team name",
            "spiele": integer(23),
            "punkte": integer(34),
            "tore": integer(45),
            "gegentore": integer(56),
            "tordifferenz": integer(67),
            "siege": integer(78),
            "unentschieden": integer(89),
            "niederlagen": integer(90),
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
      expect(table[0].platz).toEqual(12);
      expect(table[0].team).toEqual("any team name");
      expect(table[0].spiele).toEqual(23);
      expect(table[0].punkte).toEqual(34);
      expect(table[0].tore).toEqual(45);
      expect(table[0].gegentore).toEqual(56);
      expect(table[0].tordifferenz).toEqual(67);
      expect(table[0].siege).toEqual(78);
      expect(table[0].unentschieden).toEqual(89);
      expect(table[0].niederlagen).toEqual(90);
      expect(table[0].letzte5).toEqual(['../../assets/niederlage.svg', '../../assets/unentschieden.svg', '../../assets/sieg.svg', '../../assets/nicht-gespielt.svg', '../../assets/nicht-gespielt.svg']);
      done();
    });
  });

});
