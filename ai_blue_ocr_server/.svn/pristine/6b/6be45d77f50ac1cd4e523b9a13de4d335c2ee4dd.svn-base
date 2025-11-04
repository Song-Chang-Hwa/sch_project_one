package com.sht.configuration;

import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.transaction.ChainedTransactionManager;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jndi.JndiTemplate;
import org.springframework.orm.ibatis.SqlMapClientFactoryBean;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableTransactionManagement
public class DataBaseConfig implements TransactionManagementConfigurer {
	
	@Value("${database.driverClassName}")
	private String driverClassName;
	@Value("${database.url}")
	private String url;
	@Value("${database.username}")
	private String username;
	@Value("${database.password}")
	private String password;
	
	@Value("${gis.database.driverClassName}")
	private String gisdriverClassName;
	@Value("${gis.database.url}")
	private String gisurl;
	@Value("${gis.database.username}")
	private String gisusername;
	@Value("${gis.database.password}")
	private String gispassword;
	
	@Value("${sms.database.driverClassName}")
	private String smsdriverClassName;
	@Value("${sms.database.url}")
	private String smsurl;
	@Value("${sms.database.username}")
	private String smsusername;
	@Value("${sms.database.password}")
	private String smspassword;
	

	@Bean
	@Primary
	public DataSource dataBaseSource() {
		HikariDataSource dataSource = new HikariDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setJdbcUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		//oracle.jdbc.driver.OracleDriver
		dataSource.setConnectionTestQuery("select 1");
		dataSource.setConnectionTimeout(30000);
		dataSource.setValidationTimeout(5000);
		dataSource.setMaxLifetime(1800000);
		dataSource.setMaximumPoolSize(10);
		dataSource.setMinimumIdle(10);
		dataSource.setAutoCommit(false);
		dataSource.addDataSourceProperty("cachePrepStmts", true);
		dataSource.addDataSourceProperty("prepStmtCacheSize", 250);
		dataSource.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
		dataSource.addDataSourceProperty("maxLifetime", 1800000);
		return dataSource;
	}
	

	@Bean
	public DataSource dataGisSource() {
		HikariDataSource dataSource = new HikariDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setJdbcUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		//oracle.jdbc.driver.OracleDriver
		dataSource.setConnectionTestQuery("select 1");
		dataSource.setConnectionTimeout(30000);
		dataSource.setValidationTimeout(5000);
		dataSource.setMaxLifetime(1800000);
		dataSource.setMaximumPoolSize(10);
		dataSource.setMinimumIdle(10);
		dataSource.setAutoCommit(false);
		dataSource.addDataSourceProperty("cachePrepStmts", true);
		dataSource.addDataSourceProperty("prepStmtCacheSize", 250);
		dataSource.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
		dataSource.addDataSourceProperty("maxLifetime", 1800000);
		return dataSource;
	}
	
	
	@Bean
	public DataSource dataSmsSource() {
		HikariDataSource dataSource = new HikariDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setJdbcUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		//oracle.jdbc.driver.OracleDriver
		dataSource.setConnectionTestQuery("select 1");
		dataSource.setConnectionTimeout(30000);
		dataSource.setValidationTimeout(5000);
		dataSource.setMaxLifetime(1800000);
		dataSource.setMaximumPoolSize(10);
		dataSource.setMinimumIdle(10);
		dataSource.setAutoCommit(false);
		dataSource.addDataSourceProperty("cachePrepStmts", true);
		dataSource.addDataSourceProperty("prepStmtCacheSize", 250);
		dataSource.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
		dataSource.addDataSourceProperty("maxLifetime", 1800000);
		return dataSource;
	}

	
	
	
	
	
	/*********************Connection TEST 용 *******************************/
	/*
	@Bean
	public DataSource dataGisTestSource() {
        DataSource dataSource = null;
        JndiTemplate jndi = new JndiTemplate();
         
        try {
            Context initContext = new InitialContext();
            Context envContext  = (Context)initContext.lookup("java:/comp/env");
            dataSource = (DataSource)envContext.lookup("jdbc/database"); 
            
        } catch (NamingException e) {
             e.printStackTrace();
        }
        return dataSource;
	}
	
	
	@Bean
	public DataSource dataSmsTestSource() {
        DataSource dataSource = null;
        JndiTemplate jndi = new JndiTemplate();
         
        try {
            Context initContext = new InitialContext();
            Context envContext  = (Context)initContext.lookup("java:/comp/env");
            dataSource = (DataSource)envContext.lookup("jdbc/database"); 
            
        } catch (NamingException e) {
             e.printStackTrace();
        }
        return dataSource;
	}
	*/
	/*********************Connection TEST 용 *******************************/
	
	
	
	
	
	
	@Bean(name="sqlMapBaseClient")
	@Primary
	public SqlMapClientFactoryBean sqlMapClient() {
		SqlMapClientFactoryBean sqlMapClient = new SqlMapClientFactoryBean();
		sqlMapClient.setConfigLocation(new ClassPathResource("conf/database/ibatis-config.xml"));
		sqlMapClient.setDataSource(dataBaseSource());
		return sqlMapClient;
	}
	
	@Bean(name="sqlMapGisClient")
	public SqlMapClientFactoryBean sqlMapGisClient() {
		SqlMapClientFactoryBean sqlMapClient = new SqlMapClientFactoryBean();
		sqlMapClient.setConfigLocation(new ClassPathResource("conf/database/ibatis-config.xml"));
		sqlMapClient.setDataSource(dataGisSource());
		return sqlMapClient;
	}
	
	@Bean(name="sqlMapSmsClient")
	public SqlMapClientFactoryBean sqlMapSmsClient() {
		SqlMapClientFactoryBean sqlMapClient = new SqlMapClientFactoryBean();
		sqlMapClient.setConfigLocation(new ClassPathResource("conf/database/ibatis-config.xml"));
		sqlMapClient.setDataSource(dataSmsSource());
		return sqlMapClient;
	}
	
	
	@Bean
	public SqlMapClientTemplate sqlMapClientTemplate() {
		org.springframework.orm.ibatis.SqlMapClientTemplate template = new SqlMapClientTemplate();
		template.setSqlMapClient((SqlMapClient) sqlMapClient().getObject());
		return template;
	}
	
	@Bean
	public DataSourceTransactionManager transactionBaseManager() {
	    return new DataSourceTransactionManager(dataBaseSource());
	}

	/*
	@Bean   
	public DataSourceTransactionManager transactionGisManager() {
	    return new DataSourceTransactionManager(dataGisSource());
	}
	
	@Bean   
	public DataSourceTransactionManager transactionSmsManager() {
	    return new DataSourceTransactionManager(dataSmsSource());
	}
	*/
	 
	
//  @Bean
//  @Primary
//  public PlatformTransactionManager transactionManager() {
//      return new ChainedTransactionManager(transactionBaseManager(), transactionGisManager(), transactionSmsManager());
//  }
  
	  @Bean
	  @Primary
	  public PlatformTransactionManager transactionManager() {
	  	Connection conn = null;
	  	Boolean isBaseCon = false, isGisCon = false, isSmsCon = false;
	  	PlatformTransactionManager list[]; 
	  	
	  	int i = 0;
	  	try {
		 		   conn = dataBaseSource().getConnection();
		 		   System.out.println("Base connect sucess!");
		 		   conn.close();
		 		   isBaseCon = true;
		 		   i++;
			  } catch (Exception e) {
		    		   System.out.println("Base connect fail!");
		    		   System.out.println("error Msg:"+e.getMessage());	
			  }
	/*  	
	  	
	  	try {
	  		   conn = dataGisTestSource().getConnection();
	  		   System.out.println("Gis connect sucess!");
	  		   conn.close();
	  		   isGisCon = true;
	  		   i++;
	  		  } catch (Exception e) {
		    		   System.out.println("Gis connect fail!");
		    		   System.out.println("error Msg:"+e.getMessage());	
	  		  }
	
	  	
	  	try {
	  		   conn = dataSmsTestSource().getConnection();
	  		   System.out.println("Sms connect sucess!");
	  		   conn.close();
	  		   isSmsCon = true;
	  		   i++;
	  		  } catch (Exception e) {
					  System.out.println("Sms connect fail!");
					  System.out.println("error Msg:"+e.getMessage());	
	  		  }
	*/
	  	list = new PlatformTransactionManager[i]; 
	  	i = 0;
	  	/*
	  	if(isGisCon == true) { list[i]  = transactionGisManager(); i++; }
	  	if(isSmsCon == true) { list[i]  = transactionSmsManager(); i++; }*/
	  	list[i]  = transactionBaseManager();
	
	  	 return new ChainedTransactionManager( list  );
	
	  }


    
	
	
	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return transactionManager() ;
	}
	
	
}