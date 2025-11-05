package com.lingo.testservice.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.*;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        ObjectMapper mapper = new ObjectMapper();
        // apply for createdAt and updatedAt value
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);


        BasicPolymorphicTypeValidator validator = BasicPolymorphicTypeValidator
                .builder()
                .allowIfBaseType(Object.class)
                .build();

        mapper.activateDefaultTyping(
                validator,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );

        GenericJackson2JsonRedisSerializer serializer =
                new GenericJackson2JsonRedisSerializer(mapper);

        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(1)) // Optional: set TTL
                .serializeValuesWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(serializer)
                );
    }

    //use for cache with query applied specification and pagination
    @Bean("specificationKeyGenerator")
    public KeyGenerator specificationKeyGenerator() {
        return (target, method, params) -> {
            Pageable pageable = (Pageable) params[1];

            StringBuilder keyBuilder = new StringBuilder("tests");
            keyBuilder.append("_page_").append(pageable.getPageNumber());
            keyBuilder.append("_size_").append(pageable.getPageSize());

            if (pageable.getSort().isSorted()) {
                pageable.getSort().forEach(order ->
                        keyBuilder.append("_").append(order.getProperty())
                                .append("_").append(order.getDirection())
                );
            }

            return keyBuilder.toString();
        };
    }
}