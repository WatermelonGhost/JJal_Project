package com.seojae.jjal.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.seojae.jjal.dto.jcommentsDTO;

@Mapper
public interface jcommentsDAO {
	ArrayList<jcommentsDTO> commentsList(int re_fb_no);

	void submitComment(int re_fb_no, String re_nickname, String re_content);

	void deleteComment(int re_no, String re_nickname);

	String updateinfo(int re_no, String re_nickname);

	void updateComment(String re_content, int re_no, String re_nickname);

}
