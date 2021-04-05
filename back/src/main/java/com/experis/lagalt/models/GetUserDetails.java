package com.experis.lagalt.models;

import java.util.Set;

public interface GetUserDetails {
    String geteMail();
    String getFirstname();
    String getLastname();
    String getImageSource();
    Set<String> getSkills();
    String getDescription();
}
