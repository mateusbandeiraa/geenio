package dev.bandeira.geenio.cortex.config;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
public class SpaRedirectFilterConfiguration {

	@Bean
	public FilterRegistrationBean<OncePerRequestFilter> spaRedirectFiler() {
		FilterRegistrationBean<OncePerRequestFilter> registration = new FilterRegistrationBean<>();
		registration.setFilter(createRedirectFilter());
		registration.addUrlPatterns("/*");
		registration.setName("frontendRedirectFiler");
		registration.setOrder(1);
		return registration;
	}

	private OncePerRequestFilter createRedirectFilter() {
		return new OncePerRequestFilter() {
			/*
			 * Forwards all routes except '/index.html', '/200.html',
			 * '/sw.js' '/api/', '/api/**', '/favicon.ico', '/*.png', '/browserconfig.xml',
			 * '/*.svg', 'site.webmanifest'
			 */
			private final String REGEX = "(?!/actuator|/api|/_nuxt|/static|/index\\.html|/200\\.html|/sw\\.js|/favicon\\.ico|/.+\\.png|/browserconfig\\.xml|/.+\\.svg|/site\\.webmanifest).*$";
			private Pattern pattern = Pattern.compile(REGEX);

			@Override
			protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
					FilterChain chain) throws ServletException, IOException {
				if (pattern.matcher(req.getRequestURI()).matches()
						&& !req.getRequestURI().equals("/")) {
					// Delegate/Forward to `/` if `pattern` matches and it is not `/`
					// Required because of 'mode: history'usage in frontend routing, see README for
					// further details
					log.info("URL {} entered directly into the Browser, redirecting...",
							req.getRequestURI());
					RequestDispatcher rd = req.getRequestDispatcher("/");
					rd.forward(req, res);
				} else {
					chain.doFilter(req, res);
				}
			}
		};
	}
}