import { Sequelize } from "sequelize";
import User, { init as initUser } from "./user.js";
import Profile, { init as initProfile } from "./profile.js";
import Task, { init as initTask } from "./task.js";

function associate() {
  
User.hasOne(Profile, {
  foreignKey: 'profileId',
  as: 'profiles'
});

Profile.belongsTo(User, {
  foreignKey: 'profileId'
});
        
}

async function authenticateConnection(connection) {
  try {
    await connection.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  User,
  Profile,
  Task
}

export function init(connection) {
  initUser(connection);
initProfile(connection);
initTask(connection);
  associate();
  authenticateConnection(connection);
}