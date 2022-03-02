package dev.bandeira.geenio.cortex.controller;

import java.security.Principal;
import java.time.Instant;
import java.util.Objects;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import dev.bandeira.geenio.cortex.model.Question;
import dev.bandeira.geenio.cortex.model.Question.QuestionDTO;
import dev.bandeira.geenio.cortex.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/cortex/question")
@Log4j2
public class QuestionController {
	private static final int MAX_PAGE_SIZE = 50;
	// This is a String because all HTTP parameters are Strings.
	private static final String DEFAULT_PAGE_SIZE = "50";

	private static final Sort DEFAULT_QUESTION_SORTING = Sort.by(Direction.DESC, "createTime");

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

	@PutMapping
	public void editQuestion(@RequestBody QuestionDTO questionDTO, Principal principal) {
		final Question originalQuestion = questionRepository.findById(
				questionDTO.asQuestion().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		final QuestionDTO originalDTO = new QuestionDTO(originalQuestion);

		if (Objects.isNull(questionDTO.getCreateTime())) {
			questionDTO.setCreateTime(originalDTO.getCreateTime());
		}

		log.info("Request to edit question: {}", questionDTO);
		Question question = questionDTO.asQuestion();
		question.setAddedBy(principal.getName());
		question.setUpdateTime(Instant.now());
		questionRepository.save(question);
	}
	
	// For requests without a searchTerm parameter
	@GetMapping(params = "!searchTerm")
	public Page<QuestionDTO> getQuestions(
			@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero final int page,
			@RequestParam(name = "pageSize", defaultValue = DEFAULT_PAGE_SIZE) @Positive @Max(MAX_PAGE_SIZE) final int pageSize) {
		return questionRepository	.findAll(PageRequest.of(page, pageSize, DEFAULT_QUESTION_SORTING))
									.map(QuestionDTO::new);
	}
	
	// For requests with a searchTerm parameter
	@GetMapping(params = "searchTerm")
	public Page<QuestionDTO> getQuestions(
			@RequestParam(name = "page", defaultValue = "0") @PositiveOrZero final int page,
			@RequestParam(name = "pageSize", defaultValue = DEFAULT_PAGE_SIZE) @Positive @Max(MAX_PAGE_SIZE) final int pageSize,
			@RequestParam("searchTerm") final String searchTerm) {
		log.info("search");
		return questionRepository.findByTextContainingOrAlternativesTextContainingAllIgnoreCase(
				PageRequest.of(page, pageSize, DEFAULT_QUESTION_SORTING), searchTerm).map(QuestionDTO::new);
	}

	@GetMapping("/{uuidString}")
	public Optional<Question> getQuestion(@PathVariable final String uuidString) {
		return questionRepository.findById(UUID.fromString(uuidString));
	}
}
