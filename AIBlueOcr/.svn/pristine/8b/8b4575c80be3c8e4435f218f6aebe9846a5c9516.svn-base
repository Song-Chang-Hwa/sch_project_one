package com.sht.abo.entity.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sht.abo.comm.dao.CommonBaseDAO;


/**
 * WP2_ITEM_MSTR
 * @author miyoungKim
 *
 */
@Service
public class ItemMstrService {

	private Logger logger = LoggerFactory.getLogger(ItemMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForItemTree(Map<String, Object> paramMap)throws Exception{
		final List<Map<String, Object>> list = this.commonBaseDAO.list("ItemMstrDAO.selectListForItemTree", paramMap);
		
		for (Map<String, Object> item : list) {
			final String type = (String) item.get("type");
			
			// parent node인 경우 체크박스가 나오지 않도록 처리
			if ("typeItem".equals(type)) {
				Map<String, Object> aAttr = new HashMap<>();
				aAttr.put("class", "no_checkbox");
				
				item.put("a_attr", aAttr);
			}
		}

		return list;
	}
}
