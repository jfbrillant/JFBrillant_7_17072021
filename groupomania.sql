-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `userId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `comments_ibfk_1` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (35,20,1,'yes','2021-07-26 23:28:33','2021-07-26 23:28:39'),(38,20,3,'hey !','2021-07-27 02:03:31','2021-07-27 02:03:31'),(39,21,3,'Youpi !','2021-07-27 02:06:32','2021-07-27 02:21:34'),(40,21,1,'dfgdfgdfg','2021-07-27 09:23:04','2021-07-27 09:30:01'),(41,21,1,'dfgdfgdfg','2021-07-27 09:29:53','2021-07-27 09:30:01');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `likes` int NOT NULL,
  `comments` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (20,1,'coucou','http://localhost:3000/images/kaamelott.gif1627342101866.gif',0,3,'2021-07-26 23:28:21','2021-07-27 02:03:31'),(21,3,'Hello','http://localhost:3000/images/travis.gif1627352465333.gif',0,3,'2021-07-26 23:29:28','2021-07-27 09:29:53');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210723201835-create-user.js'),('20210723202016-create-post.js'),('20210723210120-create-comment.js'),('20210724205440-AddConstraintToComment.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Mark','Hoppus','mhoppus@mail.com','$2b$10$iwvOf3Fvng2VcfyHVAxIseaFbaZGzQeTYi8nQXfWaLpquvh6xEste',0,'2021-07-24 00:46:49','2021-07-24 00:46:49'),(2,'Tom','Delonge','tdelonge@mail.com','$2b$10$70n496Pb/H0pD2fNw6NJyeB0uV2SP89uGom5WCKXmUnFlgMj3M14i',0,'2021-07-24 00:48:39','2021-07-24 00:48:39'),(3,'Jf','Brillant','jf.brillant@live.fr','$2b$10$nwE9w/o.mHoWkGRNV.kPx.tPXyxG0vjr0YbEW0VEydVW1ZUYu64zO',0,'2021-07-26 17:25:20','2021-07-26 17:25:20'),(4,'Papuche','Moka','papuchemoka@gmail.com','$2b$10$kjnd2pS6yrb9GVo41QFH5u9J69RwseHud5tMoKICco1PxfpTan6Ca',0,'2021-07-26 20:03:45','2021-07-26 20:03:45');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-27 12:04:39
