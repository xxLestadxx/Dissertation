#!/bin/bash 
 composer transaction submit --card WH@ssidentity -d '{"$class":"org.ssidentity.confirmDiploma","owner":"resource:org.ssidentity.Person#Daka","diploma":"resource:org.ssidentity.Diploma#string4","hs":"resource:org.ssidentity.HighSchool#WH"}' 