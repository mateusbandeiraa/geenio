package dev.bandeira.geenio.cortex.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import dev.bandeira.geenio.cortex.model.Question;

public interface QuestionRepository extends PagingAndSortingRepository<Question, UUID> {

}
