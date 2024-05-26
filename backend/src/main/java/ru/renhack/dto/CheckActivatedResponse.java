package ru.renhack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckActivatedResponse {
    private Boolean activated;
}
