package com.experis.lagalt.security.util;

public class BucketAlgorithm {

    /*
    Author: vladimir-bukhtoyarov
    https://github.com/vladimir-bukhtoyarov/bucket4j/blob/master/doc-pages/token-bucket-brief-overview.md
     */

    private final long capacity;
    private final double refillTokensPerOneMillis;

    private double availableTokens;
    private long lastRefillTimestamp;

    public BucketAlgorithm(int capacity, int refillTokens, long refillPeriod) {
        this.capacity = capacity;
        this.availableTokens = capacity;
        this.refillTokensPerOneMillis = (double) refillTokens / (double) refillPeriod;
        this.lastRefillTimestamp = System.currentTimeMillis();
    }

    synchronized public boolean tryConsume(int numberTokens) {
        refill();
        if (availableTokens < numberTokens) {
            return false;
        }
        availableTokens -= numberTokens;
        return true;
    }

    private void refill() {
        long currentTimeMillis = System.currentTimeMillis();
        if (currentTimeMillis > lastRefillTimestamp) {
            long millisSinceLastRefill = currentTimeMillis - lastRefillTimestamp;
            double refill = millisSinceLastRefill * refillTokensPerOneMillis;
            this.availableTokens = Math.min(capacity, availableTokens + refill);
            this.lastRefillTimestamp = currentTimeMillis;
        }
    }
}
