package com.experis.lagalt.securityUtil.JWT;

import com.experis.lagalt.models.User;
import com.google.firebase.FirebaseApp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class FirebaseToken extends OncePerRequestFilter {
    /*
    try {
        FirebaseApp.initializeApp();
        com.google.firebase.auth.FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmljayBWYWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rdXRfZlNuSjJ0Zy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrc2lzS2VBVUZyY1V4dzZqWGhTV3VQT0VpNnRRL3M5Ni1jL3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9sYWdhbHQtZmlyZWJhc2UtY2hhdCIsImF1ZCI6ImxhZ2FsdC1maXJlYmFzZS1jaGF0IiwiYXV0aF90aW1lIjoxNjE2NzQ3ODE0LCJ1c2VyX2lkIjoiOXoxb05rQjFWTU9jRWI1ZTBpNWFLZGo5aW4yMiIsInN1YiI6Ijl6MW9Oa0IxVk1PY0ViNWUwaTVhS2RqOWluMjIiLCJpYXQiOjE2MTY3NDc4MTQsImV4cCI6MTYxNjc1MTQxNCwiZW1haWwiOiJuaWtrZXZhbnVrYXMxOTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE2OTg1Mzk5MzI5ODQzNjY2NTQzIl0sImVtYWlsIjpbIm5pa2tldmFudWthczE5OTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ZKXsyh0_oiD2Hbv8aBZxRDZag2Ox6QC_C5BtRzhR-4CnLXVdQA0CfPzWF72vdke0jD3sUOGDgqz0bIx-TDDic2OYXYCxUwTRsYj18pJlhiGULKjDxWnnth1JLnUdRYjsGYqzVu_t-lTR5ZOlz3IX-JWnkodfWxs89QQRIojhDtaSM_6mvOYYWn4Y42pjeQiZG6eQSPCoPG0yFJiysLFtLQIPRd4ILJ_uyO0UkgMRUHCn4fT5WiP2pYrWSH4uFhowK_UN-Mp5mNEVTwDxNaTqGRTsjc-Xnhkg6_z8gMszEUj1vyzhlON3-63B5zyx_XcQQS8PTygbAfw0fCdWDPH4NQ");
        String uid = decodedToken.getUid();
        System.out.println("uid: " + uid);
    } catch (Exception e){
        System.out.println(e.getMessage());
    }
    */
    public FirebaseToken() {
        FirebaseApp.initializeApp();
    }

    private JWTUtil jwtUtil = new JWTUtil();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtil.validateJwtToken(jwt)) {
                User user = jwtUtil.getUser(jwt);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(user, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            System.out.println("Cannot set user authentication: " + ex.getMessage());
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest httpServletRequest) {
        String headerAuth = httpServletRequest.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            System.out.println(headerAuth.substring(7));
            return headerAuth.substring(7);
        }
        return null;
    }

}
