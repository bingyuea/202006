/*适应于报表类型一 reportForm5*/
$(function(){
  var Timer;
  $(window).resize(function(){
    Timer=setTimeout(function(){
      //setTblWidth($("#tblForm").find(".scrollTbl"))
      $("#tblForm").trigger("scroll");//上面的一种方法也可以
    },200);
  });
  $("#tblForm").on('scroll',function(){
    //判断table是否存在，不存在就构建，反之
    var el=$("#tblForm").find(".scrollTbl");
    if(!el[0]){
      var $str=$('<div class="scrollTbl" style="position:absolute;top:0px;width:100%"><table cellpadding="0" cellspacing="0" style="table-layout:fixed;border-left: 1px solid #A3C0E8;border-bottom: 1px solid #A3C0E8;"></table></div>');
      //1、获取到原始表格的表头
      var str="";
      $("#tblForm>table tr:not([class])").each(function(idx,ele){//报表类型1和5的区别就在这个地方，因为表头不一样
        str+="<tr>";
        $(ele).children().each(function(i,e){
          var _wid=$(e).width()+"px",_hei=$(e).height()+"px";
          var col=$(e).attr("colspan");
          var row=$(e).attr("rowspan");
          col=!!col?col:1;
          row=!!row?row:1;
          str+="<th rowspan="+row+" colspan="+col+" style='width:"+_wid+";height:"+_hei+";padding:8px 10px;text-align:center;border-top:1px solid #A3C0E8;border-right:1px solid #A3C0E8;font-size:14px;background-color:#E2F0FF;font-weight:normal'>"+$(e).text()+"</th>"
        })
        str+="</tr>";
      })
      $str.find("table").append($(str));
      $("#tblForm").append($str);
    }else{
      //设置top值
      $("#tblForm").find(".scrollTbl").css("top",$(this)[0].scrollTop+"px")
      //设置宽度(，需要重新设置宽度)
      setTblWidth(el);
    }
  })
})
//设置宽度的方法
function setTblWidth(el,t){
  if(!el)return;
  var w=el.prev().find('tr:not([class])');//动的
  el.find('table tr').each(function(idx,ele){//固定的表头
    $(ele).children().each(function(i,e){
      $(e).css('width',$(w[idx]).children().eq(i).css("width"));
      $(e).css('height',$(w[idx]).children().eq(i).css("height"));
    })
  });
}
