package dev.bandeira.geenio.cortex.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.Size;

import org.springframework.util.StringUtils;

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

	@Column(nullable = false)
	private Instant createTime;
	private Instant updateTime;
	private String addedBy;

	@Getter(AccessLevel.NONE) // We want to manually implement these.
	@OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
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
		@ManyToOne(fetch = FetchType.LAZY)
		@ToString.Exclude
		private Question question;

		@Override
		public String toString() {
			return "Alternative [text=" + text + ", isCorrect=" + isCorrect + ", order=" + order + "]";
		}

	}

	public void addAlternative(String text, boolean isCorrect) {
		Alternative alternative = new Alternative(text, isCorrect, 0, this);
		this.alternatives.add(alternative);
		this.updateAlternativesOrder();
	}

	private void updateAlternativesOrder() {
		int counter = 0;
		for (Alternative element : alternatives) {
			element.setOrder(counter++);
		}
	}
	@Data
	@NoArgsConstructor
	public static class QuestionDTO {
		private String id;
		private String text;
		private String[] alternatives;
		private String correctAlternative;
		private String createTime;

		public QuestionDTO(Question question) {
			this.id = question.getId().toString();
			this.text = question.getText();
			this.alternatives = question.alternatives	.stream()
														.map(Alternative::getText)
														.map(String.class::cast)
														.collect(Collectors.toList())
														.toArray(new String[0]);
			this.correctAlternative = question.alternatives	.stream()
															.filter(Alternative::isCorrect)
															.findFirst()
															.get()
															.getText();
			if (Objects.nonNull(question.createTime)) {
				this.createTime = question.createTime.toString();
			}
		}

		public Question asQuestion() {
			Question question = new Question();
			if (StringUtils.hasText(this.id)) {
				question.setId(UUID.fromString(this.id));
			}
			question.setText(this.getText());
			for (String alternative : alternatives) {
				question.addAlternative(alternative, correctAlternative.equals(alternative));
			}
			
			if(Objects.nonNull(this.createTime)) {
				question.setCreateTime(Instant.parse(this.createTime));
			}
			return question;
		}
	}

}
