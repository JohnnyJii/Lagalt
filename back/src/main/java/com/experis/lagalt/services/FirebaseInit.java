package com.experis.lagalt.services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;

@Service
public class FirebaseInit {

    @Autowired
    private Logger logger;

    @PostConstruct
    private void initialize() {
        try {
            String serviceAccountJSON = System.getenv("FIREBASE_ACCOUNT");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            new ByteArrayInputStream(serviceAccountJSON.getBytes())
                    ))
                    .setProjectId(System.getenv("FIREBASE_ID"))
                    .setDatabaseUrl(System.getenv("FIREBASE_URL")).build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            logger.errorToConsole(e.getMessage());
        }
    }
}