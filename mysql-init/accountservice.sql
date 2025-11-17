-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: accountservice
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `enable` bit(1) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `keycloak_id` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKn7ihswpy07ci568w34q0oi8he` (`email`),
  UNIQUE KEY `UK3ylel7yvrgn2t5een0nps3ql6` (`keycloak_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'https://storage.cloud.google.com/lingo_media2/avatar/1761277748468-Simple_Lingo_Language_Test_Logo.png','2025-10-22 03:43:41.625777','admin@gmail.com',_binary '','justtestnow','f8cc156f-26ff-4a68-abab-bb9093bec441','justtestnownownow','2025-10-24 03:49:09.554255','admin','0342696078'),(2,NULL,'2025-10-22 03:43:58.498742','lingo@gmail.com',_binary '\0','','7714c245-3618-4dbf-bd98-db9181571af7','','2025-10-26 08:09:05.860748','lingo',NULL),(6,'https://storage.cloud.google.com/lingo_media2/avatar/1762179428029-pic2.jpg','2025-10-24 05:48:07.308817','test01@gmail.com',_binary '','justtestnow','f2b1f962-805f-489d-8450-708170a1ed7a','justtestnownownow','2025-11-03 14:17:10.285187','test01','0342696078'),(10,NULL,'2025-10-28 08:04:07.622070','test02@gmail.com',_binary '',NULL,'cd3ec395-375c-4697-9136-3aa598d81304',NULL,NULL,'test02@gmail.com',NULL),(11,NULL,'2025-11-03 10:49:42.527943','test05@gmail.com',_binary '',NULL,'b8d2b441-b179-4ca0-af1d-021cab25a77a',NULL,'2025-11-03 11:01:02.199590','chor@gmailcl',NULL),(12,NULL,'2025-11-03 10:50:52.325484','test07@gmail.com',_binary '',NULL,'880f4678-7a8b-4c04-8dd5-0a43b0d034d5',NULL,NULL,'chor1@gmailcl',NULL),(13,NULL,'2025-11-03 13:37:48.401138','test08@gmail.com',_binary '',NULL,'609a1c8c-e8fe-4d11-b202-846caa3e273e',NULL,NULL,'test08',NULL),(14,NULL,'2025-11-03 13:38:03.835466','test09@gmail.com',_binary '',NULL,'3d39e7ef-4e9a-47cb-8cf8-d208dcb38372',NULL,NULL,'test09',NULL),(15,NULL,'2025-11-03 13:45:55.367425','test10@gmail.com',_binary '',NULL,'ffd9ea29-dfb0-4277-9163-2790b35a2979',NULL,NULL,'test10',NULL),(16,NULL,'2025-11-03 13:49:17.095993','test11@gmail.com',_binary '',NULL,'ebd0fa62-44b5-442c-9d28-caae03bd0e18',NULL,NULL,'test11',NULL),(17,NULL,'2025-11-03 13:49:27.876265','test12@gmail.com',_binary '',NULL,'9bf989e8-0a49-4f28-bdd3-dff33518e2e5',NULL,NULL,'test12',NULL),(18,NULL,'2025-11-03 13:50:27.523249','test13@gmail.com',_binary '',NULL,'cf761b9d-3ec9-418f-908a-82b55fb61b26',NULL,NULL,'test13',NULL),(19,NULL,'2025-11-03 13:58:50.951133','test14@gmail.com',_binary '',NULL,'132e4e67-9ffc-4ef9-a214-82f06f2b3186',NULL,NULL,'test14',NULL),(20,NULL,'2025-11-03 14:00:28.654119','test15@gmail.com',_binary '',NULL,'0232a4a6-e696-4949-9931-118d78ed9365',NULL,NULL,'test15',NULL),(23,NULL,'2025-11-12 07:49:42.224463','chroller01@gmail.com',_binary '',NULL,'d294b705-03b9-4bd5-a7ab-7b8b691c713d',NULL,NULL,'chroller01@gmail.com',NULL),(24,NULL,'2025-11-13 07:59:49.291150','chroller03@gmail.com',_binary '',NULL,'521eb0c4-d219-4833-b436-f734029278c9',NULL,NULL,'chroller03@gmail.com',NULL),(26,NULL,'2025-11-15 14:26:42.166784','chroller04@gmail.com',_binary '',NULL,'5f06b1d8-9342-4f03-bf98-2a82101a80df',NULL,NULL,'chroller04@gmail.com',NULL),(27,NULL,'2025-11-15 14:31:59.792391','chroller05@gmail.com',_binary '',NULL,'18656d3a-e0f5-4349-8511-f2f7f0f96070',NULL,NULL,'chroller05@gmail.com',NULL),(28,NULL,'2025-11-15 14:45:14.783543','chroller06@gmail.com',_binary '',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',NULL,NULL,'chroller06@gmail.com',NULL),(29,NULL,'2025-11-15 14:49:22.255588','chroller07@gmail.com',_binary '',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',NULL,NULL,'chroller07@gmail.com',NULL),(30,NULL,'2025-11-17 06:31:08.920570','chroller08@gmail.com',_binary '',NULL,'2ba95628-a191-424a-a58e-21e7ddf03f7c',NULL,NULL,'chroller08@gmail.com',NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER'),(2,'ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_seq`
--

DROP TABLE IF EXISTS `roles_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_seq`
--

LOCK TABLES `roles_seq` WRITE;
/*!40000 ALTER TABLE `roles_seq` DISABLE KEYS */;
INSERT INTO `roles_seq` VALUES (1);
/*!40000 ALTER TABLE `roles_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` varchar(255) NOT NULL,
  `role_id` bigint NOT NULL,
  KEY `FKj6m8fwv7oqv74fcehir1a9ffy` (`role_id`),
  CONSTRAINT `FKj6m8fwv7oqv74fcehir1a9ffy` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES ('7714c245-3618-4dbf-bd98-db9181571af7',1),('7714c245-3618-4dbf-bd98-db9181571af7',2),('f8cc156f-26ff-4a68-abab-bb9093bec441',1),('77468b35-26a4-4907-ab8e-65f1bc9c11fb',1),('f2b1f962-805f-489d-8450-708170a1ed7a',1),('f2b1f962-805f-489d-8450-708170a1ed7a',2),('b20fdc71-bfcf-466d-93b7-f38792eb8358',1),('bbcbed39-c569-487b-8b55-1c43862769b9',1),('cd3ec395-375c-4697-9136-3aa598d81304',1),('3ea806e3-d8c5-45b5-a273-170f6423a1d8',1),('3ea806e3-d8c5-45b5-a273-170f6423a1d8',2),('880f4678-7a8b-4c04-8dd5-0a43b0d034d5',1),('b8d2b441-b179-4ca0-af1d-021cab25a77a',2),('609a1c8c-e8fe-4d11-b202-846caa3e273e',1),('3d39e7ef-4e9a-47cb-8cf8-d208dcb38372',1),('ffd9ea29-dfb0-4277-9163-2790b35a2979',1),('ebd0fa62-44b5-442c-9d28-caae03bd0e18',1),('9bf989e8-0a49-4f28-bdd3-dff33518e2e5',1),('cf761b9d-3ec9-418f-908a-82b55fb61b26',1),('cf761b9d-3ec9-418f-908a-82b55fb61b26',2),('132e4e67-9ffc-4ef9-a214-82f06f2b3186',1),('132e4e67-9ffc-4ef9-a214-82f06f2b3186',2),('0232a4a6-e696-4949-9931-118d78ed9365',1),('0232a4a6-e696-4949-9931-118d78ed9365',2),('db6346c3-a399-458e-8a7e-0c899983c2ac',1),('db6346c3-a399-458e-8a7e-0c899983c2ac',2),('71a71a46-63f0-43b6-a30a-61e57ec4bf0a',1),('71a71a46-63f0-43b6-a30a-61e57ec4bf0a',2),('d294b705-03b9-4bd5-a7ab-7b8b691c713d',1),('521eb0c4-d219-4833-b436-f734029278c9',1),('9de10d16-6130-492e-8646-8708eabf7644',2),('5f06b1d8-9342-4f03-bf98-2a82101a80df',2),('18656d3a-e0f5-4349-8511-f2f7f0f96070',2),('6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',2),('12fba284-a57a-4ede-8c4c-00438ae45573',2),('2ba95628-a191-424a-a58e-21e7ddf03f7c',1);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_series`
--

DROP TABLE IF EXISTS `web_series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `web_series` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `release_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_series`
--

LOCK TABLES `web_series` WRITE;
/*!40000 ALTER TABLE `web_series` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_series` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 20:06:29
