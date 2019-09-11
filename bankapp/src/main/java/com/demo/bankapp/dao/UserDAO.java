package com.demo.bankapp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.bankapp.model.User;
import com.demo.bankapp.repository.UserRepository;

@Service
public class UserDAO {

	@Autowired
	UserRepository userRepository;
	
	public UserDAO(UserRepository userRepository2) {
		userRepository=userRepository2;
	}

	public User save(User usr) {
		return userRepository.save(usr);
	}
	
	public List<User> findAll(){
		return userRepository.findAll();
	}
	
	public User findOne(Long usrId) {
		return userRepository.findOne(usrId);
	}
	
	public User findByUserName(String username) {
		return userRepository.findByUsername(username);
	}
	
	public void delete(User usr){
		userRepository.delete(usr);
		
	}
}
 