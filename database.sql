-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mier_mock_os
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `extentions` text,
  `source` text,
  `ref` text,
  `title` text,
  `description` text,
  `verified` int DEFAULT NULL,
  `reg_date` text,
  `developer` text,
  `custom_style` text,
  `icon_path` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES (1,'safeari','[]','https://bing.com','https://bing.com','safeari','BiNg+SeArCh+BcS+iT+iS+gOoD',0,'2023-08-22 12:37:48','mock_os','','favicon.png'),(2,'icould','[]','login.html','https://www.icloud.com/','Icould','Could+i%3F',0,'2023-08-22 13:53:41','mock_os','','favicon.png'),(3,'mapple apps','[]','https://www.google.com/maps/embed/v1/view?key=AIzaSyA1Vf45Wr0eyIUAhNrqjezMEW82fhBRDIA&amp;center=43.723205,10.39469&amp;zoom=18&amp;maptype=satellite','https://www.google.com/maps/embed/v1/view?key=AIzaSyA1Vf45Wr0eyIUAhNrqjezMEW82fhBRDIA&amp;center=43.723205,10.39469&amp;zoom=18&amp;maptype=satellite','Mapple Apps','Better+ways+ahead+with+google+maps.',0,'2023-08-22 12:37:48','mock_os','','favicon.png'),(4,'cripple music','[]','cripple_music.html','https://www.apple.com/benl/apple-music/','Cripple Music','Lose+yourself+in+50+million+songs',0,'2023-08-22 13:54:07','mock_os','','favicon.png'),(5,'statsfm','[]','https://stats.fm/','https://stats.fm/','Stats.fm','Your+music%2C+your+stats%2C+your+story.',0,'2023-08-22 12:37:48','mock_os','','favicon.png'),(6,'rocks star','[]','https://www.rockstargames.com/','https://www.rockstargames.com/','rocks star launcher','Killing+dreams.+Murdering+hope.+Fighting+the+righteous.+Bullying+the+weak.',0,'2023-08-22 12:37:48','mock_os','','favicon.png'),(7,'sir','[]','index.html','https://www.apple.com/siri/','sir asistant','Useless+here+%3D%29',1,'2023-08-22 20:49:46','mock_os','parentstyle.css','favicon.png'),(8,'notflix','[]','index.html','https://www.netflix.com/','notflix','not+netflix+based+%7E_%7E',0,'2023-08-22 13:52:48','mock_os','','favicon.png'),(9,'lens','[]','index.php','0','Lens','I%27m+watching+you+%3A-%29',0,'2023-08-22 13:54:55','mock_os','','favicon.png'),(10,'finder','[]','index.php','https://www.apple.com/macos/ventura/','Finder','Find your files',0,'2023-08-22 13:54:58','mock_os','','favicon.png'),(11,'notechad','[]','index.html','0','NoteChad','keeps+note+of+your+notes+with+a+chad',0,'2023-08-22 13:54:39','mock_os','','favicon.png'),(13,'file editor','[\"html\",\"css\",\"php\",\"ico\",\"js\",\"png\",\"jpg\",\"mp4\"]','index.php','0','File editor','bewerk+bestanden',0,'2023-08-22 13:57:03','mock_os','','favicon.png'),(14,'finder','[]','index.php','0','Finder','find+files',0,'2023-08-22 14:07:48','mock_os','','favicon.png'),(15,'about','[]','about/index.html','0','System info','info+about+the+system',0,'2023-08-22 12:37:48','mock_os','','favicon.png'),(16,'settings','[]','index.html','0','settings','make+the+system+yours',0,'2023-08-22 20:42:14','mock_os','parentstyle.css','favicon.png');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-16 10:36:42
