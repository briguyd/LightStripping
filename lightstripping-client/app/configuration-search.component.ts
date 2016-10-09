import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { ConfigurationSearchService } from './configuration-search.service';
import { Configuration } from './configuration';
@Component({
  moduleId: module.id,
  selector: 'configuration-search',
  templateUrl: 'configuration-search.component.html',
  styleUrls: [ 'configuration-search.component.css' ],
  providers: [ConfigurationSearchService]
})
export class ConfigurationSearchComponent implements OnInit {
  configurations: Observable<Configuration[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private configurationSearchService: ConfigurationSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.configurations = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.configurationSearchService.search(term)
        // or the observable of empty configs if no search term
        : Observable.of<Configuration[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Configuration[]>([]);
      });
  }
  gotoDetail(configuration: Configuration): void {
    let link = ['/detail', configuration.id];
    this.router.navigate(link);
  }
}