import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ssidentity{
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
   }
   export class HighSchool extends Participant {
      highSchoolID: string;
      highschoolName: string;
      email: string;
      phone: string;
      rating: number;
   }
   export class DrivingSchool extends Participant {
      drivingSchoolID: string;
      drivingSchoolName: string;
      rating: number;
   }
   export class University extends Participant {
      universityID: string;
      universityName: string;
      email: string;
      phone: string;
      rating: number;
   }
   export class Diploma extends Asset {
      diplomaID: string;
      mathGrade: number;
      englishGrade: number;
      csGrade: number;
      hs: HighSchool;
      owner: Person;
   }
   export class DrivingLicence extends Asset {
      drivingLicenceID: string;
      owner: Person;
      ds: DrivingSchool;
      diplomaStatus: DiplomaStatus;
   }
   export class UniversityDiploma extends Asset {
      uniDiplomaID: string;
      finalGrade: number;
      status: enrollStatus;
      owner: Person;
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
      owner: Person;
   }
   export class createDrivingLicence extends Transaction {
      drivingLicenceID: string;
      owner: Person;
      diploma: Diploma;
      ds: DrivingSchool;
   }
   export class enrollInUniversity extends Transaction {
      uniDiplomaID: string;
      mathGrade: number;
      englishGrade: number;
      csGrade: number;
      owner: Person;
      diploma: Diploma;
      uni: University;
   }
   export class graduateUni extends Transaction {
      uni: University;
      uniDiploma: UniversityDiploma;
      owner: Person;
   }
   export class queryDiplomas extends Transaction {
   }
// }
