module.exports = (sequelize, Sequelize) => {
    const Forgetpass = sequelize.define("password_resets", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    return Forgetpass;
};