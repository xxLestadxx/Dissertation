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
import { enrollInUniversityService } from './enrollInUniversity.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-enrollinuniversity',
  templateUrl: './enrollInUniversity.component.html',
  styleUrls: ['./enrollInUniversity.component.css'],
  providers: [enrollInUniversityService]
})
export class enrollInUniversityComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  uniDiplomaID = new FormControl('', Validators.required);
  mathGrade = new FormControl('', Validators.required);
  englishGrade = new FormControl('', Validators.required);
  csGrade = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  diploma = new FormControl('', Validators.required);
  uni = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceenrollInUniversity: enrollInUniversityService, fb: FormBuilder) {
    this.myForm = fb.group({
      uniDiplomaID: this.uniDiplomaID,
      mathGrade: this.mathGrade,
      englishGrade: this.englishGrade,
      csGrade: this.csGrade,
      owner: this.owner,
      diploma: this.diploma,
      uni: this.uni,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceenrollInUniversity.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.ssidentity.enrollInUniversity',
      'uniDiplomaID': this.uniDiplomaID.value,
      'mathGrade': this.mathGrade.value,
      'englishGrade': this.englishGrade.value,
      'csGrade': this.csGrade.value,
      'owner': this.owner.value,
      'diploma': this.diploma.value,
      'uni': this.uni.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'uniDiplomaID': null,
      'mathGrade': null,
      'englishGrade': null,
      'csGrade': null,
      'owner': null,
      'diploma': null,
      'uni': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceenrollInUniversity.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'uniDiplomaID': null,
        'mathGrade': null,
        'englishGrade': null,
        'csGrade': null,
        'owner': null,
        'diploma': null,
        'uni': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.ssidentity.enrollInUniversity',
      'uniDiplomaID': this.uniDiplomaID.value,
      'mathGrade': this.mathGrade.value,
      'englishGrade': this.englishGrade.value,
      'csGrade': this.csGrade.value,
      'owner': this.owner.value,
      'diploma': this.diploma.value,
      'uni': this.uni.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceenrollInUniversity.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceenrollInUniversity.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceenrollInUniversity.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'uniDiplomaID': null,
        'mathGrade': null,
        'englishGrade': null,
        'csGrade': null,
        'owner': null,
        'diploma': null,
        'uni': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.uniDiplomaID) {
        formObject.uniDiplomaID = result.uniDiplomaID;
      } else {
        formObject.uniDiplomaID = null;
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

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.diploma) {
        formObject.diploma = result.diploma;
      } else {
        formObject.diploma = null;
      }

      if (result.uni) {
        formObject.uni = result.uni;
      } else {
        formObject.uni = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'mathGrade': null,
      'englishGrade': null,
      'csGrade': null,
      'owner': null,
      'diploma': null,
      'uni': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
