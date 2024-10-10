import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class amenities extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    amenity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amenity_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'amenities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "amenity_id" },
        ]
      },
    ]
  });
  }
}
