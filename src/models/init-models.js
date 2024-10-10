import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _amenities from  "./amenities.js";
import _bookings from  "./bookings.js";
import _comments from  "./comments.js";
import _locations from  "./locations.js";
import _room_amenities from  "./room_amenities.js";
import _rooms from  "./rooms.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const amenities = _amenities.init(sequelize, DataTypes);
  const bookings = _bookings.init(sequelize, DataTypes);
  const comments = _comments.init(sequelize, DataTypes);
  const locations = _locations.init(sequelize, DataTypes);
  const room_amenities = _room_amenities.init(sequelize, DataTypes);
  const rooms = _rooms.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  room_amenities.belongsTo(amenities, { as: "amenity", foreignKey: "amenity_id"});
  amenities.hasMany(room_amenities, { as: "room_amenities", foreignKey: "amenity_id"});
  bookings.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(bookings, { as: "bookings", foreignKey: "room_id"});
  comments.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(comments, { as: "comments", foreignKey: "room_id"});
  room_amenities.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(room_amenities, { as: "room_amenities", foreignKey: "room_id"});
  bookings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(bookings, { as: "bookings", foreignKey: "user_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});

  return {
    amenities,
    bookings,
    comments,
    locations,
    room_amenities,
    rooms,
    users,
  };
}
