package com.htsoft.oa.model.flow;

import org.jbpm.pvm.internal.model.Transition;

/**
 * 
 * @author csx
 *
 */
public class Transform {	
	/**
	 * 转换器名称 
	 */
	private String name;
	
	/**
	 * 目标名称
	 */
	private String destination;
	
	/**
	 * 源名称
	 */
	private String source;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
	
	
	public Transform() {
		
	}
	
	public Transform(Transition jbpmtran){
		this.name=jbpmtran.getName();
		this.source=jbpmtran.getSource().getName();
		this.destination=jbpmtran.getDestination().getName();
	}
}
