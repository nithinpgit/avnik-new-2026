module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("event_payments", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_fk_id: {
            type: Sequelize.INTEGER
        },
        event_time_slot_id: {
            type: Sequelize.INTEGER
        },
        event_fk_id: {
            type: Sequelize.INTEGER
        },
        to_user: {
            type: Sequelize.INTEGER
        },
        blocked_user: {
            type: Sequelize.INTEGER
        },
        withdraw_amount: {
            type: Sequelize.INTEGER,
        },
        event_date_time: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.STRING,
        },
        stripe_id: {
            type: Sequelize.STRING,
        },
        card_brand: {
            type: Sequelize.STRING
        },
        card_last_four: {
            type: Sequelize.STRING
        },
        trial_ends_at: {
            type: Sequelize.STRING
        },
        paid: {
            type: Sequelize.INTEGER
        },
        extended: {
            type: Sequelize.INTEGER
        },
        with_extended: {
            type: Sequelize.INTEGER
        },
        extended_id: {
            type: Sequelize.INTEGER
        },
        accept_by_host: {
            type: Sequelize.STRING
        },
        amount_refunded: {
            type: Sequelize.INTEGER
        },
        refunded_amount: {
            type: Sequelize.STRING
        },
        released: {
            type: Sequelize.INTEGER
        },
        refunded_percentage:{
            type:Sequelize.INTEGER
        },
        refund_description:{
            type:Sequelize.STRING
        },
        refund_id:{
            type:Sequelize.STRING
        },
        refund_transaction: {
            type: Sequelize.STRING
        },
        refund_id: {
            type: Sequelize.STRING
        },
        transaction_id: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        remember_token: {
            type: Sequelize.STRING
        },
        remember_token: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
      });

    return Payments;
};