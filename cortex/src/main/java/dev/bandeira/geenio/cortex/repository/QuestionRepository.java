package dev.bandeira.geenio.cortex.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import dev.bandeira.geenio.cortex.model.Question;

public interface QuestionRepository extends CrudRepository<Question, UUID>{

}
