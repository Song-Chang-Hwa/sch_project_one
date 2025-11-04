package com.sht.abo.comm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;


@Repository
@SuppressWarnings("unchecked")
public class CommonDAO extends EgovAbstractDAO {

	public List<Map<String, Object>> selectBranchList(Map<String, Object> param) {
		return (List<Map<String, Object>>) list("CommonDAO.selectBranchList", param);
	}

	public List<Map<String, Object>> selectUserList(Map<String, Object> paramMap) {
		return (List<Map<String, Object>>) list("CommonDAO.selectUserList", paramMap);
	}

	public List<Map<String, Object>> selectTeamList(Map<String, Object> paramMap) {
		return (List<Map<String, Object>>) list("CommonDAO.selectTeamList", paramMap);
	}

	public int getUserAuth(Map<String, Object> param) {
		return (Integer) selectByPk("CommonDAO.selectUserAuthCount", param);
	}
	

}
