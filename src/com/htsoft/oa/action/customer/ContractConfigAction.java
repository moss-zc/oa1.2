package com.htsoft.oa.action.customer;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.customer.ContractConfig;
import com.htsoft.oa.service.customer.ContractConfigService;
/**
 * 
 * @author csx
 *
 */
public class ContractConfigAction extends BaseAction{
	@Resource
	private ContractConfigService contractConfigService;
	private ContractConfig contractConfig;
	
	private Long configId;

	public Long getConfigId() {
		return configId;
	}

	public void setConfigId(Long configId) {
		this.configId = configId;
	}

	public ContractConfig getContractConfig() {
		return contractConfig;
	}

	public void setContractConfig(ContractConfig contractConfig) {
		this.contractConfig = contractConfig;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ContractConfig> list= contractConfigService.getAll(filter);
		
		Type type=new TypeToken<List<ContractConfig>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				contractConfigService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ContractConfig contractConfig=contractConfigService.get(configId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(contractConfig));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		contractConfigService.save(contractConfig);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
