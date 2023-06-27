package com.seojae.jjal.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.seojae.jjal.dto.JDTO;

@Mapper
public interface JDAO {
	ArrayList<JDTO> imgListAll();

	ArrayList<JDTO> imgList_category(String category);

	JDTO viewInfo(int j_seq);

	void uploadPost(String j_name, String category, String url, String nickname);
	
	void deletePost(int j_seq, String nickname);

}
