import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from './configuration';
import { ConfigurationService } from './configuration.service';

@Component({
  moduleId: module.id,
  selector: 'my-configurations',
  templateUrl: `configurations.component.html`,
  styleUrls: [`configurations.component.css`],
  providers: [ConfigurationService]
})

export class ConfigurationsComponent implements OnInit {



  selectedConfiguration: Configuration;
  configurations: Configuration[];

  constructor(
    private configurationService: ConfigurationService,
    private router: Router
  ) { }

  add(name: string ): void {
    name = name.trim();
    if (!name) { return; }
    this.configurationService.create(name)
      .then(configuration => {
        this.configurations.push(configuration);
        this.selectedConfiguration = null;
      })
  }

  delete(configuration: Configuration): void {
    this.configurationService
      .delete(configuration.id)
      .then(() => {
        this.configurations = this.configurations.filter(h => h !== configuration);
        if (this.selectedConfiguration === configuration) {this.selectedConfiguration = null}
      });
  }

  onSelect(configuration: Configuration): void {
    this.selectedConfiguration = configuration;
  }

  getConfigurations(): void {
    this.configurationService.getConfigurations().then(configurations => this.configurations = configurations);
  }

  ngOnInit(): void {
    this.getConfigurations();
  }

  gotoDetail(configuration: Configuration): void {
    this.router.navigate(['/detail', this.selectedConfiguration.id]);
  }
}