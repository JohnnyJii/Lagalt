package com.experis.lagalt.security.jwt;

import com.experis.lagalt.models.User;
import com.experis.lagalt.security.models.UserDetail;
import com.experis.lagalt.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JwtUtil {

    @Autowired
    private UserService userService;

    public UserDetails getUser(String token) throws Exception{
        String uid = getUID(token);
        System.out.println("uid: " + uid);
        // TODO get user by UID
        User user = userService.findUser(3L);
        if(user.getId() != 3L){
            throw new NotFoundException("User with ID 3 not found");
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
