Ext.ns('DocPrivilegeView');
/**
 * ������������������������������������������������������������列表
 */


var DocPrivilegeView = function(){
}
	

		
DocPrivilegeView.prototype.getView=function(){
	return new Ext.Panel({
		id:'DocPrivilegeView',
		title:'权限列表',
		region:'center',
		autoScroll:true,
		items:[
				new Ext.FormPanel({
				height:35,
				frame:true,
				id:'DocPrivilegeSearchForm',
				layout:'column',
				defaults:{xtype:'label'},
				items:[{text:'请输入查询条件:'}
//	,{
//		text : ''
//	}, {
//		xtype : 'textfield',
//		name : 'Q_folderId_S_LK'
//	}
//	,{
//		text : ''
//	}, {
//		xtype : 'textfield',
//		name : 'Q_docId_S_LK'
//	}
//	,{
//		text : '权限'
//	}, {
//		xtype : 'textfield',
//		name : 'Q_rights_S_LK'
//	}
//	,{
//		text : ''
//	}, {
//		xtype : 'textfield',
//		name : 'Q_udrId_S_LK'
//	}
	,{
		text : '名称'
	}, {
		xtype : 'textfield',
		name : 'docPrivilege.udrName'
	}
	,{
		text : '属性'
	}, {
		xtype : 'combo',
		anchor:'95%',
		hiddenName : 'docPrivilege.flag',
		id:'title',
		mode : 'local',
		editable : false,
		triggerAction : 'all',
		store : [['1','用户'],['2','部门'],['3','角色']]
		
	},{
							xtype:'button',
							text:'查询',
							iconCls:'search',
							handler:function(){
								var searchPanel=Ext.getCmp('DocPrivilegeSearchForm');
								var grid=Ext.getCmp('DocPrivilegeGrid');
								if(searchPanel.getForm().isValid()){
					    			searchPanel.getForm().submit({
					    				waitMsg:'正在提交查询',
					    				url:__ctxPath+'/document/listDocPrivilege.do',
					    				method:'post',
								        params:{start:0,limit:25},
					    				success:function(formPanel,action){
								            var result=Ext.util.JSON.decode(action.response.responseText);
								            grid.getStore().loadData(result);
					    				}
					    			});
					    		}
								
							}
						}
				]
			}),
			this.setup()
		]
	});
};
/**
 * 建立视图
 */
DocPrivilegeView.prototype.setup = function() {
	return this.grid();
};

DocPrivilegeView.prototype.setFolderId=function(folderId){
	this.folderId=folderId;
	DocPrivilegeView.folderId=folderId;
	
};

DocPrivilegeView.prototype.getFolderId=function(){
	return this.folderId;
};




/**
 * 建立DataGrid
 */
DocPrivilegeView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var onMouseDown=function(e,t){
		if　(t.className　&&　t.className.indexOf('x-grid3-cc-'　+　this.id)　!=　-1)　{　
			　　e.stopEvent();　
			　　var　index　=　this.grid.getView().findRowIndex(t);　
			　　var　cindex　=　this.grid.getView().findCellIndex(t);　
			　　var　record　=　this.grid.store.getAt(index);　
			　　var　field　=　this.grid.colModel.getDataIndex(cindex);　
			　　var　e　=　{　
			　　grid　:　this.grid,　
			　　record　:　record,　
			　　field　:　field,　
			　　originalValue　:　record.data[this.dataIndex],　
			　　value　:　!record.data[this.dataIndex],　
			　　row　:　index,　
			　　column　:　cindex,　
			　　cancel　:　false　
			　　};　
			　　if　(this.grid.fireEvent("validateedit",　e)　!==　false　&&　!e.cancel)　{　
			　　delete　e.cancel;　
			　　record.set(this.dataIndex,　!record.data[this.dataIndex]);　
			　　this.grid.fireEvent("afteredit",　e);　
			　　}　
		}
		
	}
	
	
	var checkColumnR = new Ext.grid.CheckColumn({
       id:'read',
       header: '可读',
       dataIndex: 'rightR',
       width: 55,
       onMouseDown:onMouseDown
   });
    var checkColumnM = new Ext.grid.CheckColumn({
       header: '可修改',
       dataIndex: 'rightU',
       width: 55,
       onMouseDown:onMouseDown
    });
    var checkColumnD = new Ext.grid.CheckColumn({
       header: '可删除',
       dataIndex: 'rightD',
       width: 55,
       onMouseDown:onMouseDown
    });
    
    



	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'privilegeId',
					dataIndex : 'privilegeId',
					hidden : true
				}
				,{
				header : '名称',	
				dataIndex : 'udrName'
					}
				,{
				header : '属性',	
				dataIndex : 'flag',
				renderer:function(value,metadata,record){
				if(value==1){
					return '<img title="员工" src="'+ __ctxPath +'/images/flag/user.jpg"/>';
				}
				if(value==2){
					return '<img title="部门" src="'+ __ctxPath +'/images/flag/department.jpg"/>';
				}	
				if(value==3){
				   return '<img title="角色" src="'+ __ctxPath +'/images/flag/role.jpg"/>';
				}
		     }
		 },checkColumnR,checkColumnM,checkColumnD,
		 	{
					header : '管理',
					dataIndex : 'privilegeId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.privilegeId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="DocPrivilegeView.remove('
								+ editId + ')">&nbsp;</button>';
						return str;
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = this.store();
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});
	var grid = new Ext.grid.EditorGridPanel({
				id : 'DocPrivilegeGrid',
				tbar : this.topbar(this),
				trackMouseOver:true,
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight:true,
				cm : cm,
				sm : sm,
				plugins:[checkColumnR,checkColumnM,checkColumnD],
				clicksToEdit: 1,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});
			
			grid.addListener('afteredit',function(e){
			    Ext.Ajax.request({
				      url:__ctxPath + '/document/changeDocPrivilege.do',
				      params:{
				         field:e.field,
				         fieldValue:e.value,
				         privilegeId:e.record.data.privilegeId
				      },
				      success:function(){},
				      failure:function(){				      	
				      	Ext.Msg.show({　
					　　　title　:　'错误提示',　
					　　　msg　:　'修改数据发生错误,操作将被回滚!',　
					　　　fn　:　function()　{　
					　　　　e.record.set(e.field,　e.originalValue);　
					　　　},　
					　　　buttons　:　Ext.Msg.OK,　
					　　　icon　:　Ext.Msg.ERROR　
					　　　});　
				      	
				      }
				    
				 });
			
			});
//	grid.addListener('rowdblclick', function(grid, rowindex, e) {
//				grid.getSelectionModel().each(function(rec) {
//					DocPrivilegeView.edit(rec.data.privilegeId);
//				});
//	});  
	return grid;

};

/**
 * 初始化数据
 */
DocPrivilegeView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/document/listDocPrivilege.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'privilegeId',
										type : 'int'
									}
									
//							,'folderId'
//							,'docId'
							,'rightR'
							,'rightU'
							,'rightD'
							,'udrId'
							,'udrName'
							,'flag'
									]
						}),
				remoteSort : true
			});
	store.setDefaultSort('privilegeId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DocPrivilegeView.prototype.topbar = function(docFolderObject) {
	var toolbar = new Ext.Toolbar({
				id : 'DocPrivilegeFootBar',
				height : 30,
				bodyStyle:'text-align:left',
				items : [
						{
							iconCls : 'btn-add',
							text : '添加文件夹权限',
							xtype : 'button',
							handler : function() {
								var forlderId=docFolderObject.getFolderId();
								if(forlderId!=null&&forlderId>0){
									new DocFolderSharedForm(null,forlderId);
								}else{
							       Ext.Msg.alert('提示','请选择文件夹!');	
								}
							}
						}, {
							iconCls : 'btn-del',
							text : '删除文件夹权限',
							xtype : 'button',
							handler : function() {
								
								var grid=Ext.getCmp("DocPrivilegeGrid");
								
								var selectRecords=grid.getSelectionModel().getSelections();
								
								if(selectRecords.length==0){
									Ext.Msg.alert("信息","请选择要删除的记录！");
									return;
								}
								var ids=Array();
								for(var i=0;i<selectRecords.length;i++){
									ids.push(selectRecords[i].data.privilegeId);
								}
								
								DocPrivilegeView.remove(ids);
							}
						}
				]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
DocPrivilegeView.remove=function(id){
	var grid=Ext.getCmp("DocPrivilegeGrid");
	Ext.Msg.confirm('信息确认','您确认要删除该记录吗？',function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url:__ctxPath+'/document/multiDelDocPrivilege.do',
					params:{
						ids:id
					},
					method:'post',
					success:function(){
						Ext.Msg.alert("信息提示","成功删除所选记录！");
						grid.getStore().reload({params:{
							start : 0,
							limit : 25
						}});
					}
				});
		 }
	});
};

/**
 * 
 */
DocPrivilegeView.edit=function(id){
	new DocPrivilegeForm(id);
}

