
import { Inject, Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';



  
  @ValidatorConstraint({ name: 'IsBusinessAlreadyExist', async: true })
  @Injectable()
  export class IsValidPasswordConstraint implements ValidatorConstraintInterface {



    validate(password: string) {
       
     
      
          const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{1,15}$/;
          return typeof password === 'string' && regex.test(password);
        

    
  }}
  
  export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValidPasswordConstraint,
      });
    };
  }