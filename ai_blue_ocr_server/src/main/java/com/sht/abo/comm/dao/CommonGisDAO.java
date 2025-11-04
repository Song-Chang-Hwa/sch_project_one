package com.sht.abo.comm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractGisDAO;


@Repository
@SuppressWarnings("unchecked")
public class CommonGisDAO extends EgovAbstractGisDAO {

	@Override
	public Object insert(String queryId, Object parameterObject) {
		return super.update(queryId, parameterObject);
	}

	@Override
	public int update(String queryId, Object parameterObject) {
		return super.update(queryId, parameterObject);
	}

	@Override
	public int delete(String queryId, Object parameterObject) {
		return super.delete(queryId, parameterObject);
	}
	
	@Override
	public Object selectByPk(String queryId, Object parameterObject) {
		// TODO Auto-generated method stub
		return super.selectByPk(queryId, parameterObject);
	}

	@Override
	public List<Map<String, Object>> list(String queryId, Object parameterObject) {
		return (List<Map<String, Object>>)super.list(queryId, parameterObject);
	}


	/**
	 * procedure 저장
	 * @param statement
	 * @param parameterObject
	 * @return
	 */
	public Object procedure(String statement, Object parameterObject) {
		getSqlMapClientTemplate().queryForObject(statement, parameterObject);
		return parameterObject;
	}

	/**
	 *
	 * 단건 데이터 조회.
	 *
	 * @param statementName
	 * @param parameterObject
	 * @return @
	 */
	public Object view(String statementName, Object parameterObject) {
		return getSqlMapClientTemplate().queryForObject(statementName, parameterObject);
	}
	

}
