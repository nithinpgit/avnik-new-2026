module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("events", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_fk_id: {
      type: Sequelize.INTEGER
    },
    event_files: {
      type: Sequelize.TEXT
    },
    event_title: {
      type: Sequelize.STRING,
    },
    event_type: {
      type: Sequelize.STRING
    },
    event_description: {
      type: Sequelize.TEXT
    },
    event_visible: {
      type: Sequelize.INTEGER
    },
    event_sub_category: {
      type: Sequelize.TEXT
    },
    event_category: {
      type: Sequelize.TEXT
    },
    event_tags: {
      type: Sequelize.TEXT
    },
    event_invited_people: {
      type: Sequelize.TEXT
    },
    number_of_seats: {
      type: Sequelize.INTEGER
    },
    event_invited_by_email: {
      type: Sequelize.TEXT
    },
    event_invited_note: {
      type: Sequelize.TEXT
    },
    steps: {
      type: Sequelize.INTEGER
    },
    auto_accept_participant: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    date_of_create: {
      type: Sequelize.DATE
    },
    timezone: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.STRING
    },
    eventSubscriptionType: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.STRING
    },
    remember_token: {
      type: Sequelize.STRING
    },
    
  },{
    timestamps: false
  });

  return User;
};