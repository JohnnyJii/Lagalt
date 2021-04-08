package com.experis.lagalt.security.util;

import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class RateLimitUtil {

    HashMap<String, BucketAlgorithm> ipMap = new HashMap<>();

    public boolean allowAccess(String ip) {
        if (!ipMap.containsKey(ip)) {
            ipMap.put(ip, new BucketAlgorithm(200, 20, 500));
        }
        BucketAlgorithm usersBucket = ipMap.get(ip);
        return usersBucket.tryConsume(1);
    }
}
