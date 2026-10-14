module.exports = (sequelize, Sequelize) => {
    const EventSlot = sequelize.define("event_time_slots", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        event_fk_id: {
            type: Sequelize.INTEGER
        },
        meeting_room_id: {
            type: Sequelize.STRING
        },
        meeting_room_server_id: {
            type: Sequelize.STRING
        },
        meeting_room_start_time: {
            type: Sequelize.STRING
        },
        meeting_room_end_time: {
            type: Sequelize.STRING
        },
        start_time: {
            type: Sequelize.TEXT,
        },
        end_time: {
            type: Sequelize.TEXT,
        },
        start_date: {
            type: Sequelize.TEXT,
        },
        end_date: {
            type: Sequelize.TEXT,
        },
        booked_seats: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        current_duration: {
            type: Sequelize.INTEGER
        },
        current_status: {
            type: Sequelize.STRING
        },
        event_data: {
            type: Sequelize.TEXT
        },
        remember_token: {
            type: Sequelize.STRING
        }
    });

    return EventSlot;
};