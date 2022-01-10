//slider JS

$(document).ready(function() {
  $('.mypattern').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: '20%',

  });
});


//ドロップダウン
function mediaQueriesWin(){
  var width = $(window).width();
  if(width <= 768) {//横幅が768px以下の場合
    $(".has-child>a").off('click'); //has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
    $(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
      var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
      $(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
      $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
      return false;//リンクの無効化
    });
  }else{//横幅が768px以上の場合
    $(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
    $(".has-child>a").removeClass('active');//activeクラスを削除
    $('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
  }
}

// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
  mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){
  mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
});




//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
  $('.box-ac').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる

  var findElm = $(this).next(".box-ac");//タイトル直後のアコーディオンを行うエリアを取得

  if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
    $(this).removeClass('close');//クラス名を除去
  }else{//それ以外は
    $('.close').removeClass('close'); //クラス名closeを全て除去した後
    $(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
    $(findElm).slideDown(500);//アコーディオンを開く
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
  $('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $(".open").each(function(index, element){ //openクラスを取得
    var Title =$(element).children('.title'); //openクラスの子要素のtitleクラスを取得
    $(Title).addClass('close');       ///タイトルにクラス名closeを付与し
    var Box =$(element).children('.box-ac'); //openクラスの子要素boxクラスを取得
    $(Box).slideDown(500);          //アコーディオンを開く
  });
});


//---------------------------------------
//スムーススクロールの設定
//---------------------------------------

$(function(){
  // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
  $('a[href^="#"]').click(function(){
    // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
    var adjust = -100;
    // スクロールの速度（ミリ秒）
    var speed = 700;
    // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var href= $(this).attr("href");
    // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    var position = target.offset().top + adjust;
    // スムーススクロール linear（等速） or swing（変速）
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});


//---------------------------------------
//ハンバーガーメニュー
//---------------------------------------

$(function(){

	var
	  winW = $(window).width(),
		winH = $(window).height(),
		nav = $('#mainnav ul a'),
		curPos = $(this).scrollTop();

	if (winW < 880){
		var headerH =0;
	}
	else{
		var headerH =63;
	}

	$(nav).on('click', function(){
		nav.removeClass('active');
  	var $el = $(this),
		id = $el.attr('href');
 		$('html, body').animate({
   		scrollTop: $(id).offset().top - headerH
 		}, 500);
		$(this).addClass('active');
		if (winW < 880){
			$('#menuWrap').next().slideToggle();
			$('#menuBtn').removeClass('close');
		}
 		return false;
	});

	var timer = false;
	$(window).bind('load resize',function(){
		if (timer !== false){clearTimeout(timer);}
		timer = setTimeout(function(){
			var
				w = $(window).innerWidth(),
				bg = $('.bg'),
				bgH = bg.height();

			if(w > 800){
				$(function(){
			  	$(".vMid").css('height', bgH);
				});
			}
			else{
				$(function(){
			  	$(".vMid").css({'height':'auto','padding':'50px 20px'});
				});
			}
		});
	});

	$('.panel').hide();
	$('#menuWrap').toggle(function(){
		$(this).next().slideToggle();
		$('#menuBtn').toggleClass('close');
	},
	function(){
		$(this).next().slideToggle();
		$('#menuBtn').removeClass('close');
	});

	$(window).on('scroll', function(){
		var curPos = $(this).scrollTop();
		if(curPos > 80){
			$('#mainnav').addClass('changeNav');
		}
		else{
			$('#mainnav').removeClass('changeNav');
		}
	});


});
