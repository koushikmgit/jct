package com.vmware.jct.model;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
/**
 * 
 * <p><b>Class name:</b> JctFunction.java</p>
 * <p><b>Author:</b> InterraIt</p>
 * <p><b>Description:</b>  This class basically object reference of jct_functions table </p>
 * <p><b>Copyrights:</b> 	All rights reserved by Interra IT and should only be used for its internal application development.</p>
 * <p><b>Revision History:</b>
 * 	<li>InterraIt - 31/Jan/2014 - Implement comments, introduce Named query </li>
 * </p>
 */
@NamedQueries({
	@NamedQuery(name = "fetchFunction",
			   query = "Select new com.vmware.jct.dao.dto.FunctionDTO(jctFunction.jctFunctionsId,jctFunction.jctFunctionName) " +
			   		"from JctFunction jctFunction order by jctFunction.jctFunctionName")
})

@Entity
@Table(name="jct_functions")
public class JctFunction implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="jct_functions_id")
	private int jctFunctionsId;

	@Column(name="jct_bs_created_by")
	private String jctBsCreatedBy;

	@Column(name="jct_bs_lastmodified_by")
	private String jctBsLastmodifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="jct_bs_lastmodified_ts")
	private Date jctBsLastmodifiedTs;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="jct_ds_created_ts")
	private Date jctDsCreatedTs;

	@Column(name="jct_functions_desc")
	private String jctFunctionsDesc;

	@Column(name="jct_functions_soft_delete")
	private byte jctFunctionsSoftDelete;

	private int version;

	@Column(name="jct_function_name")
	private String jctFunctionName;

	public JctFunction() {
	}

	public int getJctFunctionsId() {
		return this.jctFunctionsId;
	}

	public void setJctFunctionsId(int jctFunctionsId) {
		this.jctFunctionsId = jctFunctionsId;
	}

	public String getJctBsCreatedBy() {
		return this.jctBsCreatedBy;
	}

	public void setJctBsCreatedBy(String jctBsCreatedBy) {
		this.jctBsCreatedBy = jctBsCreatedBy;
	}

	public String getJctBsLastmodifiedBy() {
		return this.jctBsLastmodifiedBy;
	}

	public void setJctBsLastmodifiedBy(String jctBsLastmodifiedBy) {
		this.jctBsLastmodifiedBy = jctBsLastmodifiedBy;
	}

	public Date getJctBsLastmodifiedTs() {
		return this.jctBsLastmodifiedTs;
	}

	public void setJctBsLastmodifiedTs(Date jctBsLastmodifiedTs) {
		this.jctBsLastmodifiedTs = jctBsLastmodifiedTs;
	}

	public Date getJctDsCreatedTs() {
		return this.jctDsCreatedTs;
	}

	public void setJctDsCreatedTs(Date jctDsCreatedTs) {
		this.jctDsCreatedTs = jctDsCreatedTs;
	}

	public String getJctFunctionsDesc() {
		return this.jctFunctionsDesc;
	}

	public void setJctFunctionsDesc(String jctFunctionsDesc) {
		this.jctFunctionsDesc = jctFunctionsDesc;
	}

	public byte getJctFunctionsSoftDelete() {
		return this.jctFunctionsSoftDelete;
	}

	public void setJctFunctionsSoftDelete(byte jctFunctionsSoftDelete) {
		this.jctFunctionsSoftDelete = jctFunctionsSoftDelete;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	/**
	 * @return the jctFunctionName
	 */
	public String getJctFunctionName() {
		return jctFunctionName;
	}

	/**
	 * @param jctFunctionName the jctFunctionName to set
	 */
	public void setJctFunctionName(String jctFunctionName) {
		this.jctFunctionName = jctFunctionName;
	}

	
	

}
