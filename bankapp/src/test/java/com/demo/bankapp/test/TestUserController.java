package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.StandaloneMockMvcBuilder;

import com.demo.bankapp.controller.UserController;
import com.demo.bankapp.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.qos.logback.core.status.Status;

@RunWith(SpringJUnit4ClassRunner.class)

//@WebMvcTest(UserController.class)
class TestUserController {
	
//	@Autowired
//	private MockMvc mvc;
//	
////	@Test
////	public void createUser() throws Exception
////	{
////		User user = new User();
////		user.setAccountNo(4L);
////		user.setBranch("Athurugiriya");
////		user.setName("Heshan");
////		user.setNicNo("951121088v");
////		user.setPassword("password");
////		user.setUsername("heshan@gmail.com");
////	    mvc.perform( MockMvcRequestBuilders
////	    .post("/bank/users")
////	    .content(asJsonString(user))
////	    .contentType(MediaType.APPLICATION_JSON)
////	    .accept(MediaType.APPLICATION_JSON))
////	    .andExpect(status().isCreated())
////	    .andExpect(MockMvcResultMatchers.jsonPath("$.userId").exists());
////	}
//	
////	@Test
////	public void getUserById() throws Exception
////	{
////	  mvc.perform( MockMvcRequestBuilders
////	      .get("bank/users/{id}", 1112)
////	      .accept(MediaType.APPLICATION_JSON))
////	      .andDo(MockMvcResultHandlers.print())
////	      .andExpect(status().isOk())
////	      .andExpect(MockMvcResultMatchers.jsonPath("$.accountNo").value(1));
////	}
////	 
////	public static String asJsonString(final Object obj) {
////	    try {
////	        return new ObjectMapper().writeValueAsString(obj);
////	    } catch (Exception e) {
////	        throw new RuntimeException(e);
////	    }
////	}
	private MockMvc mockMvc;
	@InjectMocks
	private UserController userController;
	
	@BeforeEach
	public void setup() throws Exception{
		System.out.println("Before");
		mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
		
	}
	
	@Test
	public void testHello() throws Exception{
		
		mockMvc.perform(
				MockMvcRequestBuilders.get("/bank/hello")
				)
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().string("Hello world"));
		
	}
	
}
