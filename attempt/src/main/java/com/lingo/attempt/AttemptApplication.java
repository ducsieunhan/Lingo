package com.lingo.attempt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan({"com.lingo.attempt", "com.lingo.common_library"})
@EnableFeignClients
public class AttemptApplication {

	public static void main(String[] args) {
		SpringApplication.run(AttemptApplication.class, args);
	}

}
