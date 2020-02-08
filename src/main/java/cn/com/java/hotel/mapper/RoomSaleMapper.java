package cn.com.java.hotel.mapper;

import cn.com.java.hotel.model.RoomSale;

import java.util.List;
import java.util.Map;

public interface RoomSaleMapper extends BaseMapper<RoomSale> {
    //分组查询房间编号 销售金额
    List<Map<String,Object>> selRoomNumAndSalePrice()throws Exception;
}