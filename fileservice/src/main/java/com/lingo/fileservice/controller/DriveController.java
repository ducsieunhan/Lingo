package com.lingo.fileservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.api.services.drive.Drive;

@Controller
public class DriveController {
    @Autowired
    private Drive googleDrive;

}
