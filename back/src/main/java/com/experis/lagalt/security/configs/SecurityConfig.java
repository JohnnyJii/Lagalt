package com.experis.lagalt.security.configs;

import com.experis.lagalt.security.filter.AuthTokenFilter;
import com.experis.lagalt.security.filter.RateLimitingFilter;
import com.experis.lagalt.security.util.AuthEntryPointJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    // TODO Remove localhost from final production
    private final String LOCALHOST_ORIGIN = "https://localhost:3000";
    private final String VERCEL_ORIGIN = "https://lagalt-ten.vercel.app";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.requiresChannel().anyRequest().requiresSecure();

        http.cors();

        http.csrf().disable();

        http.exceptionHandling()
                .authenticationEntryPoint(authEntryPointJwt);

        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/v1/health").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/projects").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/projects/*").permitAll()
                .anyRequest().authenticated();

        http
                .addFilterBefore(
                        getRateLimitingFilter(),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(
                        authenticationJwtTokenFilter(),
                        UsernamePasswordAuthenticationFilter.class
                );
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public RateLimitingFilter getRateLimitingFilter() {
        return new RateLimitingFilter();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(getAllowedOrigins());
        configuration.setAllowedMethods(getAllowedMethods());
        configuration.setAllowedHeaders(getAllowedHeaders());
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private List<String> getAllowedOrigins() {
        List<String> origins = new ArrayList<>();
        origins.add(LOCALHOST_ORIGIN);
        origins.add(VERCEL_ORIGIN);
        return origins;
    }

    private List<String> getAllowedMethods() {
        List<String> methods = new ArrayList<>();
        methods.add("GET");
        methods.add("POST");
        methods.add("PUT");
        methods.add("DELETE");
        methods.add("OPTIONS");
        return methods;
    }

    private List<String> getAllowedHeaders() {
        List<String> headers = new ArrayList<>();
        headers.add("Authorization");
        headers.add("Access-Control-Allow-Origin");
        headers.add("content-type");
        return headers;
    }
}
