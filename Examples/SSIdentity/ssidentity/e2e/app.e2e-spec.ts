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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for ssidentity', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be ssidentity', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('ssidentity');
    })
  });

  it('network-name should be ssidentity@0.0.2-deploy.51',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('ssidentity@0.0.2-deploy.51.bna');
    });
  });

  it('navbar-brand should be ssidentity',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('ssidentity');
    });
  });

  
    it('Diploma component should be loadable',() => {
      page.navigateTo('/Diploma');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Diploma');
      });
    });

    it('Diploma table should have 7 columns',() => {
      page.navigateTo('/Diploma');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('DrivingLicence component should be loadable',() => {
      page.navigateTo('/DrivingLicence');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DrivingLicence');
      });
    });

    it('DrivingLicence table should have 5 columns',() => {
      page.navigateTo('/DrivingLicence');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('UniversityDiploma component should be loadable',() => {
      page.navigateTo('/UniversityDiploma');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UniversityDiploma');
      });
    });

    it('UniversityDiploma table should have 6 columns',() => {
      page.navigateTo('/UniversityDiploma');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Person component should be loadable',() => {
      page.navigateTo('/Person');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Person');
      });
    });

    it('Person table should have 8 columns',() => {
      page.navigateTo('/Person');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('HighSchool component should be loadable',() => {
      page.navigateTo('/HighSchool');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HighSchool');
      });
    });

    it('HighSchool table should have 6 columns',() => {
      page.navigateTo('/HighSchool');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('DrivingSchool component should be loadable',() => {
      page.navigateTo('/DrivingSchool');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DrivingSchool');
      });
    });

    it('DrivingSchool table should have 4 columns',() => {
      page.navigateTo('/DrivingSchool');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('University component should be loadable',() => {
      page.navigateTo('/University');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('University');
      });
    });

    it('University table should have 6 columns',() => {
      page.navigateTo('/University');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('createDiploma component should be loadable',() => {
      page.navigateTo('/createDiploma');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createDiploma');
      });
    });
  
    it('createDrivingLicence component should be loadable',() => {
      page.navigateTo('/createDrivingLicence');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createDrivingLicence');
      });
    });
  
    it('enrollInUniversity component should be loadable',() => {
      page.navigateTo('/enrollInUniversity');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('enrollInUniversity');
      });
    });
  
    it('graduateUni component should be loadable',() => {
      page.navigateTo('/graduateUni');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('graduateUni');
      });
    });
  
    it('queryDiplomas component should be loadable',() => {
      page.navigateTo('/queryDiplomas');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('queryDiplomas');
      });
    });
  

});