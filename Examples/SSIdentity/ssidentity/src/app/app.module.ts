/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { DiplomaComponent } from './Diploma/Diploma.component';
import { DrivingLicenceComponent } from './DrivingLicence/DrivingLicence.component';
import { UniversityDiplomaComponent } from './UniversityDiploma/UniversityDiploma.component';

import { PersonComponent } from './Person/Person.component';
import { HighSchoolComponent } from './HighSchool/HighSchool.component';
import { DrivingSchoolComponent } from './DrivingSchool/DrivingSchool.component';
import { UniversityComponent } from './University/University.component';

import { createDiplomaComponent } from './createDiploma/createDiploma.component';
import { createDrivingLicenceComponent } from './createDrivingLicence/createDrivingLicence.component';
import { enrollInUniversityComponent } from './enrollInUniversity/enrollInUniversity.component';
import { graduateUniComponent } from './graduateUni/graduateUni.component';
import { queryDiplomasComponent } from './queryDiplomas/queryDiplomas.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiplomaComponent,
    DrivingLicenceComponent,
    UniversityDiplomaComponent,
    PersonComponent,
    HighSchoolComponent,
    DrivingSchoolComponent,
    UniversityComponent,
    createDiplomaComponent,
    createDrivingLicenceComponent,
    enrollInUniversityComponent,
    graduateUniComponent,
    queryDiplomasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
