import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class room_amenities extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    room_amenity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rooms',
        key: 'room_id'
      }
    },
    amenity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'amenities',
        key: 'amenity_id'
      }
    }
  }, {
    sequelize,
    tableName: 'room_amenities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_amenity_id" },
        ]
      },
      {
        name: "room_id",
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "amenity_id",
        using: "BTREE",
        fields: [
          { name: "amenity_id" },
        ]
      },
    ]
  });
  }
}
