-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2017 at 02:49 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `id` bigint(20) NOT NULL,
  `status` varchar(10) NOT NULL,
  `priority` varchar(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`name`, `description`, `id`, `status`, `priority`, `username`) VALUES
('Task 4', '', 57, 'New', 'Critical', 'Marco Antonio'),
('Task 6', 'This task will do ....', 3, 'New', 'Low', 'Marilia Matos'),
('Task 7', 'This task will do ....', 4, 'New', 'High', 'Ana Matos'),
('Task 14', 'This task will do ....', 6, 'Done', 'Critical', 'Ana Matos'),
('Task 13', 'This task will do ....', 10, 'Done', 'Critical', 'Ana Matos'),
('Task 10', 'This task will do ....', 12, 'Done', 'Medium', 'Marco Antonio'),
('Task 11', 'This task will do ....', 14, 'Done', 'Medium', 'Marilia Matos'),
('Task 12', 'This task will do ....', 15, 'Done', 'Low', 'Jessica Oliveira'),
('Task 1', 'This task will do ....', 16, 'New', 'Medium', 'Marco Antonio'),
('Task 2', 'This task will do ....', 21, 'New', 'Medium', 'Rosana Matos'),
('Task 3', 'This task will do ....', 22, 'New', 'Critical', 'Rosana Matos'),
('Task 16', 'This task will do  la la....', 23, 'Done', 'High', 'Ana Matos'),
('Task 5', 'This task will do ....', 24, 'New', 'Low', 'Rosana Matos'),
('Task 9 ', '', 55, 'New', 'Low', 'Marilia Matos'),
('Task 15 ', 'task15', 56, 'Done', 'High', 'Marilia Matos'),
('Task 8', 'teste', 53, 'New', 'High', 'Marilia Matos');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
