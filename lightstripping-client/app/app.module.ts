import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { ConfigurationsComponent }      from './configurations.component';
import { ConfigurationDetailComponent }  from './configuration-detail.component';
import { ConfigurationSearchComponent }  from './configuration-search.component';
import { ConfigurationService }          from './configuration.service';
import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',
        component: ConfigurationDetailComponent
      },
      {
        path: 'configurations',
        component: ConfigurationsComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfigurationDetailComponent,
    ConfigurationsComponent,
    ConfigurationSearchComponent
  ],
  providers: [
    ConfigurationService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}