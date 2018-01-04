(function($) {
  $(function() {

    /* Fix Viewport
     ***************************************/
    var _screenWidth = window.screen.width;
    var _breakPoint = 768;
    $(window).on('load resize', function() {
      _screenWidth = window.screen.width;
      resizeWidth();
      console.log("resize");
    });

    resizeWidth();
    function resizeWidth() {
      // 769px以上1400px未満の時はviewport固定
      if (_breakPoint < _screenWidth && _screenWidth <= 1400) {
        $('[name="viewport"]').attr('content', 'width=1400');
        console.log("width", _screenWidth);
      } else {
        $('[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
      }
    }

     /* globalNav
     ***************************************/
    $('[data-js="globalNav-btn"]').on('click', function() {
      if ($('[data-js="globalNav"]').hasClass('is-active')) {
        $('[data-js="globalNav"]').removeClass('is-active');
        $('body').removeClass('is-overflow-y');
      } else {
        $('body').addClass('is-overflow-y');
        $('[data-js="globalNav"]').addClass('is-active');
      }
    });

    /* Dropdown menu
     ***************************************/
    $('.c-dropdown').prepend('<div class="is-toggle">menu</div>');
    $('.is-toggle').css({
      'width':'100%',
      'height':'50px',
      'background-color':'#999',
      'color':'#fff',
      'text-align':'center',
      'line-height':'50px'
    });

    $(window).on('load resize',function(){
      var winWidth = $(window).width();
      if(winWidth < 700){
        $('.is-toggle').show();
        $('.c-dropdown__f-level').hide();
      } else{
        $('.is-toggle').hide();
        $('.c-dropdown__f-level').show();
      }
    });

    $('.is-toggle').on('click',function(){
      $(this).next('ul').slideToggle();
      $('.open').removeClass('open');
      $('.c-dropdown__f-level>li>a').next('ul').slideUp();
      operner =close;
    });


    var opener = close; //flagでクリックしたときのアコーディオンの開くまでの時間を調節

    $('.c-dropdown__f-level>li>a').on('click',function(){
      var winWidth = $(window).width();
      if( winWidth < _breakPoint ){  //ウィンドウサイズ_breakPoint以上なら
        if( $(this).hasClass('open') ) {  //クリックした要素がopenクラスを持っているなら
          $(this).removeClass('open');
          $(this).next('ul').slideUp();
          opener = close;
        } else{  //クリックした要素がopenクラスを持っていないなら
          var timer;  //アコーディオンが開くまでの遅延時間
          if(opener !== close){
            timer = 350;
          }else{
            timer = 0;
          }
          $('.open').removeClass('open');
          $('.c-dropdown__s-level').slideUp();
          setTimeout(()=>{
            $(this).addClass('open');
            $(this).next('ul').slideDown();
          },timer);
          opener = open;
        }
        event.preventDefault();
      }else{//ウィンドウサイズ640px以下なら
        return false;
      }
    });

    //ウィンドウサイズ _breakPoint以上 の時の動作
    $('.c-dropdown__f-level>li').on('mouseover',function() {  //マウスをのせたとき
      var winWidth = $(window).width();
      if(winWidth >= _breakPoint) {  //ウィンドウサイズ640px以上なら
        if(!$(this).children('a').hasClass('open')){
          $(this).children('a').addClass('open');
          $(this).children('ul').stop().slideDown();
        }
      }else{
        return false;
      }
    }).on('mouseout',function(){
      var winWidth = $(window).width();
      if(winWidth > 700){//ウィンドウサイズ640px以上なら
        $(this).children('a').removeClass('open');
        $(this).children('ul').stop().slideUp();
      }else{//ウィンドウサイズ640px以下なら
        return false;
      }
    });
    $('.c-dropdown__f-level>li>a').on('click',function(){
      event.preventDefault();
    });

    /* スライダー
     ***************************************/
    var sliderLoopFlg = false;
    var sliderLength = $('[data-js="flexslider"]').find('ul>li').length;
    if (sliderLength > 1) loopFlg = true;
    $('[data-js="flexslider"]').flexslider({
      animation: "slide", // スライドのアニメーションタイプ slide/fade
      animationLoop: sliderLoopFlg, // スライドをループさせる true/false
      pauseOnHover: true, // マウスオーバーでスライドショーを停止 true/false
      pauseOnAction: false, // 操作をしている間、スライドを停止 true/false
      directionNav: false, // 両サイドの矢印を表示 true/false
      slideshowSpeed: 5000, // スライドの間隔(1000=1秒)
      initDelay: 0 // スライドが始まるまでの時間(1000=1秒)
    });

    /***************************************/

    /* ページTOPへ
     ***************************************/
    var showFlag = false;
    var pageTop = $('[data-js="pageTop"]');
    pageTop.click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    /***************************************/

    /* モーダル
     ***************************************/
    // 画面内の特定のボタンを押下したらモーダルを開く
    $(document).on('click', '[data-js="modal-open"]', function() {
      $('body').addClass('is-overflow-y');
      $('.c-modal__bg').fadeIn(function() {
        $('.c-modal__contents').fadeIn();
      });
    });

    // モーダル内の特定のボタンを押下したらモーダルを閉じる
    $(document).on('click', '[data-js="modal-apply"]', function() {
      modalClose();
    });

    // モーダル閉じるボタン
    $(document).on('click', '.c-modal__bg,[data-js="modal-close"]', function() {
      modalClose();
    });

    // モーダル表示
    function modalOpen() {
      $('.c-modal__bg').fadeIn(function() {
        $('.c-modal__contents').fadeIn();
      });
    }

    // モーダル非表示
    function modalClose() {
      $('.c-modal__contents').fadeOut(function() {
        $('.c-modal__bg').fadeOut();
        $('body').removeClass('is-overflow-y');
      });
    }
    /***************************************/

    /* モーダル
     ***************************************/
    // 画面内の特定のボタンを押下したらモーダルを開く
    $(document).on('click', '[data-js="loading-open"]', function() {
      $('body').addClass('is-overflow-y');
      $('.c-modal__bg').fadeIn(function() {
        $('.c-modal__contents--loading').fadeIn();
      });
    });
    /****************************************/

    /* タブ
     ***************************************/
    $('[data-js="change-tab"]').on('click', function() {
      var tabNum = $(this).attr('data-tab');
      var tabContent = $('[data-tab-content="' + tabNum + '"]');

      // タブナビを活性化
      $('[data-js="change-tab"]').removeClass('is-active');
      $(this).addClass('is-active');

      // タブの高さを指定
      tabContent.css('height', tabContent.height() + 'px');

      // タブの切替
      $('.c-tab__content').removeClass('is-active');
      tabContent.addClass('is-active');
    });

    initTabContentHeight();

    function initTabContentHeight() {
      var tabNum = $('[data-js="change-tab"].is-active').attr('data-tab');
      var tabContent = $('[data-tab-content="' + tabNum + '"]');

      // タブナビを活性化
      $(this).addClass('is-active');

      // タブの高さを指定
      tabContent.css('height', tabContent.height() + 'px');

      // タブの切替
      $('.c-tab__content').removeClass('is-active');
      tabContent.addClass('is-active');
    }
    /****************************************/

    $('[data-js="toggle-globalNav"]').on('click', function() {
      var gnav = $(this).closest('.c-globalNav');
      if (gnav.hasClass('is-active')) {
        gnav.removeClass('is-active');
      } else {
        gnav.addClass('is-active');
      }
      $(this).closest('.c-globalNav__body').toggle();
    });
  });
})(jQuery);
