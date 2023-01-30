package com.amazing.juno.springwebapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazing.juno.springwebapp.dao.AboutDao;
import com.amazing.juno.springwebapp.dao.ContactDao;
import com.amazing.juno.springwebapp.dao.IntroductionDao;
import com.amazing.juno.springwebapp.dao.TechnologyDao;
import com.amazing.juno.springwebapp.entity.AboutEntity;
import com.amazing.juno.springwebapp.entity.ContactEntity;
import com.amazing.juno.springwebapp.entity.IntroductionEntity;
import com.amazing.juno.springwebapp.entity.TechnologyEntity;

@Service
public class PropertyService implements PropertyServiceInterface{
	
	@Autowired
	IntroductionDao introductionDao;
	
	@Autowired
	AboutDao aboutDao;
	
	@Autowired
	TechnologyDao technologyDao;
	
	@Autowired
	ContactDao contactDao;

	@Override
	public IntroductionEntity getIntroduction() {
	
		return introductionDao.getIntro();
	}

	@Override
	public AboutEntity getAbout() {
		return aboutDao.getAboutMe();
	}

	@Override
	public Map<String, List<TechnologyEntity>> getTechnology() {
		Map<String, List<TechnologyEntity>> map = new HashMap<>();
		
		map.put("frontend", technologyDao.getFrontendList());
		map.put("backend", technologyDao.getBackendList());
		
		return map;
	}

	@Override
	public ContactEntity getContactInfo() {
		return contactDao.getContactInfo();
	}

}