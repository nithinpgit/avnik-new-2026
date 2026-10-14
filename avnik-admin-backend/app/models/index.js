const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    // port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.userdetail = require("../models/userdetail.model")(sequelize, Sequelize);
db.event = require("../models/event.model")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
// db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.forgetpass = require("./forgetpass.model.js")(sequelize, Sequelize);
// db.userImages = require("./userImages.model")(sequelize, Sequelize);
db.reportUser = require("./reportUser.model")(sequelize, Sequelize);
// db.bankaccount = require("./bankAccount.model")(sequelize, Sequelize);
db.payments = require("./payment.model")(sequelize, Sequelize);
db.emailTemplates = require("./emailTemplates.model")(sequelize, Sequelize);
// db.notifications = require("./notifications.model")(sequelize, Sequelize);
db.chat = require("./chat.model")(sequelize, Sequelize);
db.eventSlot = require("./eventSlot.model")(sequelize, Sequelize);
// db.emailVerify = require("./emailVerify.model")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });


// db.user.hasMany(db.userImages, {sourceKey: 'id', foreignKey: 'userId'});
// db.notifications.hasOne(db.user, {sourceKey: 'notifiable_id',foreignKey: 'id'});
db.reportUser.hasOne(db.user, {sourceKey: 'r_user_id',foreignKey: 'id'});
db.reportUser.hasOne(db.user, {sourceKey: 'user_fk_id',foreignKey: 'id', as : 'reportedByUser'});
db.reportUser.hasOne(db.event, {sourceKey: 'r_event_id',foreignKey: 'id'});
db.event.hasOne(db.user, {sourceKey: 'user_fk_id',foreignKey: 'id'});
db.eventSlot.hasOne(db.event, {sourceKey: 'event_fk_id',foreignKey: 'id'});
db.userdetail.hasOne(db.user, {sourceKey: 'user_fk_id',foreignKey: 'id'});
db.user.hasOne(db.userdetail, {sourceKey: 'id',foreignKey: 'user_fk_id'});
db.chat.hasOne(db.userdetail, {sourceKey: 'receiver_id', foreignKey: 'user_fk_id'});
db.event.hasMany(db.payments, {sourceKey: 'id', foreignKey: 'event_fk_id'});
db.payments.hasOne(db.eventSlot, {sourceKey: 'event_time_slot_id', foreignKey: 'id'});
db.payments.hasOne(db.user, {sourceKey: 'user_fk_id', foreignKey: 'id'});
db.payments.hasOne(db.user, {sourceKey: 'to_user', foreignKey: 'id', as : 'host'});
db.payments.hasOne(db.user, {sourceKey: 'user_fk_id', foreignKey: 'id', as : 'sender'});
db.payments.hasOne(db.user, {sourceKey: 'to_user', foreignKey: 'id', as : 'receiver'});


// db.ROLES = ["user", "admin", "owner", "public_servant", "sub_admin"];

module.exports = db;