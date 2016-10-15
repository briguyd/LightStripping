import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {

        this.actionUrl = 'http://localhost:5000/configs';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getAll(): Observable<Configuration[]> {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Configuration[]>response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Configuration> {
        return this._http.get(this.actionUrl + '/' + id)
            .map((response: Response) => <Configuration>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
