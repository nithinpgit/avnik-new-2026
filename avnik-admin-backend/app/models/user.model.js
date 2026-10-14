module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      exclude: true
    },
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    stripe_customer_id: {
      type: Sequelize.STRING
    },
    sca_id: {
      type: Sequelize.STRING
    },
    phone_verified_at: {
      type: Sequelize.DATE
    },
    phone_verified_status: {
      type: Sequelize.STRING
    },
    email_verified_at: {
      type: Sequelize.DATE
    },
    social_user_id: {
      type: Sequelize.STRING
    },
    social_nickname: {
      type: Sequelize.STRING
    },
    social_avatar: {
      type: Sequelize.STRING
    },
    social_avatar_original: {
      type: Sequelize.STRING
    },
    social_profile_url: {
      type: Sequelize.STRING
    },
    social_refreshToken: {
      type: Sequelize.STRING
    },
    social_expiresIn: {
      type: Sequelize.STRING
    },
    social_token: {
      type: Sequelize.TEXT
    },
    social_provider: {
      type: Sequelize.STRING
    },
    joined_on: {
      type: Sequelize.STRING
    },
    last_ip: {
      type: Sequelize.STRING
    },
    last_login: {
      type: Sequelize.DATE
    },
    date_of_created: {
      type: Sequelize.DATE
    },
    last_activity: {
      type: Sequelize.DATE
    },
    last_active: {
      type: Sequelize.DATE
    },
    last_active_room: {
      type: Sequelize.STRING
    },
    read_notification: {
      type: Sequelize.ENUM('0', '1')
    },
    last_password_change: {
      type: Sequelize.DATE
    },
    skip_steps: {
      type: Sequelize.ENUM('0', '1')
    },
    remember_token: {
      type: Sequelize.STRING,
      field: "remember_token"
    },
    // Backward-compatible alias for legacy controller code that still expects `social_image`.
    social_image: {
      type: Sequelize.STRING,
      field: "social_avatar"
    },
    // platform: {
    //   type: Sequelize.STRING
    // },
    // social_id: {
    //   type: Sequelize.STRING
    // },
    // social_image: {
    //   type: Sequelize.STRING
    // },
    // social_token: {
    //   type: Sequelize.STRING
    // },
    // phone: {
    //   type: Sequelize.STRING
    // },
    // image: {
    //   type: Sequelize.STRING
    // },
    email_verified_status: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING,
      // defaultValue: 'active',
      // comment: "0 => inactive, 1 => active, 2 => hide"
    },
    
  },{
    timestamps: false
  });

  return User;
};
