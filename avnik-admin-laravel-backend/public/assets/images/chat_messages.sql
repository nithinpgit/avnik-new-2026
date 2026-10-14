-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 08, 2021 at 09:38 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `avnikreact`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_file` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `sender_id`, `room_id`, `content`, `file`, `file_type`, `file_size`, `file_name`, `is_file`, `created_at`, `updated_at`) VALUES
(140, 1, 45, 'sda', NULL, NULL, NULL, NULL, 0, '2021-06-08 02:02:31', '2021-06-08 02:02:31'),
(139, 1, 44, 'asdas', NULL, NULL, NULL, NULL, 0, '2021-06-07 22:56:38', '2021-06-07 22:56:38'),
(138, 1, 44, 'asdas', NULL, NULL, NULL, NULL, 0, '2021-06-07 22:56:23', '2021-06-07 22:56:23'),
(137, 1, 44, 'asdas', NULL, NULL, NULL, NULL, 0, '2021-06-07 22:56:19', '2021-06-07 22:56:19'),
(136, 1, 44, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-07 22:56:16', '2021-06-07 22:56:16'),
(135, 1, 44, 'hi', NULL, NULL, NULL, NULL, 0, '2021-06-07 06:36:11', '2021-06-07 06:36:11'),
(134, 11, 31, 'asdasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:28:03', '2021-06-06 23:28:03'),
(133, 1, 31, 'hasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:27:54', '2021-06-06 23:27:54'),
(132, 1, 31, 'ho', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:27:13', '2021-06-06 23:27:13'),
(131, 11, 31, 'sd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:26:18', '2021-06-06 23:26:18'),
(130, 1, 31, 'hello', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:25:58', '2021-06-06 23:25:58'),
(129, 1, 24, 'hike', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:24:56', '2021-06-06 23:24:56'),
(128, 1, 24, 'hello', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:22:19', '2021-06-06 23:22:19'),
(127, 1, 24, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:21:55', '2021-06-06 23:21:55'),
(126, 1, 24, 'adasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:20:12', '2021-06-06 23:20:12'),
(125, 1, 27, 'jhgasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:20:02', '2021-06-06 23:20:02'),
(124, 1, 27, 'ahjsdf', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:19:53', '2021-06-06 23:19:53'),
(123, 1, 31, 'hgasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:19:42', '2021-06-06 23:19:42'),
(122, 1, 31, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:17:28', '2021-06-06 23:17:28'),
(121, 1, 31, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:17:06', '2021-06-06 23:17:06'),
(120, 1, 31, 'asda', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:16:17', '2021-06-06 23:16:17'),
(119, 1, 31, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:15:25', '2021-06-06 23:15:25'),
(118, 11, 31, 'asd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:13:26', '2021-06-06 23:13:26'),
(117, 1, 31, 'ihiasd', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:13:07', '2021-06-06 23:13:07'),
(116, 11, 31, 'hell', NULL, NULL, NULL, NULL, 0, '2021-06-06 23:11:16', '2021-06-06 23:11:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_messages_sender_id_foreign` (`sender_id`),
  ADD KEY `chat_messages_room_id_foreign` (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`),
  ADD CONSTRAINT `chat_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
