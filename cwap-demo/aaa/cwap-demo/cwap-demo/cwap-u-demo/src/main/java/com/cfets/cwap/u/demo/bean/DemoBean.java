package com.cfets.cwap.u.demo.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cfets.cwap.s.domain.BaseEntity;
import com.cfets.cwap.s.util.annotation.Note;
import com.google.gson.Gson;
/**
 * 数据库表
 *@author created automaticly by cwap-d-toolkit at 2015-09-09 16:14:18 
 *@since 2.1.1.0
 */

@Entity
@Table(name = "cwap_demo")
public class DemoBean extends BaseEntity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8681138246751824939L;
//	@Note(note = "id")
//	@Column(name = "id", unique = false, nullable = false)
//	private Long id;
//	
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Note(note = "姓名")
	@Column(name = "name", unique = false, nullable = false)
	private String name;
		public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@Note(note = "密码")
	@Column(name = "password", unique = false, nullable = false)
	private String password;
		public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	@Note(note = "号码")
	@Column(name = "phone", unique = false, nullable = false)
	private String phone;
		public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Note(note = "地址")
	@Column(name = "place", unique = false, nullable = false)
	private String place;
		public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}
		
	public String toJson(){
		Gson gson = new Gson();
		return gson.toJson(this);
	}
}
