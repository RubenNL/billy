package nl.rubend.billy.presentation.DTO;

import lombok.Data;
import nl.rubend.billy.domain.Article;
import nl.rubend.billy.domain.Category;

@Data public class ArticleDTO {
	Integer id;
	String title;
	Integer categoryId;
	String data;
	public ArticleDTO(Article article) {
		this.id=article.getId();
		this.title=article.getTitle();
		this.data=article.getData().replaceAll("\\\\n","\n");
		Category category=article.getCategory();
		if(category!=null) this.categoryId=category.getId();
	}
}
