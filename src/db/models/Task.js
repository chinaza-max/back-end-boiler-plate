import { Model, DataTypes } from "sequelize";
import serverConfig from "../../config/server.js";

class Task extends Model {}

export function init(connection) {
  Task.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
bio: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'Task',
    sequelize: connection,
    timestamps: true,
    underscored: false
  });
}

export default Task;