-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: notification
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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `read_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `notofication_type_id` bigint NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe1kt2fxv5i0hqbi3lpua42fre` (`notofication_type_id`),
  CONSTRAINT `FKe1kt2fxv5i0hqbi3lpua42fre` FOREIGN KEY (`notofication_type_id`) REFERENCES `notification_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'2025-11-15 21:49:23.051000',_binary '\0','Welcome to Lingo',NULL,'WELCOME_USER','12fba284-a57a-4ede-8c4c-00438ae45573',2,NULL),(2,'2025-11-15 22:38:07.720000',_binary '\0','Take exam now !!!',NULL,'New test has been added.','6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',7,NULL),(3,'2025-11-15 22:38:12.704000',_binary '\0','Take exam now !!!',NULL,'New test has been added.','12fba284-a57a-4ede-8c4c-00438ae45573',7,NULL),(4,'2025-11-15 22:39:47.548000',_binary '\0','Take exam now !!!',NULL,'New test has been added.','6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',7,NULL),(5,'2025-11-15 22:39:52.203000',_binary '\0','Take exam now !!!',NULL,'New test has been added.','12fba284-a57a-4ede-8c4c-00438ae45573',7,NULL),(6,'2025-11-17 00:14:45.222000',_binary '\0','test',NULL,'update test','12fba284-a57a-4ede-8c4c-00438ae45573',7,NULL),(7,'2025-11-17 00:17:39.476000',_binary '\0','test',NULL,'update test','12fba284-a57a-4ede-8c4c-00438ae45573',7,'/tests/3/ets-2024-test-1-pro-limited-ver-2'),(8,'2025-11-17 00:17:58.046000',_binary '\0','alololola',NULL,'Một bình luận của bạn vừa được phản hồi','keycloak_id_19',6,'/tests/3/ets-2024-test-1-pro-limited-ver-2'),(9,'2025-11-17 01:17:46.301000',_binary '\0','alololola',NULL,'Một bình luận của bạn vừa được phản hồi',NULL,6,'/tests/3/ets-2024-test-1-pro-limited-ver-2'),(10,'2025-11-17 01:40:48.002000',_binary '\0','test 2',NULL,'Một bình luận của bạn vừa được phản hồi',NULL,6,'/tests/3/ets-2024-test-1-pro-limited-ver-2'),(12,'2025-11-17 11:34:34.904000',_binary '\0','mẹ m',NULL,'Một bình luận của bạn vừa được phản hồi','f8cc156f-26ff-4a68-abab-bb9093bec441',6,'/tests/11/IELTS-2019-Actual-Listening-Test-1'),(14,'2025-11-17 11:47:56.108000',_binary '\0','đề test vừa được thêm, xem ngay',NULL,'Có bài test mới vừa được thêm',NULL,7,'/tests/29/đề-test'),(15,'2025-11-17 12:04:36.565000',_binary '\0','test notify vừa được thêm, xem ngay',NULL,'Có bài test mới vừa được thêm','6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',7,'/tests/30/test-notify'),(16,'2025-11-17 12:04:40.706000',_binary '\0','test notify vừa được thêm, xem ngay',NULL,'Có bài test mới vừa được thêm','12fba284-a57a-4ede-8c4c-00438ae45573',7,'/tests/30/test-notify'),(17,'2025-11-17 12:04:44.666000',_binary '','test notify vừa được thêm, xem ngay','2025-11-17 12:24:01.309000','Có bài test mới vừa được thêm','9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',7,'/tests/30/test-notify'),(18,'2025-11-17 12:23:37.959000',_binary '','cha m','2025-11-17 12:23:57.674000','Một bình luận của bạn vừa được phản hồi','9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',6,'/tests/11/IELTS-2019-Actual-Listening-Test-1#comment-75');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_type`
--

DROP TABLE IF EXISTS `notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `default_app` bit(1) NOT NULL,
  `default_mail` bit(1) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_type`
--

LOCK TABLES `notification_type` WRITE;
/*!40000 ALTER TABLE `notification_type` DISABLE KEYS */;
INSERT INTO `notification_type` VALUES (2,'2025-11-15 11:37:41.608000',_binary '',_binary '','Welcome new account on the website','WELCOME_USER',NULL),(3,'2025-11-15 20:17:06.541000',_binary '',_binary '\0','Notification when a user completes a test.','TEST_COMPLETED','2025-11-15 20:25:55.626000'),(4,'2025-11-15 20:17:19.114000',_binary '',_binary '\0','Reminds the user about an upcoming lesson.','LESSON_REMINDER','2025-11-15 20:27:38.220000'),(5,'2025-11-15 20:17:30.835000',_binary '',_binary '\0','Notification about a scheduled system maintenance.','SYSTEM_MAINTENANCE','2025-11-15 20:28:06.680000'),(6,'2025-11-15 20:17:37.847000',_binary '',_binary '\0','Notification when someone replies to your comment.','COMMENT_REPLY',NULL),(7,'2025-11-15 20:18:27.705000',_binary '',_binary '','Notification when a new test is added to a course you are enrolled in.','COURSE_UPDATE','2025-11-15 20:29:19.254000');
/*!40000 ALTER TABLE `notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification_settings`
--

DROP TABLE IF EXISTS `user_notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app_enabled` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email_enabled` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `notofication_type_id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnulh9jyy3kafdfaj3y5iyq5qd` (`notofication_type_id`),
  CONSTRAINT `FKnulh9jyy3kafdfaj3y5iyq5qd` FOREIGN KEY (`notofication_type_id`) REFERENCES `notification_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification_settings`
--

LOCK TABLES `user_notification_settings` WRITE;
/*!40000 ALTER TABLE `user_notification_settings` DISABLE KEYS */;
INSERT INTO `user_notification_settings` VALUES (20,_binary '','2025-11-15 21:45:15.369000',_binary '',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',2,'chroller03@gmail.com'),(21,_binary '','2025-11-15 21:45:15.480000',_binary '\0',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',3,'chroller03@gmail.com'),(22,_binary '','2025-11-15 21:45:15.486000',_binary '\0',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',4,'chroller03@gmail.com'),(23,_binary '','2025-11-15 21:45:15.488000',_binary '\0',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',5,'chroller03@gmail.com'),(24,_binary '','2025-11-15 21:45:15.490000',_binary '\0',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',6,'chroller03@gmail.com'),(25,_binary '','2025-11-15 21:45:15.493000',_binary '',NULL,'6281c0b4-92b0-491d-b4cd-2c941e4f1a3b',7,'chroller03@gmail.com'),(26,_binary '','2025-11-15 21:49:22.731000',_binary '',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',2,'chroller04@gmail.com'),(27,_binary '','2025-11-15 21:49:22.820000',_binary '\0',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',3,'chroller04@gmail.com'),(28,_binary '','2025-11-15 21:49:22.823000',_binary '\0',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',4,'chroller04@gmail.com'),(29,_binary '','2025-11-15 21:49:22.825000',_binary '\0',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',5,'chroller04@gmail.com'),(30,_binary '','2025-11-15 21:49:22.828000',_binary '\0',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',6,'chroller04@gmail.com'),(31,_binary '','2025-11-15 21:49:22.831000',_binary '',NULL,'12fba284-a57a-4ede-8c4c-00438ae45573',7,'chroller04@gmail.com'),(32,_binary '','2025-11-17 11:06:57.095000',_binary '',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',2,'0plmzxc@gmail.com'),(33,_binary '','2025-11-17 11:06:57.131000',_binary '\0',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',3,'0plmzxc@gmail.com'),(34,_binary '','2025-11-17 11:06:57.131000',_binary '\0',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',4,'0plmzxc@gmail.com'),(35,_binary '','2025-11-17 11:06:57.131000',_binary '\0',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',5,'0plmzxc@gmail.com'),(36,_binary '','2025-11-17 11:06:57.136000',_binary '\0',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',6,'0plmzxc@gmail.com'),(37,_binary '','2025-11-17 11:06:57.136000',_binary '',NULL,'9b3fac4f-6442-4d29-92b6-e13ecd5a5b94',7,'0plmzxc@gmail.com');
/*!40000 ALTER TABLE `user_notification_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 20:29:23
