package cn.com.java.hotel.service.impl;

import cn.com.java.hotel.model.RoomSale;
import cn.com.java.hotel.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 消费信息业务层实现类
 * */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {

    @Override
    public Map<String, List<Object>> findRoomNumAndSalePrice() throws Exception {
        return null;
    }
}
