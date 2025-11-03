package com.lingo.common_library.exception;

import com.lingo.common_library.viewmodel.error.ErrorVM;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ServerWebExchange;

import java.util.List;

@RestControllerAdvice
//@Slf4j
public class ExceptionHandle {

  private static final String ERROR_LOG_FORMAT = "Error: URI: {}, ErrorCode: {}, Message: {}";
  private static final Logger log = LoggerFactory.getLogger(ExceptionHandle.class);
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorVM> handleNotFoundException(NotFoundException ex, ServerWebExchange request) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    String message = ex.getMessage();

    return buildErrVM(status, message, null, ex, request, 404);
  }

  @ExceptionHandler(EmptyException.class)
  public ResponseEntity<ErrorVM> handleEmptyException(EmptyException ex, ServerWebExchange request) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    String message = ex.getMessage();

    return buildErrVM(status, message, null, ex, request, 400);
  }

  @ExceptionHandler(CreateUserException.class)
  public ResponseEntity<ErrorVM> handleNotFoundException(CreateUserException ex, ServerWebExchange request) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    String message = ex.getMessage();

    return buildErrVM(status, message, null, ex, request, 400);
  }

  @ExceptionHandler(KeycloakException.class)
  public ResponseEntity<ErrorVM> handleEmptyException(KeycloakException ex, ServerWebExchange request) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    String message = ex.getMessage();

    return buildErrVM(status, message, null, ex, request, 400);
  }

  private ResponseEntity<ErrorVM> buildErrVM(HttpStatus status, String message, List<String> errors, Exception ex,
      ServerWebExchange request, int statusCode) {
    ErrorVM errorVm = new ErrorVM(status.toString(), status.getReasonPhrase(), message, errors);

    if (request != null) {
      log.error(ERROR_LOG_FORMAT, null, statusCode, message);
      // log.error(ERROR_LOG_FORMAT, this.getServletPath(request), statusCode,
      // message);
    }

    log.error(message, ex);

    return ResponseEntity.status(status).body(errorVm);
  }

  // private String getServletPath(WebRequest webRequest) {
  // ServletWebRequest servletRequest = (ServletWebRequest) webRequest;
  // return servletRequest.getRequest().getServletPath();
  // }

}
