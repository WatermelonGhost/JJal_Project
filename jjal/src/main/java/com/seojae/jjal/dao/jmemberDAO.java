package com.seojae.jjal.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface jmemberDAO {
	void submitSignup(String id,String pw,String name,String phone,String nickname);
	
	int checkID(String id);
	int checkPhone(String phone);
	int checkNickname(String nickname);
	
	int submitLogin(String id,String pw);
	
	String getID(String id,String pw);
	String getNickname(String id,String pw);
}
