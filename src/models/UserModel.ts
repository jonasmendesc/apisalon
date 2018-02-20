import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface'
import { ModelsInterface } from '../interfaces/ModelsInterface'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export interface UserAttributes {
  id?: string;
  name?: string;
  email?: string;
  photo?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

    IsPassword(encodedPassword: string, password: string): boolean;

}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes>{

}

export default (sequelize: Sequelize.Sequelize, datatypes: Sequelize.DataTypes) : UserModel => {
  const user : UserModel = sequelize.define('User', {
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
      },
      photo: {
      type: datatypes.BLOB({
        length: 'long'
      }),
      allowNull: true,
      defaultValue: null
    }
  },
    {
      tableName: "users",
      hooks: {
        beforeCreate: (user : UserInstance, options: Sequelize.CreateOptions): void => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        },
       beforeUpdate: (user : UserInstance, options: Sequelize.CreateOptions):void => {
          if(user.changed('password')){
            const salt = genSaltSync();
            user.password = hashSync(user.password, salt);
          }
       }
      }
    });

    user.prototype.IsPassword = (encodedPassword: string, password: string): boolean => {
      return compareSync(password, encodedPassword);
  }

  user.associate = (models: ModelsInterface): void => {
      user.belongsTo(models.Company, {
        foreignKey: {
          allowNull: false,
          field: "companyId",
          name: "companyId"
        }
      });
  }

  return user;
}
