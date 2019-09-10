package com.demo.bankapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class Notification {
	private JavaMailSender javaMailSender;
	
	@Autowired
	public Notification(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	public void sendNotifcation(Long sender,String toEmail, float amount) throws MailException{
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setFrom("bankdemo2019@gmail.com");
		mail.setTo(toEmail);
		mail.setSubject("Transation");
		mail.setText("You have a transaction from "+sender+" amount LKR "+amount);
		
		javaMailSender.send(mail );
	}
}
