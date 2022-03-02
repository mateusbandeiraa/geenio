package dev.bandeira.geenio.cortex.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import dev.bandeira.geenio.cortex.model.Question;

public interface QuestionRepository extends PagingAndSortingRepository<Question, UUID> {

	Page<Question> findDistinctByTextContainingOrAlternativesTextContainingAllIgnoreCase(Pageable pageable,
			String textTerm, String alternativeTextTerm);

	/**
	 * Returns all questions which contain the supplied search term in either:
	 * <ol>
	 * <li>The Question text itself;</li>
	 * <li>The text from an Alternative.</li>
	 * </ol>
	 * 
	 * @param pageable
	 * @param term
	 *            The term to be searched for
	 * @return a page of unique Question instances
	 */
	default Page<Question> findByTextContainingOrAlternativesTextContainingAllIgnoreCase(Pageable pageable,
			String term) {
		return this.findDistinctByTextContainingOrAlternativesTextContainingAllIgnoreCase(pageable, term, term);
	}

}
