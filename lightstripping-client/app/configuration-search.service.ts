import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Configuration }           from './configuration';
@Injectable()
export class ConfigurationSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Configuration[]> {
    return this.http
               .get(`app/configurations/?name=${term}`)
               .map((r: Response) => r.json().data as Configuration[]);
  }
}