#!/bin/bash 
 composer transaction submit --card Stirling@ssidentity -d '{"$class":"org.ssidentity.enrollInUniversity","uniDiplomaID":"UniDiploma2","mathGrade":3,"englishGrade":3,"csGrade":3,"owner":"resource:org.ssidentity.Person#Daka","diploma":"resource:org.ssidentity.Diploma#diploma","uni":"resource:org.ssidentity.University#Stirling"}' 