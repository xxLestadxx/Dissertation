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
import { UniversityDiplomaService } from './UniversityDiploma.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-universitydiploma',
  templateUrl: './UniversityDiploma.component.html',
  styleUrls: ['./UniversityDiploma.component.css'],
  providers: [UniversityDiplomaService]
})
export class UniversityDiplomaComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  uniDiplomaID = new FormControl('', Validators.required);
  finalGrade = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  person = new FormControl('', Validators.required);
  uni = new FormControl('', Validators.required);

  constructor(public serviceUniversityDiploma: UniversityDiplomaService, fb: FormBuilder) {
    this.myForm = fb.group({
      uniDiplomaID: this.uniDiplomaID,
      finalGrade: this.finalGrade,
      status: this.status,
      person: this.person,
      uni: this.uni
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUniversityDiploma.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.ssidentity.UniversityDiploma',
      'uniDiplomaID': this.uniDiplomaID.value,
      'finalGrade': this.finalGrade.value,
      'status': this.status.value,
      'person': this.person.value,
      'uni': this.uni.value
    };

    this.myForm.setValue({
      'uniDiplomaID': null,
      'finalGrade': null,
      'status': null,
      'person': null,
      'uni': null
    });

    return this.serviceUniversityDiploma.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'uniDiplomaID': null,
        'finalGrade': null,
        'status': null,
        'person': null,
        'uni': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.ssidentity.UniversityDiploma',
      'finalGrade': this.finalGrade.value,
      'status': this.status.value,
      'person': this.person.value,
      'uni': this.uni.value
    };

    return this.serviceUniversityDiploma.updateAsset(form.get('uniDiplomaID').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceUniversityDiploma.deleteAsset(this.currentId)
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

    return this.serviceUniversityDiploma.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'uniDiplomaID': null,
        'finalGrade': null,
        'status': null,
        'person': null,
        'uni': null
      };

      if (result.uniDiplomaID) {
        formObject.uniDiplomaID = result.uniDiplomaID;
      } else {
        formObject.uniDiplomaID = null;
      }

      if (result.finalGrade) {
        formObject.finalGrade = result.finalGrade;
      } else {
        formObject.finalGrade = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.person) {
        formObject.person = result.person;
      } else {
        formObject.person = null;
      }

      if (result.uni) {
        formObject.uni = result.uni;
      } else {
        formObject.uni = null;
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
      'uniDiplomaID': null,
      'finalGrade': null,
      'status': null,
      'person': null,
      'uni': null
      });
  }

}
