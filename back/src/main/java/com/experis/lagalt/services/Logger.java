package com.experis.lagalt.services;

import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class Logger {

    public void logToConsole(String message) {
        System.out.println(message);
    }

    public void errorToConsole(String message) {
        System.err.println("ERROR: " + timeStamp() + " - " + message);
    }

    private String timeStamp() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int hours = calendar.get(Calendar.HOUR);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);
        int milliSeconds = calendar.get(Calendar.MILLISECOND);
        return year + "/" +
                doubleDigits(month) + "/" +
                doubleDigits(day) + " " +
                doubleDigits(hours) + ":" +
                doubleDigits(minutes) + ":" +
                doubleDigits(seconds) + ":" +
                tripleDigits(milliSeconds);
    }

    private String doubleDigits(int digit) {
        if (digit < 10) {
            return "0" + digit;
        }
        return digit + "";
    }

    private String tripleDigits(int digit) {
        if (digit < 100) {
            return "0" + doubleDigits(digit);
        }
        return digit + "";
    }
}
