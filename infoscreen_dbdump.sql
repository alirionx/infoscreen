-- MySQL dump 10.16  Distrib 10.1.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: infoscreen
-- ------------------------------------------------------
-- Server version	10.1.29-MariaDB-6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__dd`
--

DROP TABLE IF EXISTS `__dd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `__dd` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `column_name` varchar(45) DEFAULT NULL,
  `src_table` varchar(45) DEFAULT NULL,
  `src_val_col` varchar(45) DEFAULT NULL,
  `src_txt_col` varchar(45) DEFAULT NULL,
  `src_group` varchar(45) DEFAULT NULL,
  `src_order` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__dd`
--

LOCK TABLES `__dd` WRITE;
/*!40000 ALTER TABLE `__dd` DISABLE KEYS */;
INSERT INTO `__dd` VALUES (1,'presentation_status','presentation_status','id','status','GROUP BY status','ORDER BY odr'),(2,'user_role','roles','id','role_name',NULL,'ORDER BY id');
/*!40000 ALTER TABLE `__dd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__tables`
--

DROP TABLE IF EXISTS `__tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `__tables` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(45) DEFAULT NULL,
  `id_col` varchar(45) DEFAULT NULL,
  `new_col` varchar(45) DEFAULT NULL,
  `new_val` varchar(45) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  `table_odr` varchar(45) DEFAULT NULL,
  `mgmt` varchar(45) DEFAULT NULL,
  `mgmt_txt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__tables`
--

LOCK TABLES `__tables` WRITE;
/*!40000 ALTER TABLE `__tables` DISABLE KEYS */;
INSERT INTO `__tables` VALUES (1,'presentations','presentation_id','presentation_name','new presetation','true','presentation_id','false',NULL),(2,'locations','location_id','location_name','new location','true','location_id','false',NULL),(3,'slides','slide_id','slide_comment',NULL,'true','slide_number','false',NULL),(4,'presentation_status','id','status','new status','false','odr','true','Presentation Status'),(5,'users','user_id','user_role','1','true','user_id','true','App Users');
/*!40000 ALTER TABLE `__tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_locations`
--

DROP TABLE IF EXISTS `_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_locations` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` int(8) DEFAULT NULL,
  `column_name` varchar(45) DEFAULT NULL,
  `column_headline` varchar(45) DEFAULT NULL,
  `column_align` varchar(45) DEFAULT NULL,
  `column_width` varchar(45) DEFAULT NULL,
  `column_type` varchar(45) DEFAULT NULL,
  `cell_placeholder` varchar(128) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_locations`
--

LOCK TABLES `_locations` WRITE;
/*!40000 ALTER TABLE `_locations` DISABLE KEYS */;
INSERT INTO `_locations` VALUES (1,1,'location_id','Id','center','30px','static',NULL,'true'),(2,2,'location_name','Presentation Name','left',NULL,'input','Suitable Name','true'),(3,4,'location_comment','Comment','left',NULL,'input','Optional comment','true'),(4,5,'location_contact','Contact','center',NULL,'input','Contact Name','true'),(5,3,'location_site','Site','left',NULL,'input','Location Site','true');
/*!40000 ALTER TABLE `_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_presentation_status`
--

DROP TABLE IF EXISTS `_presentation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_presentation_status` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` int(8) DEFAULT NULL,
  `column_name` varchar(45) DEFAULT NULL,
  `column_headline` varchar(45) DEFAULT NULL,
  `column_align` varchar(45) DEFAULT NULL,
  `column_width` varchar(45) DEFAULT NULL,
  `column_type` varchar(45) DEFAULT NULL,
  `cell_placeholder` varchar(128) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_presentation_status`
--

LOCK TABLES `_presentation_status` WRITE;
/*!40000 ALTER TABLE `_presentation_status` DISABLE KEYS */;
INSERT INTO `_presentation_status` VALUES (1,1,'id','Id','center','30px','static',NULL,'true'),(2,2,'odr','Odr','center','20px','odr',NULL,'true'),(3,3,'status','Status','left',NULL,'input',NULL,'true'),(4,4,'comment','Comment','left',NULL,'input',NULL,'true'),(5,5,'show_in_location','Show in Location','center',NULL,'checkbox',NULL,'true');
/*!40000 ALTER TABLE `_presentation_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_presentations`
--

DROP TABLE IF EXISTS `_presentations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_presentations` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` int(8) DEFAULT NULL,
  `column_name` varchar(45) DEFAULT NULL,
  `column_headline` varchar(45) DEFAULT NULL,
  `column_align` varchar(45) DEFAULT NULL,
  `column_width` varchar(45) DEFAULT NULL,
  `column_type` varchar(45) DEFAULT NULL,
  `cell_placeholder` varchar(128) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_presentations`
--

LOCK TABLES `_presentations` WRITE;
/*!40000 ALTER TABLE `_presentations` DISABLE KEYS */;
INSERT INTO `_presentations` VALUES (98,1,'presentation_id','Id','center','30px','static',NULL,'true'),(99,2,'presentation_name','Presentation Name','left',NULL,'input','Suitable Name','true'),(100,3,'presentation_comment','Comment','left',NULL,'input','Optional comment','true'),(101,4,'presentation_owner','Owner','center',NULL,'input','Owners Name','true'),(102,5,'presentation_status','Status','center',NULL,'dd_fk',NULL,'true'),(103,6,'presentation_date','Date','center','100px','date',NULL,'true'),(104,7,'presentation_pin','Pin','center','30px','input','Optional Pin','true');
/*!40000 ALTER TABLE `_presentations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_slides`
--

DROP TABLE IF EXISTS `_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_slides` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` int(8) DEFAULT NULL,
  `column_name` varchar(45) DEFAULT NULL,
  `column_headline` varchar(45) DEFAULT NULL,
  `column_align` varchar(45) DEFAULT NULL,
  `column_width` varchar(45) DEFAULT NULL,
  `column_type` varchar(45) DEFAULT NULL,
  `cell_placeholder` varchar(128) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_slides`
--

LOCK TABLES `_slides` WRITE;
/*!40000 ALTER TABLE `_slides` DISABLE KEYS */;
INSERT INTO `_slides` VALUES (1,1,'slide_id','Id','center','30px','slide_assign',NULL,'true'),(2,3,'slide_thumb','Thumb','center',NULL,'thumb',NULL,'true'),(3,4,'slide_file','File','center',NULL,'download',NULL,'true'),(4,5,'slide_comment','Comment','left',NULL,'input',NULL,'true'),(5,6,'slide_expire','Expiry Date','center',NULL,'date',NULL,'true'),(6,2,'slide_number','Odr','center',NULL,'odr',NULL,'true');
/*!40000 ALTER TABLE `_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_users`
--

DROP TABLE IF EXISTS `_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` int(8) DEFAULT NULL,
  `column_name` varchar(45) DEFAULT NULL,
  `column_headline` varchar(45) DEFAULT NULL,
  `column_align` varchar(45) DEFAULT NULL,
  `column_width` varchar(45) DEFAULT NULL,
  `column_type` varchar(45) DEFAULT NULL,
  `cell_placeholder` varchar(128) DEFAULT NULL,
  `relevant` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_users`
--

LOCK TABLES `_users` WRITE;
/*!40000 ALTER TABLE `_users` DISABLE KEYS */;
INSERT INTO `_users` VALUES (1,1,'user_id','Id','center','30px','static',NULL,'false'),(2,2,'user_name','User Name','left',NULL,'input',NULL,'false'),(3,3,'user_firstname','First Name','left',NULL,'input',NULL,'true'),(4,4,'user_lastname','Lastname','left',NULL,'input',NULL,'true'),(5,5,'user_email','Email','left',NULL,'input',NULL,'true'),(6,7,'user_password','Password','center',NULL,'password',NULL,'false'),(7,8,'user_role','Role','center',NULL,'dd_fk',NULL,'false'),(8,6,'user_address','Business Address','left',NULL,'input',NULL,'true');
/*!40000 ALTER TABLE `_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `location_id` int(8) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(45) DEFAULT NULL,
  `location_site` varchar(45) DEFAULT NULL,
  `location_contact` varchar(45) DEFAULT NULL,
  `location_comment` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (9,'Briefing Asia ','FRA','Mr. Smith','This is a Comment'),(10,'Briefing America','MUC','Mrs. Smith','This is another one'),(11,'Briefing Europe','FRA','Buts Bunny','test'),(12,'Briefing Africa','MUC','Bugs Bencer',NULL),(14,'Front Desk','MUC','The Highroller',NULL);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentation_status`
--

DROP TABLE IF EXISTS `presentation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentation_status` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `odr` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `show_in_location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentation_status`
--

LOCK TABLES `presentation_status` WRITE;
/*!40000 ALTER TABLE `presentation_status` DISABLE KEYS */;
INSERT INTO `presentation_status` VALUES (0,'0','undefined',NULL,'false'),(1,'1','draft',NULL,'false'),(2,'2','review','in Review','true'),(3,'3','approved','Ready for Briefing Room','true'),(4,'4','outdated',NULL,'false');
/*!40000 ALTER TABLE `presentation_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentation_to_location`
--

DROP TABLE IF EXISTS `presentation_to_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentation_to_location` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `presentation_id` int(8) DEFAULT NULL,
  `location_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentation_to_location`
--

LOCK TABLES `presentation_to_location` WRITE;
/*!40000 ALTER TABLE `presentation_to_location` DISABLE KEYS */;
INSERT INTO `presentation_to_location` VALUES (5,1,9),(6,1,11),(15,1,10),(17,2,9),(19,3,9),(25,5,9),(26,6,14),(28,7,14),(29,1,14),(30,4,9),(31,2,14),(32,9,9);
/*!40000 ALTER TABLE `presentation_to_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentations`
--

DROP TABLE IF EXISTS `presentations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentations` (
  `presentation_id` int(8) NOT NULL AUTO_INCREMENT,
  `presentation_name` varchar(45) DEFAULT NULL,
  `presentation_comment` varchar(128) DEFAULT NULL,
  `presentation_owner` varchar(45) DEFAULT NULL,
  `presentation_status` varchar(45) DEFAULT NULL,
  `presentation_date` varchar(45) DEFAULT NULL,
  `presentation_pin` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`presentation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentations`
--

LOCK TABLES `presentations` WRITE;
/*!40000 ALTER TABLE `presentations` DISABLE KEYS */;
INSERT INTO `presentations` VALUES (2,'DLH Videos','just another test','dquilitzsch','3','2018-05-18',NULL),(9,'EFB Test Mgmt Status','and one more','dquilitzsch','2','2018-05-19',NULL);
/*!40000 ALTER TABLE `presentations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) DEFAULT NULL,
  `role_comment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user',NULL),(2,'admin',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slide_to_location`
--

DROP TABLE IF EXISTS `slide_to_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slide_to_location` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `slide_id` int(8) DEFAULT NULL,
  `location_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide_to_location`
--

LOCK TABLES `slide_to_location` WRITE;
/*!40000 ALTER TABLE `slide_to_location` DISABLE KEYS */;
INSERT INTO `slide_to_location` VALUES (205,200,9),(207,201,9),(209,202,9),(211,200,14),(212,201,14),(213,202,14),(214,203,9),(215,204,9),(216,205,9),(217,206,9),(218,207,9),(219,208,9),(220,209,9),(221,210,9),(222,211,9),(223,212,9),(224,213,9),(225,214,9),(226,215,9),(227,216,9);
/*!40000 ALTER TABLE `slide_to_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slides`
--

DROP TABLE IF EXISTS `slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slides` (
  `slide_id` int(8) NOT NULL AUTO_INCREMENT,
  `slide_thumb` varchar(45) DEFAULT NULL,
  `slide_file` varchar(45) DEFAULT NULL,
  `slide_comment` varchar(128) DEFAULT NULL,
  `slide_expire` varchar(45) DEFAULT NULL,
  `slide_number` int(8) DEFAULT NULL,
  `presentation_id` int(8) DEFAULT NULL,
  `slide_filetype` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`slide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slides`
--

LOCK TABLES `slides` WRITE;
/*!40000 ALTER TABLE `slides` DISABLE KEYS */;
INSERT INTO `slides` VALUES (200,'thumbs/movie_icon.png','slides/4dIBCpoCLi.mp4','new ci','2018-07-31',74,2,'video'),(201,'thumbs/movie_icon.png','slides/1wuio8AI2S.mp4',NULL,NULL,75,2,'video'),(202,'thumbs/movie_icon.png','slides/DoVL1PZeEo.mp4',NULL,NULL,76,2,'video'),(203,'thumbs/eQ6xoWdlYL.jpg','slides/eQ6xoWdlYL.jpg',NULL,NULL,77,9,'image'),(204,'thumbs/StBWbRJ4cU.jpg','slides/StBWbRJ4cU.jpg',NULL,NULL,78,9,'image'),(205,'thumbs/lkmKoYPuqa.jpg','slides/lkmKoYPuqa.jpg',NULL,NULL,79,9,'image'),(206,'thumbs/1bw02UalTX.jpg','slides/1bw02UalTX.jpg',NULL,NULL,80,9,'image'),(207,'thumbs/SRzIRhNw2l.jpg','slides/SRzIRhNw2l.jpg',NULL,NULL,81,9,'image'),(208,'thumbs/hodUXOPCeb.jpg','slides/hodUXOPCeb.jpg',NULL,NULL,82,9,'image'),(209,'thumbs/dClz616WKV.jpg','slides/dClz616WKV.jpg',NULL,NULL,83,9,'image'),(210,'thumbs/JNPu8YRGaY.jpg','slides/JNPu8YRGaY.jpg',NULL,NULL,84,9,'image'),(211,'thumbs/iP8v3DzAn3.jpg','slides/iP8v3DzAn3.jpg',NULL,NULL,85,9,'image'),(212,'thumbs/Vncb5LmI08.jpg','slides/Vncb5LmI08.jpg',NULL,NULL,86,9,'image'),(213,'thumbs/Mavs0kvv60.jpg','slides/Mavs0kvv60.jpg',NULL,NULL,87,9,'image'),(214,'thumbs/AP6BDX3nFQ.jpg','slides/AP6BDX3nFQ.jpg',NULL,NULL,88,9,'image'),(215,'thumbs/Pw6UszsW9C.jpg','slides/Pw6UszsW9C.jpg',NULL,NULL,89,9,'image'),(216,'thumbs/LFH9TBAAdV.jpg','slides/LFH9TBAAdV.jpg',NULL,NULL,90,9,'image');
/*!40000 ALTER TABLE `slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_firstname` varchar(45) DEFAULT NULL,
  `user_lastname` varchar(45) DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_address` varchar(45) DEFAULT NULL,
  `user_password` varchar(128) DEFAULT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dodger','Daniel','Q','dquilitzsch@app-scape.de',NULL,'$2y$10$6sMDGO5ZzhrHd01RbYWrv.NToqYxAak/FGbEnGgyzb1ANwA1SFJoS','2'),(2,'mrrobot','Daniel','Q','mrrobot@app-scape.lab','Home','$2y$10$sYUEd1MC/MRBh.vmqWmCCet3OYDAYnEKQyp8FcTUnJwoAJEMqLh2i','1'),(3,'konis','Konstantinos','M',NULL,NULL,'$2y$10$xw69qsdBIohwt.XF0C.GRuyfolm3VW4X.haEEInsUxJ4.3GhV9wt6','2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-18 14:45:20
