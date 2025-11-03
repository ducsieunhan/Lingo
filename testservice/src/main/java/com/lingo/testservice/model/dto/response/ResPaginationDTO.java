package com.lingo.testservice.model.dto.response;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResPaginationDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Meta meta;
    private Object result;

    @Data
    public static class Meta implements Serializable {
        private static final long serialVersionUID = 1L;
      private int page;
      private int pageSize;
      private int pages;
      private long total;
    }
  }
