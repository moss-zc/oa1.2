package com.htsoft.oa.model.task;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * PlanType Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������������
 */
public class PlanType extends com.htsoft.core.model.BaseModel {

    protected Long typeId;
	protected String typeName;

	protected java.util.Set workPlans = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class PlanType
	 */
	public PlanType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PlanType
	 */
	public PlanType (
		 Long in_typeId
        ) {
		this.setTypeId(in_typeId);
    }


	public java.util.Set getWorkPlans () {
		return workPlans;
	}	
	
	public void setWorkPlans (java.util.Set in_workPlans) {
		this.workPlans = in_workPlans;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="typeId" type="java.lang.Long" generator-class="native"
	 */
	public Long getTypeId() {
		return this.typeId;
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
		this.typeId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="typeName" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getTypeName() {
		return this.typeName;
	}
	
	/**
	 * Set the typeName
	 */	
	public void setTypeName(String aValue) {
		this.typeName = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof PlanType)) {
			return false;
		}
		PlanType rhs = (PlanType) object;
		return new EqualsBuilder()
				.append(this.typeId, rhs.typeId)
				.append(this.typeName, rhs.typeName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.typeId) 
				.append(this.typeName) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("typeId", this.typeId) 
				.append("typeName", this.typeName) 
				.toString();
	}



}
