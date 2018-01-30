package com.cfets.cwap.u.demo;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.cfets.cwap.s.spi.GenericComponent;
import com.cfets.cwap.s.spi.bean.SessionAccount;
import com.cfets.cwap.s.spi.resource.Resource;

/**
 * 资源注册
 *@author created automaticly by cwap-d-toolkit at 2015-09-09 16:14:18 
 *@since 2.1.1.0
 */
@Component(DemoHelper.PLUGIN_ID)
public class DemoComponent extends GenericComponent {

	protected Logger logger = Logger.getLogger(DemoComponent.class);
	@Override
	@PostConstruct
	public void init() {
		// 注册构件
		this.registerComponent();
		// 注册URL资源
		this.regUrlResources();
		// 拷贝JSP资源到WebInf目录下
		this.copyJspToWebInf(DemoComponent.class);
		// 注册国际化资源
		// this.registerI18nResource();
	}

	private void regUrlResources() {
		String plugin = DemoHelper.PLUGIN_ID;
				this.registerResource(Resource.blank().type(RES_TYPE_URL)
			.key(plugin + ".log").label("Demo")
			.value(plugin + "/log.do").plugin(plugin).roles(SessionAccount.ROLE_SYS_COMMON));
			}

	@Override
	public String getPluginId() {
		return DemoHelper.PLUGIN_ID;
	}

}
