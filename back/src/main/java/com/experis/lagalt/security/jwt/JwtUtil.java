package com.experis.lagalt.security.jwt;

import com.experis.lagalt.models.User;
import com.experis.lagalt.security.models.UserDetail;
import com.experis.lagalt.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JwtUtil {

    @Autowired
    private UserService userService;

    public UserDetails getUser(String token){
        String googleId = getUID(token);
        User user = userService.findUser(googleId);
        if (user.getGoogleid() == null) {
            user.setGoogleid(googleId);
        }
        return UserDetail.build(user);
    }

    public String getUID(String token) {
        try {
            return getToken(token).getUid();
        } catch (FirebaseAuthException ex) {
            System.out.println("ERROR getUID -Firebase auth ex- " + ex.getMessage());
        }
        return null;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            getToken(authToken);
            return true;
        } catch (FirebaseAuthException ex) {
            System.out.println("ERROR validateJwt -Firebase auth ex- " + ex.getMessage());
        }
        return false;
    }

    private FirebaseToken getToken(String token) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(token);
    }
}
