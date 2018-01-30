package com.cfets.cwap.u.demo;

import java.util.List;
import org.apache.log4j.Logger;
import com.cfets.cwap.s.domain.DomainServiceFactory;
import com.cfets.cwap.u.demo.bean.*;
import com.cfets.cwap.u.demo.service.*;

/**
 * 服务帮助类,Demo
 *@author created automaticly by cwap-d-toolkit at 2015-09-09 16:14:18 
 *@since 2.1.1.0
 */

public final class DemoHelper {

	protected static Logger logger = Logger.getLogger(DemoHelper.class);

	// 具体构件常量
	public final static String PLUGIN_ID = "cwap-u-demo";

	// 发布路径
	public final static String PLUGIN_MAPPING = "/" + PLUGIN_ID;

			/**
		 * 获得IDemoService接口
		 */
		public static IDemoService getDemo() {
			return (IDemoService) DomainServiceFactory.build(
					IDemoService.KEY_SPRING, DemoBean.class);
		}
		
		
}
