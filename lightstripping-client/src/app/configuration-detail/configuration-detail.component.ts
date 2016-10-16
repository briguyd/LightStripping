import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '../configuration';
import { Location } from '@angular/common';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-configuration-detail',
  templateUrl: './configuration-detail.component.html',
  styleUrls: ['./configuration-detail.component.css'],
  providers: [ConfigurationService]
})

export class ConfigurationDetailComponent implements OnInit {
  @Input() configuration: Configuration;

  constructor(private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.configurationService.get(id).subscribe(
        configuration => this.configuration = configuration);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
