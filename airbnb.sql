CREATE DATABASE airbnb;
USE airbnb;


-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) CHECK (phone REGEXP '^[0-9]{9,20}$'),
    birth_date DATE,
    gender VARCHAR(10),
    role VARCHAR(50)
);

-- Rooms table
CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(100),
    guest_capacity INT,
    bedrooms INT,
    beds INT,
    bathrooms INT,
    description TEXT,
    price_per_night INT,
    image_url VARCHAR(255)
);

-- Amenities table
CREATE TABLE amenities (
    amenity_id INT PRIMARY KEY AUTO_INCREMENT,
    amenity_name VARCHAR(50) NOT NULL
);

-- Locations table
CREATE TABLE locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(100),
    city VARCHAR(100),
    country CHAR(2), -- ISO 3166-1 alpha-2
    image_url VARCHAR(255)
);

-- Bookings table
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    check_in DATETIME NOT NULL,
    check_out DATETIME NOT NULL,
    guest_count INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (check_out > check_in)
);

-- Comments table
CREATE TABLE comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id INT,
    comment_date DATETIME NOT NULL,
    content VARCHAR(500),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    last_updated DATETIME,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Room_Amenities table (many-to-many relationship)
CREATE TABLE room_amenities (
    room_amenity_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    amenity_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(amenity_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
