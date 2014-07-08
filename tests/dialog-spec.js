
var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Overlay = require('../index'),
  Dialog = Overlay.Dialog;

describe('生成dilaog', function(){

  $('<div id="d1"><p>这是第一个弹出框</p></div>').appendTo('body');

  var CLS_TITLE = 'header-title';
  var callback = sinon.spy();
  var config = {
      width:500,
      height:300,
      title:'第一个弹出库',
      contentId : 'd1',
      success:function(){
        callback();
        this.hide();
      },
      cancel : function(){
        return false;
      }
    },
    dialog = new Dialog(config);

  var contentNode = $('#d1'),
    pElement = contentNode.children()[0];
  

  var dialogEl = dialog.get('el');

  $('#btnShow').on('click',function(){
    dialog.show();
  });

  $('#btnShow1').on('click',function(){
    dialog.set('title','');
    dialog.show();
  });
  describe('测试Dialog生成',function(){
    it('测试Dialog生成',function(){
      expect(contentNode.children().length).to.be(1);
      dialog.render();
      dialogEl = dialog.get('el');
      expect(dialogEl.length).not.to.be(0);
      expect(contentNode.children().length).to.be(0);
      expect(dialog.get('body').children()[0]).to.be(pElement);
    });

    it('测试标题',function(){
      expect(dialogEl.find('.'+CLS_TITLE).text()).to.be(config.title);
    })
  });

  describe('测试操作',function(){
    
    it('测试显示',function(){
      dialog.show();
      expect(dialog.get('body').children()[0]).to.be(pElement);
    });

    it('测试隐藏',function(){
      dialog.close();
      expect(dialog.get('body').children()[0]).to.be(pElement);
    });

    it('测试success函数',function(){
      dialog.show();
      expect(callback.called).not.to.be(true);
      var buttons = dialogEl.find('button');
      $(buttons[0]).trigger('click');
      expect(callback.called).to.be(true);
    });

    it('测试cancel函数',function(){
       dialog.show();
       var buttons = dialogEl.find('button');
      $(buttons[1]).trigger('click');
      expect(dialog.get('visible')).to.be(true);
    });

    describe('测试closing,close事件',function(){
      var callback1 = sinon.spy(),
        callback2 = sinon.spy();
      function fn(){
        callback1();
        return false;
      }
      dialog.on('closing',fn);
      dialog.on('closed',callback2);

      it('测试阻止',function(){
        dialog.close();
        expect(callback1.called).to.be(true);
        expect(callback2.called).not.to.be(true);
        expect(dialog.get('visible')).to.be(true);
        dialog.off('closing',fn);
      });

      it('测试取消阻止',function(){
        dialog.close();
        expect(callback2.called).to.be(true);
        expect(dialog.get('visible')).to.be(false);
        dialog.off('closed', callback2);
      });    
    });
  });

});

describe('通过contentId生成', function(){
  $('<div id="d2"><p>这是第二个弹出框</p></div>').appendTo('body');
  var config = {
      width:500,
      height:300,
      title:'第一个弹出库',
      closeAction : 'destroy',
      contentId : 'd2',
      success:function(){
        callback();
        this.hide();
      },
      cancel : function(){
        return false;
      }
    },
    dialog = new Dialog(config);

  var cNode = $('#d2'),
    maskNode;

  describe('测试contentId',function(){
    it('测试初始化',function(){
      maskNode = dialog.get('maskNode')
      expect(maskNode).not.to.be(null);
      dialog.show();
      expect(cNode.children().length).to.be(0);
    });
    it('测试关闭',function(){
      dialog.close();
      expect(dialog.destroyed).to.be(true);
      expect(cNode.children().length).to.be(1);
      
      //expect(dialog.get('maskNode')).to.be(null);
    });
  });
});

describe('异步加载的dialog', function(){

  var config = {
      width:500,
      height:300,
      title:'异步弹出库',
      loader : {
        url : 'data/text.php',
        lazyLoad : {
          event : 'show',
          repeat : true
        }/*,
        loadMask : {
          msg : '正在加载dialog ,请等待。。。'
        }*/
      }
    },
    dialog = new Dialog(config);
  $('#btnAsyn').on('click',function(){
    dialog.show();
  });
  describe('测试加载异步数据',function(){
    it('显示dialog',function(){

    });
  });
});

