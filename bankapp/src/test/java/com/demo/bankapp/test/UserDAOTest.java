package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

import com.demo.bankapp.dao.UserDAO;
import com.demo.bankapp.model.User;
import com.demo.bankapp.repository.UserRepository;

class UserDAOTest {
	
	@Mock
	UserRepository userRepository;
	
	@InjectMocks
	UserDAO userDao;
	
	User user;
	
	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setAccountNo(4L);
		user.setBranch("Athurugiriya");
		user.setName("Heshan");
		user.setNicNo("951121088v");
		user.setPassword("password");
		user.setUsername("heshan@gmail.com");
	} 
	
	@Test
	public void getAllUsers() {
		List<User> list = new ArrayList<User>();
		list.add(user);
		
		when(userDao.findAll()).thenReturn(list);
		
		List<User> usr = userDao.findAll();
		assertEquals(usr.size(), 1);
		verify(userRepository, times(1)).findAll();
	}
	
	@Test
	public void saveUser() {
		userDao.save(user);
		verify(userRepository, times(1)).save(user);
	}
	
	@Test
	public void getUserById() {
		
		when(userDao.findOne(4L)).thenReturn(user);
		
		
		User usr = userDao.findOne(4L);
		
		assertEquals(usr.getName(), "Heshan");
		assertEquals(usr.getNicNo(), "951121088v");
	}
	
	@Test
	public void getByUserName() {
		
		when(userDao.findByUserName("heshan@gmail.com")).thenReturn(user);
		
		User usr = userDao.findByUserName("heshan@gmail.com");
		
		assertEquals(usr.getName(), "Heshan");
		assertEquals(usr.getNicNo(), "951121088v");
	}
}
