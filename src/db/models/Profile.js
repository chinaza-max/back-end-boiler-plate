import { Model, DataTypes } from "sequelize";
import serverConfig from "../../config/server.js";

class Profile extends Model {}

export function init(connection) {
  Profile.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
bio: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'Profile',
    sequelize: connection,
    timestamps: true,
    underscored: false
  });
}

export default Profile;