package com.sht.configuration;

import java.io.IOException;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.sht")
@Import({ DataBaseConfig.class })
@EnableCaching
public class RootConfiguration extends WebMvcConfigurerAdapter implements EnvironmentAware {

	private Environment env;

	@Override
	public void setEnvironment(final Environment env) {
		this.env = env;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getResolver() throws IOException {
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		resolver.setMaxUploadSize(51205760); // 최대 5MB 설정
		return resolver;
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/Access_Denied").setViewName("exception/error_403");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/ng-app/**").addResourceLocations("/ng-app/");
		registry.addResourceHandler("/detailimage/**").addResourceLocations("file:///C:/dev_project/aiblue_ocr/detailimagefile/");
		registry.addResourceHandler("/textimagefile/**").addResourceLocations("file:///C:/dev_project/aiblue_ocr/textimagefile/");
	}

	/*
	 * @Override public void addInterceptors(InterceptorRegistry registry) {
	 * registry.addInterceptor(new
	 * LoggingInterceptor()).addPathPatterns("/mobile/user/**"); }
	 */

	@Bean
	public PropertyPlaceholderConfigurer propertyConfigurer() {
		PropertyPlaceholderConfigurer property = new PropertyPlaceholderConfigurer();
		if (env.getProperty("IS_LOCAL") != null)
			property.setLocations(new Resource[] { new ClassPathResource("conf/property/db.properties"),
					new ClassPathResource("conf/property/common-config-local.properties") });
		else
			property.setLocations(new Resource[] { new ClassPathResource("conf/property/db.properties"),
					new ClassPathResource("conf/property/common-config.properties") });
		property.setFileEncoding("UTF-8");
		return property;
	}

	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}

	@Bean
	public CacheManager cacheManager() {
		return new EhCacheCacheManager(ehCacheCacheManager().getObject());
	}

	@Bean
	public EhCacheManagerFactoryBean ehCacheCacheManager() {
		EhCacheManagerFactoryBean cmfb = new EhCacheManagerFactoryBean();
		cmfb.setConfigLocation(new ClassPathResource("conf/cache/ehcache.xml"));
		cmfb.setShared(true);
		return cmfb;
	}

}