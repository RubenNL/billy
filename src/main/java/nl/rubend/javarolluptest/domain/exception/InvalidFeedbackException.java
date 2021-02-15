package nl.rubend.javarolluptest.domain.exception;

public class InvalidFeedbackException extends RuntimeException {
    public InvalidFeedbackException(Integer markLength,Integer attemptLength) {
        super("Feedback marks of size "+markLength+" Is invalid with attemptlength "+attemptLength+"!");
    }
}