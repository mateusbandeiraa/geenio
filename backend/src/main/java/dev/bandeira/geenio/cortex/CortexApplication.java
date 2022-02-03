package dev.bandeira.geenio.cortex;

import java.util.Optional;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import dev.bandeira.geenio.cortex.model.Question;
import dev.bandeira.geenio.cortex.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;

@SpringBootApplication
@Log4j2
public class CortexApplication {

	public static void main(String[] args) {
		SpringApplication.run(CortexApplication.class, args);
	}

	// @Bean
	public CommandLineRunner test(QuestionRepository repository) {
		return (args) -> {
			Question question = new Question(null, "Texto da Pergunta", null);
			question.addAlternative("Alternativa A", false, 0);
			question.addAlternative("Alternativa B", true, 0);
			question.addAlternative("Alternativa C", false, 0);

			repository.save(question);

			log.info("All good.");
		};
	}

	// @Bean
	public CommandLineRunner test2(QuestionRepository repository) {
		return (args) -> {
			Optional<Question> question = repository
					.findById(UUID.fromString("1160287e-e44f-4329-b354-77410e629332"));

			log.info(question.toString());
			log.info("All good.");
		};
	}

}
