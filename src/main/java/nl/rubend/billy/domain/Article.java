package nl.rubend.billy.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Article {
	@Id @GeneratedValue private Integer id;
	private String title;
	@Column(length = 32768)
	private String data;
	@ManyToOne private Category category;
}
