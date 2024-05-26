package ru.renhack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CompareRequest {
    private String code;
    private String tgId;
    private String tgName;
}
