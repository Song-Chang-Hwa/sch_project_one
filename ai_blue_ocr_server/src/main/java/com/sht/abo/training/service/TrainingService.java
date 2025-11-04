package com.sht.abo.training.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sht.abo.comm.dao.CommonBaseDAO;
import com.sht.abo.vo.ComResultVO;
import com.sht.common.ABOConstant;
import com.sht.util.CommUtils;

/**
 * OCR AI 학습
 * 
 * @author
 *
 */
@Service
public class TrainingService {

	private Logger logger = LoggerFactory.getLogger(TrainingService.class);

	@Autowired
	private CommonBaseDAO commonBaseDAO;

	@Value("${ocr.file.py.path}")
	private String filePyPath;

	@Value("${ocr.file.pyexec.path}")
	private String filePyExecPath;

	@Transactional(readOnly = true)
	public ComResultVO selectOcrDocMstList(Map<String, Object> paramMap) throws Exception {
		return new ComResultVO(this.commonBaseDAO.list("TrainingDAO.selectOcrDocMstList", paramMap),
				(String) this.commonBaseDAO.selectByPk("TrainingDAO.selectOcrDocMstListCount", paramMap));
	}

	@Transactional(readOnly = true)
	public ComResultVO selectOcrDocDetailList(Map<String, Object> paramMap) throws Exception {
		return new ComResultVO(this.commonBaseDAO.list("TrainingDAO.selectOcrDocDetailList", paramMap),
				(String) this.commonBaseDAO.selectByPk("TrainingDAO.selectOcrDocDetailListCount", paramMap));
	}

	@Transactional(readOnly = true)
	public ComResultVO selectOcrDocTextList(Map<String, Object> paramMap) throws Exception {
		return new ComResultVO(this.commonBaseDAO.list("TrainingDAO.selectOcrDocTextList", paramMap),
				(String) this.commonBaseDAO.selectByPk("TrainingDAO.selectOcrDocTextListCount", paramMap));
	}

	@Transactional(readOnly = true)
	public ComResultVO selectOcrDocTextAverageScore(Map<String, Object> paramMap) throws Exception {
		
		Map<String, Object> mp = new HashMap<String, Object>();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("TrainingDAO.selectOcrDocTextAverageScore", paramMap);

		if(!list.isEmpty()) {
			mp = list.get(0);
		}
		return new ComResultVO(mp);

	}

	@Transactional
	public ComResultVO updateOcrDocText(List<Map<String, Object>> listParamMap) throws Exception {
		ComResultVO comResultVO = new ComResultVO();
		String userId = CommUtils.getUser();

		int cnt = 0;

		for (Map<String, Object> paramMap : listParamMap) {
			paramMap.put("userId", userId);
			cnt += (int) this.commonBaseDAO.update("TrainingDAO.updateOcrDocText", paramMap);
		}
		if (cnt == listParamMap.size()) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
			comResultVO.setMsg(listParamMap.size() + "건 중 " + cnt + "건을 처리하였습니다. 처리결과를 확인하십시오.");
		}
		return comResultVO;
	}
}
