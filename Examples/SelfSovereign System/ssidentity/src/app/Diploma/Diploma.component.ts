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
import { DiplomaService } from './Diploma.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-diploma',
  templateUrl: './Diploma.component.html',
  styleUrls: ['./Diploma.component.css'],
  providers: [DiplomaService]
})
export class DiplomaComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  diplomaID = new FormControl('', Validators.required);
  mathGrade = new FormControl('', Validators.required);
  englishGrade = new FormControl('', Validators.required);
  csGrade = new FormControl('', Validators.required);
  hs = new FormControl('', Validators.required);
  person = new FormControl('', Validators.required);

  constructor(public serviceDiploma: DiplomaService, fb: FormBuilder) {
    this.myForm = fb.group({
      diplomaID: this.diplomaID,
      mathGrade: this.mathGrade,
      englishGrade: this.englishGrade,
      csGrade: this.csGrade,
      hs: this.hs,
      person: this.person
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDiploma.getAll()
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
      $class: 'org.ssidentity.Diploma',
      'diplomaID': this.diplomaID.value,
      'mathGrade': this.mathGrade.value,
      'englishGrade': this.englishGrade.value,
      'csGrade': this.csGrade.value,
      'hs': this.hs.value,
      'person': this.person.value
    };

    this.myForm.setValue({
      'diplomaID': null,
      'mathGrade': null,
      'englishGrade': null,
      'csGrade': null,
      'hs': null,
      'person': null
    });

    return this.serviceDiploma.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'diplomaID': null,
        'mathGrade': null,
        'englishGrade': null,
        'csGrade': null,
        'hs': null,
        'person': null
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
      $class: 'org.ssidentity.Diploma',
      'mathGrade': this.mathGrade.value,
      'englishGrade': this.englishGrade.value,
      'csGrade': this.csGrade.value,
      'hs': this.hs.value,
      'person': this.person.value
    };

    return this.serviceDiploma.updateAsset(form.get('diplomaID').value, this.asset)
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

    return this.serviceDiploma.deleteAsset(this.currentId)
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

    return this.serviceDiploma.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'diplomaID': null,
        'mathGrade': null,
        'englishGrade': null,
        'csGrade': null,
        'hs': null,
        'person': null
      };

      if (result.diplomaID) {
        formObject.diplomaID = result.diplomaID;
      } else {
        formObject.diplomaID = null;
      }

      if (result.mathGrade) {
        formObject.mathGrade = result.mathGrade;
      } else {
        formObject.mathGrade = null;
      }

      if (result.englishGrade) {
        formObject.englishGrade = result.englishGrade;
      } else {
        formObject.englishGrade = null;
      }

      if (result.csGrade) {
        formObject.csGrade = result.csGrade;
      } else {
        formObject.csGrade = null;
      }

      if (result.hs) {
        formObject.hs = result.hs;
      } else {
        formObject.hs = null;
      }

      if (result.person) {
        formObject.person = result.person;
      } else {
        formObject.person = null;
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
      'diplomaID': null,
      'mathGrade': null,
      'englishGrade': null,
      'csGrade': null,
      'hs': null,
      'person': null
      });
  }

}
