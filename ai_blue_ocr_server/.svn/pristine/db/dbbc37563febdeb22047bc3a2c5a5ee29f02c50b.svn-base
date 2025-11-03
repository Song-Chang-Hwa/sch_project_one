package com.sht.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TreeStructure {
	private Logger logger = LoggerFactory.getLogger(TreeStructure.class);
	
//	private List<Map<String, Object>> inputList = null;
	
	public void traverse(List list, HashMap map, String pKey, String cKey) {
		boolean find = false;
		String parentId = map.get(pKey).toString();
		for (int i = 0; i < list.size(); i++) {
			HashMap parent = (HashMap) list.get(i);
			if (parentId.equals(parent.get(cKey).toString())) {
				if (parent.containsKey("children")) {
					ArrayList parentList = (ArrayList) parent.get("children");
					parentList.add(map);
				} else {
					JSONArray array = new JSONArray();
					parent.put("children", array);
					array.add(map);
				}
				find = true;
			}
		}
		if (!find) {
			return;
		}
	}

	public JSONArray getData(List list, String pKey, String cKey) {
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			HashMap child = (HashMap) list.get(i);
			logger.debug("child::::FLD_ID:::{}:::{}", i, child.get("FLD_ID"));
			logger.debug("child::::FLD_PARENT_ID:::{}:::{}", i, child.get("FLD_PARENT_ID"));
			if (!child.containsKey("children")) {
				child.put("children", new ArrayList());
			}
			Object parentId = child.get(pKey);
			logger.debug("parentId::::{}", i, parentId);
			if (parentId == null || "0".equals(parentId) || String.valueOf(parentId).length() == 0) {
				jsonArray.add(child);
			} else {
				traverse(list, child, pKey, cKey);
			}
		}
		return jsonArray;
	}
	
//	public void traverse(List list, HashMap map) {
//		boolean find = false;
//		String parentId = map.get("UP_PRG_ID").toString();
//		for (int i = 0; i < list.size(); i++) {
//			HashMap parent = (HashMap) list.get(i);
//			if (parentId.equals(parent.get("PRG_ID").toString())) {
//				if (parent.containsKey("children")) {
//					ArrayList parentList = (ArrayList) parent.get("children");
//					parentList.add(map);
//				} else {
//					JSONArray array = new JSONArray();
//					parent.put("children", array);
//					array.add(map);
//				}
//				find = true;
//			}
//		}
//		if (!find) {
//			return;
//		}
//	}
//
//	public JSONArray getData(List list) {
//		JSONArray jsonArray = new JSONArray();
//		for (int i = 0; i < list.size(); i++) {
//			HashMap child = (HashMap) list.get(i);
//			if (!child.containsKey("children")) {
//				child.put("children", new ArrayList());
//			}
//			Object parentId = child.get("UP_PRG_ID");
//			if (parentId == null || String.valueOf(parentId).length() == 0) {
//				jsonArray.add(child);
//			} else {
//				traverse(list, child);
//			}
//		}
//		return jsonArray;
//	}

}
