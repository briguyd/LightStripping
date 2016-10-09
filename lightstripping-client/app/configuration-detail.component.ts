import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigurationService } from './configuration.service';
import { Configuration } from './configuration';

@Component({
  moduleId: module.id,
  selector: 'my-configuration-detail',
  templateUrl: 'configuration-detail.component.html',
  styleUrls: ['configuration-detail.component.css']
})

export class ConfigurationDetailComponent implements OnInit {
  @Input() configuration: Configuration;

  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.configurationService.getConfiguration(id)
        .then(configuration => this.configuration = configuration);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.configurationService.update(this.configuration)
      .then(() => this.goBack());
  }
}