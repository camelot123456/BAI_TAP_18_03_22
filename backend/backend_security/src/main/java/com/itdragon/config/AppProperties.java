package com.itdragon.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "app")
@Getter
public class AppProperties {

	private final Gmail gmail = new Gmail();
	private final Paypal paypal = new Paypal();
	
	@Getter
	@Setter
	public static final class Gmail {
		private String emailSystem;
		private String verifyUrl;
		private String pathHtmlFormVerify;
		private String resetPasswordUrl;
	}
	
	@Getter
	@Setter
	public static final class Paypal {
		private String mode;
		private String clientId;
		private String secret;
	}
	
}
