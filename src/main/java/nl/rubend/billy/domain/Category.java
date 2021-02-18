package nl.rubend.billy.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Category {
	@Id @GeneratedValue
	private Integer id;
	private String name;
	@ManyToOne private Category layerAbove;
	@OneToMany(mappedBy="layerAbove") private List<Category> layerBelow=new ArrayList<>();
	@OneToMany(mappedBy="category") private List<Article> articles=new ArrayList<>();
}
