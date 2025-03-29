// api/models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userName: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        acc_CR_D: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        acc_UP_D: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { timestamps: false });
    return User;
};
