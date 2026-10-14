module.exports = (sequelize, Sequelize) => {
    const ReportUser = sequelize.define("event_reports", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          user_fk_id: {
            type: Sequelize.INTEGER
          },
          r_event_id: {
            type: Sequelize.INTEGER
          },
          r_user_id: {
            type: Sequelize.INTEGER
          },
          report: {
            type: Sequelize.STRING
          },
          comment: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.ENUM(['0', '1']),
            allowNull: true,
            defaultValue: '0'
          },
          remember_token: {
            type: Sequelize.STRING
          }
    },{
      timestamps: false
    });
    return ReportUser;
};