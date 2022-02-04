package dev.bandeira.geenio.cortex.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// No session will be created or used by spring security
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //
				.and().httpBasic() //
				.and() //
				.authorizeRequests().antMatchers("/api/public/**").permitAll() //
				.and() //
				.authorizeRequests().antMatchers("/api/**").authenticated() //
				.anyRequest().permitAll() //
				.and() //
				.csrf().disable(); // disable cross site request forgery, as we don't use
											// cookies - otherwise ALL PUT, POST, DELETE will get
											// HTTP 403!
	}
}
