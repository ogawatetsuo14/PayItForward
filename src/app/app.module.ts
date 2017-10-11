import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ModalService, CoinService } from './_services/index';
import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './dialog/dialog.component';
import { UsersComponent } from './users/users.component';
import { HistoryComponent } from './history/history.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ModalComponent,
    DialogComponent,
    UsersComponent,
    HistoryComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ModalService,
    CoinService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
