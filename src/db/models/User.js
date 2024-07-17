import { Model, DataTypes } from "sequelize";
import serverConfig from "../../config/server.js";

class User extends Model {}

export function init(connection) {
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
firstName: { type: DataTypes.STRING, allowNull: false, allowNull: false },
lastName: { type: DataTypes.STRING, allowNull: true },
profileId: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'User',
    sequelize: connection,
    timestamps: true,
    underscored: false
  });
}

export default User;