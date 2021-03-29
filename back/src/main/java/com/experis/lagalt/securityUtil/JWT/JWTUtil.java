package com.experis.lagalt.securityUtil.JWT;

import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.UserRepository;
import com.experis.lagalt.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;

public class JWTUtil {

    @Autowired
    private UserService userService;

    public User getUser(String token) {
        // TODO get user by UID
        String uid = getUID(token);
        return userService.findUser(5l);
    }

    public String getUID(String token) {
        try {
            return getToken(token).getUid();
        } catch (FirebaseAuthException ex) {
            System.out.println("ERROR -Firebase auth ex- " + ex.getMessage());
        }
        return null;
    }

    public String getName(String token) {
        try {
            return getToken(token).getName();
        } catch (FirebaseAuthException ex) {
            System.out.println("ERROR -Firebase auth ex- " + ex.getMessage());
        }
        return null;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            getToken(authToken);
            return true;
        } catch (FirebaseAuthException ex) {
            System.out.println("ERROR -Firebase auth ex- " + ex.getMessage());
        }
        return false;
    }

    private FirebaseToken getToken(String token) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(token);
    }

}
