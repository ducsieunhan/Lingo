package com.lingo.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
@EnableReactiveMethodSecurity
public class SecurityConfig {

        @Bean
        SecurityWebFilterChain filterChain(ServerHttpSecurity http) throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                                .authorizeExchange(exchange -> exchange
                                                .pathMatchers("/api/v1/auth/**", "/api/v1/account",
                                                                "/api/v1/account/**", "/api/v1/account/**'**",
                                                                "/api/v1/test/**", "/api/v1/question/**",
                                                                "/api/v1/file/**", "/api/v1/answer/**",
                                                                "/api/v1/resource/**",
                                                                "/api/v1/attempt/**", "/actuator/**")
                                                .permitAll()
                                                .pathMatchers("/api/v1/account/gg").authenticated()
                                                // .pathMatchers("api/v1/account/**").hasAuthority("ADMIN")
                                                .anyExchange().authenticated())
                                .oauth2ResourceServer(resourceServer -> resourceServer
                                                .jwt(Customizer.withDefaults()));
                return http.build();
        }

        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverterForKeycloak() {
                Converter<Jwt, Collection<GrantedAuthority>> jwtGrantedAuthoritiesConverter = jwt -> {
                        Map<String, Collection<String>> realmAccess = jwt.getClaim("realm_access");
                        Collection<String> roles = realmAccess.get("roles");
                        return roles.stream()
                                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                                        .collect(Collectors.toList());
                };

                var jwtAuthenticationConverter = new JwtAuthenticationConverter();
                jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

                return jwtAuthenticationConverter;
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration corsConfig = new CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:5173"));
                corsConfig.setAllowedMethods(List.of("GET", "PUT", "POST", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("Content-Type", "X-Requested-With", "accept", "Origin",
                                "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization"));
                corsConfig.setAllowCredentials(true);
                corsConfig.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", corsConfig);
                return source;
        }

}
