package com.itdragon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.itdragon.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
//@EnableJpaAuditing(auditorAwareRef = "auditorWare")
public class BackendSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendSecurityApplication.class, args);
	}

}
