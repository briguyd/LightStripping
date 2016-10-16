import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ConfigurationService } from './configuration.service';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationDetailComponent } from './configuration-detail/configuration-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationDetailComponent,
    ConfigurationListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/configuration-list',
        pathMatch: 'full'
      },
      {
        path: 'configuration-list',
        component: ConfigurationListComponent
      },
      {
        path: 'configuration/:id',
        component: ConfigurationDetailComponent
      }
    ])
  ],
  providers: [
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
