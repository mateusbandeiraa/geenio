package dev.bandeira.geenio.cortex.controller;

import java.security.Principal;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.bandeira.geenio.cortex.model.Question;
import dev.bandeira.geenio.cortex.model.Question.QuestionDTO;
import dev.bandeira.geenio.cortex.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/cortex/question")
@Log4j2
public class QuestionController {
	@Autowired
	private QuestionRepository questionRepository;

	@PostMapping
	public void addQuestion(@RequestBody QuestionDTO questionDTO, Principal principal) {
		log.info("Request to add question: {}", questionDTO);
		Question question = questionDTO.asQuestion();
		question.setAddedBy(principal.getName());
		question.setCreateTime(Instant.now());
		questionRepository.save(question);
	}
}
