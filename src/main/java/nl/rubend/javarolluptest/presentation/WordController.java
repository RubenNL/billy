package nl.rubend.javarolluptest.presentation;

import nl.rubend.javarolluptest.application.WordService;
import nl.rubend.javarolluptest.domain.exception.WordLengthNotSupportedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("words")
public class WordController {
    private final WordService service;

    public WordController(WordService service) {
        this.service = service;
    }

    @GetMapping("random")
    public String getRandomWord(@RequestParam Integer length) {
        try {
            return this.service.provideRandomWord(length);
        } catch (WordLengthNotSupportedException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
