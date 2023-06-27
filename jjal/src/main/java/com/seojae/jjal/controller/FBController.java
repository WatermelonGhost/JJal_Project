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

import com.seojae.jjal.dao.FBDAO;
import com.seojae.jjal.dto.FBDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class FBController {
	@Autowired
	FBDAO fbdao;

	@GetMapping("/freeBoard")
	public String freeBoard() {
		return "/freeBoard/freeBoard";
	}

	@GetMapping("/NewPost")
	public String freeBoardNewPost() {
		return "/freeBoard/fbNewPost";
	}

	@PostMapping("/board/list/all")
	@ResponseBody
	public String boardList() {
		ArrayList<FBDTO> fbdto = new ArrayList<FBDTO>();
		fbdto = fbdao.boardList();
		return getListJA(fbdto);
	}

	@GetMapping("/freeboard/{fb_no}")
	public String showPage(@PathVariable("fb_no") int fb_no, Model model) {
		model.addAttribute("fb_no", fb_no);
		fbdao.readcountUP(fb_no);
		return "/freeBoard/fbView";
	}

	@PostMapping("/board/info")
	@ResponseBody
	public FBDTO freeboardInfo(@RequestParam("fb_no") int fb_no) {
		FBDTO fbdto = fbdao.boardInfo(fb_no);
		return fbdto;
	}
	
	@PostMapping("/freeboard/file")
	@ResponseBody
	public void uploadFile(@RequestParam("uploadFile") MultipartFile uploadFile) {

		String uploadFolder = "C:\\Users\\admin\\Documents\\JJal_Project\\jjal\\src\\main\\resources\\static\\img\\fb";

		String originalFileName = uploadFile.getOriginalFilename();

		String newFileName = originalFileName;

		File saveFile = new File(uploadFolder, newFileName);

		try {
			uploadFile.transferTo(saveFile);
		} catch (Exception e) {
			System.out.println("error");
		}
	}

	@PostMapping("/freeboard/newPost")
	@ResponseBody
	public String freeBoardNewPost(@RequestParam("fb_title") String fb_title,
			@RequestParam("fb_content") String fb_content,
			@RequestParam("fb_url") String fb_url,
			HttpServletRequest req) {
		String check = "true";
		HttpSession session = req.getSession();
		if (fb_title == null || fb_content == null || fb_url == null) {
			check = "false";
		} else {
			String nickname = session.getAttribute("nickname").toString();
			fbdao.freeBoardNewPost(fb_title, fb_content, fb_url, nickname);
		}
		return check;
	}
	
	@PostMapping("/freeboard/delete")
	@ResponseBody
	public String deletePost(@RequestParam int fb_no,
							 HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();
		
		if(session.getAttribute("nickname")!=null) {
			String nickname = session.getAttribute("nickname").toString();
			fbdao.freeBoardDetele(fb_no, nickname);
			check = "true";
		}
		return check;
	}

	public String getListJA(ArrayList<FBDTO> fbdto) {
		JSONArray ja = new JSONArray();

		for (int i = 0; i < fbdto.size(); i++) {
			JSONObject jo = new JSONObject();
			jo.put("fb_no", fbdto.get(i).getFb_no());
			jo.put("fb_title", fbdto.get(i).getFb_title());
			jo.put("fb_content", fbdto.get(i).getFb_content());
			jo.put("fb_created", fbdto.get(i).getFb_created());
			jo.put("fb_url", fbdto.get(i).getFb_url());
			jo.put("fb_writer", fbdto.get(i).getFb_writer());
			jo.put("fb_readcount", fbdto.get(i).getFb_readcount());

			ja.put(jo);
		}
		return ja.toString();
	}
}
