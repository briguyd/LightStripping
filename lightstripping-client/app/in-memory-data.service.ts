import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let configurations = [
      {id: 11, name: 'Test 1'},
      {id: 12, name: 'Test 2'},
      {id: 13, name: 'Test 3'},
      {id: 14, name: 'Test 4'},
      {id: 15, name: 'Test 5'}
    ];
    return {configurations};
  }
}