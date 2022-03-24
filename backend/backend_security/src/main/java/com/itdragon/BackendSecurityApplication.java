package com.itdragon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.itdragon.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class BackendSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendSecurityApplication.class, args);
	}

}
