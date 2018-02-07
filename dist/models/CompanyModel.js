"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (sequelize, datatypes) => {
    const company = sequelize.define('Company', {
        id: {
            type: datatypes.UUID,
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
            validate: {
                notEmpty: true
            }
        }
    }, {
        tableName: "companies",
        hooks: {
            beforeCreate: (company, options) => {
                const salt = bcryptjs_1.genSaltSync();
                company.password = bcryptjs_1.hashSync(company.password, salt);
            },
            beforeUpdate: (company, options) => {
                if (company.changed('password')) {
                    const salt = bcryptjs_1.genSaltSync();
                    company.password = bcryptjs_1.hashSync(company.password, salt);
                }
            }
        }
    });
    company.prototype.IsPassword = (encodedPassword, password) => {
        return bcryptjs_1.compareSync(password, encodedPassword);
    };
    return company;
};
