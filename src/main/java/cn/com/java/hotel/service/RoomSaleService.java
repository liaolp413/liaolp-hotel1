package cn.com.java.hotel.service;

import cn.com.java.hotel.model.RoomSale;

import java.util.List;
import java.util.Map;

public interface RoomSaleService extends BaseService<RoomSale>{
    //分组查询房间编号与金额 并进行封装
    Map<String, List<Object>> findRoomNumAndSalePrice()throws Exception;
}
