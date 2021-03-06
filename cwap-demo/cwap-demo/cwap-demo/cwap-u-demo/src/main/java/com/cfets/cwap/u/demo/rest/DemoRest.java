package com.cfets.cwap.u.demo.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cfets.cwap.s.spi.GenericRest;
import com.cfets.cwap.s.stp.SimpleMessage;
import com.cfets.cwap.s.util.annotation.Note;
import com.cfets.cwap.u.demo.DemoHelper;

/**
 * rest服务
 *@author created automaticly by cwap-d-toolkit at 2015-09-09 16:14:18 
 *@since 2.1.1.0
 */
@Controller
@RequestMapping(DemoHelper.PLUGIN_MAPPING)
public class DemoRest extends GenericRest {

	private Logger logger = Logger.getLogger(DemoRest.class);
	@Note(note = "TODO")
	@RequestMapping(value = "/TODO", method = RequestMethod.GET)
	@ResponseBody
	public SimpleMessage<?> rest() {
		try {
			SimpleMessage<?> sm = SimpleMessage.ok().set("TODO","TODO");
			return sm;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value = "/aaa", method = RequestMethod.GET)
	@ResponseBody
	public String aaa(HttpServletRequest request){
		return "bbb";
		}
	
}
