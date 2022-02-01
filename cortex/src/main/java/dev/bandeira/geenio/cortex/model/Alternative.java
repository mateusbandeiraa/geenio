package dev.bandeira.geenio.cortex.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Alternative implements Serializable {
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
