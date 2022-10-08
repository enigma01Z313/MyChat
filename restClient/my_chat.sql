-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2022 at 06:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(10000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `key`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'permissions', '[{\"name\":\"مدیرت نقش ها\",\"permissions\":[{\"lable\":\"نمایش نقش ها\",\"permission\":\"SEE_ROLES\"},{\"lable\":\"افزودن نقش جدید\",\"permission\":\"ADD_ROLES\"},{\"lable\":\"ویرایش نقش ها\",\"permission\":\"EDIT_ROLES\"}]},{\"name\":\"مدیرت کاربران\",\"permissions\":[{\"lable\":\"نمایش کابران\",\"permission\":\"SEE_USERS\"},{\"lable\":\"افزودن کابر\",\"permission\":\"ADD_USERS\"},{\"lable\":\"ویرایش کابران\",\"permission\":\"EDIT_USERS\"}]},{\"name\":\"پیشخوان مدیریت\",\"permissions\":[{\"lable\":\"نمایش همه پورتفولیو\",\"permission\":\"SEE_ALL_CRYPTO_PORTFOLIO\"},{\"lable\":\"نمایش همه ژورنال\",\"permission\":\"SEE_ALL_JOURNAL\"},{\"lable\":\"نمایش پورتفولیو\",\"permission\":\"SEE_CRYPTO_PORTFOLIO\"},{\"lable\":\"نمایش ژورنال\",\"permission\":\"SEE_JOURNAL\"},{\"lable\":\"مدیریت پکیج ها\",\"permission\":\"MANAGE_PACKAGES\"},{\"lable\":\"نمایش پکیج ها\",\"permission\":\"SEE_PACKAGES\"}]},{\"name\":\"عمومی\",\"permissions\":[{\"lable\":\"چتر\",\"permission\":\"CHATTER\"}]}]', '2022-10-05 17:33:00', '2022-10-05 17:33:00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(255) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `uuid`, `name`, `permissions`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'd14b06cd-3a06-487f-8a9f-d3f41d42ee93', 'SUPMIN', '[\"SEE_ROLES\",\"ADD_ROLES\",\"EDIT_ROLES\",\"SEE_USERS\",\"ADD_USERS\",\"EDIT_USERS\",\"UPLOAD_RECEIPTS\",\"SEE_ALL_RECEIPTS\",\"SEE_OWN_RECEIPTS\",\"SEND_BROADCAST_SMS\"]', '1', '2022-10-05 17:33:00', '2022-10-05 17:33:00'),
(2, '0c275f4e-ce44-411c-a560-c0cfb99fb55f', 'USER', '[\"CHATTER\", \"SEE_USERS\"]', '1', '2022-10-05 17:33:00', '2022-10-05 17:33:00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220224190852-create-user.js'),
('20220224201248-create-role.js'),
('20220224201311-create-option.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `token_duration` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `publicLock` varchar(5000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `phone`, `email`, `username`, `password`, `first_name`, `last_name`, `role_id`, `image_id`, `ip`, `access_token`, `refresh_token`, `token_duration`, `status`, `publicLock`, `createdAt`, `updatedAt`) VALUES
(1, '9b58b180-9be5-4fbd-9453-743d17a4da88', '09333950889', 'f.ahmadyf94@gmail.com', '', 'e10659603e1219ad9ab5b55794977be4c5a021b234aaa8629fe0ab780807e77a', 'Farzin', 'Ahmady', 1, '1', NULL, NULL, NULL, NULL, 1, NULL, '2022-10-05 17:33:00', '2022-10-05 17:33:00'),
(2, '0d6ef02d-509e-4215-8e2f-d98948de7d5f', NULL, NULL, 'adsfsd', 'ec2a7e7e9edc6df91d4c4feec35f1e48705b1900307cddb551f840c315546f9f', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2022-10-05 17:33:04', '2022-10-05 17:33:04'),
(56, 'acddc8d7-050c-4189-9e3e-f5c1a22f0460', NULL, NULL, 'user1', 'ec2a7e7e9edc6df91d4c4feec35f1e48705b1900307cddb551f840c315546f9f', NULL, NULL, 2, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjZGRjOGQ3LTA1MGMtNDE4OS05ZTNlLWY1YzFhMjJmMDQ2MCIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDM5ODMsImV4cCI6MTY2NTMzMzk4M30.bfGCE0L1_aCwKKHP6ksvRK4cfnJ4O37xOm7ttcrfCvI', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjZGRjOGQ3LTA1MGMtNDE4OS05ZTNlLWY1YzFhMjJmMDQ2MCIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDM5ODN9.X57VIYcbxdhvrHODkdmJV15vt6ZJFjBQ61JC9jitEZQ', NULL, 1, 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC7EQanciqWxBfXrFy8wkcaz+qT2L5yu3TUrfRJS9aa1clr4hei+maBId+CAx8304FB4EqYRYc012l8hqcL6uYRFd6MLageet4/r4QIUo5T6jrMIGgrvhpvB81NAeFm7G1Ww3YIJ73lEPuyC9e0/s/5STuCrjXskHCbcsNgE166eYsTP8P12YnVvnCwRXgaGJpwAXlXA7IbW8zmmkanNYzKx062VZ6dAUG9FhfN/PNG+/25fAxUyrUsRFkNPacgGJ2imaKP4N8EqchC7w5tf1XtP5NKlStWfC+wRgbRXnWLwcHWaVxDhiHRFkDPL3zXZYbNZjDyNhgNqnepjOhShNr77ngPrTCr1pDD4In+e6lZNdJI6wmyaxsbt3iABekYPUY+ucI1JKk82NE5nVN8q6gIBSCLzfH7xL8MzfCrzIoswT0Ju/QdRmI1vWsTWTIxjlZI20EkiAdfnu+fMBgMi5ewhsQ8b5JpyIABvwVwRVoQsUaX4Wsze3DCuX082yWhRBs= fahma@DESKTOP-K18R7GK\n', '2022-10-08 09:40:59', '2022-10-08 15:46:23'),
(57, '4eda9a8d-0f84-4c94-b5fa-431902c61c9c', NULL, NULL, 'User2', 'ec2a7e7e9edc6df91d4c4feec35f1e48705b1900307cddb551f840c315546f9f', NULL, NULL, 2, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZGE5YThkLTBmODQtNGM5NC1iNWZhLTQzMTkwMmM2MWM5YyIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDQwMDksImV4cCI6MTY2NTMzNDAwOX0.-c4B4I5xTXuPovhOPfH-IcTl2zAjVbuRXZN4rZiioxQ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZGE5YThkLTBmODQtNGM5NC1iNWZhLTQzMTkwMmM2MWM5YyIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDQwMDl9.NrbM7ABxUMNwociuqjqwqIrn4jizBc3LGEjcO7m-lXE', NULL, 1, 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCmoG6hh+xfxJo8LM7g9mY8bGfpZveuYoWXTxl65pxtEgVr+CuxN8hPqZWbZC28Abt0T1oB5UXN6+igMWSYkYPliUPIhDKIS8QqV82ChBvi09AQXbqy0RgKdjnIQEw8FTJumzYW3VczRhxwsyLQh4oON43bOywidg5VU1TaWvcgRrk6D3tvvKkZS6ocFc3aoC5DQKsjUotDwlAMds/61TFoH5Svr9BZO4CPT3BfIok1XwOygFvEI5k4unz40ckoS+tN/OVLVee7omcbSptjN+bHTpAKDUHK3WVaCI8h8aIDid5HhWqGTIJevtWuakZZldfFoJw5nei02yXasYpBj7gH2AQ/rfoCeGcW19prrw4wKi87+KZPlB56FOIFAiHgdtBNwu0HlWycWVLk0FzOZjX1rzFVH77xWDBLldO90tbf+SxywVMFtA1p6XXDZRaFEU2oNuISWj699WsBWAlHu6AHfh5d1OALht2bX5YOoaShpElTTG+aqSYvSg52+zQ04eE= fahma@DESKTOP-K18R7GK\n', '2022-10-08 09:44:32', '2022-10-08 15:46:49'),
(58, '9a271620-3c66-4b7e-b8e9-f16d0b6cf619', NULL, NULL, 'user3', 'ec2a7e7e9edc6df91d4c4feec35f1e48705b1900307cddb551f840c315546f9f', NULL, NULL, 2, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhMjcxNjIwLTNjNjYtNGI3ZS1iOGU5LWYxNmQwYjZjZjYxOSIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDQwMzEsImV4cCI6MTY2NTMzNDAzMX0.paHe-8XJXOHDhUzGKVaZgmkiavUBpgkEUMJBMKqE7RU', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhMjcxNjIwLTNjNjYtNGI3ZS1iOGU5LWYxNmQwYjZjZjYxOSIsInBob25lIjpudWxsLCJpYXQiOjE2NjUyNDQwMzF9.ZI_bRyvIV46cpyDqkJ3aVIbBIU1jsr77Ir8ra2GCMcU', NULL, 1, 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9EXft/qgk+gaPOKGT/nOJgkGs2iQndS1iJauXvep3WXXI2g4pwKKPGwyWrWA47WFGQshPpMJQ+xXCSUgdmsPH1bP11xvae471BuQunPMvW2q2ezTdgZnFvXXZFAvQ83N1xbhScpyne7aHyDISEO6gIifrBA5rQn5n4VmYqKbZbOaDq0xy1Xj4FsIU4qnUDw6fFqyupqmiaXBy8bxm5OLPnAQdsICExyOxLVqLMFGnvRf0T/SJm0iUUTELiszmfzT2jBKaGqLM2iIeWh1NIkdHtvDZD9auf3Zfl37vI6Oy+wcb9g35Pd1RNlB+2SNnJj+GKivUpAhS3wa6j81nCh6tdKDrHzH1Qz7N2A3mbJKukONisDtUi5KNxqnnrMqOGhqk+2pofG0zztRYxvcSSRpMzLesbqbVDlHfyabk1SHAYBqD0JSkEaRFTTcqSWRyRxaWebOsGYXghfLUhkErqCWKggze+C3KjrF+lp09y1TBkbw+pgjGCbm7dmhb1vj5jvc= fahma@DESKTOP-K18R7GK\n', '2022-10-08 15:15:02', '2022-10-08 15:47:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
