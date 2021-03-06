import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Configuration } from './configuration';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfigurationService {

    private actionUrl: string;
    private configsUrl: string;
    private activeConfigUrl: string;
    private headers: Headers;

    private activeChangedSource = new Subject<Configuration>();
    activeChanged$ = this.activeChangedSource.asObservable();

    constructor(private _http: Http) {

        this.actionUrl = 'http://localhost:5000';
        this.configsUrl = '/configs';
        this.activeConfigUrl = '/active';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getAll(): Observable<Configuration[]> {
        return this._http.get(this.actionUrl + this.configsUrl)
            .map((response: Response) => <Configuration[]>response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Configuration> {
        return this._http.get(this.actionUrl + this.configsUrl + '/' + id)
            .map((response: Response) => <Configuration>response.json())
            .catch(this.handleError);
    }

    getActive(): Observable<Configuration> {
        return this._http.get(this.actionUrl + this.activeConfigUrl)
            .map((response: Response) => <Configuration>response.json())
            .catch(this.handleError);
    }

    setActive(id: number): Observable<Configuration> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.actionUrl + this.activeConfigUrl, JSON.stringify({ "id": id }), options)
            .map((response: Response) => <Configuration>response.json())
            .catch(this.handleError);
    }

    add(configuration: Configuration): Observable<Configuration> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.actionUrl + this.configsUrl, JSON.stringify(configuration), options)
            .map((response: Response) => <Configuration>response.json())
            .catch(this.handleError);
    }
    
    changeActive(activeConfiguration: Configuration) {
        this.activeChangedSource.next(activeConfiguration);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
