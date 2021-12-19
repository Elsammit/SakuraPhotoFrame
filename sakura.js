const maxNum = 50;
const width_padding = 60;

(function(d,b,w){
    var q = d.createElement('div')
    q.id = "sakura"
    b.appendChild(q);

    var h = w.innerHeight;
    var u = d.documentElement.scrollTop || b.scrollTop;
    var z = 10000;
    var top = new Array();
    var left = new Array();
    var yura = new Array();
    var speed = new Array();
    var group = new Array();
    var count = new Array();

    d.addEventListener('scroll',function(){u = d.documentElement.scrollTop || b.scrollTop;},false);

    for(var i=0;i<maxNum;i++){
		var m = d.createElement('div'); // div 用意
		m.id = 'hanabira'+i; // 花びらの id
		top[i] = Math.random()*-1000+u; // 花びらの最初の top
		left[i] = Math.random()*w.innerWidth - width_padding; // 花びらの最初の left

        var clss = 'hana type'+(Math.floor(Math.random()*6)+1);
		m.setAttribute('class',clss); // class を追加
		m.setAttribute('style','z-index:'+(z+i)+';top:'+top[i]+'px;left:'+left[i]+'px;');
		q.appendChild(m); // 最初の div に花びらの div を追加
		yura[i] = Math.random()*40+5; // ゆらぐ最大幅
		speed[i] = Math.random()*5+2; // スピード
		group[i] = d.getElementById('hanabira'+i);
		count[i] = 0; // ゆらぎの初期値

	}

	// 花びらを繰り返し動かす部分
	setInterval(function(){
		for(var i=0;i<maxNum;i++){
			if(top[i]<u+h-40){
				if(yura[i]>=count[i]){
					left[i] = left[i]+0.5+Math.random()*0.5;
				}else{
					left[i] = left[i]-0.5-Math.random()*0.5;
				}
				if((yura[i]*2)<=count[i]){
					count[i] = 0;
				}
			}else{
				top[i] = u-40;
				left[i] = Math.random()*w.innerWidth - width_padding;
			}
			top[i] = top[i]+speed[i];
			group[i].style.top = top[i]+'px';
			group[i].style.left = left[i]+'px';
			count[i]++;
		}
	},45);

})(window.document,window.document.body,window);

/*
●印付与関数.
どのページを表示しているのかを示す●を表示.
*/
function selectImgcircle(count){
    // 今回は5ページ分のスライドショー表示のため1～5を指定.
    for(var i=1;i<=5;i++){
        var buf = "select" + i; // select1 ～select5を指定.
        document.getElementById(buf).style.border = "1px solid rgb(206, 202, 202)"; // 背景色やボーダー色をrgb(206, 202, 202)に指定.
        document.getElementById(buf).style.backgroundColor = "rgb(206, 202, 202)";  // 背景色やボーダー色をrgb(206, 202, 202)に指定.
    }
    
    var selectID = "select"+(count+1);                                              // 現在表示しているcount値を指定(countは0 ～ 4なので+1している)
    document.getElementById(selectID).style.border = "1px solid black";             // 選択している●の背景やボーダー色をblackに指定.
    document.getElementById(selectID).style.backgroundColor = "black";              // 選択している●の背景やボーダー色をblackに指定.
}

var count = 0;

/*
画像スライドショー.
一定時間毎に表示する画像の切り替え.
*/
(function($){
    $(document).ready(function(){
      var slides = $(".slideshow > li");    // slideshowクラス配下のliをセット.
      
      // 画像切り替え関数.
      function toggle_slide(){
        let music = document.getElementById("music");
        if(!music.paused){
            count = (count + 1) % 5;
            slides.removeClass("current").eq(count).addClass("current");    // 現在セットされているcurrentクラスを削除し次に表示させるimgタグにcurrentタグを付与.
            selectImgcircle(count);                                         // ●印付与関数コール.
        }
      }
      setInterval(toggle_slide, 5000);                                  // 定期処理実行.

    });  
})(jQuery);

/*
選択した●印の画像を表示.
*/
function ImgSelect(inpt){
    console.log(inpt);
    count = inpt-1;
    var slides = $(".slideshow > li");
    slides.removeClass("current").eq(count).addClass("current");
    selectImgcircle(count);
}

/*
選択した画像番号の画像を切り替え.
*/
function changeImages(obj, Num){
    var fileReader = new FileReader();  // フォルダを開き画像選択させる.
    var inputFile = "inputFile" + Num;  // 選択した画像番号を指定.
    fileReader.onload = (function(){
        var photoNum = "photoNum" + Num;
        document.getElementById(photoNum).src = fileReader.result;  
    });
    console.log(document.getElementById(inputFile).files[0]);
    fileReader.readAsDataURL(obj.files[0]);  // 選択した画像をセット.
}

$(".musicStpse").click(function(event) {
    let music = document.getElementById("music");
    if(!music.paused){
      music.pause();
      $('#on_fade').removeClass('on_fade');
      $('#on_fade_Pause').removeClass('on_hidden');
      $('#on_fade_Pause').addClass('on_fade');
      $('#on_fade').addClass('on_hidden');
    }else{
      $('#on_fade').removeClass('on_hidden');
      $('#on_fade').addClass('on_fade');
      
      $('#on_fade_Pause').removeClass('on_fade');
      $('#on_fade_Pause').addClass('on_hidden');
      music.play();
    }
  });