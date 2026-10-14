module.exports = (sequelize, Sequelize) => {
  const Userdetail = sequelize.define("user_profiles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_fk_id: {
      type: Sequelize.INTEGER
    },
    about_me: {
      type: Sequelize.TEXT
    },
    date_of_birth: {
      type: Sequelize.DATE
    },
    gender: {
      type: Sequelize.STRING
    },
    profile_picture: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    skill: {
      type: Sequelize.STRING
    },
    profession: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    alt_address: {
      type: Sequelize.TEXT
    },
    country: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    social_media_urls: {
      type: Sequelize.TEXT
    },
    city: {
      type: Sequelize.STRING
    },
    zip_code: {
      type: Sequelize.STRING
    },
    social_profile_picture_url: {
      type: Sequelize.STRING
    },
    remember_token: {
      type: Sequelize.STRING
    }
    
  },{
    timestamps: false
  });

  return Userdetail;
};