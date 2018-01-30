package com.cfets.cwap.u.demo.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.cfets.cwap.s.util.PubString;
import com.cfets.cwap.s.util.DateUtil;
import com.cfets.cwap.s.util.db.filter.FilterAttr;
import com.cfets.cwap.s.util.db.filter.FilterAttrs;
import com.cfets.cwap.s.spi.GenericController;
import com.cfets.cwap.s.spi.bean.ErrorInfo;
import com.cfets.cwap.u.demo.DemoHelper;
import com.cfets.cwap.u.demo.bean.DemoBean;

/**
 * 
 * 负责页面交互等
 * 
 * @author created automaticly by cwap-d-toolkit at 2015-09-09 16:14:18
 * @since 2.1.1.0
 */

@Controller
@RequestMapping(DemoHelper.PLUGIN_MAPPING)
public class DemoController extends GenericController {

	protected static Logger logger = Logger.getLogger(DemoController.class);

	/**
	 * 对应每个jsp
	 */
	@RequestMapping("/log.do")
	public ModelAndView logIndex(HttpServletRequest req, HttpServletResponse rep) {
		List<DemoBean> items = DemoHelper.getDemo().findAll();
		return mmv("log").merge(req).add("items", items).toMAV();
	}

	/**
	 * 查询
	 */
	@RequestMapping("/logsearch.do")
	public ModelAndView logSearch(HttpServletRequest req,
			HttpServletResponse rep) {
		List<DemoBean> items = new ArrayList<DemoBean>();
		// 查询context
		String context = getParam(req, "context");
		System.out.println(context);
		if (!PubString.isNullOrSpace(context)) {
			FilterAttrs attrs = FilterAttrs.blank().add("name",
					FilterAttr.OP_LIKE, context);
			items = DemoHelper.getDemo().findByAttrs(attrs);
		} else {
			items = DemoHelper.getDemo().findAll();
		}
		//return mmv("log").add("items", items).add("context", context).toMAV();
		return mmv("log").add("items", items).toMAV();
	}

	/**
	 * 删除信息
	 * 
	 * @param req
	 * @param rep
	 * @return
	 */
	@RequestMapping("/logdelete.do")
	public ModelAndView logDelete(HttpServletRequest req,
			HttpServletResponse rep) {
		try {
			String id = getParam(req, "id");
			DemoHelper.getDemo().deleteById(Long.parseLong(id));
			return mmv("log").toRedirect();
		} catch (Exception e) {
			// 获得错误信息
			ErrorInfo ei = ErrorInfo.build().message(e.getMessage());
			return mmv("log").add("error", ei).toRedirect(req);
		}
	}

	/**
	 * 处理修改结果
	 */

	@RequestMapping("/logmodify.do")
	public ModelAndView logModify(HttpServletRequest req,
			HttpServletResponse rep) {
		// 如果修改出错，要显示修改条目的原信息
		DemoBean current = new DemoBean();
		String id = getParam(req, "id");
		FilterAttrs attrs = FilterAttrs.blank().add("id", FilterAttr.OP_EQUAL,
				id);
		current = DemoHelper.getDemo().findOneByAttrs(attrs);
		String name = getParam(req, "name");
		current.setName(name);
		String password = getParam(req, "password");
		current.setPassword(password);
		String phone = getParam(req, "phone");
		current.setPhone(phone);
		String place = getParam(req, "place");
		current.setPlace(place);
		DemoHelper.getDemo().update(current);
		return mmv("log").toRedirect();
	}

	/**
	 * 新增
	 */
	@RequestMapping("/logadd.do")
	public ModelAndView logAdd(HttpServletRequest req, HttpServletResponse rep) {
		// 如果修改出错，要显示修改条目的原信息
		DemoBean item = new DemoBean();
		String name = getParam(req, "name");
		item.setName(name);
		String password = getParam(req, "password");
		item.setPassword(password);
		String phone = getParam(req, "phone");
		item.setPhone(phone);
		String place = getParam(req, "place");
		item.setPlace(place);
		DemoHelper.getDemo().save(item);
		return mmv("log").toRedirect();
	}

	@Override
	public String getModulePath() {
		return DemoHelper.PLUGIN_MAPPING;
	}
}
