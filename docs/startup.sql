-- Avnik initial startup seed
-- Generated from production-like dump; transactional data removed.
-- Kept users: avnik@gmail.com, nithinnpk@gmail.com (ids: 3, 5)
-- Kept master/system data: categories, countries, email_templates, language_masters, migrations, oauth_clients, oauth_personal_access_clients
-- Schema for all tables retained; event/chat/payment/etc. rows cleared.
--
-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jul 18, 2026 at 11:49 AM
-- Server version: 8.0.46
-- PHP Version: 8.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `avnik_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `account_number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_holder_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc_code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_verified_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `parentId` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parentId`, `createdAt`, `updatedAt`) VALUES
(1, 'test 1222', 1, '2022-05-19 15:08:57', '2022-07-19 19:07:00'),
(2, 'Medical', 0, '2022-07-13 15:32:45', '2023-01-05 10:28:22'),
(3, 'new 1.1', 1, '2022-07-15 04:01:28', '2022-07-15 04:01:28'),
(4, 'new 1.123', 0, '2022-07-15 13:04:06', '2022-07-19 20:28:54'),
(5, 'new 1.2sssss', 0, '2022-07-15 13:04:24', '2022-07-19 19:10:52'),
(6, 'new 1.2', 1, '2022-07-15 13:04:38', '2022-07-15 13:04:38'),
(7, 'new 1.2223', 0, '2022-07-19 18:32:03', '2022-07-19 19:10:38'),
(8, 'name 2', 0, '2022-07-19 18:39:10', '2022-07-19 18:39:10'),
(9, 'new 1.222', 0, '2022-07-19 18:41:18', '2022-07-19 18:41:18'),
(10, 'cate 3', 0, '2022-07-19 18:42:41', '2022-07-19 18:42:41'),
(11, 'new2', 0, '2022-07-19 18:43:48', '2022-07-19 18:43:48'),
(12, 'new 3', 0, '2022-07-19 18:44:03', '2022-07-19 18:44:03'),
(13, 'new id 2', 0, '2022-07-19 20:17:52', '2022-07-19 20:17:52'),
(14, 'new bb1', 2, '2022-07-19 20:22:01', '2022-07-20 16:11:30'),
(15, 'asd2', 2, '2022-07-19 20:23:18', '2022-07-19 20:23:18'),
(16, 'asd23', 2, '2022-07-19 20:25:22', '2022-07-19 20:25:22'),
(17, 'asdasd', 2, '2022-07-19 20:27:05', '2022-07-19 20:27:05'),
(18, 'asd', 2, '2022-07-19 20:27:35', '2022-07-19 20:27:35'),
(19, 'hike', 0, '2022-07-19 20:29:10', '2022-07-20 17:13:39'),
(20, 'hike1.1', 19, '2022-07-19 20:29:17', '2022-07-20 17:13:52'),
(21, 'sd', 2, '2022-07-19 20:41:30', '2022-07-19 20:41:30'),
(22, 'hi', 0, '2022-07-19 20:46:41', '2022-07-19 20:46:41'),
(23, 'asname', 2, '2022-07-20 09:32:05', '2022-08-10 17:39:33'),
(24, 'new', 4, '2022-07-20 15:47:12', '2022-07-20 15:47:12'),
(25, 'cate 3.1', 10, '2022-07-20 17:10:57', '2022-07-20 17:10:57'),
(26, 'cate3.1.1', 10, '2022-07-20 17:11:19', '2022-07-20 17:11:19'),
(27, 'new 2.1', 11, '2022-07-20 17:12:28', '2022-07-20 17:12:28'),
(28, 'name', 2, '2022-07-20 17:19:45', '2022-08-10 17:39:28'),
(29, 'new2', 2, '2022-07-20 17:21:08', '2022-07-20 17:21:08'),
(30, 'as', 5, '2022-07-21 16:58:35', '2022-07-21 16:58:35'),
(31, 'as', 7, '2022-07-21 16:58:46', '2022-07-21 16:58:46'),
(32, 'Avnik', 0, '2022-07-31 17:36:16', '2022-07-31 17:36:16'),
(33, 'Avnik 1', 32, '2022-07-31 17:37:42', '2022-07-31 17:37:42'),
(34, 'test 4', 0, '2022-08-01 03:46:18', '2022-08-01 03:47:17'),
(35, 'avnik4', 34, '2022-08-01 03:46:37', '2022-08-13 14:50:13'),
(36, 'ze', 0, '2022-08-01 19:40:22', '2022-08-01 19:40:22'),
(37, 'avnik2', 0, '2022-08-10 15:16:45', '2022-08-10 15:16:45'),
(38, 'avnik22', 2, '2022-08-10 15:16:58', '2022-08-10 15:16:58'),
(39, 'd', 0, '2022-08-10 17:40:06', '2022-08-10 17:40:06'),
(40, 's', 11, '2022-08-10 17:40:26', '2022-08-10 17:40:26'),
(41, 'as', 11, '2022-08-10 17:40:36', '2022-08-10 17:40:36'),
(42, 'Hacker ', 0, '2023-08-15 11:21:06', '2023-08-15 11:21:06'),
(43, 'White Hat', 42, '2023-08-15 11:21:18', '2023-08-15 11:21:18'),
(44, 'Black Hat', 42, '2023-08-15 11:21:35', '2023-08-15 11:21:35'),
(45, 'Gray Hat ', 42, '2023-08-15 11:21:41', '2023-08-15 11:21:41'),
(46, 'asd', 0, '2024-01-04 06:08:52', '2024-01-04 06:08:52'),
(47, 'ffffffaassaas', 0, '2024-01-04 14:30:10', '2024-01-04 14:30:10'),
(48, 'IT', 0, '2024-01-04 14:30:19', '2026-03-30 13:38:49'),
(49, 'dsa', 0, '2024-01-04 17:32:09', '2024-01-04 17:32:09'),
(50, 'Cloud Computing & Virtualization', 48, '2024-01-05 11:25:25', '2026-03-30 13:39:58'),
(51, '3433', 46, '2024-01-05 11:25:34', '2024-01-05 11:25:34'),
(52, 'asdasd', 0, '2024-01-05 11:28:10', '2024-01-05 11:28:10'),
(53, 'asd', 0, '2024-01-05 11:28:22', '2024-01-05 11:45:23'),
(54, 'asd', 53, '2024-01-05 11:44:55', '2024-01-05 11:44:55'),
(55, '29.1', 1, '2025-09-16 21:35:54', '2025-09-16 21:35:54'),
(56, 'IT Services & Support', 48, '2026-03-30 13:39:37', '2026-03-30 13:39:37');


-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int NOT NULL,
  `group_id` varchar(255) DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message` text,
  `if_file` enum('0','1') DEFAULT '0',
  `extension` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `is_mute` enum('0','1') DEFAULT '0',
  `is_blocked` enum('0','1') DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_activities`
--

CREATE TABLE `chat_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_conversations`
--

CREATE TABLE `chat_conversations` (
  `id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_last_seens`
--

CREATE TABLE `chat_last_seens` (
  `id` bigint UNSIGNED NOT NULL,
  `message_id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` bigint UNSIGNED NOT NULL,
  `sender_id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_size` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_file` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` bigint UNSIGNED NOT NULL,
  `created_by` bigint UNSIGNED NOT NULL,
  `slot_id` int DEFAULT NULL,
  `type` int NOT NULL DEFAULT '0',
  `single_chat_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `broadcasting` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `chat_room_users`
--

CREATE TABLE `chat_room_users` (
  `id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `contact_user_id` bigint UNSIGNED NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint UNSIGNED NOT NULL,
  `sortname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phonecode` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `sortname`, `name`, `phonecode`, `created_at`, `updated_at`) VALUES
(1, 'AF', 'Afghanistan', 93, NULL, NULL),
(2, 'AL', 'Albania', 355, NULL, NULL),
(3, 'DZ', 'Algeria', 213, NULL, NULL),
(4, 'AS', 'American Samoa', 1684, NULL, NULL),
(5, 'AD', 'Andorra', 376, NULL, NULL),
(6, 'AO', 'Angola', 244, NULL, NULL),
(7, 'AI', 'Anguilla', 1264, NULL, NULL),
(8, 'AQ', 'Antarctica', 0, NULL, NULL),
(9, 'AG', 'Antigua And Barbuda', 1268, NULL, NULL),
(10, 'AR', 'Argentina', 54, NULL, NULL),
(11, 'AM', 'Armenia', 374, NULL, NULL),
(12, 'AW', 'Aruba', 297, NULL, NULL),
(13, 'AU', 'Australia', 61, NULL, NULL),
(14, 'AT', 'Austria', 43, NULL, NULL),
(15, 'AZ', 'Azerbaijan', 994, NULL, NULL),
(16, 'BS', 'Bahamas The', 1242, NULL, NULL),
(17, 'BH', 'Bahrain', 973, NULL, NULL),
(18, 'BD', 'Bangladesh', 880, NULL, NULL),
(19, 'BB', 'Barbados', 1246, NULL, NULL),
(20, 'BY', 'Belarus', 375, NULL, NULL),
(21, 'BE', 'Belgium', 32, NULL, NULL),
(22, 'BZ', 'Belize', 501, NULL, NULL),
(23, 'BJ', 'Benin', 229, NULL, NULL),
(24, 'BM', 'Bermuda', 1441, NULL, NULL),
(25, 'BT', 'Bhutan', 975, NULL, NULL),
(26, 'BO', 'Bolivia', 591, NULL, NULL),
(27, 'BA', 'Bosnia and Herzegovina', 387, NULL, NULL),
(28, 'BW', 'Botswana', 267, NULL, NULL),
(29, 'BV', 'Bouvet Island', 0, NULL, NULL),
(30, 'BR', 'Brazil', 55, NULL, NULL),
(31, 'IO', 'British Indian Ocean Territory', 246, NULL, NULL),
(32, 'BN', 'Brunei', 673, NULL, NULL),
(33, 'BG', 'Bulgaria', 359, NULL, NULL),
(34, 'BF', 'Burkina Faso', 226, NULL, NULL),
(35, 'BI', 'Burundi', 257, NULL, NULL),
(36, 'KH', 'Cambodia', 855, NULL, NULL),
(37, 'CM', 'Cameroon', 237, NULL, NULL),
(38, 'CA', 'Canada', 1, NULL, NULL),
(39, 'CV', 'Cape Verde', 238, NULL, NULL),
(40, 'KY', 'Cayman Islands', 1345, NULL, NULL),
(41, 'CF', 'Central African Republic', 236, NULL, NULL),
(42, 'TD', 'Chad', 235, NULL, NULL),
(43, 'CL', 'Chile', 56, NULL, NULL),
(44, 'CN', 'China', 86, NULL, NULL),
(45, 'CX', 'Christmas Island', 61, NULL, NULL),
(46, 'CC', 'Cocos (Keeling) Islands', 672, NULL, NULL),
(47, 'CO', 'Colombia', 57, NULL, NULL),
(48, 'KM', 'Comoros', 269, NULL, NULL),
(49, 'CG', 'Republic Of The Congo', 242, NULL, NULL),
(50, 'CD', 'Democratic Republic Of The Congo', 242, NULL, NULL),
(51, 'CK', 'Cook Islands', 682, NULL, NULL),
(52, 'CR', 'Costa Rica', 506, NULL, NULL),
(53, 'CI', 'Cote D\'Ivoire (Ivory Coast)', 225, NULL, NULL),
(54, 'HR', 'Croatia (Hrvatska)', 385, NULL, NULL),
(55, 'CU', 'Cuba', 53, NULL, NULL),
(56, 'CY', 'Cyprus', 357, NULL, NULL),
(57, 'CZ', 'Czech Republic', 420, NULL, NULL),
(58, 'DK', 'Denmark', 45, NULL, NULL),
(59, 'DJ', 'Djibouti', 253, NULL, NULL),
(60, 'DM', 'Dominica', 1767, NULL, NULL),
(61, 'DO', 'Dominican Republic', 1809, NULL, NULL),
(62, 'TP', 'East Timor', 670, NULL, NULL),
(63, 'EC', 'Ecuador', 593, NULL, NULL),
(64, 'EG', 'Egypt', 20, NULL, NULL),
(65, 'SV', 'El Salvador', 503, NULL, NULL),
(66, 'GQ', 'Equatorial Guinea', 240, NULL, NULL),
(67, 'ER', 'Eritrea', 291, NULL, NULL),
(68, 'EE', 'Estonia', 372, NULL, NULL),
(69, 'ET', 'Ethiopia', 251, NULL, NULL),
(70, 'XA', 'External Territories of Australia', 61, NULL, NULL),
(71, 'FK', 'Falkland Islands', 500, NULL, NULL),
(72, 'FO', 'Faroe Islands', 298, NULL, NULL),
(73, 'FJ', 'Fiji Islands', 679, NULL, NULL),
(74, 'FI', 'Finland', 358, NULL, NULL),
(75, 'FR', 'France', 33, NULL, NULL),
(76, 'GF', 'French Guiana', 594, NULL, NULL),
(77, 'PF', 'French Polynesia', 689, NULL, NULL),
(78, 'TF', 'French Southern Territories', 0, NULL, NULL),
(79, 'GA', 'Gabon', 241, NULL, NULL),
(80, 'GM', 'Gambia The', 220, NULL, NULL),
(81, 'GE', 'Georgia', 995, NULL, NULL),
(82, 'DE', 'Germany', 49, NULL, NULL),
(83, 'GH', 'Ghana', 233, NULL, NULL),
(84, 'GI', 'Gibraltar', 350, NULL, NULL),
(85, 'GR', 'Greece', 30, NULL, NULL),
(86, 'GL', 'Greenland', 299, NULL, NULL),
(87, 'GD', 'Grenada', 1473, NULL, NULL),
(88, 'GP', 'Guadeloupe', 590, NULL, NULL),
(89, 'GU', 'Guam', 1671, NULL, NULL),
(90, 'GT', 'Guatemala', 502, NULL, NULL),
(91, 'XU', 'Guernsey and Alderney', 44, NULL, NULL),
(92, 'GN', 'Guinea', 224, NULL, NULL),
(93, 'GW', 'Guinea-Bissau', 245, NULL, NULL),
(94, 'GY', 'Guyana', 592, NULL, NULL),
(95, 'HT', 'Haiti', 509, NULL, NULL),
(96, 'HM', 'Heard and McDonald Islands', 0, NULL, NULL),
(97, 'HN', 'Honduras', 504, NULL, NULL),
(98, 'HK', 'Hong Kong S.A.R.', 852, NULL, NULL),
(99, 'HU', 'Hungary', 36, NULL, NULL),
(100, 'IS', 'Iceland', 354, NULL, NULL),
(101, 'IN', 'India', 91, NULL, NULL),
(102, 'ID', 'Indonesia', 62, NULL, NULL),
(103, 'IR', 'Iran', 98, NULL, NULL),
(104, 'IQ', 'Iraq', 964, NULL, NULL),
(105, 'IE', 'Ireland', 353, NULL, NULL),
(106, 'IL', 'Israel', 972, NULL, NULL),
(107, 'IT', 'Italy', 39, NULL, NULL),
(108, 'JM', 'Jamaica', 1876, NULL, NULL),
(109, 'JP', 'Japan', 81, NULL, NULL),
(110, 'XJ', 'Jersey', 44, NULL, NULL),
(111, 'JO', 'Jordan', 962, NULL, NULL),
(112, 'KZ', 'Kazakhstan', 7, NULL, NULL),
(113, 'KE', 'Kenya', 254, NULL, NULL),
(114, 'KI', 'Kiribati', 686, NULL, NULL),
(115, 'KP', 'Korea North', 850, NULL, NULL),
(116, 'KR', 'Korea South', 82, NULL, NULL),
(117, 'KW', 'Kuwait', 965, NULL, NULL),
(118, 'KG', 'Kyrgyzstan', 996, NULL, NULL),
(119, 'LA', 'Laos', 856, NULL, NULL),
(120, 'LV', 'Latvia', 371, NULL, NULL),
(121, 'LB', 'Lebanon', 961, NULL, NULL),
(122, 'LS', 'Lesotho', 266, NULL, NULL),
(123, 'LR', 'Liberia', 231, NULL, NULL),
(124, 'LY', 'Libya', 218, NULL, NULL),
(125, 'LI', 'Liechtenstein', 423, NULL, NULL),
(126, 'LT', 'Lithuania', 370, NULL, NULL),
(127, 'LU', 'Luxembourg', 352, NULL, NULL),
(128, 'MO', 'Macau S.A.R.', 853, NULL, NULL),
(129, 'MK', 'Macedonia', 389, NULL, NULL),
(130, 'MG', 'Madagascar', 261, NULL, NULL),
(131, 'MW', 'Malawi', 265, NULL, NULL),
(132, 'MY', 'Malaysia', 60, NULL, NULL),
(133, 'MV', 'Maldives', 960, NULL, NULL),
(134, 'ML', 'Mali', 223, NULL, NULL),
(135, 'MT', 'Malta', 356, NULL, NULL),
(136, 'XM', 'Man (Isle of)', 44, NULL, NULL),
(137, 'MH', 'Marshall Islands', 692, NULL, NULL),
(138, 'MQ', 'Martinique', 596, NULL, NULL),
(139, 'MR', 'Mauritania', 222, NULL, NULL),
(140, 'MU', 'Mauritius', 230, NULL, NULL),
(141, 'YT', 'Mayotte', 269, NULL, NULL),
(142, 'MX', 'Mexico', 52, NULL, NULL),
(143, 'FM', 'Micronesia', 691, NULL, NULL),
(144, 'MD', 'Moldova', 373, NULL, NULL),
(145, 'MC', 'Monaco', 377, NULL, NULL),
(146, 'MN', 'Mongolia', 976, NULL, NULL),
(147, 'MS', 'Montserrat', 1664, NULL, NULL),
(148, 'MA', 'Morocco', 212, NULL, NULL),
(149, 'MZ', 'Mozambique', 258, NULL, NULL),
(150, 'MM', 'Myanmar', 95, NULL, NULL),
(151, 'NA', 'Namibia', 264, NULL, NULL),
(152, 'NR', 'Nauru', 674, NULL, NULL),
(153, 'NP', 'Nepal', 977, NULL, NULL),
(154, 'AN', 'Netherlands Antilles', 599, NULL, NULL),
(155, 'NL', 'Netherlands The', 31, NULL, NULL),
(156, 'NC', 'New Caledonia', 687, NULL, NULL),
(157, 'NZ', 'New Zealand', 64, NULL, NULL),
(158, 'NI', 'Nicaragua', 505, NULL, NULL),
(159, 'NE', 'Niger', 227, NULL, NULL),
(160, 'NG', 'Nigeria', 234, NULL, NULL),
(161, 'NU', 'Niue', 683, NULL, NULL),
(162, 'NF', 'Norfolk Island', 672, NULL, NULL),
(163, 'MP', 'Northern Mariana Islands', 1670, NULL, NULL),
(164, 'NO', 'Norway', 47, NULL, NULL),
(165, 'OM', 'Oman', 968, NULL, NULL),
(166, 'PK', 'Pakistan', 92, NULL, NULL),
(167, 'PW', 'Palau', 680, NULL, NULL),
(168, 'PS', 'Palestinian Territory Occupied', 970, NULL, NULL),
(169, 'PA', 'Panama', 507, NULL, NULL),
(170, 'PG', 'Papua new Guinea', 675, NULL, NULL),
(171, 'PY', 'Paraguay', 595, NULL, NULL),
(172, 'PE', 'Peru', 51, NULL, NULL),
(173, 'PH', 'Philippines', 63, NULL, NULL),
(174, 'PN', 'Pitcairn Island', 0, NULL, NULL),
(175, 'PL', 'Poland', 48, NULL, NULL),
(176, 'PT', 'Portugal', 351, NULL, NULL),
(177, 'PR', 'Puerto Rico', 1787, NULL, NULL),
(178, 'QA', 'Qatar', 974, NULL, NULL),
(179, 'RE', 'Reunion', 262, NULL, NULL),
(180, 'RO', 'Romania', 40, NULL, NULL),
(181, 'RU', 'Russia', 70, NULL, NULL),
(182, 'RW', 'Rwanda', 250, NULL, NULL),
(183, 'SH', 'Saint Helena', 290, NULL, NULL),
(184, 'KN', 'Saint Kitts And Nevis', 1869, NULL, NULL),
(185, 'LC', 'Saint Lucia', 1758, NULL, NULL),
(186, 'PM', 'Saint Pierre and Miquelon', 508, NULL, NULL),
(187, 'VC', 'Saint Vincent And The Grenadines', 1784, NULL, NULL),
(188, 'WS', 'Samoa', 684, NULL, NULL),
(189, 'SM', 'San Marino', 378, NULL, NULL),
(190, 'ST', 'Sao Tome and Principe', 239, NULL, NULL),
(191, 'SA', 'Saudi Arabia', 966, NULL, NULL),
(192, 'SN', 'Senegal', 221, NULL, NULL),
(193, 'RS', 'Serbia', 381, NULL, NULL),
(194, 'SC', 'Seychelles', 248, NULL, NULL),
(195, 'SL', 'Sierra Leone', 232, NULL, NULL),
(196, 'SG', 'Singapore', 65, NULL, NULL),
(197, 'SK', 'Slovakia', 421, NULL, NULL),
(198, 'SI', 'Slovenia', 386, NULL, NULL),
(199, 'XG', 'Smaller Territories of the UK', 44, NULL, NULL),
(200, 'SB', 'Solomon Islands', 677, NULL, NULL),
(201, 'SO', 'Somalia', 252, NULL, NULL),
(202, 'ZA', 'South Africa', 27, NULL, NULL),
(203, 'GS', 'South Georgia', 0, NULL, NULL),
(204, 'SS', 'South Sudan', 211, NULL, NULL),
(205, 'ES', 'Spain', 34, NULL, NULL),
(206, 'LK', 'Sri Lanka', 94, NULL, NULL),
(207, 'SD', 'Sudan', 249, NULL, NULL),
(208, 'SR', 'Suriname', 597, NULL, NULL),
(209, 'SJ', 'Svalbard And Jan Mayen Islands', 47, NULL, NULL),
(210, 'SZ', 'Swaziland', 268, NULL, NULL),
(211, 'SE', 'Sweden', 46, NULL, NULL),
(212, 'CH', 'Switzerland', 41, NULL, NULL),
(213, 'SY', 'Syria', 963, NULL, NULL),
(214, 'TW', 'Taiwan', 886, NULL, NULL),
(215, 'TJ', 'Tajikistan', 992, NULL, NULL),
(216, 'TZ', 'Tanzania', 255, NULL, NULL),
(217, 'TH', 'Thailand', 66, NULL, NULL),
(218, 'TG', 'Togo', 228, NULL, NULL),
(219, 'TK', 'Tokelau', 690, NULL, NULL),
(220, 'TO', 'Tonga', 676, NULL, NULL),
(221, 'TT', 'Trinidad And Tobago', 1868, NULL, NULL),
(222, 'TN', 'Tunisia', 216, NULL, NULL),
(223, 'TR', 'Turkey', 90, NULL, NULL),
(224, 'TM', 'Turkmenistan', 7370, NULL, NULL),
(225, 'TC', 'Turks And Caicos Islands', 1649, NULL, NULL),
(226, 'TV', 'Tuvalu', 688, NULL, NULL),
(227, 'UG', 'Uganda', 256, NULL, NULL),
(228, 'UA', 'Ukraine', 380, NULL, NULL),
(229, 'AE', 'United Arab Emirates', 971, NULL, NULL),
(230, 'GB', 'United Kingdom', 44, NULL, NULL),
(231, 'US', 'United States', 1, NULL, NULL),
(232, 'UM', 'United States Minor Outlying Islands', 1, NULL, NULL),
(233, 'UY', 'Uruguay', 598, NULL, NULL),
(234, 'UZ', 'Uzbekistan', 998, NULL, NULL),
(235, 'VU', 'Vanuatu', 678, NULL, NULL),
(236, 'VA', 'Vatican City State (Holy See)', 39, NULL, NULL),
(237, 'VE', 'Venezuela', 58, NULL, NULL),
(238, 'VN', 'Vietnam', 84, NULL, NULL),
(239, 'VG', 'Virgin Islands (British)', 1284, NULL, NULL),
(240, 'VI', 'Virgin Islands (US)', 1340, NULL, NULL),
(241, 'WF', 'Wallis And Futuna Islands', 681, NULL, NULL),
(242, 'EH', 'Western Sahara', 212, NULL, NULL),
(243, 'YE', 'Yemen', 967, NULL, NULL),
(244, 'YU', 'Yugoslavia', 38, NULL, NULL),
(245, 'ZM', 'Zambia', 260, NULL, NULL),
(246, 'ZW', 'Zimbabwe', 263, NULL, NULL);


-- --------------------------------------------------------

--
-- Table structure for table `education_masters`
--

CREATE TABLE `education_masters` (
  `id` bigint UNSIGNED NOT NULL,
  `course_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `body` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `subject`, `type`, `body`, `createdAt`, `updatedAt`) VALUES
(4, 'Registration', 'Registration', '<div>\n        <h1>Hi {{AV_name}} Welcome  to avnik.com </h1>\n        <table class=\"table\">\n            <thead>\n            <th>Name</th>\n            <th>Email</th>\n            <th>Phone</th>\n            <th>User Name</th>\n            </thead>\n            <tbody>\n                <tr>\n                <td>{{AV_name}}</td>\n                    <td>{{AV_email}}</td>\n                    <td>{{AV_phone}}</td>\n                    <td>{{AV_userName}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>', '2023-01-30 08:14:11', '2023-01-30 10:01:21'),
(5, 'Create Event Email', 'CreateEventEmail', '<p>Hi {{AV_name}},</p>\n<p>event cost </p>\n<p>Welcome to Avnik! We\'re so glad you\'re here.</p>\n<p></p>\n<p>We know you\'re busy, so we\'ll try to keep this short and sweet.</p>\n<p></p>\n<p>Here are a few things you can do to get started:</p>\n<p></p>\n<p>Check out our website: We have a lot of great information on our website, including blog posts, product reviews, and more.</p>\n<p>Sign up for our newsletter: We\'ll send you regular updates on new products, sales, and other special offers.</p>\n<p>Follow us on social media: We\'re on Facebook, Twitter, and Instagram. You can connect with us to stay up-to-date on the latest news and happenings.</p>\n<p>We\'re always looking for ways to improve, so please don\'t hesitate to contact us with any feedback or suggestions.</p>\n<p></p>ΩΩΩΩ\n<p>Thanks again for choosing Avnik. We hope you enjoy your stay!</p>\n<p></p>\n<p>Sincerely,</p>\n<p>Avnik Kasliwal</p>', '2023-01-30 08:14:11', '2023-01-30 10:01:21'),
(6, 'New Booking Host Email', 'NewBookingHostEmail', 'Dear {{AV_name}},\n you have a booking \n{{AV_eventUrl}}\n\nSincerely,\n\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(7, 'New Booking User Email', 'NewBookingUserEmail', 'Dear {{AV_name}},\n\nThank you for booking with us! We are excited to have you as a guest.\n\nYour booking details are as follows:\n\n* Booking ID: {{AV_orderId}}\n\n{{AV_eventUrl}}\n\nSincerely,\n\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(8, 'New Booking User Email', 'HostToUserCancelEventEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(9, 'Host Cancel Event Email', 'HostCancelEventEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(10, 'User Cancel Event Email', 'UserCancelEventEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(11, 'Received Host Review Email', 'ReceivedHostReviewEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(12, 'Get Reply On Given User Review Email', 'GetReplyOnGivenUserReviewEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(13, 'Message Received Email', 'MessageReceivedEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(14, 'File Purchased Host Email', 'FilePurchasedHostEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(15, 'File Purchased User Email', 'FilePurchasedUserEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(16, 'Tip Received Email', 'TipReceivedEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(17, 'Meeting Time Extend Payment Email', 'MeetingTimeExtendPaymentEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(18, 'Meeting Time Extend Payment Received Email', 'MeetingTimeExtendPaymentReceivedEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(19, 'Share Event Email', 'ShareEventEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(20, 'Share Profile Email', 'ShareProfileEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(21, 'Event Start Alert Email', 'EventStartAlertEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(22, 'Withdrawn Money Email', 'WithdrawnMoneyEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(23, 'Added New Bank Account Email', 'AddedNewBankAccountEmail', 'Dear {{AV_name}},\r\n\r\nThank you for booking with us! We are excited to have you as a guest.\r\n\r\nYour booking details are as follows:\r\n\r\n* Booking ID: {{AV_orderId}}\r\n\r\n{{AV_eventUrl}}\r\n\r\nSincerely,\r\n\r\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(24, 'Registration Confirmation Email', 'RegistrationConfirmationEmail', 'Dear {{AV_name}},\n\nThank you for booking with us! We are excited to have you as a guest.\n\nYour booking details are as follows:\n\n* Booking ID: {{AV_orderId}}\n\n{{AV_eventUrl}}\n\nSincerely,\n\nAvnik.comDear {{AV_name}},\n\nThank you for register with us! We are excited to have you as a member.\n\nYour email conformation Link:\n{{AV_conformationUrl}}\nSincerely,\n\nAvnik.com', '2023-06-07 22:59:57', '2023-06-07 22:59:57'),
(25, 'Password Reset Email', 'ForgotPassword', '<p>Dear user_name,</p><p><br></p><p>We\'ve received a request to reset your password for your Avnik_name account.</p><p><br></p><p>If you requested this password reset, please click on the link below to create a new password:</p><p><br></p><p>[Password Reset Link]</p><p><br></p><p>If you did not request this password reset, please ignore this email and contact our support team.</p><p><br></p><p>Best regards</p><p>Avnik_name Team</p>', '2023-06-07 22:59:57', '2026-03-30 16:50:50'),
(26, 'New', 'EmailConfirmation', '<p>asdasd</p>\n', '2024-01-05 20:46:27', '2024-01-05 20:46:27');


-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `event_files` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_visible` tinyint(1) NOT NULL DEFAULT '1',
  `event_repeat_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_repeat_interval` int NOT NULL DEFAULT '1',
  `event_repeat_by_day` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_sub_category` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_category` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_invited_people` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `number_of_seats` bigint DEFAULT NULL,
  `event_invited_by_email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_invited_note` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `steps` int NOT NULL DEFAULT '0',
  `auto_accept_participant` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `date_of_create` date DEFAULT NULL,
  `timezone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eventSubscriptionType` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` int NOT NULL DEFAULT '1',
  `parent_event_id` bigint DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `cost` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_activities`
--

CREATE TABLE `event_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `event_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_bookings`
--

CREATE TABLE `event_bookings` (
  `id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `event_slot_id` bigint UNSIGNED NOT NULL,
  `p_user_id` bigint UNSIGNED NOT NULL,
  `h_user_id` bigint UNSIGNED NOT NULL,
  `meeting_room_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_server_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_start_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_end_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `start_date` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `booked_seats` int NOT NULL DEFAULT '0',
  `duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `total_seats` int NOT NULL DEFAULT '1',
  `cost` int NOT NULL DEFAULT '0',
  `cost_type` enum('free','paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'free',
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enabled',
  `delete_status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `host_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_duration` int DEFAULT NULL,
  `current_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_discounts`
--

CREATE TABLE `event_discounts` (
  `id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `people` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `offer` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_files`
--

CREATE TABLE `event_files` (
  `id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `file_manager_id` bigint UNSIGNED NOT NULL,
  `file_title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file_cost` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `size` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_file_payments`
--

CREATE TABLE `event_file_payments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `to_user_id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `event_file_fk_id` bigint UNSIGNED NOT NULL,
  `pay_by` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payer_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount_refunded` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `withdraw_amount` tinyint(1) NOT NULL DEFAULT '0',
  `event_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_payments`
--

CREATE TABLE `event_payments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `event_time_slot_id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `to_user` int NOT NULL DEFAULT '0',
  `blocked_user` tinyint NOT NULL DEFAULT '0',
  `withdraw_amount` tinyint(1) NOT NULL DEFAULT '0',
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `event_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `card_brand` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `extended` tinyint NOT NULL DEFAULT '0',
  `with_extended` tinyint NOT NULL DEFAULT '0',
  `extended_id` int DEFAULT NULL,
  `accept_by_host` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `amount_refunded` tinyint(1) DEFAULT '0',
  `refunded_amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `refunded_percentage` int NOT NULL DEFAULT '0',
  `refund_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_transaction` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_reports`
--

CREATE TABLE `event_reports` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `r_event_id` int DEFAULT NULL,
  `r_user_id` int DEFAULT NULL,
  `report` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_reviews`
--

CREATE TABLE `event_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `slot_id` bigint UNSIGNED NOT NULL,
  `receiver_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `host_id` bigint NOT NULL DEFAULT '0',
  `comment_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `comment_to_host` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment_to_user` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` double(8,2) NOT NULL DEFAULT '0.00',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_time_slots`
--

CREATE TABLE `event_time_slots` (
  `id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `meeting_room_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_server_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_start_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_room_end_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `start_date` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `booked_seats` int NOT NULL DEFAULT '0',
  `duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `total_seats` int NOT NULL DEFAULT '1',
  `cost` int NOT NULL DEFAULT '0',
  `cost_type` enum('free','paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'free',
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enabled',
  `current_duration` int DEFAULT NULL,
  `current_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `event_tip_payments`
--

CREATE TABLE `event_tip_payments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `to_user_id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `event_slot_id` bigint UNSIGNED NOT NULL,
  `pay_by` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payer_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount_refunded` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `withdraw_amount` int NOT NULL DEFAULT '0',
  `refund_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extend_durations`
--

CREATE TABLE `extend_durations` (
  `id` bigint UNSIGNED NOT NULL,
  `cost` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `room_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `to_user` bigint UNSIGNED NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_events`
--

CREATE TABLE `favorite_events` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_users`
--

CREATE TABLE `favorite_users` (
  `id` bigint UNSIGNED NOT NULL,
  `from_user_id` bigint UNSIGNED NOT NULL,
  `to_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_managers`
--

CREATE TABLE `file_managers` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `size` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDirectory` tinyint(1) NOT NULL DEFAULT '0',
  `from` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `language_masters`
--

CREATE TABLE `language_masters` (
  `id` bigint UNSIGNED NOT NULL,
  `short_code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `native_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `language_masters`
--

INSERT INTO `language_masters` (`id`, `short_code`, `name`, `native_name`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'ab', 'Abkhaz', 'Ð°Ò§ÑÑƒÐ°', NULL, NULL, NULL),
(2, 'aa', 'Afar', 'Afaraf', NULL, NULL, NULL),
(3, 'af', 'Afrikaans', 'Afrikaans', NULL, NULL, NULL),
(4, 'ak', 'Akan', 'Akan', NULL, NULL, NULL),
(5, 'sq', 'Albanian', 'Shqip', NULL, NULL, NULL),
(6, 'am', 'Amharic', 'áŠ áˆ›áˆ­áŠ›', NULL, NULL, NULL),
(7, 'ar', 'Arabic', 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', NULL, NULL, NULL),
(8, 'an', 'Aragonese', 'AragonÃ©s', NULL, NULL, NULL),
(9, 'hy', 'Armenian', 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶', NULL, NULL, NULL),
(10, 'as', 'Assamese', 'à¦…à¦¸à¦®à§€à¦¯à¦¼à¦¾', NULL, NULL, NULL),
(11, 'av', 'Avaric', 'Ð°Ð²Ð°Ñ€ Ð¼Ð°Ñ†Ó€, Ð¼Ð°Ð³Ó€Ð°Ñ€ÑƒÐ» Ð¼Ð°Ñ†Ó€', NULL, NULL, NULL),
(12, 'ae', 'Avestan', 'avesta', NULL, NULL, NULL),
(13, 'ay', 'Aymara', 'aymar aru', NULL, NULL, NULL),
(14, 'az', 'Azerbaijani', 'azÉ™rbaycan dili', NULL, NULL, NULL),
(15, 'bm', 'Bambara', 'bamanankan', NULL, NULL, NULL),
(16, 'ba', 'Bashkir', 'Ð±Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ Ñ‚ÐµÐ»Ðµ', NULL, NULL, NULL),
(17, 'eu', 'Basque', 'euskara, euskera', NULL, NULL, NULL),
(18, 'be', 'Belarusian', 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÐ°Ñ', NULL, NULL, NULL),
(19, 'bn', 'Bengali', 'à¦¬à¦¾à¦‚à¦²à¦¾', NULL, NULL, NULL),
(20, 'bh', 'Bihari', 'à¤­à¥‹à¤œà¤ªà¥à¤°à¥€', NULL, NULL, NULL),
(21, 'bi', 'Bislama', 'Bislama', NULL, NULL, NULL),
(22, 'bs', 'Bosnian', 'bosanski jezik', NULL, NULL, NULL),
(23, 'br', 'Breton', 'brezhoneg', NULL, NULL, NULL),
(24, 'bg', 'Bulgarian', 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ ÐµÐ·Ð¸Ðº', NULL, NULL, NULL),
(25, 'my', 'Burmese', 'á€—á€™á€¬á€…á€¬', NULL, NULL, NULL),
(26, 'ca', 'Catalan;
 Valencian', 'CatalÃ', NULL, NULL, NULL),
(27, 'ch', 'Chamorro', 'Chamoru', NULL, NULL, NULL),
(28, 'ce', 'Chechen', 'Ð½Ð¾Ñ…Ñ‡Ð¸Ð¹Ð½ Ð¼Ð¾Ñ‚Ñ‚', NULL, NULL, NULL),
(29, 'ny', 'Chichewa; Chewa; Nyanja', 'chiCheÅµa, chinyanja', NULL, NULL, NULL),
(30, 'zh', 'Chinese', 'ä¸­æ–‡ (ZhÅngwÃ©n), æ±‰è¯­, æ¼¢èªž', NULL, NULL, NULL),
(31, 'cv', 'Chuvash', 'Ñ‡Ó‘Ð²Ð°Ñˆ Ñ‡Ó—Ð»Ñ…Ð¸', NULL, NULL, NULL),
(32, 'kw', 'Cornish', 'Kernewek', NULL, NULL, NULL),
(33, 'co', 'Corsican', 'corsu, lingua corsa', NULL, NULL, NULL),
(34, 'cr', 'Cree', 'á“€á¦áƒá”­ááá£', NULL, NULL, NULL),
(35, 'hr', 'Croatian', 'hrvatski', NULL, NULL, NULL),
(36, 'cs', 'Czech', 'Äesky, ÄeÅ¡tina', NULL, NULL, NULL),
(37, 'da', 'Danish', 'dansk', NULL, NULL, NULL),
(38, 'dv', 'Divehi; Dhivehi; Maldivian;', 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨', NULL, NULL, NULL),
(39, 'nl', 'Dutch', 'Nederlands, Vlaams', NULL, NULL, NULL),
(40, 'en', 'English', 'English', NULL, NULL, NULL),
(41, 'eo', 'Esperanto', 'Esperanto', NULL, NULL, NULL),
(42, 'et', 'Estonian', 'eesti, eesti keel', NULL, NULL, NULL),
(43, 'ee', 'Ewe', 'EÊ‹egbe', NULL, NULL, NULL),
(44, 'fo', 'Faroese', 'fÃ¸royskt', NULL, NULL, NULL),
(45, 'fj', 'Fijian', 'vosa Vakaviti', NULL, NULL, NULL),
(46, 'fi', 'Finnish', 'suomi, suomen kieli', NULL, NULL, NULL),
(47, 'fr', 'French', 'franÃ§ais, langue franÃ§aise', NULL, NULL, NULL),
(48, 'ff', 'Fula; Fulah; Pulaar; Pular', 'Fulfulde, Pulaar, Pular', NULL, NULL, NULL),
(49, 'gl', 'Galician', 'Galego', NULL, NULL, NULL),
(50, 'ka', 'Georgian', 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜', NULL, NULL, NULL),
(51, 'de', 'German', 'Deutsch', NULL, NULL, NULL),
(52, 'el', 'Greek, Modern', 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬', NULL, NULL, NULL),
(53, 'gn', 'GuaranÃ­', 'AvaÃ±eáº½', NULL, NULL, NULL),
(54, 'gu', 'Gujarati', 'àª—à«àªœàª°àª¾àª¤à«€', NULL, NULL, NULL),
(55, 'ht', 'Haitian; Haitian Creole', 'KreyÃ²l ayisyen', NULL, NULL, NULL),
(56, 'ha', 'Hausa', 'Hausa, Ù‡ÙŽÙˆÙØ³ÙŽ', NULL, NULL, NULL),
(57, 'he', 'Hebrew (modern)', '×¢×‘×¨×™×ª', NULL, NULL, NULL),
(58, 'hz', 'Herero', 'Otjiherero', NULL, NULL, NULL),
(59, 'hi', 'Hindi', 'à¤¹à¤¿à¤¨à¥à¤¦à¥€, à¤¹à¤¿à¤‚à¤¦à¥€', NULL, NULL, NULL),
(60, 'ho', 'Hiri Motu', 'Hiri Motu', NULL, NULL, NULL),
(61, 'hu', 'Hungarian', 'Magyar', NULL, NULL, NULL),
(62, 'ia', 'Interlingua', 'Interlingua', NULL, NULL, NULL),
(63, 'id', 'Indonesian', 'Bahasa Indonesia', NULL, NULL, NULL),
(64, 'ie', 'Interlingue', 'Originally called Occidental; then Interlingue after WWII', NULL, NULL, NULL),
(65, 'ga', 'Irish', 'Gaeilge', NULL, NULL, NULL),
(66, 'ig', 'Igbo', 'Asá»¥sá»¥ Igbo', NULL, NULL, NULL),
(67, 'ik', 'Inupiaq', 'IÃ±upiaq, IÃ±upiatun', NULL, NULL, NULL),
(68, 'io', 'Ido', 'Ido', NULL, NULL, NULL),
(69, 'is', 'Icelandic', 'Ãslenska', NULL, NULL, NULL),
(70, 'it', 'Italian', 'Italiano', NULL, NULL, NULL),
(71, 'iu', 'Inuktitut', 'áƒá“„á’ƒá‘Žá‘á‘¦', NULL, NULL, NULL),
(72, 'ja', 'Japanese', 'æ—¥æœ¬èªž (ã«ã»ã‚“ã”ï¼ã«ã£ã½ã‚“ã”)', NULL, NULL, NULL),
(73, 'jv', 'Javanese', 'basa Jawa', NULL, NULL, NULL),
(74, 'kl', 'Kalaallisut, Greenlandic', 'kalaallisut, kalaallit oqaasii', NULL, NULL, NULL),
(75, 'kn', 'Kannada', 'à²•à²¨à³à²¨à²¡', NULL, NULL, NULL),
(76, 'kr', 'Kanuri', 'Kanuri', NULL, NULL, NULL),
(77, 'ks', 'Kashmiri', 'à¤•à¤¶à¥à¤®à¥€à¤°à¥€, ÙƒØ´Ù…ÙŠØ±ÙŠâ€Ž', NULL, NULL, NULL),
(78, 'kk', 'Kazakh', 'ÒšÐ°Ð·Ð°Ò› Ñ‚Ñ–Ð»Ñ–', NULL, NULL, NULL),
(79, 'km', 'Khmer', 'áž—áž¶ážŸáž¶ážáŸ’áž˜áŸ‚ážš', NULL, NULL, NULL),
(80, 'ki', 'Kikuyu, Gikuyu', 'GÄ©kÅ©yÅ©', NULL, NULL, NULL),
(81, 'rw', 'Kinyarwanda', 'Ikinyarwanda', NULL, NULL, NULL),
(82, 'ky', 'Kirghiz, Kyrgyz', 'ÐºÑ‹Ñ€Ð³Ñ‹Ð· Ñ‚Ð¸Ð»Ð¸', NULL, NULL, NULL),
(83, 'kv', 'Komi', 'ÐºÐ¾Ð¼Ð¸ ÐºÑ‹Ð²', NULL, NULL, NULL),
(84, 'kg', 'Kongo', 'KiKongo', NULL, NULL, NULL),
(85, 'ko', 'Korean', 'í•œêµ­ì–´ (éŸ“åœ‹èªž), ì¡°ì„ ë§ (æœé®®èªž)', NULL, NULL, NULL),
(86, 'ku', 'Kurdish', 'KurdÃ®, ÙƒÙˆØ±Ø¯ÛŒâ€Ž', NULL, NULL, NULL),
(87, 'kj', 'Kwanyama, Kuanyama', 'Kuanyama', NULL, NULL, NULL),
(88, 'la', 'Latin', 'latine, lingua latina', NULL, NULL, NULL),
(89, 'lb', 'Luxembourgish, Letzeburgesch', 'LÃ«tzebuergesch', NULL, NULL, NULL),
(90, 'lg', 'Luganda', 'Luganda', NULL, NULL, NULL),
(91, 'li', 'Limburgish, Limburgan, Limburger', 'Limburgs', NULL, NULL, NULL),
(92, 'ln', 'Lingala', 'LingÃ¡la', NULL, NULL, NULL),
(93, 'lo', 'Lao', 'àºžàº²àºªàº²àº¥àº²àº§', NULL, NULL, NULL),
(94, 'lt', 'Lithuanian', 'lietuviÅ³ kalba', NULL, NULL, NULL),
(95, 'lu', 'Luba-Katanga', NULL, NULL, NULL, NULL),
(96, 'lv', 'Latvian', 'latvieÅ¡u valoda', NULL, NULL, NULL),
(97, 'gv', 'Manx', 'Gaelg, Gailck', NULL, NULL, NULL),
(98, 'mk', 'Macedonian', 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº', NULL, NULL, NULL),
(99, 'mg', 'Malagasy', 'Malagasy fiteny', NULL, NULL, NULL),
(100, 'ms', 'Malay', 'bahasa Melayu, Ø¨Ù‡Ø§Ø³ Ù…Ù„Ø§ÙŠÙˆâ€Ž', NULL, NULL, NULL),
(101, 'ml', 'Malayalam', 'à´®à´²à´¯à´¾à´³à´‚', NULL, NULL, NULL),
(102, 'mt', 'Maltese', 'Malti', NULL, NULL, NULL),
(103, 'mi', 'MÄori', 'te reo MÄori', NULL, NULL, NULL),
(104, 'mr', 'Marathi (MarÄá¹­hÄ«)', 'à¤®à¤°à¤¾à¤ à¥€', NULL, NULL, NULL),
(105, 'mh', 'Marshallese', 'Kajin MÌ§ajeÄ¼', NULL, NULL, NULL),
(106, 'mn', 'Mongolian', 'Ð¼Ð¾Ð½Ð³Ð¾Ð»', NULL, NULL, NULL),
(107, 'na', 'Nauru', 'EkakairÅ© Naoero', NULL, NULL, NULL),
(108, 'nv', 'Navajo, Navaho', 'DinÃ© bizaad, DinÃ©kÊ¼ehÇ°Ã­', NULL, NULL, NULL),
(109, 'nb', 'Norwegian BokmÃ¥l', 'Norsk bokmÃ¥l', NULL, NULL, NULL),
(110, 'nd', 'North Ndebele', 'isiNdebele', NULL, NULL, NULL),
(111, 'ne', 'Nepali', 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€', NULL, NULL, NULL),
(112, 'ng', 'Ndonga', 'Owambo', NULL, NULL, NULL),
(113, 'nn', 'Norwegian Nynorsk', 'Norsk nynorsk', NULL, NULL, NULL),
(114, 'no', 'Norwegian', 'Norsk', NULL, NULL, NULL),
(115, 'ii', 'Nuosu', 'ê†ˆêŒ ê’¿ Nuosuhxop', NULL, NULL, NULL),
(116, 'nr', 'South Ndebele', 'isiNdebele', NULL, NULL, NULL),
(117, 'oc', 'Occitan', 'Occitan', NULL, NULL, NULL),
(118, 'oj', 'Ojibwe, Ojibwa', 'áŠá“‚á”‘á“ˆá¯á’§áŽá“', NULL, NULL, NULL),
(119, 'cu', 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic', 'Ñ©Ð·Ñ‹ÐºÑŠ ÑÐ»Ð¾Ð²Ñ£Ð½ÑŒÑÐºÑŠ', NULL, NULL, NULL),
(120, 'om', 'Oromo', 'Afaan Oromoo', NULL, NULL, NULL),
(121, 'or', 'Oriya', 'à¬“à¬¡à¬¼à¬¿à¬†', NULL, NULL, NULL),
(122, 'os', 'Ossetian, Ossetic', 'Ð¸Ñ€Ð¾Ð½ Ã¦Ð²Ð·Ð°Ð³', NULL, NULL, NULL),
(123, 'pa', 'Panjabi, Punjabi', 'à¨ªà©°à¨œà¨¾à¨¬à©€, Ù¾Ù†Ø¬Ø§Ø¨ÛŒâ€Ž', NULL, NULL, NULL),
(124, 'pi', 'PÄli', 'à¤ªà¤¾à¤´à¤¿', NULL, NULL, NULL),
(125, 'fa', 'Persian', 'ÙØ§Ø±Ø³ÛŒ', NULL, NULL, NULL),
(126, 'pl', 'Polish', 'polski', NULL, NULL, NULL),
(127, 'ps', 'Pashto, Pushto', 'Ù¾ÚšØªÙˆ', NULL, NULL, NULL),
(128, 'pt', 'Portuguese', 'PortuguÃªs', NULL, NULL, NULL),
(129, 'qu', 'Quechua', 'Runa Simi, Kichwa', NULL, NULL, NULL),
(130, 'rm', 'Romansh', 'rumantsch grischun', NULL, NULL, NULL),
(131, 'rn', 'Kirundi', 'kiRundi', NULL, NULL, NULL),
(132, 'ro', 'Romanian, Moldavian, Moldovan', 'romÃ¢nÄƒ', NULL, NULL, NULL),
(133, 'ru', 'Russian', 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ ÑÐ·Ñ‹Ðº', NULL, NULL, NULL),
(134, 'sa', 'Sanskrit (Saá¹ská¹›ta)', 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤®à¥', NULL, NULL, NULL),
(135, 'sc', 'Sardinian', 'sardu', NULL, NULL, NULL),
(136, 'sd', 'Sindhi', 'à¤¸à¤¿à¤¨à¥à¤§à¥€, Ø³Ù†ÚŒÙŠØŒ Ø³Ù†Ø¯Ú¾ÛŒâ€Ž', NULL, NULL, NULL),
(137, 'se', 'Northern Sami', 'DavvisÃ¡megiella', NULL, NULL, NULL),
(138, 'sm', 'Samoan', 'gagana faa Samoa', NULL, NULL, NULL),
(139, 'sg', 'Sango', 'yÃ¢ngÃ¢ tÃ® sÃ¤ngÃ¶', NULL, NULL, NULL),
(140, 'sr', 'Serbian', 'ÑÑ€Ð¿ÑÐºÐ¸ Ñ˜ÐµÐ·Ð¸Ðº', NULL, NULL, NULL),
(141, 'gd', 'Scottish Gaelic; Gaelic', 'GÃ idhlig', NULL, NULL, NULL),
(142, 'sn', 'Shona', 'chiShona', NULL, NULL, NULL),
(143, 'si', 'Sinhala, Sinhalese', 'à·ƒà·’à¶‚à·„à¶½', NULL, NULL, NULL),
(144, 'sk', 'Slovak', 'slovenÄina', NULL, NULL, NULL),
(145, 'sl', 'Slovene', 'slovenÅ¡Äina', NULL, NULL, NULL),
(146, 'so', 'Somali', 'Soomaaliga, af Soomaali', NULL, NULL, NULL),
(147, 'st', 'Southern Sotho', 'Sesotho', NULL, NULL, NULL),
(148, 'es', 'Spanish; Castilian', 'espaÃ±ol, castellano', NULL, NULL, NULL),
(149, 'su', 'Sundanese', 'Basa Sunda', NULL, NULL, NULL),
(150, 'sw', 'Swahili', 'Kiswahili', NULL, NULL, NULL),
(151, 'ss', 'Swati', 'SiSwati', NULL, NULL, NULL),
(152, 'sv', 'Swedish', 'svenska', NULL, NULL, NULL),
(153, 'ta', 'Tamil', 'à®¤à®®à®¿à®´à¯', NULL, NULL, NULL),
(154, 'te', 'Telugu', 'à°¤à±†à°²à±à°—à±', NULL, NULL, NULL),
(155, 'tg', 'Tajik', 'Ñ‚Ð¾Ò·Ð¸ÐºÓ£, toÄŸikÄ«, ØªØ§Ø¬ÛŒÚ©ÛŒâ€Ž', NULL, NULL, NULL),
(156, 'th', 'Thai', 'à¹„à¸—à¸¢', NULL, NULL, NULL),
(157, 'ti', 'Tigrinya', 'á‰µáŒáˆ­áŠ›', NULL, NULL, NULL),
(158, 'bo', 'Tibetan Standard, Tibetan, Central', 'à½–à½¼à½‘à¼‹à½¡à½²à½‚', NULL, NULL, NULL),
(159, 'tk', 'Turkmen', 'TÃ¼rkmen, Ð¢Ò¯Ñ€ÐºÐ¼ÐµÐ½', NULL, NULL, NULL),
(160, 'tl', 'Tagalog', 'Wikang Tagalog, áœáœ’áœƒáœ…áœ” áœ†áœ„áœŽáœ“áœ„áœ”', NULL, NULL, NULL),
(161, 'tn', 'Tswana', 'Setswana', NULL, NULL, NULL),
(162, 'to', 'Tonga (Tonga Islands)', 'faka Tonga', NULL, NULL, NULL),
(163, 'tr', 'Turkish', 'TÃ¼rkÃ§e', NULL, NULL, NULL),
(164, 'ts', 'Tsonga', 'Xitsonga', NULL, NULL, NULL),
(165, 'tt', 'Tatar', 'Ñ‚Ð°Ñ‚Ð°Ñ€Ñ‡Ð°, tatarÃ§a, ØªØ§ØªØ§Ø±Ú†Ø§â€Ž', NULL, NULL, NULL),
(166, 'tw', 'Twi', 'Twi', NULL, NULL, NULL),
(167, 'ty', 'Tahitian', 'Reo Tahiti', NULL, NULL, NULL),
(168, 'ug', 'Uighur, Uyghur', 'UyÆ£urqÉ™, Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û•â€Ž', NULL, NULL, NULL),
(169, 'uk', 'Ukrainian', 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°', NULL, NULL, NULL),
(170, 'ur', 'Urdu', 'Ø§Ø±Ø¯Ùˆ', NULL, NULL, NULL),
(171, 'uz', 'Uzbek', 'zbek, ÐŽÐ·Ð±ÐµÐº, Ø£Û‡Ø²Ø¨ÛÙƒâ€Ž', NULL, NULL, NULL),
(172, 've', 'Venda', 'Tshivená¸“a', NULL, NULL, NULL),
(173, 'vi', 'Vietnamese', 'Tiáº¿ng Viá»‡t', NULL, NULL, NULL),
(174, 'vo', 'VolapÃ¼k', 'VolapÃ¼k', NULL, NULL, NULL),
(175, 'wa', 'Walloon', 'Walon', NULL, NULL, NULL),
(176, 'cy', 'Welsh', 'Cymraeg', NULL, NULL, NULL),
(177, 'wo', 'Wolof', 'Wollof', NULL, NULL, NULL),
(178, 'fy', 'Western Frisian', 'Frysk', NULL, NULL, NULL),
(179, 'xh', 'Xhosa', 'isiXhosa', NULL, NULL, NULL),
(180, 'yi', 'Yiddish', '×™×™Ö´×“×™×©', NULL, NULL, NULL),
(181, 'yo', 'Yoruba', 'YorÃ¹bÃ¡', NULL, NULL, NULL),
(182, 'za', 'Zhuang, Chuang', 'SaÉ¯ cueÅ‹Æ…, Saw cuengh', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_05_03_000001_create_customer_columns', 1),
(9, '2019_05_03_000002_create_subscriptions_table', 1),
(10, '2019_05_03_000003_create_subscription_items_table', 1),
(11, '2019_08_19_000000_create_failed_jobs_table', 1),
(12, '2020_04_04_125031_create_skillmasters_table', 1),
(13, '2020_04_04_125318_create_languagemasters_table', 1),
(14, '2020_04_04_125447_create_userprofiles_table', 1),
(15, '2020_04_04_161151_create_educationmasters_table', 1),
(16, '2020_04_04_163256_create_usereducations_table', 1),
(17, '2020_04_04_165139_create_user_certificates_table', 1),
(18, '2020_04_04_170101_create_user_feedback_reviews_table', 1),
(19, '2020_04_04_182047_create_social_identifiers_table', 1),
(20, '2020_04_08_171507_create_countries_table', 1),
(21, '2020_04_18_095507_create_bank_accounts_table', 1),
(24, '2020_04_26_231450_create_event_files_table', 1),
(25, '2020_05_08_085037_create_event_activities_table', 1),
(26, '2020_05_11_231130_create_notifications_table', 1),
(27, '2020_05_16_155030_create_event_payments_table', 1),
(30, '2020_08_21_113910_create_old_password_histories_table', 1),
(31, '2020_09_07_090402_create_file_managers_table', 1),
(32, '2020_09_17_075914_create_event_discounts_table', 1),
(34, '2020_10_06_054024_create_event_reports_table', 1),
(35, '2020_10_10_085000_create_favorite_events_table', 1),
(36, '2021_02_18_084034_create_reset_emails_table', 1),
(38, '2021_02_23_085701_create_favorite_users_table', 1),
(42, '2021_03_14_093417_create_extend_durations_table', 3),
(43, '2021_03_22_114926_create_quick_meets_table', 4),
(45, '2021_03_25_120024_create_user_contacts_table', 5),
(53, '2021_04_30_051421_create_favorites_table', 7),
(54, '2020_09_29_111145_create_event_reviews_table', 8),
(55, '2021_03_30_035950_create_chat_rooms_table', 9),
(57, '2021_03_30_045833_create_chat_conversations_table', 9),
(58, '2021_03_30_045852_create_chat_room_users_table', 9),
(59, '2021_03_30_045909_create_chat_last_seens_table', 9),
(60, '2021_03_31_070348_create_chat_activities_table', 9),
(62, '0000_00_00_000000_create_websockets_statistics_entries_table', 10),
(63, '2021_03_30_045800_create_chat_messages_table', 11),
(70, '2020_04_24_075501_create_events_table', 12),
(71, '2020_04_26_230112_create_event_time_slots_table', 12),
(72, '2023_01_11_195910_create_event_bookings_table', 12),
(73, '2023_02_22_202224_create_service_fees_table', 12),
(75, '2020_05_16_225354_create_event_file_payments_table', 13),
(76, '2021_05_20_054610_create_contacts_table', 14),
(77, '2023_10_04_074359_create_event_tip_payments_table', 14),
(78, '2023_10_11_090150_create_save_cards_table', 14),
(79, '2014_10_12_000001_create_support_tickets_table', 14),
(80, '2014_10_12_000002_create_ticket_messages_table', 14);


-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
('935f14dc-1ddd-4cf8-b580-21abb713ec66', NULL, 'Avnik Personal Access Client', '$2y$10$xIr3a8B9OIUW4VZNILcG7enFF9MQMJladod1dfZuI4iYftzn7vDjy', NULL, 'http://localhost', 1, 0, 0, '2021-05-07 03:36:51', '2021-05-07 03:36:51');


-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL,
  `client_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, '935f14dc-1ddd-4cf8-b580-21abb713ec66', '2021-05-07 03:36:51', '2021-05-07 03:36:51');


-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `old_password_histories`
--

CREATE TABLE `old_password_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `last_change_date` datetime NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quick_meets`
--

CREATE TABLE `quick_meets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `room_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `server_room_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_duration` int DEFAULT NULL,
  `current_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `reset_emails`
--

CREATE TABLE `reset_emails` (
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `new_email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_fees`
--

CREATE TABLE `service_fees` (
  `id` bigint UNSIGNED NOT NULL,
  `p_user_id` bigint UNSIGNED NOT NULL,
  `h_user_id` bigint UNSIGNED NOT NULL,
  `event_slot_id` bigint UNSIGNED NOT NULL,
  `event_fk_id` bigint UNSIGNED NOT NULL,
  `withdraw_amount` int NOT NULL DEFAULT '0',
  `event_date_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `card_brand` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `amount_refunded` tinyint(1) DEFAULT NULL,
  `refund_transaction` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_masters`
--

CREATE TABLE `skill_masters` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_identifiers`
--

CREATE TABLE `social_identifiers` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `provider_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_identifiers`
--

INSERT INTO `social_identifiers` (`id`, `user_fk_id`, `provider_name`, `provider_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(9, 3, 'google', '107523848800737958905', 'gI7F7Af8SCvlpZxIuO61IdDeYLgXMYKvuLu6QeQ5h3Cd9DKnCDeaD5bRC7LxnPTwD2jXwz', '2021-04-12 01:21:44', '2021-04-12 01:21:44');


-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_items`
--

CREATE TABLE `subscription_items` (
  `id` bigint UNSIGNED NOT NULL,
  `subscription_id` bigint UNSIGNED NOT NULL,
  `stripe_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `ticket_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('Technical','Payment','Booking','Profile','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Other',
  `priority` enum('Low','Medium','High','Critical') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Medium',
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Open','In Progress','Resolved','Closed','Reopened') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Open',
  `assigned_to` bigint UNSIGNED DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `resolved_at` timestamp NULL DEFAULT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `ticket_messages`
--

CREATE TABLE `ticket_messages` (
  `id` bigint UNSIGNED NOT NULL,
  `ticket_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_type` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sca_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_verified_at` timestamp NULL DEFAULT NULL,
  `phone_verified_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `email_verified_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_nickname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_avatar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_avatar_original` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_profile_url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_refreshToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_expiresIn` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `social_provider` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `account_status` tinyint(1) NOT NULL DEFAULT '0',
  `joined_on` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `last_ip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `date_of_created` datetime DEFAULT NULL,
  `last_activity` datetime DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `last_active_room` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_notification` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `last_password_change` datetime DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `skip_steps` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `phone`, `stripe_customer_id`, `sca_id`, `phone_verified_at`, `phone_verified_status`, `email_verified_at`, `email_verified_status`, `social_user_id`, `social_nickname`, `social_avatar`, `social_avatar_original`, `social_profile_url`, `social_refreshToken`, `social_expiresIn`, `social_token`, `social_provider`, `status`, `account_status`, `joined_on`, `password`, `role`, `last_ip`, `last_login`, `date_of_created`, `last_activity`, `last_active`, `last_active_room`, `read_notification`, `last_password_change`, `remember_token`, `created_at`, `updated_at`, `stripe_id`, `card_brand`, `card_last_four`, `trial_ends_at`, `skip_steps`) VALUES
(3, 'nithin prasad', 'nithinp', 'nithinnpk@gmail.com', NULL, 'cus_R6fPtLND3862lJ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', 0, '2021-03-06 16:57:19', '$2y$10$MpuPRXhPcU8fh4GQsTJ6kOm.rwFTWQNw56f10R7CUx0OxFH5EZzpm', 'user', '172.18.0.11', NULL, NULL, '2026-07-18 10:49:59', '2026-07-18 10:49:59', NULL, '0', NULL, NULL, '2021-03-06 15:57:19', '2026-07-18 10:49:59', NULL, NULL, NULL, NULL, '1'),
(5, 'avnik', 'avnik', 'avnik@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', 0, '2021-03-09 14:28:25', '$2y$10$MpuPRXhPcU8fh4GQsTJ6kOm.rwFTWQNw56f10R7CUx0OxFH5EZzpm', 'user', '172.18.0.11', NULL, NULL, '2026-07-18 11:45:31', '2026-07-18 11:45:31', NULL, '0', NULL, NULL, '2021-03-09 13:28:25', '2026-07-18 11:45:31', NULL, NULL, NULL, NULL, '1');


-- --------------------------------------------------------

--
-- Table structure for table `user_certificates`
--

CREATE TABLE `user_certificates` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `certificate_award` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `certificate_from` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `certificate_year` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_contacts`
--

CREATE TABLE `user_contacts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `contact_id` bigint UNSIGNED NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `user_educations`
--

CREATE TABLE `user_educations` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `education_country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `college_university` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `degree` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `graduation_year` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_feedback_reviews`
--

CREATE TABLE `user_feedback_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `customer_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_fk_id` bigint UNSIGNED NOT NULL,
  `about_me` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_picture` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profession` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `alt_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_media_urls` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `city` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_profile_picture_url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_fk_id`, `about_me`, `date_of_birth`, `gender`, `profile_picture`, `language`, `skill`, `profession`, `address`, `alt_address`, `country`, `state`, `social_media_urls`, `city`, `zip_code`, `social_profile_picture_url`, `remember_token`, `created_at`, `updated_at`) VALUES
(11, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a-/AOh14GjD_ovwKkGMU-DH0wZ0wLlMz0ukNLo-BwVEDezUzw=s96-c', 'iDtxEeDbUUVjjc0qtgYVUKNSqReOlKuLQ4fzqGDPjxwytqAmlKkrUvimOIOqYkkRJsDXBZ', '2021-04-12 01:21:44', '2021-04-12 01:21:44');


-- --------------------------------------------------------

--
-- Table structure for table `websockets_statistics_entries`
--

CREATE TABLE `websockets_statistics_entries` (
  `id` int UNSIGNED NOT NULL,
  `app_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int NOT NULL,
  `websocket_message_count` int NOT NULL,
  `api_message_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_accounts_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_activities`
--
ALTER TABLE `chat_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_conversations_room_id_foreign` (`room_id`),
  ADD KEY `chat_conversations_user_id_foreign` (`user_id`);

--
-- Indexes for table `chat_last_seens`
--
ALTER TABLE `chat_last_seens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_last_seens_message_id_foreign` (`message_id`),
  ADD KEY `chat_last_seens_room_id_foreign` (`room_id`),
  ADD KEY `chat_last_seens_user_id_foreign` (`user_id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_messages_sender_id_foreign` (`sender_id`),
  ADD KEY `chat_messages_room_id_foreign` (`room_id`);

--
-- Indexes for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_rooms_created_by_foreign` (`created_by`);

--
-- Indexes for table `chat_room_users`
--
ALTER TABLE `chat_room_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_room_users_room_id_foreign` (`room_id`),
  ADD KEY `chat_room_users_user_id_foreign` (`user_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_user_id_foreign` (`user_id`),
  ADD KEY `contacts_contact_user_id_foreign` (`contact_user_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `education_masters`
--
ALTER TABLE `education_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `event_activities`
--
ALTER TABLE `event_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_activities_event_fk_id_foreign` (`event_fk_id`),
  ADD KEY `event_activities_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `event_bookings`
--
ALTER TABLE `event_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_bookings_event_fk_id_foreign` (`event_fk_id`),
  ADD KEY `event_bookings_event_slot_id_foreign` (`event_slot_id`),
  ADD KEY `event_bookings_p_user_id_foreign` (`p_user_id`),
  ADD KEY `event_bookings_h_user_id_foreign` (`h_user_id`);

--
-- Indexes for table `event_discounts`
--
ALTER TABLE `event_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_discounts_event_fk_id_foreign` (`event_fk_id`);

--
-- Indexes for table `event_files`
--
ALTER TABLE `event_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_files_event_fk_id_foreign` (`event_fk_id`);

--
-- Indexes for table `event_file_payments`
--
ALTER TABLE `event_file_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_file_payments_user_fk_id_foreign` (`user_fk_id`),
  ADD KEY `event_file_payments_to_user_id_foreign` (`to_user_id`),
  ADD KEY `event_file_payments_event_fk_id_foreign` (`event_fk_id`),
  ADD KEY `event_file_payments_event_file_fk_id_foreign` (`event_file_fk_id`);

--
-- Indexes for table `event_payments`
--
ALTER TABLE `event_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_payments_user_fk_id_foreign` (`user_fk_id`),
  ADD KEY `event_payments_event_time_slot_id_foreign` (`event_time_slot_id`),
  ADD KEY `event_payments_event_fk_id_foreign` (`event_fk_id`);

--
-- Indexes for table `event_reports`
--
ALTER TABLE `event_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_reports_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `event_reviews`
--
ALTER TABLE `event_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_reviews_event_id_foreign` (`event_id`),
  ADD KEY `event_reviews_user_id_foreign` (`user_id`),
  ADD KEY `event_reviews_slot_id_foreign` (`slot_id`);

--
-- Indexes for table `event_time_slots`
--
ALTER TABLE `event_time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_time_slots_event_fk_id_foreign` (`event_fk_id`);

--
-- Indexes for table `event_tip_payments`
--
ALTER TABLE `event_tip_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_tip_payments_user_fk_id_foreign` (`user_fk_id`),
  ADD KEY `event_tip_payments_to_user_id_foreign` (`to_user_id`),
  ADD KEY `event_tip_payments_event_fk_id_foreign` (`event_fk_id`),
  ADD KEY `event_tip_payments_event_slot_id_foreign` (`event_slot_id`);

--
-- Indexes for table `extend_durations`
--
ALTER TABLE `extend_durations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `extend_durations_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`);

--
-- Indexes for table `favorite_events`
--
ALTER TABLE `favorite_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorite_events_event_id_foreign` (`event_id`),
  ADD KEY `favorite_events_user_id_foreign` (`user_id`);

--
-- Indexes for table `favorite_users`
--
ALTER TABLE `favorite_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorite_users_from_user_id_foreign` (`from_user_id`),
  ADD KEY `favorite_users_to_user_id_foreign` (`to_user_id`);

--
-- Indexes for table `file_managers`
--
ALTER TABLE `file_managers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_managers_user_id_foreign` (`user_id`);

--
-- Indexes for table `language_masters`
--
ALTER TABLE `language_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `old_password_histories`
--
ALTER TABLE `old_password_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `old_password_histories_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `quick_meets`
--
ALTER TABLE `quick_meets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quick_meets_user_id_foreign` (`user_id`);

--
-- Indexes for table `service_fees`
--
ALTER TABLE `service_fees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_fees_p_user_id_foreign` (`p_user_id`),
  ADD KEY `service_fees_h_user_id_foreign` (`h_user_id`),
  ADD KEY `service_fees_event_slot_id_foreign` (`event_slot_id`),
  ADD KEY `service_fees_event_fk_id_foreign` (`event_fk_id`);

--
-- Indexes for table `skill_masters`
--
ALTER TABLE `skill_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_identifiers`
--
ALTER TABLE `social_identifiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `social_identifiers_provider_id_unique` (`provider_id`),
  ADD KEY `social_identifiers_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Indexes for table `subscription_items`
--
ALTER TABLE `subscription_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscription_items_subscription_id_stripe_plan_unique` (`subscription_id`,`stripe_plan`),
  ADD KEY `subscription_items_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `support_tickets_ticket_id_unique` (`ticket_id`),
  ADD KEY `support_tickets_user_id_index` (`user_id`),
  ADD KEY `support_tickets_assigned_to_index` (`assigned_to`);

--
-- Indexes for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_messages_ticket_id_index` (`ticket_id`),
  ADD KEY `ticket_messages_user_id_index` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `user_certificates`
--
ALTER TABLE `user_certificates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_certificates_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `user_contacts`
--
ALTER TABLE `user_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_contacts_user_id_foreign` (`user_id`),
  ADD KEY `user_contacts_contact_id_foreign` (`contact_id`);

--
-- Indexes for table `user_educations`
--
ALTER TABLE `user_educations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_educations_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `user_feedback_reviews`
--
ALTER TABLE `user_feedback_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_feedback_reviews_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_profiles_user_fk_id_foreign` (`user_fk_id`);

--
-- Indexes for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_activities`
--
ALTER TABLE `chat_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_last_seens`
--
ALTER TABLE `chat_last_seens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `chat_room_users`
--
ALTER TABLE `chat_room_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `education_masters`
--
ALTER TABLE `education_masters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `event_activities`
--
ALTER TABLE `event_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_bookings`
--
ALTER TABLE `event_bookings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `event_discounts`
--
ALTER TABLE `event_discounts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_files`
--
ALTER TABLE `event_files`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `event_file_payments`
--
ALTER TABLE `event_file_payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_payments`
--
ALTER TABLE `event_payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `event_reports`
--
ALTER TABLE `event_reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_reviews`
--
ALTER TABLE `event_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_time_slots`
--
ALTER TABLE `event_time_slots`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `event_tip_payments`
--
ALTER TABLE `event_tip_payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extend_durations`
--
ALTER TABLE `extend_durations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorite_events`
--
ALTER TABLE `favorite_events`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorite_users`
--
ALTER TABLE `favorite_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_managers`
--
ALTER TABLE `file_managers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `language_masters`
--
ALTER TABLE `language_masters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `old_password_histories`
--
ALTER TABLE `old_password_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quick_meets`
--
ALTER TABLE `quick_meets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `service_fees`
--
ALTER TABLE `service_fees`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_masters`
--
ALTER TABLE `skill_masters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_identifiers`
--
ALTER TABLE `social_identifiers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_items`
--
ALTER TABLE `subscription_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `user_certificates`
--
ALTER TABLE `user_certificates`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_contacts`
--
ALTER TABLE `user_contacts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_educations`
--
ALTER TABLE `user_educations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_feedback_reviews`
--
ALTER TABLE `user_feedback_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD CONSTRAINT `bank_accounts_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  ADD CONSTRAINT `chat_conversations_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`),
  ADD CONSTRAINT `chat_conversations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_last_seens`
--
ALTER TABLE `chat_last_seens`
  ADD CONSTRAINT `chat_last_seens_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `chat_messages` (`id`),
  ADD CONSTRAINT `chat_last_seens_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`),
  ADD CONSTRAINT `chat_last_seens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`),
  ADD CONSTRAINT `chat_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD CONSTRAINT `chat_rooms_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_room_users`
--
ALTER TABLE `chat_room_users`
  ADD CONSTRAINT `chat_room_users_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`),
  ADD CONSTRAINT `chat_room_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_contact_user_id_foreign` FOREIGN KEY (`contact_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `event_bookings`
--
ALTER TABLE `event_bookings`
  ADD CONSTRAINT `event_bookings_event_fk_id_foreign` FOREIGN KEY (`event_fk_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `event_bookings_event_slot_id_foreign` FOREIGN KEY (`event_slot_id`) REFERENCES `event_time_slots` (`id`),
  ADD CONSTRAINT `event_bookings_h_user_id_foreign` FOREIGN KEY (`h_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `event_bookings_p_user_id_foreign` FOREIGN KEY (`p_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `event_file_payments`
--
ALTER TABLE `event_file_payments`
  ADD CONSTRAINT `event_file_payments_event_file_fk_id_foreign` FOREIGN KEY (`event_file_fk_id`) REFERENCES `file_managers` (`id`),
  ADD CONSTRAINT `event_file_payments_event_fk_id_foreign` FOREIGN KEY (`event_fk_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `event_file_payments_to_user_id_foreign` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `event_file_payments_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `event_reports`
--
ALTER TABLE `event_reports`
  ADD CONSTRAINT `event_reports_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `event_time_slots`
--
ALTER TABLE `event_time_slots`
  ADD CONSTRAINT `event_time_slots_event_fk_id_foreign` FOREIGN KEY (`event_fk_id`) REFERENCES `events` (`id`);

--
-- Constraints for table `event_tip_payments`
--
ALTER TABLE `event_tip_payments`
  ADD CONSTRAINT `event_tip_payments_event_fk_id_foreign` FOREIGN KEY (`event_fk_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `event_tip_payments_event_slot_id_foreign` FOREIGN KEY (`event_slot_id`) REFERENCES `event_time_slots` (`id`),
  ADD CONSTRAINT `event_tip_payments_to_user_id_foreign` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `event_tip_payments_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `extend_durations`
--
ALTER TABLE `extend_durations`
  ADD CONSTRAINT `extend_durations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorite_events`
--
ALTER TABLE `favorite_events`
  ADD CONSTRAINT `favorite_events_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `favorite_events_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorite_users`
--
ALTER TABLE `favorite_users`
  ADD CONSTRAINT `favorite_users_from_user_id_foreign` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorite_users_to_user_id_foreign` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `file_managers`
--
ALTER TABLE `file_managers`
  ADD CONSTRAINT `file_managers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `old_password_histories`
--
ALTER TABLE `old_password_histories`
  ADD CONSTRAINT `old_password_histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `quick_meets`
--
ALTER TABLE `quick_meets`
  ADD CONSTRAINT `quick_meets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `service_fees`
--
ALTER TABLE `service_fees`
  ADD CONSTRAINT `service_fees_event_fk_id_foreign` FOREIGN KEY (`event_fk_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `service_fees_event_slot_id_foreign` FOREIGN KEY (`event_slot_id`) REFERENCES `event_time_slots` (`id`),
  ADD CONSTRAINT `service_fees_h_user_id_foreign` FOREIGN KEY (`h_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `service_fees_p_user_id_foreign` FOREIGN KEY (`p_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `social_identifiers`
--
ALTER TABLE `social_identifiers`
  ADD CONSTRAINT `social_identifiers_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `support_tickets_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `support_tickets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  ADD CONSTRAINT `ticket_messages_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_certificates`
--
ALTER TABLE `user_certificates`
  ADD CONSTRAINT `user_certificates_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_contacts`
--
ALTER TABLE `user_contacts`
  ADD CONSTRAINT `user_contacts_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_educations`
--
ALTER TABLE `user_educations`
  ADD CONSTRAINT `user_educations_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_feedback_reviews`
--
ALTER TABLE `user_feedback_reviews`
  ADD CONSTRAINT `user_feedback_reviews_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_user_fk_id_foreign` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
