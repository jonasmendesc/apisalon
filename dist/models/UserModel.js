"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (sequelize, datatypes) => {
    const user = sequelize.define('User', {
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
        tableName: "users",
        hooks: {
            beforeCreate: (user, options) => {
                const salt = bcryptjs_1.genSaltSync();
                user.password = bcryptjs_1.hashSync(user.password, salt);
            },
            beforeUpdate: (user, options) => {
                if (user.changed('password')) {
                    const salt = bcryptjs_1.genSaltSync();
                    user.password = bcryptjs_1.hashSync(user.password, salt);
                }
            }
        }
    });
    user.prototype.IsPassword = (encodedPassword, password) => {
        return bcryptjs_1.compareSync(password, encodedPassword);
    };
    user.associate = (models) => {
        user.belongsTo(models.Company, {
            foreignKey: {
                allowNull: false,
                field: "companyId",
                name: "companyId"
            }
        });
    };
    return user;
};
