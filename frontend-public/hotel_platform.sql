-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2025 at 02:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` enum('CREATE','UPDATE','DELETE','LOGIN') NOT NULL,
  `entityType` varchar(255) NOT NULL,
  `entityId` int(11) DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `userId`, `action`, `entityType`, `entityId`, `details`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'LOGIN', 'User', 1, '{\"email\":\"admin@hotel.com\"}', '2025-09-24 08:58:59', '2025-09-24 08:58:59'),
(2, 1, 'LOGIN', 'User', 1, '{\"email\":\"admin@hotel.com\"}', '2025-09-24 09:07:26', '2025-09-24 09:07:26'),
(3, 1, 'CREATE', 'Hotel', 16, '{\"path\":\"/api/hotels\",\"body\":{\"name\":\"Test Hotel\",\"city\":\"Amman\",\"address\":\"Gardens St\",\"descrption\":\"Nice Hotel\",\"manager\":\"Rama\",\"coverImage\":\"/uploads/1758704965664-977546083.jpeg\"}}', '2025-09-24 09:09:25', '2025-09-24 09:09:25'),
(4, 1, 'CREATE', 'Room', 46, '{\"path\":\"/api/rooms\",\"body\":{\"hotelId\":1,\"type\":\"Deluxe King\",\"capacity\":2,\"basePrice\":220,\"size\":450}}', '2025-09-24 09:13:19', '2025-09-24 09:13:19'),
(5, 1, 'CREATE', 'Media', NULL, '{\"path\":\"/api/rooms/1/images\",\"body\":{\"hotelId\":1,\"type\":\"Deluxe King\",\"capacity\":2,\"basePrice\":220,\"size\":450}}', '2025-09-24 09:13:50', '2025-09-24 09:13:50'),
(6, 1, 'CREATE', 'Media', 1, '{\"path\":\"/api/rooms/1/images\",\"body\":{}}', '2025-09-24 09:14:58', '2025-09-24 09:14:58'),
(7, 5, 'CREATE', 'User', 5, '{\"event\":\"REGISTER\"}', '2025-09-25 09:46:20', '2025-09-25 09:46:20'),
(8, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:46:34', '2025-09-25 09:46:34'),
(9, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:52:15', '2025-09-25 09:52:15'),
(10, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:53:02', '2025-09-25 09:53:02'),
(11, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:53:27', '2025-09-25 09:53:27'),
(12, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:54:02', '2025-09-25 09:54:02'),
(13, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 09:55:21', '2025-09-25 09:55:21'),
(14, 5, 'LOGIN', 'User', 5, '{\"event\":\"LOGIN\"}', '2025-09-25 11:01:36', '2025-09-25 11:01:36');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `guests` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','EXPIRED') DEFAULT 'PENDING',
  `totalPrice` float NOT NULL,
  `couponId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discountType` enum('PERCENT','FIXED') NOT NULL,
  `amount` float NOT NULL,
  `validFrom` date DEFAULT NULL,
  `validTo` date DEFAULT NULL,
  `minNights` int(11) DEFAULT 0,
  `maxUses` int(11) DEFAULT 0,
  `uses` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `discountType`, `amount`, `validFrom`, `validTo`, `minNights`, `maxUses`, `uses`, `createdAt`, `updatedAt`) VALUES
(1, 'WELCOME10', 'PERCENT', 10, NULL, NULL, 0, 0, 0, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(2, 'FLAT25', 'FIXED', 25, NULL, NULL, 0, 0, 0, '2025-09-24 08:44:31', '2025-09-24 08:44:31');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `starRating` int(11) DEFAULT 3,
  `address` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `city`, `starRating`, `address`, `description`, `manager`, `coverImage`, `amenities`, `createdAt`, `updatedAt`) VALUES
(1, 'Grand Plaza Hotel', 'New York', 5, '123 Broadway, Manhattan, NY 10001', 'Luxury hotel in the heart of Manhattan with stunning city views and premium amenities.', 'Sarah Johnson', NULL, '[\"Spa\",\"Pool\",\"Fine Dining\",\"Concierge\",\"Business Center\"]', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(2, 'Ocean View Resort', 'Miami', 4, '456 Ocean Drive, Miami Beach, FL 33139', 'Beachfront resort with private beach access, spa facilities, and tropical gardens.', 'Carlos Rodriguez', NULL, '[\"Private Beach\",\"Spa\",\"Pool\",\"Water Sports\",\"Beach Bar\"]', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(3, 'Mountain Retreat Lodge', 'Denver', 4, '789 Mountain Road, Denver, CO 80202', 'Cozy lodge nestled in the mountains with fireplace rooms and hiking trails.', 'Emily Chen', NULL, '[\"Fireplace\",\"Hiking\",\"Spa\",\"Restaurant\",\"Ski Storage\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(4, 'Metropolitan Suites', 'Chicago', 4, '321 Michigan Avenue, Chicago, IL 60601', 'Modern suites in downtown Chicago with lake views and executive services.', 'Michael Brown', NULL, '[\"Lake View\",\"Business Center\",\"Fitness\",\"Concierge\",\"Valet Parking\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(5, 'Sunset Beach Hotel', 'Los Angeles', 3, '654 Sunset Boulevard, LA, CA 90028', 'Boutique hotel near Hollywood with pool and celebrity sightings.', 'Jessica Williams', NULL, '[\"Pool\",\"Rooftop Bar\",\"Fitness\",\"Entertainment\",\"Tour Desk\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(6, 'Historic Grand Hotel', 'Boston', 5, '987 Beacon Street, Boston, MA 02108', 'Historic luxury hotel with traditional elegance and modern comforts.', 'Robert Davis', NULL, '[\"Historic\",\"Fine Dining\",\"Spa\",\"Library\",\"Wine Cellar\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(7, 'Desert Oasis Resort', 'Phoenix', 4, '258 Palm Canyon Drive, Phoenix, AZ 85001', 'Luxury desert resort with golf course, spa, and mountain views.', 'Maria Garcia', NULL, '[\"Golf Course\",\"Spa\",\"Pool\",\"Tennis\",\"Fine Dining\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(8, 'Harbor Lights Inn', 'San Francisco', 3, '147 Fisherman\'s Wharf, SF, CA 94133', 'Charming inn near the bay with cable car access and seafood restaurant.', 'David Wilson', NULL, '[\"Bay View\",\"Seafood Restaurant\",\"Tour Desk\",\"Free WiFi\",\"Bike Rental\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(9, 'Executive Business Hotel', 'Seattle', 4, '369 Tech Center Drive, Seattle, WA 98101', 'Modern hotel for business travelers with meeting facilities and high-speed internet.', 'Jennifer Lee', NULL, '[\"Business Center\",\"Meeting Rooms\",\"Fitness\",\"Restaurant\",\"Airport Shuttle\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(10, 'Garden Paradise Resort', 'Orlando', 5, '753 Theme Park Road, Orlando, FL 32830', 'Family-friendly resort near theme parks with water park and kids activities.', 'Thomas Miller', NULL, '[\"Water Park\",\"Kids Club\",\"Pool\",\"Restaurants\",\"Shuttle Service\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(11, 'Urban Loft Hotel', 'Austin', 3, '852 Music Lane, Austin, TX 78701', 'Trendy hotel in downtown Austin with live music and rooftop bar.', 'Amanda Taylor', NULL, '[\"Live Music\",\"Rooftop Bar\",\"Fitness\",\"Art Gallery\",\"Bike Rental\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(12, 'Lakeside Retreat', 'Minneapolis', 4, '159 Lake Street, Minneapolis, MN 55401', 'Serene hotel on the lake with water activities and nature trails.', 'Christopher Moore', NULL, '[\"Lake Access\",\"Boating\",\"Fishing\",\"Spa\",\"Restaurant\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(13, 'Capital View Hotel', 'Washington DC', 4, '456 Constitution Avenue, DC 20001', 'Elegant hotel near national monuments with panoramic city views.', 'Elizabeth White', NULL, '[\"City View\",\"Museum Access\",\"Fitness\",\"Business Center\",\"Fine Dining\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(14, 'Boutique Arts Hotel', 'Portland', 3, '963 Artisan Way, Portland, OR 97205', 'Art-themed boutique hotel with local artwork and creative atmosphere.', 'Daniel Clark', NULL, '[\"Art Gallery\",\"Local Art\",\"Cafe\",\"Bike Rental\",\"Tour Desk\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(15, 'Luxury Sky Hotel', 'Las Vegas', 5, '147 Casino Strip, Las Vegas, NV 89109', 'Ultra-luxury hotel with casino, fine dining, and spectacular shows.', 'Sophia Martinez', NULL, '[\"Casino\",\"Fine Dining\",\"Shows\",\"Spa\",\"Pool Club\"]', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(16, 'Test Hotel', 'Amman', 3, 'Gardens St', NULL, 'Rama', '/uploads/1758704965664-977546083.jpeg', NULL, '2025-09-24 09:09:25', '2025-09-24 09:09:25');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `entityType` enum('hotel','room') NOT NULL,
  `entityId` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `mimeType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `entityType`, `entityId`, `filename`, `url`, `mimeType`, `createdAt`, `updatedAt`) VALUES
(1, 'room', 1, 'seed-room-1.jpg', '/uploads/seed-room-1.jpg', 'image/jpeg', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(2, 'room', 2, 'seed-room-2.jpg', '/uploads/seed-room-2.jpg', 'image/jpeg', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(3, 'room', 3, 'seed-room-3.jpg', '/uploads/seed-room-3.jpg', 'image/jpeg', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(4, 'room', 4, 'seed-room-4.jpg', '/uploads/seed-room-4.jpg', 'image/jpeg', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(5, 'room', 5, 'seed-room-5.jpg', '/uploads/seed-room-5.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(6, 'room', 6, 'seed-room-6.jpg', '/uploads/seed-room-6.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(7, 'room', 7, 'seed-room-7.jpg', '/uploads/seed-room-7.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(8, 'room', 8, 'seed-room-8.jpg', '/uploads/seed-room-8.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(9, 'room', 9, 'seed-room-9.jpg', '/uploads/seed-room-9.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(10, 'room', 10, 'seed-room-10.jpg', '/uploads/seed-room-10.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(11, 'room', 11, 'seed-room-11.jpg', '/uploads/seed-room-11.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(12, 'room', 12, 'seed-room-12.jpg', '/uploads/seed-room-12.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(13, 'room', 13, 'seed-room-13.jpg', '/uploads/seed-room-13.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(14, 'room', 14, 'seed-room-14.jpg', '/uploads/seed-room-14.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(15, 'room', 15, 'seed-room-15.jpg', '/uploads/seed-room-15.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(16, 'room', 16, 'seed-room-16.jpg', '/uploads/seed-room-16.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(17, 'room', 17, 'seed-room-17.jpg', '/uploads/seed-room-17.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(18, 'room', 18, 'seed-room-18.jpg', '/uploads/seed-room-18.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(19, 'room', 19, 'seed-room-19.jpg', '/uploads/seed-room-19.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(20, 'room', 20, 'seed-room-20.jpg', '/uploads/seed-room-20.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(21, 'room', 21, 'seed-room-21.jpg', '/uploads/seed-room-21.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(22, 'room', 22, 'seed-room-22.jpg', '/uploads/seed-room-22.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(23, 'room', 23, 'seed-room-23.jpg', '/uploads/seed-room-23.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(24, 'room', 24, 'seed-room-24.jpg', '/uploads/seed-room-24.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(25, 'room', 25, 'seed-room-25.jpg', '/uploads/seed-room-25.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(26, 'room', 26, 'seed-room-26.jpg', '/uploads/seed-room-26.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(27, 'room', 27, 'seed-room-27.jpg', '/uploads/seed-room-27.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(28, 'room', 28, 'seed-room-28.jpg', '/uploads/seed-room-28.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(29, 'room', 29, 'seed-room-29.jpg', '/uploads/seed-room-29.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(30, 'room', 30, 'seed-room-30.jpg', '/uploads/seed-room-30.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(31, 'room', 31, 'seed-room-31.jpg', '/uploads/seed-room-31.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(32, 'room', 32, 'seed-room-32.jpg', '/uploads/seed-room-32.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(33, 'room', 33, 'seed-room-33.jpg', '/uploads/seed-room-33.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(34, 'room', 34, 'seed-room-34.jpg', '/uploads/seed-room-34.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(35, 'room', 35, 'seed-room-35.jpg', '/uploads/seed-room-35.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(36, 'room', 36, 'seed-room-36.jpg', '/uploads/seed-room-36.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(37, 'room', 37, 'seed-room-37.jpg', '/uploads/seed-room-37.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(38, 'room', 38, 'seed-room-38.jpg', '/uploads/seed-room-38.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(39, 'room', 39, 'seed-room-39.jpg', '/uploads/seed-room-39.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(40, 'room', 40, 'seed-room-40.jpg', '/uploads/seed-room-40.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(41, 'room', 41, 'seed-room-41.jpg', '/uploads/seed-room-41.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(42, 'room', 42, 'seed-room-42.jpg', '/uploads/seed-room-42.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(43, 'room', 43, 'seed-room-43.jpg', '/uploads/seed-room-43.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(44, 'room', 44, 'seed-room-44.jpg', '/uploads/seed-room-44.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(45, 'room', 45, 'seed-room-45.jpg', '/uploads/seed-room-45.jpg', 'image/jpeg', '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(46, 'room', 1, '1758705298358-178363548.jpeg', '/uploads/1758705298358-178363548.jpeg', 'image/jpeg', '2025-09-24 09:14:58', '2025-09-24 09:14:58'),
(47, 'room', 47, 'seed-room-47.jpg', '/uploads/seed-room-47.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(48, 'room', 48, 'seed-room-48.jpg', '/uploads/seed-room-48.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(49, 'room', 49, 'seed-room-49.jpg', '/uploads/seed-room-49.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(50, 'room', 50, 'seed-room-50.jpg', '/uploads/seed-room-50.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(51, 'room', 51, 'seed-room-51.jpg', '/uploads/seed-room-51.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(52, 'room', 52, 'seed-room-52.jpg', '/uploads/seed-room-52.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(53, 'room', 53, 'seed-room-53.jpg', '/uploads/seed-room-53.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(54, 'room', 54, 'seed-room-54.jpg', '/uploads/seed-room-54.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(55, 'room', 55, 'seed-room-55.jpg', '/uploads/seed-room-55.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(56, 'room', 56, 'seed-room-56.jpg', '/uploads/seed-room-56.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(57, 'room', 57, 'seed-room-57.jpg', '/uploads/seed-room-57.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(58, 'room', 58, 'seed-room-58.jpg', '/uploads/seed-room-58.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(59, 'room', 59, 'seed-room-59.jpg', '/uploads/seed-room-59.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(60, 'room', 60, 'seed-room-60.jpg', '/uploads/seed-room-60.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(61, 'room', 61, 'seed-room-61.jpg', '/uploads/seed-room-61.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(62, 'room', 62, 'seed-room-62.jpg', '/uploads/seed-room-62.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(63, 'room', 63, 'seed-room-63.jpg', '/uploads/seed-room-63.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(64, 'room', 64, 'seed-room-64.jpg', '/uploads/seed-room-64.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(65, 'room', 65, 'seed-room-65.jpg', '/uploads/seed-room-65.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(66, 'room', 66, 'seed-room-66.jpg', '/uploads/seed-room-66.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(67, 'room', 67, 'seed-room-67.jpg', '/uploads/seed-room-67.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(68, 'room', 68, 'seed-room-68.jpg', '/uploads/seed-room-68.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(69, 'room', 69, 'seed-room-69.jpg', '/uploads/seed-room-69.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(70, 'room', 70, 'seed-room-70.jpg', '/uploads/seed-room-70.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(71, 'room', 71, 'seed-room-71.jpg', '/uploads/seed-room-71.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(72, 'room', 72, 'seed-room-72.jpg', '/uploads/seed-room-72.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(73, 'room', 73, 'seed-room-73.jpg', '/uploads/seed-room-73.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(74, 'room', 74, 'seed-room-74.jpg', '/uploads/seed-room-74.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(75, 'room', 75, 'seed-room-75.jpg', '/uploads/seed-room-75.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(76, 'room', 76, 'seed-room-76.jpg', '/uploads/seed-room-76.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(77, 'room', 77, 'seed-room-77.jpg', '/uploads/seed-room-77.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(78, 'room', 78, 'seed-room-78.jpg', '/uploads/seed-room-78.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(79, 'room', 79, 'seed-room-79.jpg', '/uploads/seed-room-79.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(80, 'room', 80, 'seed-room-80.jpg', '/uploads/seed-room-80.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(81, 'room', 81, 'seed-room-81.jpg', '/uploads/seed-room-81.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(82, 'room', 82, 'seed-room-82.jpg', '/uploads/seed-room-82.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(83, 'room', 83, 'seed-room-83.jpg', '/uploads/seed-room-83.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(84, 'room', 84, 'seed-room-84.jpg', '/uploads/seed-room-84.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(85, 'room', 85, 'seed-room-85.jpg', '/uploads/seed-room-85.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(86, 'room', 86, 'seed-room-86.jpg', '/uploads/seed-room-86.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(87, 'room', 87, 'seed-room-87.jpg', '/uploads/seed-room-87.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(88, 'room', 88, 'seed-room-88.jpg', '/uploads/seed-room-88.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(89, 'room', 89, 'seed-room-89.jpg', '/uploads/seed-room-89.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(90, 'room', 90, 'seed-room-90.jpg', '/uploads/seed-room-90.jpg', 'image/jpeg', '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(91, 'room', 91, 'seed-room-91.jpg', '/uploads/seed-room-91.jpg', 'image/jpeg', '2025-09-25 08:05:17', '2025-09-25 08:05:17'),
(92, 'room', 92, 'seed-room-92.jpg', '/uploads/seed-room-92.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(93, 'room', 93, 'seed-room-93.jpg', '/uploads/seed-room-93.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(94, 'room', 94, 'seed-room-94.jpg', '/uploads/seed-room-94.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(95, 'room', 95, 'seed-room-95.jpg', '/uploads/seed-room-95.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(96, 'room', 96, 'seed-room-96.jpg', '/uploads/seed-room-96.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(97, 'room', 97, 'seed-room-97.jpg', '/uploads/seed-room-97.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(98, 'room', 98, 'seed-room-98.jpg', '/uploads/seed-room-98.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(99, 'room', 99, 'seed-room-99.jpg', '/uploads/seed-room-99.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(100, 'room', 100, 'seed-room-100.jpg', '/uploads/seed-room-100.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(101, 'room', 101, 'seed-room-101.jpg', '/uploads/seed-room-101.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(102, 'room', 102, 'seed-room-102.jpg', '/uploads/seed-room-102.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(103, 'room', 103, 'seed-room-103.jpg', '/uploads/seed-room-103.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(104, 'room', 104, 'seed-room-104.jpg', '/uploads/seed-room-104.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(105, 'room', 105, 'seed-room-105.jpg', '/uploads/seed-room-105.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(106, 'room', 106, 'seed-room-106.jpg', '/uploads/seed-room-106.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(107, 'room', 107, 'seed-room-107.jpg', '/uploads/seed-room-107.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(108, 'room', 108, 'seed-room-108.jpg', '/uploads/seed-room-108.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(109, 'room', 109, 'seed-room-109.jpg', '/uploads/seed-room-109.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(110, 'room', 110, 'seed-room-110.jpg', '/uploads/seed-room-110.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(111, 'room', 111, 'seed-room-111.jpg', '/uploads/seed-room-111.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(112, 'room', 112, 'seed-room-112.jpg', '/uploads/seed-room-112.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(113, 'room', 113, 'seed-room-113.jpg', '/uploads/seed-room-113.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(114, 'room', 114, 'seed-room-114.jpg', '/uploads/seed-room-114.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(115, 'room', 115, 'seed-room-115.jpg', '/uploads/seed-room-115.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(116, 'room', 116, 'seed-room-116.jpg', '/uploads/seed-room-116.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(117, 'room', 117, 'seed-room-117.jpg', '/uploads/seed-room-117.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(118, 'room', 118, 'seed-room-118.jpg', '/uploads/seed-room-118.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(119, 'room', 119, 'seed-room-119.jpg', '/uploads/seed-room-119.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(120, 'room', 120, 'seed-room-120.jpg', '/uploads/seed-room-120.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(121, 'room', 121, 'seed-room-121.jpg', '/uploads/seed-room-121.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(122, 'room', 122, 'seed-room-122.jpg', '/uploads/seed-room-122.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(123, 'room', 123, 'seed-room-123.jpg', '/uploads/seed-room-123.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(124, 'room', 124, 'seed-room-124.jpg', '/uploads/seed-room-124.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(125, 'room', 125, 'seed-room-125.jpg', '/uploads/seed-room-125.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(126, 'room', 126, 'seed-room-126.jpg', '/uploads/seed-room-126.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(127, 'room', 127, 'seed-room-127.jpg', '/uploads/seed-room-127.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(128, 'room', 128, 'seed-room-128.jpg', '/uploads/seed-room-128.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(129, 'room', 129, 'seed-room-129.jpg', '/uploads/seed-room-129.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(130, 'room', 130, 'seed-room-130.jpg', '/uploads/seed-room-130.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(131, 'room', 131, 'seed-room-131.jpg', '/uploads/seed-room-131.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(132, 'room', 132, 'seed-room-132.jpg', '/uploads/seed-room-132.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(133, 'room', 133, 'seed-room-133.jpg', '/uploads/seed-room-133.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(134, 'room', 134, 'seed-room-134.jpg', '/uploads/seed-room-134.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(135, 'room', 135, 'seed-room-135.jpg', '/uploads/seed-room-135.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(136, 'room', 136, 'seed-room-136.jpg', '/uploads/seed-room-136.jpg', 'image/jpeg', '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(137, 'room', 137, 'seed-room-137.jpg', '/uploads/seed-room-137.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(138, 'room', 138, 'seed-room-138.jpg', '/uploads/seed-room-138.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(139, 'room', 139, 'seed-room-139.jpg', '/uploads/seed-room-139.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(140, 'room', 140, 'seed-room-140.jpg', '/uploads/seed-room-140.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(141, 'room', 141, 'seed-room-141.jpg', '/uploads/seed-room-141.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(142, 'room', 142, 'seed-room-142.jpg', '/uploads/seed-room-142.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(143, 'room', 143, 'seed-room-143.jpg', '/uploads/seed-room-143.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(144, 'room', 144, 'seed-room-144.jpg', '/uploads/seed-room-144.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(145, 'room', 145, 'seed-room-145.jpg', '/uploads/seed-room-145.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(146, 'room', 146, 'seed-room-146.jpg', '/uploads/seed-room-146.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(147, 'room', 147, 'seed-room-147.jpg', '/uploads/seed-room-147.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(148, 'room', 148, 'seed-room-148.jpg', '/uploads/seed-room-148.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(149, 'room', 149, 'seed-room-149.jpg', '/uploads/seed-room-149.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(150, 'room', 150, 'seed-room-150.jpg', '/uploads/seed-room-150.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(151, 'room', 151, 'seed-room-151.jpg', '/uploads/seed-room-151.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(152, 'room', 152, 'seed-room-152.jpg', '/uploads/seed-room-152.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(153, 'room', 153, 'seed-room-153.jpg', '/uploads/seed-room-153.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(154, 'room', 154, 'seed-room-154.jpg', '/uploads/seed-room-154.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(155, 'room', 155, 'seed-room-155.jpg', '/uploads/seed-room-155.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(156, 'room', 156, 'seed-room-156.jpg', '/uploads/seed-room-156.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(157, 'room', 157, 'seed-room-157.jpg', '/uploads/seed-room-157.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(158, 'room', 158, 'seed-room-158.jpg', '/uploads/seed-room-158.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(159, 'room', 159, 'seed-room-159.jpg', '/uploads/seed-room-159.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(160, 'room', 160, 'seed-room-160.jpg', '/uploads/seed-room-160.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(161, 'room', 161, 'seed-room-161.jpg', '/uploads/seed-room-161.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(162, 'room', 162, 'seed-room-162.jpg', '/uploads/seed-room-162.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(163, 'room', 163, 'seed-room-163.jpg', '/uploads/seed-room-163.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(164, 'room', 164, 'seed-room-164.jpg', '/uploads/seed-room-164.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(165, 'room', 165, 'seed-room-165.jpg', '/uploads/seed-room-165.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(166, 'room', 166, 'seed-room-166.jpg', '/uploads/seed-room-166.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(167, 'room', 167, 'seed-room-167.jpg', '/uploads/seed-room-167.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(168, 'room', 168, 'seed-room-168.jpg', '/uploads/seed-room-168.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(169, 'room', 169, 'seed-room-169.jpg', '/uploads/seed-room-169.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(170, 'room', 170, 'seed-room-170.jpg', '/uploads/seed-room-170.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(171, 'room', 171, 'seed-room-171.jpg', '/uploads/seed-room-171.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(172, 'room', 172, 'seed-room-172.jpg', '/uploads/seed-room-172.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(173, 'room', 173, 'seed-room-173.jpg', '/uploads/seed-room-173.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(174, 'room', 174, 'seed-room-174.jpg', '/uploads/seed-room-174.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(175, 'room', 175, 'seed-room-175.jpg', '/uploads/seed-room-175.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(176, 'room', 176, 'seed-room-176.jpg', '/uploads/seed-room-176.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(177, 'room', 177, 'seed-room-177.jpg', '/uploads/seed-room-177.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(178, 'room', 178, 'seed-room-178.jpg', '/uploads/seed-room-178.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(179, 'room', 179, 'seed-room-179.jpg', '/uploads/seed-room-179.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(180, 'room', 180, 'seed-room-180.jpg', '/uploads/seed-room-180.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(181, 'room', 181, 'seed-room-181.jpg', '/uploads/seed-room-181.jpg', 'image/jpeg', '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(182, 'room', 182, 'seed-room-182.jpg', '/uploads/seed-room-182.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(183, 'room', 183, 'seed-room-183.jpg', '/uploads/seed-room-183.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(184, 'room', 184, 'seed-room-184.jpg', '/uploads/seed-room-184.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(185, 'room', 185, 'seed-room-185.jpg', '/uploads/seed-room-185.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(186, 'room', 186, 'seed-room-186.jpg', '/uploads/seed-room-186.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(187, 'room', 187, 'seed-room-187.jpg', '/uploads/seed-room-187.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(188, 'room', 188, 'seed-room-188.jpg', '/uploads/seed-room-188.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(189, 'room', 189, 'seed-room-189.jpg', '/uploads/seed-room-189.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(190, 'room', 190, 'seed-room-190.jpg', '/uploads/seed-room-190.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(191, 'room', 191, 'seed-room-191.jpg', '/uploads/seed-room-191.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(192, 'room', 192, 'seed-room-192.jpg', '/uploads/seed-room-192.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(193, 'room', 193, 'seed-room-193.jpg', '/uploads/seed-room-193.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(194, 'room', 194, 'seed-room-194.jpg', '/uploads/seed-room-194.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(195, 'room', 195, 'seed-room-195.jpg', '/uploads/seed-room-195.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(196, 'room', 196, 'seed-room-196.jpg', '/uploads/seed-room-196.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(197, 'room', 197, 'seed-room-197.jpg', '/uploads/seed-room-197.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(198, 'room', 198, 'seed-room-198.jpg', '/uploads/seed-room-198.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(199, 'room', 199, 'seed-room-199.jpg', '/uploads/seed-room-199.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(200, 'room', 200, 'seed-room-200.jpg', '/uploads/seed-room-200.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(201, 'room', 201, 'seed-room-201.jpg', '/uploads/seed-room-201.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(202, 'room', 202, 'seed-room-202.jpg', '/uploads/seed-room-202.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(203, 'room', 203, 'seed-room-203.jpg', '/uploads/seed-room-203.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(204, 'room', 204, 'seed-room-204.jpg', '/uploads/seed-room-204.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(205, 'room', 205, 'seed-room-205.jpg', '/uploads/seed-room-205.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(206, 'room', 206, 'seed-room-206.jpg', '/uploads/seed-room-206.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(207, 'room', 207, 'seed-room-207.jpg', '/uploads/seed-room-207.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(208, 'room', 208, 'seed-room-208.jpg', '/uploads/seed-room-208.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(209, 'room', 209, 'seed-room-209.jpg', '/uploads/seed-room-209.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(210, 'room', 210, 'seed-room-210.jpg', '/uploads/seed-room-210.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(211, 'room', 211, 'seed-room-211.jpg', '/uploads/seed-room-211.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(212, 'room', 212, 'seed-room-212.jpg', '/uploads/seed-room-212.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(213, 'room', 213, 'seed-room-213.jpg', '/uploads/seed-room-213.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(214, 'room', 214, 'seed-room-214.jpg', '/uploads/seed-room-214.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(215, 'room', 215, 'seed-room-215.jpg', '/uploads/seed-room-215.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(216, 'room', 216, 'seed-room-216.jpg', '/uploads/seed-room-216.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(217, 'room', 217, 'seed-room-217.jpg', '/uploads/seed-room-217.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(218, 'room', 218, 'seed-room-218.jpg', '/uploads/seed-room-218.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(219, 'room', 219, 'seed-room-219.jpg', '/uploads/seed-room-219.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(220, 'room', 220, 'seed-room-220.jpg', '/uploads/seed-room-220.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(221, 'room', 221, 'seed-room-221.jpg', '/uploads/seed-room-221.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(222, 'room', 222, 'seed-room-222.jpg', '/uploads/seed-room-222.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(223, 'room', 223, 'seed-room-223.jpg', '/uploads/seed-room-223.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(224, 'room', 224, 'seed-room-224.jpg', '/uploads/seed-room-224.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(225, 'room', 225, 'seed-room-225.jpg', '/uploads/seed-room-225.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(226, 'room', 226, 'seed-room-226.jpg', '/uploads/seed-room-226.jpg', 'image/jpeg', '2025-09-25 11:28:38', '2025-09-25 11:28:38');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotelId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `basePrice` float NOT NULL,
  `size` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hotelId`, `type`, `capacity`, `basePrice`, `size`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(2, 1, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(3, 1, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(4, 2, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(5, 2, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(6, 2, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(7, 3, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(8, 3, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(9, 3, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(10, 4, 'Family Room', 4, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(11, 4, 'Presidential Suite', 4, 600, 1000, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(12, 4, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(13, 5, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(14, 5, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(15, 5, 'Executive Suite', 3, 350, 650, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(16, 6, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(17, 6, 'Accessible Room', 2, 180, 400, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(18, 6, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(19, 7, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(20, 7, 'Deluxe King', 2, 220, 450, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(21, 7, 'Accessible Room', 2, 180, 400, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(22, 8, 'Presidential Suite', 4, 600, 1000, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(23, 8, 'Presidential Suite', 4, 600, 1000, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(24, 8, 'Family Room', 4, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(25, 9, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(26, 9, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(27, 9, 'Family Room', 4, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(28, 10, 'Deluxe King', 2, 220, 450, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(29, 10, 'Family Room', 4, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(30, 10, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(31, 11, 'Junior Suite', 2, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(32, 11, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(33, 11, 'Deluxe King', 2, 220, 450, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(34, 12, 'Deluxe King', 2, 220, 450, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(35, 12, 'Executive Suite', 3, 350, 650, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(36, 12, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(37, 13, 'Executive Suite', 3, 350, 650, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(38, 13, 'Family Room', 4, 280, 500, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(39, 13, 'Deluxe King', 2, 220, 450, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(40, 14, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(41, 14, 'Standard Single', 1, 120, 300, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(42, 14, 'Executive Suite', 3, 350, 650, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(43, 15, 'Standard Double', 2, 150, 350, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(44, 15, 'Executive Suite', 3, 350, 650, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(45, 15, 'Accessible Room', 2, 180, 400, '2025-09-24 08:44:31', '2025-09-24 08:44:31'),
(46, 1, 'Deluxe King', 2, 220, 450, '2025-09-24 09:13:19', '2025-09-24 09:13:19'),
(47, 1, 'Standard Single', 1, 120, 300, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(48, 1, 'Standard Single', 1, 120, 300, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(49, 1, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(50, 2, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(51, 2, 'Standard Double', 2, 150, 350, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(52, 2, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(53, 3, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(54, 3, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(55, 3, 'Family Room', 4, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(56, 4, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(57, 4, 'Family Room', 4, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(58, 4, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(59, 5, 'Standard Single', 1, 120, 300, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(60, 5, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(61, 5, 'Presidential Suite', 4, 600, 1000, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(62, 6, 'Presidential Suite', 4, 600, 1000, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(63, 6, 'Presidential Suite', 4, 600, 1000, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(64, 6, 'Standard Single', 1, 120, 300, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(65, 7, 'Family Room', 4, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(66, 7, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(67, 7, 'Standard Double', 2, 150, 350, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(68, 8, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(69, 8, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(70, 8, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(71, 9, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(72, 9, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(73, 9, 'Junior Suite', 2, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(74, 10, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(75, 10, 'Presidential Suite', 4, 600, 1000, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(76, 10, 'Accessible Room', 2, 180, 400, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(77, 11, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(78, 11, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(79, 11, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(80, 12, 'Standard Double', 2, 150, 350, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(81, 12, 'Family Room', 4, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(82, 12, 'Standard Single', 1, 120, 300, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(83, 13, 'Accessible Room', 2, 180, 400, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(84, 13, 'Deluxe King', 2, 220, 450, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(85, 13, 'Executive Suite', 3, 350, 650, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(86, 14, 'Accessible Room', 2, 180, 400, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(87, 14, 'Family Room', 4, 280, 500, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(88, 14, 'Presidential Suite', 4, 600, 1000, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(89, 15, 'Accessible Room', 2, 180, 400, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(90, 15, 'Standard Double', 2, 150, 350, '2025-09-25 08:05:16', '2025-09-25 08:05:16'),
(91, 15, 'Accessible Room', 2, 180, 400, '2025-09-25 08:05:17', '2025-09-25 08:05:17'),
(92, 1, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(93, 1, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(94, 1, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(95, 2, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(96, 2, 'Standard Double', 2, 150, 350, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(97, 2, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(98, 3, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(99, 3, 'Standard Double', 2, 150, 350, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(100, 3, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(101, 4, 'Standard Double', 2, 150, 350, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(102, 4, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(103, 4, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(104, 5, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(105, 5, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(106, 5, 'Presidential Suite', 4, 600, 1000, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(107, 6, 'Executive Suite', 3, 350, 650, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(108, 6, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(109, 6, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(110, 7, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(111, 7, 'Executive Suite', 3, 350, 650, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(112, 7, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(113, 8, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(114, 8, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(115, 8, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(116, 9, 'Presidential Suite', 4, 600, 1000, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(117, 9, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(118, 9, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(119, 10, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(120, 10, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(121, 10, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(122, 11, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(123, 11, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(124, 11, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(125, 12, 'Standard Double', 2, 150, 350, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(126, 12, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(127, 12, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(128, 13, 'Junior Suite', 2, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(129, 13, 'Executive Suite', 3, 350, 650, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(130, 13, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(131, 14, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(132, 14, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(133, 14, 'Standard Single', 1, 120, 300, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(134, 15, 'Accessible Room', 2, 180, 400, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(135, 15, 'Family Room', 4, 280, 500, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(136, 15, 'Deluxe King', 2, 220, 450, '2025-09-25 09:49:14', '2025-09-25 09:49:14'),
(137, 1, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(138, 1, 'Junior Suite', 2, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(139, 1, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(140, 2, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(141, 2, 'Accessible Room', 2, 180, 400, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(142, 2, 'Accessible Room', 2, 180, 400, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(143, 3, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(144, 3, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(145, 3, 'Executive Suite', 3, 350, 650, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(146, 4, 'Presidential Suite', 4, 600, 1000, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(147, 4, 'Junior Suite', 2, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(148, 4, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(149, 5, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(150, 5, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(151, 5, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(152, 6, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(153, 6, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(154, 6, 'Presidential Suite', 4, 600, 1000, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(155, 7, 'Executive Suite', 3, 350, 650, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(156, 7, 'Executive Suite', 3, 350, 650, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(157, 7, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(158, 8, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(159, 8, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(160, 8, 'Accessible Room', 2, 180, 400, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(161, 9, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(162, 9, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(163, 9, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(164, 10, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(165, 10, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(166, 10, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(167, 11, 'Presidential Suite', 4, 600, 1000, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(168, 11, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(169, 11, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(170, 12, 'Deluxe King', 2, 220, 450, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(171, 12, 'Accessible Room', 2, 180, 400, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(172, 12, 'Standard Double', 2, 150, 350, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(173, 13, 'Junior Suite', 2, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(174, 13, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(175, 13, 'Junior Suite', 2, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(176, 14, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(177, 14, 'Accessible Room', 2, 180, 400, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(178, 14, 'Executive Suite', 3, 350, 650, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(179, 15, 'Family Room', 4, 280, 500, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(180, 15, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(181, 15, 'Standard Single', 1, 120, 300, '2025-09-25 10:38:05', '2025-09-25 10:38:05'),
(182, 1, 'Presidential Suite', 4, 600, 1000, '2025-09-25 11:28:37', '2025-09-25 11:28:37'),
(183, 1, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(184, 1, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(185, 2, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(186, 2, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(187, 2, 'Junior Suite', 2, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(188, 3, 'Presidential Suite', 4, 600, 1000, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(189, 3, 'Standard Double', 2, 150, 350, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(190, 3, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(191, 4, 'Junior Suite', 2, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(192, 4, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(193, 4, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(194, 5, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(195, 5, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(196, 5, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(197, 6, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(198, 6, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(199, 6, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(200, 7, 'Family Room', 4, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(201, 7, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(202, 7, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(203, 8, 'Family Room', 4, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(204, 8, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(205, 8, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(206, 9, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(207, 9, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(208, 9, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(209, 10, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(210, 10, 'Junior Suite', 2, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(211, 10, 'Accessible Room', 2, 180, 400, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(212, 11, 'Standard Double', 2, 150, 350, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(213, 11, 'Presidential Suite', 4, 600, 1000, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(214, 11, 'Presidential Suite', 4, 600, 1000, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(215, 12, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(216, 12, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(217, 12, 'Deluxe King', 2, 220, 450, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(218, 13, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(219, 13, 'Junior Suite', 2, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(220, 13, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(221, 14, 'Family Room', 4, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(222, 14, 'Standard Double', 2, 150, 350, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(223, 14, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(224, 15, 'Executive Suite', 3, 350, 650, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(225, 15, 'Family Room', 4, 280, 500, '2025-09-25 11:28:38', '2025-09-25 11:28:38'),
(226, 15, 'Standard Single', 1, 120, 300, '2025-09-25 11:28:38', '2025-09-25 11:28:38');

-- --------------------------------------------------------

--
-- Table structure for table `seasonal_prices`
--

CREATE TABLE `seasonal_prices` (
  `id` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `role` enum('ADMIN','MANAGER','VIEWER') DEFAULT 'VIEWER',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `passwordHash`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@hotel.com', '$2b$10$ZBWYNZe1/Kc4DaNfteYrN.L80x8tcjTEQSJL3Sja0rHH1kLrzWg7S', 'ADMIN', '2025-09-24 08:44:30', '2025-09-24 08:44:30'),
(2, 'John Tester', 'john@test.com', '$2b$10$h/8XqSGZ159/UtImC9g18.OU9/QZVBFc1jccjlB8ygidufPECkma2', 'VIEWER', '2025-09-24 11:24:28', '2025-09-24 11:24:28'),
(3, 'Rama', 'ramamajed22@gmail.com', '$2b$10$GYauqwjzsWBZg7tvuE9FA.GqWB1.32F5LlQC5Vc8db3hKu5JlPB6m', 'VIEWER', '2025-09-24 11:25:49', '2025-09-24 11:25:49'),
(4, 'Rama Abdelqader', 'lol@gmail.com', '$2b$10$J3APdUbJLavgJ4xqWVuaIuKwsScw7hgVFtimaiZzBpD6eB/HrMc8G', 'VIEWER', '2025-09-24 11:27:41', '2025-09-24 11:27:41'),
(5, 'kjsj', 'rama@gmail.com', '$2b$10$cvYZzcvgx3oImR7Sy32Rue092sFXvtMG/94/NW/LCgflKSLyLMgXS', 'VIEWER', '2025-09-25 09:46:20', '2025-09-25 09:46:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `couponId` (`couponId`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `code_2` (`code`),
  ADD UNIQUE KEY `code_3` (`code`),
  ADD UNIQUE KEY `code_4` (`code`),
  ADD UNIQUE KEY `code_5` (`code`),
  ADD UNIQUE KEY `code_6` (`code`),
  ADD UNIQUE KEY `code_7` (`code`),
  ADD UNIQUE KEY `code_8` (`code`),
  ADD UNIQUE KEY `code_9` (`code`),
  ADD UNIQUE KEY `code_10` (`code`),
  ADD UNIQUE KEY `code_11` (`code`),
  ADD UNIQUE KEY `code_12` (`code`),
  ADD UNIQUE KEY `code_13` (`code`),
  ADD UNIQUE KEY `code_14` (`code`),
  ADD UNIQUE KEY `code_15` (`code`),
  ADD UNIQUE KEY `code_16` (`code`),
  ADD UNIQUE KEY `code_17` (`code`),
  ADD UNIQUE KEY `code_18` (`code`),
  ADD UNIQUE KEY `code_19` (`code`),
  ADD UNIQUE KEY `code_20` (`code`),
  ADD UNIQUE KEY `code_21` (`code`),
  ADD UNIQUE KEY `code_22` (`code`),
  ADD UNIQUE KEY `code_23` (`code`),
  ADD UNIQUE KEY `code_24` (`code`),
  ADD UNIQUE KEY `code_25` (`code`),
  ADD UNIQUE KEY `code_26` (`code`),
  ADD UNIQUE KEY `code_27` (`code`),
  ADD UNIQUE KEY `code_28` (`code`),
  ADD UNIQUE KEY `code_29` (`code`),
  ADD UNIQUE KEY `code_30` (`code`),
  ADD UNIQUE KEY `code_31` (`code`),
  ADD UNIQUE KEY `code_32` (`code`),
  ADD UNIQUE KEY `code_33` (`code`),
  ADD UNIQUE KEY `code_34` (`code`),
  ADD UNIQUE KEY `code_35` (`code`),
  ADD UNIQUE KEY `code_36` (`code`),
  ADD UNIQUE KEY `code_37` (`code`),
  ADD UNIQUE KEY `code_38` (`code`),
  ADD UNIQUE KEY `code_39` (`code`),
  ADD UNIQUE KEY `code_40` (`code`),
  ADD UNIQUE KEY `code_41` (`code`),
  ADD UNIQUE KEY `code_42` (`code`),
  ADD UNIQUE KEY `code_43` (`code`),
  ADD UNIQUE KEY `code_44` (`code`),
  ADD UNIQUE KEY `code_45` (`code`),
  ADD UNIQUE KEY `code_46` (`code`),
  ADD UNIQUE KEY `code_47` (`code`),
  ADD UNIQUE KEY `code_48` (`code`),
  ADD UNIQUE KEY `code_49` (`code`),
  ADD UNIQUE KEY `code_50` (`code`),
  ADD UNIQUE KEY `code_51` (`code`),
  ADD UNIQUE KEY `code_52` (`code`),
  ADD UNIQUE KEY `code_53` (`code`),
  ADD UNIQUE KEY `code_54` (`code`),
  ADD UNIQUE KEY `code_55` (`code`),
  ADD UNIQUE KEY `code_56` (`code`),
  ADD UNIQUE KEY `code_57` (`code`),
  ADD UNIQUE KEY `code_58` (`code`),
  ADD UNIQUE KEY `code_59` (`code`),
  ADD UNIQUE KEY `code_60` (`code`),
  ADD UNIQUE KEY `code_61` (`code`),
  ADD UNIQUE KEY `code_62` (`code`),
  ADD UNIQUE KEY `code_63` (`code`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotelId` (`hotelId`);

--
-- Indexes for table `seasonal_prices`
--
ALTER TABLE `seasonal_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `seasonal_prices`
--
ALTER TABLE `seasonal_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_187` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_188` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_189` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seasonal_prices`
--
ALTER TABLE `seasonal_prices`
  ADD CONSTRAINT `seasonal_prices_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
