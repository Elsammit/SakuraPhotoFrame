const maxNum = 50;
const width_padding = 60;

(function(d,b,w){
    var q = d.createElement('div')
    q.id = "sakura"
    b.appendChild(q);

    var h = w.innerHeight;
    var u = d.documentElement.scrollTop || b.scrollTop;
    var z = 100;
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

function selectImgcircle(count){
    for(var i=1;i<=5;i++){
        var buf = "select" + i;
        document.getElementById(buf).style.border = "1px solid rgb(206, 202, 202)";
        document.getElementById(buf).style.backgroundColor = "rgb(206, 202, 202)";
    }
    
    var selectID = "select"+(count+1);
    document.getElementById(selectID).style.border = "1px solid black";
    document.getElementById(selectID).style.backgroundColor = "black";
}

var count = 0;
(function($){
    $(document).ready(function(){
      var slides = $(".slideshow > li");
      
      function toggle_slide(){
        count = (count + 1) % 5;
        slides.removeClass("current").eq(count).addClass("current");
        selectImgcircle(count);
      }
      setInterval(toggle_slide, 5000);

    });  
})(jQuery);

function ImgSelect(inpt){
    console.log(inpt);
    count = inpt-1;
    var slides = $(".slideshow > li");
    slides.removeClass("current").eq(count).addClass("current");
    selectImgcircle(count);
}

function test(obj, Num){
    var fileReader = new FileReader();
    var inputFile = "inputFile" + Num;
    fileReader.onload = (function(){
        var photoNum = "photoNum" + Num;
        document.getElementById(photoNum).src = fileReader.result;
    });
    console.log(document.getElementById(inputFile).files[0]);
    fileReader.readAsDataURL(obj.files[0]);
}

function changeImages(){
    var fileReader1 = new FileReader();
    fileReader1.onload = (function(){
        document.getElementById("photoNum1").src = fileReader1.result;
    });
    fileReader1.readAsDataURL(document.getElementById("inputFile1").files[0]);
    
    var fileReader2 = new FileReader();
    fileReader2.onload = (function(){
        document.getElementById("photoNum2").src = fileReader2.result;
    });
    fileReader2.readAsDataURL(document.getElementById("inputFile2").files[0]);
    
    var fileReader3 = new FileReader();
    fileReader3.onload = (function(){
        document.getElementById("photoNum3").src = fileReader3.result;
    });
    fileReader3.readAsDataURL(document.getElementById("inputFile3").files[0]);
}