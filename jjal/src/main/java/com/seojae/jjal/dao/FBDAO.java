package com.seojae.jjal.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.seojae.jjal.dto.FBDTO;

@Mapper
public interface FBDAO {
	ArrayList<FBDTO> boardList();

	FBDTO boardInfo(int fb_no);

	void readcountUP(int fb_no);

	void freeBoardNewPost(String fb_title, String fb_content, String fb_url, String nickname);
}
