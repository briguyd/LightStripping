import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Configuration } from './configuration';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfigurationService]
})
export class AppComponent implements OnInit {
  title = 'LightStripping';
  configuration: Configuration;

  constructor(private configurationService: ConfigurationService, private router: Router) {

  }

  ngOnInit() {
    this.configurationService.getActive().subscribe(
      configuration => this.configuration = configuration);
  }

  gotoDetail(): void {
    this.router.navigate(['/configuration', this.configuration.id]);
  }
}
