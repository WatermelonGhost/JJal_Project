package com.seojae.jjal.controller;

import java.io.File;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.seojae.jjal.dao.JDAO;
import com.seojae.jjal.dto.JDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class JController {

	@Autowired
	JDAO jdao;

	@GetMapping("/upload")
	public String uploadPage() {
		return "upload";
	}

	@PostMapping("/img/list/all")
	@ResponseBody
	public String imgList() {
		ArrayList<JDTO> jdto = new ArrayList<JDTO>();
		jdto = jdao.imgListAll();
		return getListJA(jdto);
	}

	@PostMapping("/img/list/category")
	@ResponseBody
	public String imgList_category(@RequestParam("j_category") String j_category) {
		ArrayList<JDTO> jdto = new ArrayList<JDTO>();
		jdto = jdao.imgList_category(j_category);
		return getListJA(jdto);
	}

	@GetMapping("/view/{j_seq}")
	public String showPage(@PathVariable("j_seq") int j_seq, Model model) {
		model.addAttribute("j_seq", j_seq);
		return "view";
	}

	@PostMapping("/view/info")
	@ResponseBody
	public JDTO viewInfo(@RequestParam("j_seq") int j_seq) {
		JDTO jdto = jdao.viewInfo(j_seq);
		return jdto;
	}

	@PostMapping("/upload/file")
	@ResponseBody
	public void uploadFile(@RequestParam("uploadFile") MultipartFile uploadFile) {

		String uploadFolder = "C:\\Users\\admin\\Documents\\JJal_Project\\jjal\\src\\main\\resources\\static\\img";

		String originalFileName = uploadFile.getOriginalFilename();

		String newFileName = originalFileName;

		File saveFile = new File(uploadFolder, newFileName);

		try {
			uploadFile.transferTo(saveFile);
		} catch (Exception e) {
			System.out.println("error");
		}
	}

	@PostMapping("/upload/post")
	@ResponseBody
	public String uploadPost(@RequestParam("j_title") String j_title,
			@RequestParam("j_category") String j_category,
			@RequestParam("j_url") String j_url,
			HttpServletRequest req) {
		String check = "true";
		HttpSession session = req.getSession();
		if (j_title == null || j_category == null || j_url == null) {
			check = "false";
		} else {
			String nickname = session.getAttribute("nickname").toString();
			jdao.uploadPost(j_title, j_category, j_url, nickname);
		}
		return check;
	}
	
	@PostMapping("/delete/post")
	@ResponseBody
	public String deletePost(@RequestParam int j_seq,
							 HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();
		
		if(session.getAttribute("nickname")!=null) {
			String nickname = session.getAttribute("nickname").toString();
			jdao.deletePost(j_seq, nickname);
			check = "true";
		}
		return check;
	}
	
	
	public String getListJA(ArrayList<JDTO> jdto) {
		JSONArray ja = new JSONArray();

		for (int i = 0; i < jdto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("j_created", jdto.get(i).getJ_created());
			jo.put("j_title", jdto.get(i).getJ_title());
			jo.put("j_category", jdto.get(i).getJ_category());
			jo.put("j_url", jdto.get(i).getJ_url());
			jo.put("j_seq", jdto.get(i).getJ_seq());
			jo.put("j_tag", jdto.get(i).getJ_tag());
			jo.put("j_nickname", jdto.get(i).getJ_nickname());

			ja.put(jo);
		}
		return ja.toString();
	}
}
