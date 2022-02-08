package dev.bandeira.geenio.cortex.controller;

import java.security.Principal;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import javax.validation.constraints.Max;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@GetMapping
	public Page<Question> getQuestions(@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero final int page,
			@RequestParam(name = "pageSize", defaultValue = "10") @Positive @Max(50) final int pageSize) {
		return questionRepository.findAll(PageRequest.of(page, pageSize, Sort.by(Direction.DESC, "createTime")));
	}

	@GetMapping("/{uuidString}")
	public Optional<Question> getQuestion(@PathVariable final String uuidString) {
		return questionRepository.findById(UUID.fromString(uuidString));
	}
}
