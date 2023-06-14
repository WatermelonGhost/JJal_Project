package com.seojae.jjal.controller;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seojae.jjal.dao.jcommentsDAO;
import com.seojae.jjal.dto.jcommentsDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class JCommentsController {
	@Autowired
	jcommentsDAO jcdao;

	@PostMapping("/comments/list")
	@ResponseBody
	public String commentsList(@RequestParam("re_fb_no") int re_fb_no) {
		ArrayList<jcommentsDTO> jcdto = jcdao.commentsList(re_fb_no);
		return getListJA(jcdto);
	}

	@PostMapping("/submit/comment")
	@ResponseBody
	public String submitComment(@RequestParam("re_fb_no") int re_fb_no,
			@RequestParam("re_content") String re_content,
			HttpServletRequest req) {
		String check = "false";

		HttpSession session = req.getSession();

		if (session.getAttribute("nickname") == null) {
			return check;
		} else {
			String re_nickname = session.getAttribute("nickname").toString();

			if (re_fb_no == 0 || re_nickname == null || re_content == null) {
				check = "false";
			} else {
				jcdao.submitComment(re_fb_no, re_nickname, re_content);
				check = "true";
			}
		}
		return check;
	}

	@PostMapping("/update/modal/info")
	@ResponseBody
	public String updateModalInfo(HttpServletRequest req,
			@RequestParam("re_no") int re_no) {
		String content = "none";

		HttpSession session = req.getSession();

		if (session.getAttribute("nickname") != null) {
			String re_nickname = session.getAttribute("nickname").toString();
			content = jcdao.updateinfo(re_no, re_nickname);
		}
		return content;
	}

	@PostMapping("/update/comment")
	@ResponseBody
	public String commentUpdate(HttpServletRequest req,
			@RequestParam("re_no") int re_no,
			@RequestParam("re_content") String re_content) {
		String check = "false";
		HttpSession session = req.getSession();

		if (session.getAttribute("nickname") != null) {
			String re_nickname = session.getAttribute("nickname").toString();
			jcdao.updateComment(re_content, re_no, re_nickname);
			check = "true";
		}
		return check;
	}

	@PostMapping("/delete/comment")
	@ResponseBody
	public String deleteComment(HttpServletRequest req,
			@RequestParam("re_no") int re_no) {
		String check = "false";
		HttpSession session = req.getSession();

		if (session.getAttribute("nickname") != null) {
			String re_nickname = session.getAttribute("nickname").toString();
			jcdao.deleteComment(re_no, re_nickname);
			check = "true";
		}
		return check;
	}

	public String getListJA(ArrayList<jcommentsDTO> jcdto) {
		JSONArray ja = new JSONArray();

		for (int i = 0; i < jcdto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("re_fb_no", jcdto.get(i).getRe_fb_no());
			jo.put("re_no", jcdto.get(i).getRe_no());
			jo.put("re_nickname", jcdto.get(i).getRe_nickname());
			jo.put("re_content", jcdto.get(i).getRe_content());
			jo.put("re_created", jcdto.get(i).getRe_created());

			ja.put(jo);
		}
		return ja.toString();
	}
}
