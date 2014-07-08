
var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Overlay = require('../index'),
  Message = Overlay.Message;


describe('测试显示信息',function(){
  it('显示提示信息',function(){
    var msg = '这只是简单的提示信息',
      icon = 'info';
      
    Message.Alert(msg, icon);
    var el = $('.bui-message-content');
    expect(el.text()).to.be(msg);
    
    //expect(Message)
  });

  it('显示成功信息',function(){
    var msg = '这只是简单的成功信息',
      icon = 'success';
    Message.Alert(msg,icon);

    var el = $('.bui-message-content');
    expect(el.text()).to.be(msg);
  });
});
$('#J_MsgInfo').on('click',function(){
  Message.Alert('这只是简单的提示信息','info');
});

$('#J_MsgSuccess').on('click',function(){
  Message.Alert('这只是简单的成功信息','success');
});
$('#J_MsgAlert').on('click',function(){
  Message.Alert('这只是简单的警告信息','warning');
});
$('#J_MsgError').on('click',function(){
  Message.Alert('这只是简单的错误信息','error');
});
$('#J_MsgConfirm').on('click',function(){
  Message.Alert('这只是简单的确认信息','question');
});

$('#J_Confirm').on('click',function(){
  Message.Confirm('确认要更改么？',function(){
    alert('确认');
  },'question');
});
