var ProjectForm = function(projectId) {
	this.projectId = projectId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ProjectFormWin',
				title : '项目详细信息',
				minWidth : 500,
				minHeight : 420,
				modal : true,
				x:100,//X,Y为窗口出现的位置座标
				y:50,
				layout : 'anchor',
				constrain :true,//将窗口约束到视图区
				plain : true,
				autoHeight:true,
				autoWidth:true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('ProjectForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.Msg.alert('操作信息', '成功保存信息！');
									Ext.getCmp('ProjectGrid').getStore()
											.reload();
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : 'ext-mb-error'
											});
									window.close();
								}
							});
						}
					}
				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

ProjectForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/customer/saveProject.do',
		layout : 'table',
		layoutConfig:{columns:2},
		id : 'ProjectForm',
		frame : true,
		//width:401,
		autoWidth:true,
		//minWidth:400,
		autoHeight:true,
		formId : 'ProjectFormId',
		defaultType : 'textfield',
		items : [{
					xtype:'fieldset',
					title:'项目信息',
					layout : 'form',
					minWidth:300,
					autoHeight:true,
					defaultType:'textfield',
					labelWidth:80,
					defaults : {
						width : 295,
						anchor : '98%,98%'
					},
					items:[{
						xtype : 'container',
						style : 'padding-left:0px;',
						layout : 'column',
						height : 26,
						items : [{
									name : 'project.projectId',
									id : 'projectId',
									xtype : 'hidden',
									value : this.projectId == null ? '' : this.projectId
								},{
									xtype : 'label',
									text : '项目编号*:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 81
								}, {
									xtype : 'textfield',
									width : 120,
									name : 'project.projectNo',
									id : 'projectNo',
									allowBlank : false,
									blankText:'项目编号不能为空!',
									listeners : {
										change : function(projectNo, newvalue,oldvalue) {
											ProjectForm.checkProjectNo(newvalue);
										}
									}
								}, {
									id : 'CheckMessage',
									xtype : 'panel',
									style : 'padding-top:3px'
							}	, {
									id : 'getNoButton',
									xtype : 'button',
									text : '系统生成',
									iconCls : 'btn-system-setting',
									handler : function() {
										Ext.Ajax.request({
											url : __ctxPath
													+ '/customer/numberProject.do',
											success : function(response) {
												var result = Ext.util.JSON.decode(response.responseText)
												Ext.getCmp('projectNo').setValue(result.projectNo);
												Ext.getCmp('CheckMessage').body.update('');
											}
										})
									}
								}]
					}, {
						fieldLabel : '项目名称*',
						name : 'project.projectName',
						id : 'projectName',
						allowBlank : false,
						blankText:'项目名称不能为空!'
					}, {
						fieldLabel : '需求描述',
						name : 'project.reqDesc',
						xtype: 'htmleditor',
						autoHeight:true,
						id : 'reqDesc'
					}, {
						fieldLabel : '是否签订合同',
						hiddenName : 'project.isContract',
						id : 'isContract',
						xtype : 'combo',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [['0', '无'], ['1', '有']],
						value : 0
					},{
						fieldLabel : '业务人员',
						name : 'project.userId',
						id : 'userId',
						xtype:'hidden'
					},{
						xtype : 'container',
						layout : 'column',
						height : 26,
						style:'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '业务人员*:',
									style:'padding-left:0px;padding-top:3px;',
									width : 81
								}, {
									xtype : 'textfield',
									width : 180,
									readOnly : true,
									allowBlank : false,
									blankText:'业务人员不能为空!',
									name : 'salesman',
									id : 'salesman'
								}, {
									xtype : 'button',
									text : '业务人员',
									iconCls:'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													Ext.getCmp('salesman').setValue(fullnames);
													Ext.getCmp('userId').setValue(userIds);
												}, true).show();
									}
								}]
					},{
						xtype:'container',
						heigth:26,
						layout:'column',
						defaultType:'label',
						style:'padding-left:0px;',
						items:[{
							text:'项目附件:',
							width:81,
							style:'padding-left:0px;padding-top:3px;'
						},{
							xtype:'button',
							iconCls:'btn-upload',
							text:'上传',
							handler:function(){
								Ext.Msg.alert('Message','待实现!');
							}
						}]
					}]
				}, {
					xtype:'fieldset',
					title:'负责人信息',
					layout : 'form',
					minWidth:300,
					autoHeight:true,
					labelWidth:80,
					defaultType:'textfield',
					defaults : {
						width : 295,
						anchor : '98%,98%'
					},
						items:[	
					{
						fieldLabel : '所属客户',
						name : 'project.customerId',
						id : 'customerId',
						xtype:'hidden'
					}, {
						xtype:'container',
						id:'custoemrSelect',
						layout:'column',
						style:'padding-left:0px;',
						defaultType:'label',
						height:26,
						items:[{
							text:'所属客户*:',
							style:'padding-left:0px;padding-top:3px;',
							width : 81
						},{
						xtype:'textfield',
						width:180,
						readOnly:true,
						allowBlank : false,
						blankText:'所属客户为必选!',
						name : 'customerName',
						id : 'customerName'
						},{
							xtype:'button',
							text:'选择客户',
							iconCls:'btn-mail_recipient',
							handler:function(){
								CustomerSelector.getView(function(customerId,customerName){
									Ext.getCmp('customerId').setValue(customerId);
									Ext.getCmp('customerName').setValue(customerName);
									Ext.getCmp('fullname').getStore().reload({params:{'Q_customer.customerId_L_EQ':customerId}});
								},true).show();
							}
						}]
					},  {
						fieldLabel : '联系人姓名',
						allowBlank : false,
						blankText:'联系人不能为空!',
						name : 'project.fullname',
						id : 'fullname',
						xtype : 'combo',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store:new Ext.data.SimpleStore({
											method:'post',
											url:__ctxPath+'/customer/findCusLinkman.do',
											fields : ['linkmanId', 'fullname']
										}),
						displayField:'fullname',
						valueField:'linkmanId',
						enableKeyEvent:true,
						listeners:{
								select:function(combo,record,index){
									ProjectForm.selectLinkman(combo.value);
								}
						}
					}, {
						fieldLabel : '手机',
						name : 'project.mobile',
						id : 'mobile'
					}, {
						fieldLabel : '电话',
						name : 'project.phone',
						id : 'phone'
					}, {
						fieldLabel : '传真',
						name : 'project.fax',
						id : 'fax'
					}, {
						fieldLabel : '其他联系方式',
						xtype:'htmleditor',
						name : 'project.otherContacts',
						id : 'otherContacts'
					}]
				}
				
		]
	});

	if (this.projectId != null && this.projectId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getProject.do?projectId='
					+ this.projectId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				Ext.getCmp('customerName').setValue(action.result.data.customer.customerName);
				Ext.getCmp('salesman').setValue(action.result.data.appUser.fullname);
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;
};
/**
 * 填写项目编号后,检测项目编号的方法
 * @param {} newvalue
 */
ProjectForm.checkProjectNo = function(newvalue){
	if (newvalue != null && newvalue != ''&& newvalue != 'undefined') {
		Ext.Ajax.request({
			url : __ctxPath
					+ '/customer/checkProject.do',
			params : {
				projectNo : newvalue
			},
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if (result.pass) {
					Ext.getCmp('CheckMessage').body.update('<img src="'
							+ __ctxPath+ '/images/flag/customer/passcheck.png" />可用');
				} else {
					Ext.getCmp('CheckMessage').body.update('<img src="'
							+ __ctxPath+ '/images/flag/customer/invalid.png" />不可用');
				}
			},
			failure : function() {
				// .......
			}
		});
	}
}
/**
 * 选择联系人时加载联系方式的方法
 * @param {} linkmanId
 */
ProjectForm.selectLinkman = function(linkmanId){
	Ext.Ajax.request({
			url:__ctxPath + '/customer/getCusLinkman.do',
			method:'post',
			params:{linkmanId:linkmanId},
			success:function(response){
			var result = Ext.util.JSON.decode(response.responseText).data;
			Ext.getCmp('mobile').setValue(result.mobile);
			Ext.getCmp('phone').setValue(result.phone);
			Ext.getCmp('fax').setValue(result.fax);
			Ext.getCmp('otherContacts').setValue('E-mail:'+result.email
					+'<br/>MSN:'+result.msn
					+'<br/>QQ:'+result.qq
					+'<br/>联系地址:'+result.homeAddress
					+'<br/>邮编:'+result.homeZip);//这里往后改成换行的
			},
			failure:function(){
				Ext.Msg.alert('错误信息','载入出错!');
			}
		})
}