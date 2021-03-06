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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HighSchoolService } from './HighSchool.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-highschool',
  templateUrl: './HighSchool.component.html',
  styleUrls: ['./HighSchool.component.css'],
  providers: [HighSchoolService]
})
export class HighSchoolComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  highSchoolID = new FormControl('', Validators.required);
  highschoolName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);


  constructor(public serviceHighSchool: HighSchoolService, fb: FormBuilder) {
    this.myForm = fb.group({
      highSchoolID: this.highSchoolID,
      highschoolName: this.highschoolName,
      email: this.email,
      phone: this.phone,
      rating: this.rating
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHighSchool.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.ssidentity.HighSchool',
      'highSchoolID': this.highSchoolID.value,
      'highschoolName': this.highschoolName.value,
      'email': this.email.value,
      'phone': this.phone.value,
      'rating': this.rating.value
    };

    this.myForm.setValue({
      'highSchoolID': null,
      'highschoolName': null,
      'email': null,
      'phone': null,
      'rating': null
    });

    return this.serviceHighSchool.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'highSchoolID': null,
        'highschoolName': null,
        'email': null,
        'phone': null,
        'rating': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.ssidentity.HighSchool',
      'highschoolName': this.highschoolName.value,
      'email': this.email.value,
      'phone': this.phone.value,
      'rating': this.rating.value
    };

    return this.serviceHighSchool.updateParticipant(form.get('highSchoolID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceHighSchool.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceHighSchool.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'highSchoolID': null,
        'highschoolName': null,
        'email': null,
        'phone': null,
        'rating': null
      };

      if (result.highSchoolID) {
        formObject.highSchoolID = result.highSchoolID;
      } else {
        formObject.highSchoolID = null;
      }

      if (result.highschoolName) {
        formObject.highschoolName = result.highschoolName;
      } else {
        formObject.highschoolName = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.phone) {
        formObject.phone = result.phone;
      } else {
        formObject.phone = null;
      }

      if (result.rating) {
        formObject.rating = result.rating;
      } else {
        formObject.rating = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'highSchoolID': null,
      'highschoolName': null,
      'email': null,
      'phone': null,
      'rating': null
    });
  }
}
