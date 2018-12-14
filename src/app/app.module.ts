import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { DetComponent } from './det/det.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { ChangeComponent } from './change/change.component';
import { AuthGuardService } from './auth-guard.service';
import { AnexarDocsComponent } from './anexar-docs/anexar-docs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FormComponent,
    ListComponent,
    DetComponent,
    NavbarComponent,
    ChangeComponent,
    AnexarDocsComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'dash' , component: DashboardComponent, canActivate: [AuthGuardService]},
      {path: 'form' , component: FormComponent, canActivate: [AuthGuardService]},
      {path: 'anexar/:lead' , component: AnexarDocsComponent, canActivate: [AuthGuardService]},
      {path: 'list' , component: ListComponent, canActivate: [AuthGuardService]},
      {path: 'det/:lead' , component: DetComponent, canActivate: [AuthGuardService]},
      {path: 'login' , component: LoginComponent},
      {path: 'change' , component: ChangeComponent, canActivate: [AuthGuardService]},
      {path: '**' , component: DashboardComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
