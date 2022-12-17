'use strict';

// start.html
function audio() {
  document.getElementById("btn_audio").currentTime = 0; //連続クリックに対応
  document.getElementById("btn_audio").play(); //クリックしたら音を再生
};

const array = [100, 100, 100, 100];
let counter = 0;

$("#gacha-button").on("click", function () {
  document.getElementById("btn_audio").currentTime = 0; //連続クリックに対応
  for (let i = 0; i < 4; i++) {
    array[i] = Math.floor(Math.random() * 4);
  }
  if(counter > 64){
    $("#mushi-card").attr("src", "./mushi.img/girafa.jpg");
    array[0] = 4;
  }else if (array[0] === 0) {
    $("#mushi-card").attr("src", "./mushi.img/ougononi.jpg");
  } else if (array[0] === 1) {
    $("#mushi-card").attr("src", "./mushi.img/herukures.jpg");
  } else if (array[0] === 2) {
    $("#mushi-card").attr("src", "./mushi.img/kokuwagata.jpg");
  } else if (array[0] === 3) {
    $("#mushi-card").attr("src", "./mushi.img/supekiosis.jpg");
  }
  if (array[1] === 0) {
    $("#gu-card").attr("src", "./mushi.img/hyakuretsuken.jpg");
  } else if (array[1] === 1) {
    $("#gu-card").attr("src", "./mushi.img/dragonattack.jpg");
  } else if (array[1] === 2) {
    $("#gu-card").attr("src", "./mushi.img/superrolling.jpg");
  } else if (array[1] === 3) {
    $("#gu-card").attr("src", "./mushi.img/hayate.jpg");
  }
  if (array[2] === 0) {
    $("#choki-card").attr("src", "./mushi.img/super-running.jpg");
  } else if (array[2] === 1) {
    $("#choki-card").attr("src", "./mushi.img/bullrock.jpg");
  } else if (array[2] === 2) {
    $("#choki-card").attr("src", "./mushi.img/crossdive.jpg");
  } else if (array[2] === 3) {
    $("#choki-card").attr("src", "./mushi.img/rollingclatch.jpg");
  }
  if (array[3] === 0) {
    $("#par-card").attr("src", "./mushi.img/rollingdriver.jpg");
  } else if (array[3] === 1) {
    $("#par-card").attr("src", "./mushi.img/sycronhoip.jpg");
  } else if (array[3] === 2) {
    $("#par-card").attr("src", "./mushi.img/super-tornade.jpg");
  } else if (array[3] === 3) {
    $("#par-card").attr("src", "./mushi.img/earth.jpg");
  }
  counter++;
});


// ガチャデータ引継

function pagelocation_start_dif() {                                        // buttonのクリックイベントで  
  location.assign(`./mushiking.html#${array}`)                         // 値を渡して画面遷移
};
function pagelocation_start_easy() {                                        // buttonのクリックイベントで  
  location.assign(`./doraemon.html#${array}`)                         // 値を渡して画面遷移
};

// ページ遷移時にプレイヤーデータ読み込み


const hashvalue = location.hash.substring(1);      //1.ハッシュ値を取得　substringで#をさくじょしている
const playerdata = decodeURI(hashvalue);           //2.デコードして、引継ぎ
const mushi_no = Number(playerdata[0]);           //上記データを数値に変換
const wno_g    = Number(playerdata[2]);
const wno_c    = Number(playerdata[4]);
const wno_p    = Number(playerdata[6]);


//虫データ格納庫
const ougononni =[180,40,90,45,45,180,"ヒャクレツケン"]; //[強さ、テクニック、グー、チョキ、パー,hp,技の名前]
const herukures =[200,30,50,50,100,200,"ローリングドライバー"];
const kokuwagata =[100,100,40,20,20,120,"スーパーローリングスマッシュ"];
const supekiosis =[100,100,20,40,20,120,"スーパーランニングカッター"];
const girafa     =[200,30,55,110,55,180,"ブルロック"];
const mushi_datacontainer=[ougononni,herukures,kokuwagata,supekiosis, girafa];
const guwaza_container =[20,50,80,80];
const chokiwaza_container=[80,20,20,50];
const parwaza_container=[20,50,80,20];

//技の名前を格納し、必殺技や技の表記で利用
const guwaza_name=["ヒャクレツケン","dragonattack","スーパーローリングスマッシュ","hayate"];
const chokiwaza_name=["runningcutter","ブルロック","crossdive","rollingclatch"];
const parwaza_name=["ローリングドライバー","sycronhoip","tornade","earth"];


let  p_hp = mushi_datacontainer[mushi_no][5];
let  e_hp = 180;

// BGM
  // 特定のidのaudioの音量設定
  const a1=document.getElementById('a1'); 
  a1.volume = 1; // 0〜1 の間で

// ダメージ計算式 必殺技は後から計算式に？？
// {(([技・虫テクニック最小値]+[技・虫テクニック最小値])*40/技テクニック値)+(([つよさ]*0.6+[じゃんけん威力]+[技・虫テクニック最小値])/4)}*0.3
const mushi_str=mushi_datacontainer[mushi_no][0] * 0.6;
const gu_tech =Math.min(mushi_datacontainer[mushi_no][1],guwaza_container[wno_g]);
const choki_tech =Math.min(mushi_datacontainer[mushi_no][1],chokiwaza_container[wno_c]);
const par_tech =Math.min(mushi_datacontainer[mushi_no][1],parwaza_container[wno_p]);
const player_gu_damage = Math.floor(((gu_tech *2 *40/ guwaza_container[wno_g])+((mushi_str + mushi_datacontainer[mushi_no][2]*2 + gu_tech)/4))*0.3);
const player_choki_damage = Math.floor(((choki_tech *2 *40/ chokiwaza_container[wno_c])+((mushi_str + mushi_datacontainer[mushi_no][3]*2 + choki_tech)/4))*0.3);
const player_par_damage = Math.floor(((par_tech *2 *40/ parwaza_container[wno_p])+((mushi_str + mushi_datacontainer[mushi_no][4]*2 + par_tech)/4))*0.3);

const enemy_gu_damage     = 29; //ドラゴンアタック
const enemy_choki_damage  = 48; //ブルロック
const enemy_par_damage    = 24; //ダイシャリン



// エフェクトを配列に
$("#center_screen").attr("src", "");


// 効果音、gif動画の再生の関数定義
let effect;
function effect_play(){
  if(effect === 0){
    $("#center_screen_img").attr("src", "./gif/zangeki.gif");
    document.getElementById("effect_audio1").play(); //クリックしたら音を再生
  }else if(effect === 1){
    $("#center_screen_img").attr("src", "./gif/rightning.gif");
    document.getElementById("effect_audio3").play(); //音を再生
  }else if(effect === 2){
    $("#center_screen_img").attr("src", "./gif/redzangeki.gif");
    document.getElementById("effect_audio2").play(); //音を再生
  }
}
// 必殺ワザ確認サンプル
// if(mushi_datacontainer[mushi_no][6] === guwaza_name[wno_g]){
//   e_hp -= player_gu_damage * 1.1;
// }
// if(mushi_datacontainer[mushi_no][6] === chokiwaza_name[wno_c]){
//   e_hp -= player_choki_damage * 1.1;
// }
// if(mushi_datacontainer[mushi_no][6] === parwaza_name[wno_p]){
//   e_hp -= player_par_damage * 1.1;
// }

// 実況発動関数
function zikkyo(){
  if(p_hp <= 0){
    $("#text_items1").text("YOU DIE");
    $("#text_items2").text("君は負けてしまった");
    $("#text_items3").text("");
    $("#player_hp").text("0");
  }
  else if(e_hp <= 0){
    $("#text_items1").text("YOU WIN");
    $("#text_items2").text("君の勝ちだ！");
    $("#text_items3").text("森を救ってくれてありがとう");
    $("#enemy_hp").text("0");
  }
}


//グー
$("#gu_btn").on("click", function () {
  $("#player_hand").attr("src", "./img/gu.jpg");
  const janken = Math.floor(Math.random() * 3);
  effect =Math.floor(Math.random() * 3);
  if (janken === 0) {
    $("#com_hand").attr("src", "./img/gu.jpg");
    p_hp -=10; e_hp-=10;
    $("#player_hp").text(p_hp);
    $("#enemy_hp").text(e_hp);
    document.getElementById("aiko_audio").play(); //音を再生
  } 
  else if (janken === 1) {
    $("#com_hand").attr("src", "./img/choki.jpg");
    if(mushi_datacontainer[mushi_no][6] === guwaza_name[wno_g]){
      e_hp -= player_gu_damage * 1.1;
      $("#text_items1").text("必殺技発動だ！");
      $("#text_items2").text(guwaza_name[wno_g]);
      $("#text_items3").text("");
    }else {e_hp -= player_gu_damage;}
    $("#enemy_hp").text(e_hp);
    effect_play();
  } 
  else if (janken === 2) {
    $("#com_hand").attr("src", "./img/par.jpg");
    p_hp -= enemy_par_damage;
    $("#player_hp").text(p_hp);
    effect_play();
  }
  zikkyo();
});

//チョキ
$("#cho_btn").on("click", function () {
  $("#player_hand").attr("src", "./img/choki.jpg");
  const janken = Math.floor(Math.random() * 3);
  effect =Math.floor(Math.random() * 3);
  if (janken === 0) {
    $("#com_hand").attr("src", "./img/gu.jpg");
    p_hp -= enemy_gu_damage;
    $("#player_hp").text(p_hp);
    effect_play();
  } else if (janken === 1) {
    $("#com_hand").attr("src", "./img/choki.jpg");
    p_hp -=10; e_hp-=10;
    $("#player_hp").text(p_hp);
    $("#enemy_hp").text(e_hp);
    document.getElementById("aiko_audio").play(); //音を再生
  } else if (janken === 2) {
    $("#com_hand").attr("src", "./img/par.jpg");
    if(mushi_datacontainer[mushi_no][6] === chokiwaza_name[wno_c]){
      e_hp -= player_choki_damage * 1.1;
      $("#text_items1").text("必殺技発動だ！");
      $("#text_items2").text(chokiwaza_name[wno_c]);
      $("#text_items3").text("");
    }else{e_hp -= player_choki_damage;}
    $("#enemy_hp").text(e_hp);
    effect_play();
  }
  zikkyo();
});

//パー
$("#par_btn").on("click", function () {
  $("#player_hand").attr("src", "./img/par.jpg");
  const janken = Math.floor(Math.random() * 3);
  effect =Math.floor(Math.random() * 3);
  if (janken === 0) {
    $("#com_hand").attr("src", "./img/gu.jpg");
    if(mushi_datacontainer[mushi_no][6] === parwaza_name[wno_p]){
      e_hp -= player_par_damage * 1.1;
      $("#text_items1").text("必殺技発動だ！");
      $("#text_items2").text(parwaza_name[wno_p]);
      $("#text_items3").text("");
    }else {e_hp -= player_par_damage;}
    $("#enemy_hp").text(e_hp);
    effect_play();
  } else if (janken === 1) {
    $("#com_hand").attr("src", "./img/choki.jpg");
    p_hp -= enemy_choki_damage;
    $("#player_hp").text(p_hp);
    effect_play();
  } else if (janken === 2) {
    $("#com_hand").attr("src", "./img/par.jpg");
    p_hp -=10; e_hp-=10;
    $("#player_hp").text(p_hp);
    $("#enemy_hp").text(e_hp);
    document.getElementById("aiko_audio").play(); //音を再生
  }
  zikkyo();
});

