package com.sht.util;

import java.util.ArrayList;
import java.util.HashMap;

public class MakeMenu {

	private boolean isFirst = false;
	
	public String getCls(int lvl) {
		String cls = "";
		if (lvl == 1) {
			cls = "nav in";
		} else if (lvl == 2) {
			cls = "nav nav-second-level";
		} else if (lvl == 3) {
			cls = "nav nav-third-level";
		}
		return cls;
	}
	
	public String makeMenu(ArrayList list) {
		StringBuilder sb = new StringBuilder();
		makeMenu(list, sb, 0);
		sb.append("</ul>");
		return sb.toString();
	}
	
	public void makeMenu(ArrayList list, StringBuilder sb, int idx) {
		for (int i = 0; list != null && i < list.size(); i++) {
			HashMap data = (HashMap) list.get(i);
			ArrayList sublist = (ArrayList) data.get("children");
			Integer lvl = (Integer) data.get("PRG_LVL");
			if (lvl == 1) {
				if (!isFirst) {
					isFirst = true;
					sb.append(String.format("<ul class=\"%s\" >", getCls(lvl)));
				}
			}
			if (sublist.size() > 0) {
				sb.append(String.format("<li ng-class=\"{active: collapseVar[%d]==%d}\">", idx, idx + 1));  // start of li
				sb.append(String.format("<a href=\"\" ng-click=\"check(%d, %d)\"><i class=\"fa %s fa-fw\"></i> %s<span class=\"fa arrow\"></span></a>", idx + 1, idx, data.get("PRG_IMG_NM") == null ? "fa-folder" : data.get("PRG_IMG_NM"), data.get("PRG_NM")));
				sb.append(String.format("<ul class=\"%s\" collapse=\"collapseVar[%d]!=%d\">", getCls(lvl + 1), idx, idx + 1)); // start of ul
				idx++;
				makeMenu(sublist, sb, idx);
				sb.append("</ul>"); // end of ul
				sb.append("</li>"); // end of li
			} else {
				sb.append(String.format("<li ui-sref-active='active'><a href='#' ui-sref='eis.%s'><i class='fa %s fa-fw'></i> %s<span></span></a></li>\n", data.get("PRG_ID"), data.get("PRG_IMG_NM") == null ? "fa-file" : data.get("PRG_IMG_NM"), data.get("PRG_NM")));
			}
		}
	}

}
