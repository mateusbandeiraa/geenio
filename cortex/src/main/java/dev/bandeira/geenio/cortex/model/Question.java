package dev.bandeira.geenio.cortex.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor()
@Entity
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	@Size(max = 70)
	private String text;
	@ManyToOne
	private Author author;

	@Getter(AccessLevel.NONE) // We want to manually implement these.
	@OneToMany(mappedBy = "question",
			cascade = CascadeType.ALL,
			fetch = FetchType.EAGER,
			orphanRemoval = true)
	@OrderBy("order")
	private final List<Alternative> alternatives = new ArrayList<>();

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Entity(name = "alternative")
	protected static class Alternative implements Serializable {
		private static final long serialVersionUID = -2911129391474486828L;
		
		@Size(max = 30)
		private String text;
		private boolean isCorrect;

		@Id
		private int order;

		@Id
		@ManyToOne
		@ToString.Exclude
		private Question question;
	}

	public void addAlternative(String text, boolean isCorrect, int order) {
		Alternative alternative = new Alternative(text, isCorrect, order, this);
		this.alternatives.add(alternative);
		this.updateAlternativesOrder();
	}

	private void updateAlternativesOrder() {
		int counter = 0;
		for (Alternative element : alternatives) {
			element.setOrder(counter++);
		}
	}

}
