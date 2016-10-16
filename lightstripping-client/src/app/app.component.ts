import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Configuration } from './configuration';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LightStripping';
  configuration: Configuration;
  subscription: Subscription;

  constructor(private configurationService: ConfigurationService, private router: Router) {

  }

  ngOnInit() {
    this.configurationService.getActive().subscribe(
      configuration => this.configuration = configuration,
      e => console.log(e),
      () => {this.configurationService.changeActive(this.configuration)});

    this.subscription = this.configurationService.activeChanged$.subscribe(
      configuration => {
        this.configuration = configuration;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  gotoDetail(): void {
    this.router.navigate(['/configuration', this.configuration.id]);
  }
}
