var is_count = 0;
var N = 60;
var bar_w = 20;
var bar_h = 20;
var max_A = 70;

var sort_result = [[],[],[],[]];
var sort_result_color = [[],[],[],[]];
var A = [], A0 = [];


var slidebar_el = document.getElementById("slidebar_cnt");
slidebar_el.value = 0;
var bar_scale = function(){
    bar_w = window.innerWidth*0.4*0.8/N;
    bar_h = window.innerHeight*0.5*0.52/max_A;
}
var pulldown_algorithm_el = document.getElementsByName("sort_algorithm_type"); 
for(let ii = 0; ii < pulldown_algorithm_el.length;ii++){
    for(let i = 0; i < Sort_Algorithms_Name.length; i++){
        let new_element = document.createElement('option');
        new_element.value = i;
        new_element.innerHTML = Sort_Algorithms_Name[i]; 
        pulldown_algorithm_el[ii].appendChild(new_element);
    }
}
var alg_title = document.getElementsByName("alg_type");

var draw_speed = 4;
var change_speed = function(){
    let el = document.getElementById("speed_input");
    draw_speed = el.value;
}




var change_bar = function(xxx,hhh,ff,element_id){
    let parent_element = document.getElementById(element_id);
    let new_element = document.createElement('div');
    if(ff == 0) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #87CEEB; border: solid black 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else if(ff == 1) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #20b2aa; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #fa8072; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    parent_element.appendChild(new_element);
}
var update_visualizer = function(num,cnt){
    let aa = num+1;
    let parent_element = document.getElementById('sort_bar'+aa.toString(10));
    for (let i = parent_element.childNodes.length-1; i>=0; i--) {
        parent_element.removeChild(parent_element.childNodes[i]);
    }
    for(let k = 0; k < N; k++) {
        change_bar(k, sort_result[num][cnt][k], sort_result_color[num][cnt][k],"sort_bar"+aa.toString(10));
    }
}


 

var reset_array_A = function(){
    A = new Array(N);
    for(let i = 0; i < N; i++) A[i] = Math.floor(Math.random()*max_A)+1;
    return;
    for(let i = 0; i < 1000; i++){
        let a = Math.floor(Math.random() * N);
        let b = Math.floor(Math.random() * N);
        let aa = A[a];
        A[a] = A[b];
        A[b] = aa;
    }
}
var draw_init_A = function(){
    for(let ii = 1; ii <= 4; ii++){
        let num = ii;
        let parent_element = document.getElementById("sort_bar"+num.toString(10));
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, A0[k], 0,"sort_bar"+num.toString(10));
        }
    }
}
var init_visualizer = function(){
    reset_array_A();
    A0 = new Array(N);
    for(let i = 0; i < N; i++) A0[i] = A[i];
    slidebar_el.max = 10;
    for(let num = 0; num < 4; num++){
        for(let i = 0; i < N; i++) A[i] = A0[i];
        let alg_type = pulldown_algorithm_el[num].value; 
        let res = Sort_Algorithms[alg_type](A);
        sort_result[num] = res[0];
        sort_result_color[num] = res[1];
        alg_title[num].innerHTML = Sort_Algorithms_Name[alg_type];

        for(let i = sort_result[num].length-1; i >= 0; i--){
            if(sort_result[num][i][0] != -1){
                if(slidebar_el.max < i+2) slidebar_el.max = i+2;
                break;
            }
        }
    }  
    bar_scale();
}





init_visualizer();
draw_init_A();
var handler = {};
var step_sz = 0;
var cnt = 0;
var loopFactry = function(){
    let loop = function(){
        step_sz += 1;
        let fin = 0;

        if(step_sz % draw_speed == 0){
            let fff = 0;
            let el = document.getElementById("cnt1");
            el.innerHTML = cnt;

            for(let num = 0; num < 4; num++){
                if(sort_result[num][cnt][0] != -1){
                    fff = 1;
                    update_visualizer(num,cnt);
                }
            }
            if(fff == 1) cnt++;
            else fin = 1;

            slidebar_el.value = cnt;
        }

        if(step_sz >= 1000) step_sz = 0;
        if(fin == 1){
            console.log("finish");
            OnButtonClick_start_stop();
        }else{
            handler.id = requestAnimationFrame(loop);
        }
    }
    handler.id = requestAnimationFrame(loop);
    return handler;
}





var interval;
slidebar_el.oninput = function(){
    cnt = slidebar_el.value; 
    let el = document.getElementById("cnt1");
    el.innerHTML = cnt; 
    
    for (let num = 0; num < 4; num++) {
        let aa = num+1;
        let cn = cnt;
        if(sort_result[num][cnt][0] == -1){
            for(let k = cnt; k >= 0; k--) if(sort_result[num][k][0] != -1){
                cn = k;
                break;
            }
        }
        update_visualizer(num,cn);
        
    }
}

var OnButtonClick_start_stop = function(){
    let el = document.getElementById("button_start_stop");
    if(is_count == 0){
        if(cnt == -1){
            init_visualizer();
            is_count = 1;
            handler = {};
            step_sz = 0;
            cnt = 0;
            interval = loopFactry();
        }else{
            is_count = 1;
            interval = loopFactry();
        }
        el.value = "■";
    }else {
        is_count = 0;
        cancelAnimationFrame(interval.id);
        el.value = "▶";
    }
}
OnButtonClick_reset = function(){
    if(is_count == 1){
        is_count = 0;
        cancelAnimationFrame(interval.id);
        init_visualizer();
        handler = {};
        step_sz = 0;
        cnt = 0;
        slidebar_el.value = 0;
        draw_init_A();
        is_count = 0;
        
        //interval = loopFactry();
    }else {
        init_visualizer();
        handler = {};
        step_sz = 0;
        cnt = 0;
        slidebar_el.value = 0;
        draw_init_A();
    }

    let el = document.getElementById("button_start_stop");
    el.value = "▶";
}

var change_N = function(){
    if(is_count == 1){
        is_count = 0;
        cancelAnimationFrame(interval.id);
        
        let el = document.getElementById("N_input");
        if(el.value > 200) el.value = 200; 
        N = el.value;
        max_A = N+1;

        init_visualizer();
        handler = {};
        step_sz = 0;
        cnt = 0;
        slidebar_el.value = 0;
        draw_init_A();
        is_count = 0;
        //interval = loopFactry();
    }else {
        let el = document.getElementById("N_input");
        if(el.value > 200) el.value = 200; 
        N = el.value; 
        max_A = N+1;
        init_visualizer();
        handler = {};
        step_sz = 0;
        cnt = 0;
        slidebar_el.value = 0;
        draw_init_A();
    }
  
    let el = document.getElementById("button_start_stop");
    el.value = "▶";
}
