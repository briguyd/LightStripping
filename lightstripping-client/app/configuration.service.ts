import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
  private configurationsUrl = 'app/configurations';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getConfigurations(): Promise<Configuration[]> {
    return this.http.get(this.configurationsUrl)
      .toPromise()
      .then(response => response.json().data as Configuration[])
      .catch(this.handleError);
  }

  getConfiguration(id: number): Promise<Configuration> {
    return this.getConfigurations().then(configurations => configurations.find(configuration => configuration.id === id));
  }

  create(name: string): Promise<Configuration> {
    return this.http
      .post(this.configurationsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError)
  }

  delete(id: number): Promise<void> {
    const url = `${this.configurationUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(configuration: Configuration): Promise<Configuration> {
    const url = `${this.configurationsUrl}/${configuration.id}`;
    return this.http
      .put(url, JSON.stringify(configuration), { headers: this.headers })
      .toPromise()
      .then(() => configuration)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}