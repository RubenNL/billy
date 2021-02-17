package nl.rubend.billy.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Article {
	@Id private Integer id;
	private String title;
	@Column(length = 32768)
	private String data;
}
