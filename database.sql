-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 20 nov 2023 om 13:28
-- Serverversie: 10.9.8-MariaDB
-- PHP-versie: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mier_mock_os`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `apps`
--

CREATE TABLE `apps` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `extentions` text DEFAULT NULL,
  `source` text DEFAULT NULL,
  `ref` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `reg_date` text DEFAULT NULL,
  `developer` text DEFAULT NULL,
  `custom_style` text DEFAULT NULL,
  `icon_path` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `apps`
--

INSERT INTO `apps` (`id`, `name`, `extentions`, `source`, `ref`, `title`, `description`, `verified`, `reg_date`, `developer`, `custom_style`, `icon_path`) VALUES
(1, 'safeari', '[]', 'https://bing.com', 'https://bing.com', 'safeari', 'BiNg+SeArCh+BcS+iT+iS+gOoD', 0, '2023-08-22 12:37:48', 'mock_os', '', 'favicon.svg'),
(2, 'icould', '[]', 'login.html', 'https://www.icloud.com/', 'Icould', 'Could+i%3F', 0, '2023-08-22 13:53:41', 'mock_os', '', 'favicon.svg'),
(3, 'mapple apps', '[]', 'https://www.google.com/maps/embed/v1/view?key=AIzaSyA1Vf45Wr0eyIUAhNrqjezMEW82fhBRDIA&amp;center=43.723205,10.39469&amp;zoom=18&amp;maptype=satellite', 'https://www.google.com/maps/embed/v1/view?key=AIzaSyA1Vf45Wr0eyIUAhNrqjezMEW82fhBRDIA&amp;center=43.723205,10.39469&amp;zoom=18&amp;maptype=satellite', 'Mapple Apps', 'Better+ways+ahead+with+google+maps.', 0, '2023-08-22 12:37:48', 'mock_os', '', 'mapple.svg'),
(4, 'cripple music', '[]', 'cripple_music.html', 'https://www.apple.com/benl/apple-music/', 'Cripple Music', 'Lose+yourself+in+50+million+songs', 0, '2023-08-22 13:54:07', 'mock_os', '', 'favicon.svg'),
(6, 'rocks star', '[]', 'https://www.rockstargames.com/', 'https://www.rockstargames.com/', 'rocks star launcher', 'Killing+dreams.+Murdering+hope.+Fighting+the+righteous.+Bullying+the+weak.', 0, '2023-08-22 12:37:48', 'mock_os', '', 'rocksstar.svg'),
(7, 'sir', '[]', 'index.html', 'https://www.apple.com/siri/', 'sir asistant', 'Useless+here+%3D%29', 1, '2023-08-22 20:49:46', 'mock_os', 'parentstyle.css', 'favicon.svg'),
(8, 'notflix', '[]', 'index.html', 'https://www.netflix.com/', 'notflix', 'not+netflix+based+%7E_%7E', 0, '2023-08-22 13:52:48', 'mock_os', '', 'favicon.svg'),
(9, 'lens', '[]', 'index.php', '0', 'Lens', 'I%27m+watching+you+%3A-%29', 0, '2023-08-22 13:54:55', 'mock_os', '', 'favicon.svg'),
(10, 'finder', '[]', 'index.php', 'https://www.apple.com/macos/ventura/', 'Finder', 'What+About+you+find+some+bitches', 0, '2023-08-22 13:54:58', 'mock_os', '', 'favicon.svg'),
(11, 'notechad', '[]', 'index.html', '0', 'NoteChad', 'keeps+note+of+your+notes+with+a+chad', 0, '2023-08-22 13:54:39', 'mock_os', '', 'favicon.svg'),
(13, 'file editor', '[\"html\",\"css\",\"php\",\"ico\",\"js\",\"png\",\"jpg\",\"mp4\"]', 'index.php', '0', 'File editor', 'bewerk+bestanden', 0, '2023-08-22 13:57:03', 'mock_os', '', 'favicon.svg'),
(15, 'about', '[]', 'index.html', '0', 'System info', 'info+about+the+system', 0, '2023-08-22 12:37:48', 'mock_os', '', 'about.svg'),
(16, 'settings', '[]', 'index.html', '0', 'settings', 'make+the+system+yours', 0, '2023-08-22 20:42:14', 'mock_os', 'parentstyle.css', 'favicon.svg'),
(17, 'crApp store', '[]', 'index.php', 'https://www.apple.com/app-store/', 'crApp store', 'bcs the system+is+boring+without+apps', 0, NULL, 'mock_os', NULL, 'favicon.svg');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
