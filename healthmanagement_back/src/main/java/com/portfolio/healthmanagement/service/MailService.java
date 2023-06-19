package com.portfolio.healthmanagement.service;

import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.portfolio.healthmanagement.entity.User;
import com.portfolio.healthmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {
	
	private final UserRepository userRepository;
	private final JavaMailSender javaMailSender;
	
	public String validAndSendEmail(String email) {
		User userEntity = userRepository.findUserByEmail(email);
		if(userEntity == null) {
			return "2";
		}
		
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			//첨부파일이 있으면 true, 없으면 false
			MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
			helper.setSubject("모두의 짐 이메일 인증 메일입니다.");
			helper.setFrom("quseis@gmail.com");
			helper.setTo(email);
			String token = UUID.randomUUID().toString().replaceAll("-", "");
			
			message.setText(
					"<div>"
					+"<h1>비밀번호 찾기</h1>"
					+"<p>비밀번호를 변경하려면 아래의 버튼을 클릭하세요.</p>"
					+"<a href=\"http://localhost:3000/auth/forgot/password/change/"+email +"/" + token + "\">비밀번호 변경하기</a>"
					+"</div>", "utf-8", "html");
			javaMailSender.send(message);
			return token;
			
		} catch (MessagingException e) {
			e.printStackTrace();
			return "3";
		} catch (Exception e) {
			e.printStackTrace();
			return "4";
		}
		
	}
}
