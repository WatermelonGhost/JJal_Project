package com.seojae.jjal.dto;

import lombok.Data;

@Data
public class FBDTO {
	int fb_no;
	String fb_title, fb_content, fb_created, fb_url, fb_writer, fb_readcount;
}
