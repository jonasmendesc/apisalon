import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export interface CompanyAttributes {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyInstance extends Sequelize.Instance<CompanyAttributes>, CompanyAttributes {

    IsPassword(encodedPassword: string, password: string): boolean;

}

export interface CompanyModel extends BaseModelInterface, Sequelize.Model<CompanyInstance, CompanyAttributes>{

}

export default (sequelize: Sequelize.Sequelize, datatypes: Sequelize.DataTypes) : CompanyModel => {
  const company : CompanyModel = sequelize.define('Company', {
      id: {
        type: datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: datatypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: datatypes.STRING(128),
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true
        }
      }
  },
    {
      tableName: "companies",
      hooks: {
        beforeCreate: (company : CompanyInstance, options: Sequelize.CreateOptions): void => {
          const salt = genSaltSync();
          company.password = hashSync(company.password, salt);
        },
       beforeUpdate: (company : CompanyInstance, options: Sequelize.CreateOptions):void => {
          if(company.changed('password')){
            const salt = genSaltSync();
            company.password = hashSync(company.password, salt);
          }
       }
      }
    });

    company.prototype.IsPassword = (encodedPassword: string, password: string): boolean => {
      return compareSync(password, encodedPassword)
  }

  return company;
}
