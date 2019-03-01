import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ssidentity{
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export enum Gender {
      Male,
      Female,
      Others,
   }
   export class Person extends Participant {
      personID: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      gender: Gender;
      age: number;
      address: Address;
   }
   export class HighSchool extends Participant {
      highSchoolID: string;
      highschoolName: string;
      email: string;
      phone: string;
      rating: number;
      address: Address;
   }
   export class DrivingSchool extends Participant {
      drivingSchoolID: string;
      drivingSchoolName: string;
      rating: number;
      address: Address;
   }
   export class University extends Participant {
      universityID: string;
      universityName: string;
      email: string;
      phone: string;
      rating: number;
      address: Address;
   }
   export class Diploma extends Asset {
      diplomaID: string;
      mathGrade: number;
      englishGrade: number;
      csGrade: number;
      hs: HighSchool;
      person: Person;
   }
   export class DrivingLicence extends Asset {
      drivingLicenceID: string;
      person: Person;
      ds: DrivingSchool;
      diplomaStatus: DiplomaStatus;
   }
   export class UniversityDiploma extends Asset {
      uniDiplomaID: string;
      finalGrade: number;
      status: enrollStatus;
      person: Person;
      uni: University;
   }
   export enum enrollStatus {
      Enrolled,
      Graduated,
      Left,
   }
   export enum DiplomaStatus {
      Pending,
      Confirmed,
      Declined,
   }
   export class createDiploma extends Transaction {
      diplomaID: string;
      mathGrade: number;
      englishGrade: number;
      csGrade: number;
      hs: HighSchool;
      person: Person;
   }
   export class createDrivingLicence extends Transaction {
      drivingLicenceID: string;
      person: Person;
      diploma: Diploma;
      ds: DrivingSchool;
   }
   export class enrollInUniversity extends Transaction {
      uniDiplomaID: string;
      mathGrade: number;
      englishGrade: number;
      csGrade: number;
      person: Person;
      diploma: Diploma;
      uni: University;
   }
   export class graduateUni extends Transaction {
      uni: University;
      uniDiploma: UniversityDiploma;
      person: Person;
   }
// }
