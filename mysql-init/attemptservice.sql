-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: attemptservice
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `attempt_section_results`
--

DROP TABLE IF EXISTS `attempt_section_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attempt_section_results` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answers` int DEFAULT NULL,
  `max_possible_score` double DEFAULT NULL,
  `section_score` double DEFAULT NULL,
  `total_questions` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `attempt_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1m5v43s3p163xjeowkk0c3dm3` (`attempt_id`),
  CONSTRAINT `FK1m5v43s3p163xjeowkk0c3dm3` FOREIGN KEY (`attempt_id`) REFERENCES `attempts` (`attempt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attempt_section_results`
--

LOCK TABLES `attempt_section_results` WRITE;
/*!40000 ALTER TABLE `attempt_section_results` DISABLE KEYS */;
INSERT INTO `attempt_section_results` VALUES (1,45,200,180,50,'Listening',1),(2,40,200,170,50,'Reading',1),(3,48,200,190,50,'Listening',2),(4,46,200,185,50,'Reading',2),(5,0,495,0,20,'Listening',6),(6,0,495,0,20,'Reading',6),(7,1,495,0,20,'Listening',7),(8,0,495,0,20,'Reading',7),(9,2,9,0,14,'Listening',8),(10,0,9,0,14,'Reading',8),(11,10,9,4,14,'Listening',9),(12,0,9,0,14,'Reading',9);
/*!40000 ALTER TABLE `attempt_section_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attempts`
--

DROP TABLE IF EXISTS `attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attempts` (
  `attempt_id` bigint NOT NULL AUTO_INCREMENT,
  `quiz_id` bigint DEFAULT NULL,
  `score` bigint DEFAULT NULL,
  `submitted_at` datetime(6) DEFAULT NULL,
  `time_taken` bigint DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `grading_ielts_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attempt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attempts`
--

LOCK TABLES `attempts` WRITE;
/*!40000 ALTER TABLE `attempts` DISABLE KEYS */;
INSERT INTO `attempts` VALUES (1,3,850,'2025-10-23 13:00:00.000000',3600,'TOEIC','1',NULL),(2,102,8,'2025-10-23 13:30:00.000000',3400,'IELTS','2',NULL),(3,3,820,'2025-10-23 13:30:00.000000',3559,'TOEIC','5',NULL),(4,10,600,'2025-10-23 13:30:00.000000',3546,'TOEIC','7',NULL),(5,5,7,'2025-09-23 13:30:00.000000',3481,'IELTS','1',NULL),(6,9,0,'2025-11-04 15:04:37.377000',76,'IELTS',NULL,NULL),(7,9,0,'2025-11-04 16:34:46.979000',916,'IELTS',NULL,NULL),(8,11,0,'2025-11-17 15:20:47.293000',39,'IELTS','9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',NULL),(9,11,2,'2025-11-17 15:23:42.559000',119,'IELTS','9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',NULL);
/*!40000 ALTER TABLE `attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct` bit(1) NOT NULL,
  `correct_answer` varchar(255) DEFAULT NULL,
  `question_id` bigint DEFAULT NULL,
  `user_answer` varchar(255) DEFAULT NULL,
  `attempt_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKihhi8di3m8mdjksjy31dd48gt` (`attempt_id`),
  CONSTRAINT `FKihhi8di3m8mdjksjy31dd48gt` FOREIGN KEY (`attempt_id`) REFERENCES `attempts` (`attempt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
INSERT INTO `user_answers` VALUES (1,_binary '','A',101,'A',1),(2,_binary '\0','C',102,'B',1),(3,_binary '','C',103,'C',1),(4,_binary '','D',104,'D',2),(5,_binary '\0','B',105,'A',2),(6,_binary '\0','WAREHOUSE',618,'',6),(7,_binary '\0','HITCHER',619,'',6),(8,_binary '\0','SUPERMARKET',620,'',6),(9,_binary '\0','BAKERY',621,'',6),(10,_binary '\0','ARW204',622,'',6),(11,_binary '\0','ADVERTS/ADVERTISEMENTS',623,'',6),(12,_binary '\0','NEWSPAPER',624,'',6),(13,_binary '\0','AGENCY',625,'',6),(14,_binary '\0','TUTORS',626,'',6),(15,_binary '\0','FEEDBACK',627,'',6),(16,_binary '\0','A',628,'',6),(17,_binary '\0','B',629,'',6),(18,_binary '\0','C',630,'',6),(19,_binary '\0','A',631,'',6),(20,_binary '\0','B',632,'',6),(21,_binary '\0','C',633,'',6),(22,_binary '\0','B',634,'',6),(23,_binary '\0','E',635,'',6),(24,_binary '\0','HITCHER',636,'',6),(25,_binary '\0','G',637,'',6),(26,_binary '\0','A',638,'',6),(27,_binary '\0','B',639,'',6),(28,_binary '\0','A',640,'',6),(29,_binary '\0','C',641,'',6),(30,_binary '\0','B',642,'',6),(31,_binary '\0','C',643,'',6),(32,_binary '\0','B/E',644,'',6),(33,_binary '\0','B/E',645,'',6),(34,_binary '\0','A/D',646,'',6),(35,_binary '\0','A/D',647,'',6),(36,_binary '\0','TRANSPORTATION',648,'',6),(37,_binary '\0','CLEAN',649,'',6),(38,_binary '\0','INFORMATION',650,'',6),(39,_binary '\0','RESIDENTS',651,'',6),(40,_binary '\0','BONUS',652,'',6),(41,_binary '\0','VISITORS',653,'',6),(42,_binary '\0','COMMUNICATION',654,'',6),(43,_binary '\0','SLEEP',655,'',6),(44,_binary '\0','PLASTIC',656,'',6),(45,_binary '\0','PLANNING',657,'',6),(46,_binary '\0','WAREHOUSE',618,'hello',7),(47,_binary '\0','HITCHER',619,'hi\n',7),(48,_binary '\0','SUPERMARKET',620,'monaco',7),(49,_binary '\0','BAKERY',621,'',7),(50,_binary '','ARW204',622,'ARW204',7),(51,_binary '\0','ADVERTS/ADVERTISEMENTS',623,'',7),(52,_binary '\0','NEWSPAPER',624,'',7),(53,_binary '\0','AGENCY',625,'',7),(54,_binary '\0','TUTORS',626,'',7),(55,_binary '\0','FEEDBACK',627,'',7),(56,_binary '\0','A',628,'',7),(57,_binary '\0','B',629,'',7),(58,_binary '\0','C',630,'',7),(59,_binary '\0','A',631,'',7),(60,_binary '\0','B',632,'',7),(61,_binary '\0','C',633,'',7),(62,_binary '\0','B',634,'',7),(63,_binary '\0','E',635,'',7),(64,_binary '\0','HITCHER',636,'',7),(65,_binary '\0','G',637,'',7),(66,_binary '\0','A',638,'',7),(67,_binary '\0','B',639,'',7),(68,_binary '\0','A',640,'',7),(69,_binary '\0','C',641,'',7),(70,_binary '\0','B',642,'',7),(71,_binary '\0','C',643,'',7),(72,_binary '\0','B/E',644,'',7),(73,_binary '\0','B/E',645,'',7),(74,_binary '\0','A/D',646,'',7),(75,_binary '\0','A/D',647,'',7),(76,_binary '\0','TRANSPORTATION',648,'',7),(77,_binary '\0','CLEAN',649,'',7),(78,_binary '\0','INFORMATION',650,'',7),(79,_binary '\0','RESIDENTS',651,'',7),(80,_binary '\0','BONUS',652,'',7),(81,_binary '\0','VISITORS',653,'',7),(82,_binary '\0','COMMUNICATION',654,'',7),(83,_binary '\0','SLEEP',655,'',7),(84,_binary '\0','PLASTIC',656,'',7),(85,_binary '\0','PLANNING',657,'',7),(86,_binary '\0','WAREHOUSE',698,'aass',8),(87,_binary '\0','HITCHER',699,'asdasda',8),(88,_binary '\0','SUPERMARKET',700,'dasdasd',8),(89,_binary '\0','BAKERY',701,'asdads',8),(90,_binary '\0','ARW204',702,'dasdasd',8),(91,_binary '','ADVERTS/ADVERTISEMENTS',703,'ADVERTS/ADVERTISEMENTS',8),(92,_binary '','NEWSPAPER',704,'NEWSPAPER',8),(93,_binary '\0','AGENCY',705,'',8),(94,_binary '\0','TUTORS',706,'',8),(95,_binary '\0','FEEDBACK',707,'',8),(96,_binary '\0','C',713,'',8),(97,_binary '\0','B',714,'',8),(98,_binary '\0','E',715,'',8),(99,_binary '\0','HITCHER',716,'',8),(100,_binary '\0','G',717,'',8),(101,_binary '\0','B/E',724,'',8),(102,_binary '\0','B/E',725,'',8),(103,_binary '\0','A/D',726,'',8),(104,_binary '\0','A/D',727,'',8),(105,_binary '\0','TRANSPORTATION',728,'',8),(106,_binary '\0','CLEAN',729,'',8),(107,_binary '\0','INFORMATION',730,'',8),(108,_binary '\0','RESIDENTS',731,'',8),(109,_binary '\0','BONUS',732,'',8),(110,_binary '\0','VISITORS',733,'',8),(111,_binary '\0','COMMUNICATION',734,'',8),(112,_binary '\0','SLEEP',735,'',8),(113,_binary '\0','PLASTIC',736,'',8),(114,_binary '\0','PLANNING',737,'',8),(115,_binary '','WAREHOUSE',698,'WAREHOUSE',9),(116,_binary '','HITCHER',699,'HITCHER',9),(117,_binary '','SUPERMARKET',700,'SUPERMARKET',9),(118,_binary '','BAKERY',701,'BAKERY',9),(119,_binary '','ARW204',702,'ARW204',9),(120,_binary '','ADVERTS/ADVERTISEMENTS',703,'ADVERTS/ADVERTISEMENTS',9),(121,_binary '','NEWSPAPER',704,'NEWSPAPER',9),(122,_binary '','AGENCY',705,'AGENCY',9),(123,_binary '','TUTORS',706,'TUTORS',9),(124,_binary '','FEEDBACK',707,'FEEDBACK',9),(125,_binary '\0','C',713,'',9),(126,_binary '\0','B',714,'',9),(127,_binary '\0','E',715,'',9),(128,_binary '\0','HITCHER',716,'',9),(129,_binary '\0','G',717,'',9),(130,_binary '\0','B/E',724,'',9),(131,_binary '\0','B/E',725,'',9),(132,_binary '\0','A/D',726,'',9),(133,_binary '\0','A/D',727,'',9),(134,_binary '\0','TRANSPORTATION',728,'',9),(135,_binary '\0','CLEAN',729,'',9),(136,_binary '\0','INFORMATION',730,'',9),(137,_binary '\0','RESIDENTS',731,'',9),(138,_binary '\0','BONUS',732,'',9),(139,_binary '\0','VISITORS',733,'',9),(140,_binary '\0','COMMUNICATION',734,'',9),(141,_binary '\0','SLEEP',735,'',9),(142,_binary '\0','PLASTIC',736,'',9),(143,_binary '\0','PLANNING',737,'',9);
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 20:29:43
