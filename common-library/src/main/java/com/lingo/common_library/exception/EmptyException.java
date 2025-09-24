package com.lingo.common_library.exception;

import com.lingo.common_library.utils.MessageUtils;

public class EmptyException extends RuntimeException {
  private final String message;

  public EmptyException(String message, Object... var) {
    this.message = MessageUtils.getMessage(message, var);
  }

  @Override
  public String getMessage() {
    return message;
  }
}
