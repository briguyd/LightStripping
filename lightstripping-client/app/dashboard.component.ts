import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from './configuration';
import { ConfigurationService } from './configuration.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})

export class DashboardComponent {
    configurations: Configuration[] = [];

    constructor(
        private router: Router,
        private configurationService: ConfigurationService
    ) { }

    ngOnInit(): void {
        this.configurationService.getConfigurations()
            .then(configurations => this.configurations = configurations.slice(1, 5));
    }

    gotoDetail(configuration: Configuration): void { 
        let link = ['/detail', configuration.id];
        this.router.navigate(link);
    }
}