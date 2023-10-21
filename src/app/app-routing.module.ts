import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {QuestionnaireComponent} from "./pages/questionnaire/questionnaire.component";
import {DoctorComponent} from "./pages/doctor/doctor.component";
import {DoctorGuard} from "./guards/doctor-guard";
import {ConnectedGuard} from "./guards/connected-guard";
import {DisconnectedGuard} from "./guards/disconnected-guard";
import {PatientGuard} from "./guards/patient-guard";
import { DiagComponent } from "./pages/doctor/diag/diag.component";
import {MyinfosComponent} from "./pages/myinfos/myinfos.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [ConnectedGuard,DoctorGuard]
    
  },
  {
    path: 'doctor/diag',
    component: DiagComponent,
    canActivate: [ConnectedGuard,DoctorGuard]
    
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    canActivate: [ConnectedGuard, PatientGuard]
  },
  {
    path: 'myinfos',
    component: MyinfosComponent,
    canActivate: [ConnectedGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
