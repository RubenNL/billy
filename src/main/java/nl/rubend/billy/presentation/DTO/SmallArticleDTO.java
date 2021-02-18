package nl.rubend.billy.presentation.DTO;

import lombok.Data;
import nl.rubend.billy.domain.Article;

@Data public class SmallArticleDTO {
	Integer id;
	String title;
	Integer categoryId;
	public SmallArticleDTO(Article article) {
		this.id=article.getId();
		this.title=article.getTitle();
		this.categoryId=article.getCategory().getId();
	}
}
