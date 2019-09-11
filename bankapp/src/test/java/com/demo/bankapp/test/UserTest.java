package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.demo.bankapp.model.User;

class UserTest {
	
	User user;
	
	@BeforeEach
	public void setup() {
		user = new User();
	}
	
	@AfterEach
	public void afterTest() {
		user = null;
	}

	@Test
	public void getname() throws Exception {
		String name = "Heshan";
		user.setName(name);
		assertEquals(name, user.getName());
	}
	
	@Test
	public void getUserAccountNo() throws Exception{
		Long accountNo = 4L;
		user.setAccountNo(accountNo);
		assertEquals(accountNo, user.getAccountNo());
	}
	
	@Test
	public void getPassword() throws Exception{
		String password = "heshan";
		user.setPassword(password);;
		assertEquals(password, user.getPassword());
	}
	
	@Test
	public void getNicNo() throws Exception{
		String nicNo = "951121088v";
		user.setNicNo(nicNo);
		assertEquals(nicNo, user.getNicNo());
	}
	
	@Test
	public void getBranch() throws Exception{
		String branch = "Athurugiriya";
		user.setBranch(branch);;
		assertEquals(branch, user.getBranch());
	}
	
	@Test
	public void getUsername() throws Exception{
		String username = "heshan@gmail.com";
		user.setUsername(username);
		assertEquals(username, user.getUsername());
	}
	
	@Test
	public void getType() throws Exception{
		String type = "user";
		user.setType(type);
		assertEquals(type, user.getType());
	}

}
