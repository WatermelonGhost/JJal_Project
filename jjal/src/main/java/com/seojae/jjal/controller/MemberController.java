package com.seojae.jjal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seojae.jjal.dao.jmemberDAO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MemberController {

	@Autowired
	jmemberDAO jdao;

	@GetMapping("/")
	public String root() {
		return "/home";
	}

	@GetMapping("/home")
	public String home() {
		return "home";
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/signup")
	public String signup() {
		return "signup";
	}

	@PostMapping("/check/id")
	@ResponseBody
	public String checkID(@RequestParam("id") String id) {
		String check = "false";

		int flag = jdao.checkID(id);
		if (flag == 0) {
			check = "true";
		}

		return check;
	}

	@PostMapping("/check/nickname")
	@ResponseBody
	public String checkNickname(@RequestParam("nickname") String nickname) {
		String check = "false";

		int flag = jdao.checkNickname(nickname);
		if (flag == 0) {
			check = "true";
		}

		return check;
	}

	@PostMapping("/check/phone")
	@ResponseBody
	public String checkPhone(@RequestParam("phone") String phone) {
		String check = "false";

		int flag = jdao.checkPhone(phone);
		if (flag == 0) {
			check = "true";
		}

		return check;
	}

	@PostMapping("/submit/signup")
	@ResponseBody
	public String submitSignup(@RequestParam("id") String id, @RequestParam("pw") String pw,
			@RequestParam("name") String name, @RequestParam("nickname") String nickname,
			@RequestParam("phone") String phone) {
		String check = "true";

		jdao.submitSignup(id, pw, name, phone, nickname);

		return check;
	}

	@PostMapping("/submit/login")
	@ResponseBody
	public String submitLogin(HttpServletRequest req,
			@RequestParam("id") String id,
			@RequestParam("pw") String pw) {
		String check = "false";

		HttpSession session = req.getSession();

		int flag = jdao.submitLogin(id, pw);

		if (flag == 1) {
			String get_nickname = jdao.getNickname(id, pw);
			if (get_nickname != null) {
				session.setAttribute("nickname", get_nickname);
				session.setMaxInactiveInterval(600);
				check = "true";
			} else {
				check = "wrong";
			}

		} else {
			check = "none";
		}
		return check;
	}

	@PostMapping("/check/login")
	@ResponseBody
	public String checkLogin(HttpServletRequest req) {
		String loginNickname = "none";

		HttpSession session = req.getSession();

		if (session.getAttribute("nickname") != null) {
			loginNickname = session.getAttribute("nickname").toString();
		}

		return loginNickname;
	}

	@PostMapping("/submit/logout")
	@ResponseBody
	public void checklogout(HttpServletRequest req) {

		HttpSession session = req.getSession();
		session.invalidate();
	}

}
