package cn.com.java.hotel.service.impl;

import cn.com.java.hotel.model.Authority;
import cn.com.java.hotel.model.Roles;
import cn.com.java.hotel.service.RolesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 角色表业务层实现类
 * */
@Service
@Transactional(readOnly = false)
public class RolesServiceImpl extends BaseServiceImpl<Roles> implements RolesService {
    //重写分页方法 并查询角色对应一级权限

    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, Roles roles) throws Exception {
        Map<String,Object> map = super.findPageTByPramas(page,limit,roles);
        //取出对象集合
        List<Roles> rolesList = (List<Roles>) map.get("data");
        //循环遍历集合,根据角色id查询出对应的权限
        for (Roles role:rolesList){
            List<Authority> authorities = authorityMapper.selFirstAndSenAuth(role.getId(), 0);
            String authName = "";
            //遍历权限对象集合取出对应的权限名称
            for (Authority auth:authorities){
                authName += auth.getAuthorityName()+",";
            }
            role.setFirstAuth(authName);
        }
        return map;

    }
}
