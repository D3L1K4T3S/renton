package ru.renhack.controller;

public interface ControllerURLs {

    String PRIVATE_PREFIX = "/private";
    String PUBLIC_PREFIX = "/public";

    String REGISTER = PUBLIC_PREFIX + "/reg";

    String REFRESH_ACCESS = PUBLIC_PREFIX + "/auth/refresh";

    String LOGIN = PUBLIC_PREFIX + "/log";

    String TEST = PUBLIC_PREFIX + "/test";

    String VERIFY = PRIVATE_PREFIX + "/verify";

}
