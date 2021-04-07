package com.experis.lagalt.security.filter;

import com.experis.lagalt.security.util.RateLimitUtil;
import com.experis.lagalt.services.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.persistence.Enumerated;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    @Autowired
    private Logger logger;

    @Autowired
    private RateLimitUtil rateLimitUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String ipAddress = request.getRemoteAddr();
        boolean allowAccess = rateLimitUtil.allowAccess(ipAddress);
        if (!allowAccess) {
            logger.errorToConsole(ipAddress + " access limited. Wait before making new requests");
            response.setStatus(429);
            return;
        }
        filterChain.doFilter(request, response);
    }
}
