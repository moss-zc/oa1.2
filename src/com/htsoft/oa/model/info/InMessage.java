package com.htsoft.oa.model.info;

import com.htsoft.core.model.BaseModel;

public class InMessage extends BaseModel {
	
	private Long receiveId;
//	private Long messageId;
	private ShortMessage shortMessage;
	private Long userId;
	private String userFullname;
	private Short readFlag;
    private Short delFlag;	
   
    public InMessage(){
    	
    }

	public Long getReceiveId() {
		return receiveId;
	}
	
	
//	public Long getMessageId() {
//		return messageId;
//	}
//
//	public void setMessageId(Long messageId) {
//		this.messageId = messageId;
//	}


	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
	}

	public void setReceiveId(Long receiveId) {
		this.receiveId = receiveId;
	}


	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserFullname() {
		return userFullname;
	}

	public void setUserFullname(String userFullname) {
		this.userFullname = userFullname;
	}

	public Short getReadFlag() {
		return readFlag;
	}

	public void setReadFlag(Short readFlag) {
		this.readFlag = readFlag;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}
		
}
