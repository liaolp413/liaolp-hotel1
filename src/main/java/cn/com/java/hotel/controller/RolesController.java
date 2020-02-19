package cn.com.java.hotel.controller;

import cn.com.java.hotel.model.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 角色表控制层*/
@Controller
@RequestMapping("/roles")
public class RolesController extends BaseController<Roles> {
}
