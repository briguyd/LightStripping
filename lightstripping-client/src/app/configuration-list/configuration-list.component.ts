import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '../configuration';
import { ConfigurationService } from '../configuration.service';

@Component({
    selector: 'app-configuration-list',
    templateUrl: 'configuration-list.component.html',
    styleUrls: ['configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {

    selectedConfiguration: Configuration;
    configurations: Configuration[];

    constructor(private configurationService: ConfigurationService,
        private router: Router) { }

    ngOnInit() {
        this.getConfigurations();
    }

    getConfigurations(): void {
        this.configurationService.getAll().subscribe(configurations => this.configurations = configurations);
    }

    gotoDetail(): void {
        this.router.navigate(['/configuration', this.selectedConfiguration.id]);
    }

    setActive(): void {
        this.configurationService.setActive(this.selectedConfiguration.id).subscribe(c => c, e => console.log(e),
            () => this.configurationService.changeActive(this.selectedConfiguration));
    }
    onSelect(configuration: Configuration): void {
        this.selectedConfiguration = configuration;
    }
}
