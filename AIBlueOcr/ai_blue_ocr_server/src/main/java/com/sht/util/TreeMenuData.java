package com.sht.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class TreeMenuData {

	public void traverse(List list, HashMap map) {
		boolean find = false;
		String parentId = map.get("UP_PRG_ID").toString();
		for (int i = 0; i < list.size(); i++) {
			HashMap parent = (HashMap) list.get(i);
			if (parentId.equals(parent.get("PRG_ID").toString())) {
				if (parent.containsKey("children")) {
					ArrayList parentList = (ArrayList) parent.get("children");
					parentList.add(map);
				} else {
					ArrayList array = new ArrayList();
					parent.put("children", array);
					array.add(map);
				}
			}
		}
	}

	public ArrayList getData(List list, String upPrgId) {
		ArrayList jsonArray = new ArrayList();
		for (int i = 0; i < list.size(); i++) {
			HashMap child = (HashMap) list.get(i);
			if (child.get("USE_YN") == null || "N".equals(child.get("USE_YN"))) {
				continue;
			}
			if (!child.containsKey("children")) {
				child.put("children", new ArrayList());
			}
			Integer lvl = (Integer) child.get("PRG_LVL");
			if (lvl == 1) {
				if ( upPrgId.equals(child.get("UP_PRG_ID")) ) {
					jsonArray.add(child);
				}
			} else if (lvl > 1) {
				traverse(list, child);
			}
		}
		return jsonArray;
	}

}
