var is_count = 0;
const N = 60;
var bar_w = 20;
var bar_h = 20;
var slidebar_el = document.getElementById("slidebar_cnt");
slidebar_el.value = 0;
var bar_scale = function(){
    bar_w = window.innerWidth*0.7*0.7/N;
    bar_h = window.innerHeight*0.89*0.5/max_A;
}
var pulldown_algorithm_el = document.getElementById("sort_algorithm_type");
var Sort_Algorithms_Name = ["Bubble Sort", "Quick Sort", "Comb Sort","Heap Sort","Merge Sort","Shell Sort","Selection Sort","Insertion Sort"];
for(let i = 0; i < Sort_Algorithms_Name.length; i++){
    let new_element = document.createElement('option');
    new_element.value = i;
    new_element.innerHTML = Sort_Algorithms_Name[i];
    pulldown_algorithm_el.appendChild(new_element); 
} 



var sort_result1 = []; 
var sort_result_color1 = []; 
var A = [], A0 = [];
const max_A = 70;
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
var change_bar = function(xxx,hhh,ff,element_id){
    let parent_element = document.getElementById(element_id);
    let new_element = document.createElement('div');
    if(ff == 0) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #a7ff83; border: solid black 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else if(ff == 1) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #17b978; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #086972; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    parent_element.appendChild(new_element);
}
var update_visualizer = function(itr_id, bar_id, cnt){
    let el = document.getElementById(itr_id);
    el.innerHTML = cnt;
    let parent_element = document.getElementById(bar_id);
    for (let i = parent_element.childNodes.length-1; i>=0; i--) {
        parent_element.removeChild(parent_element.childNodes[i]);
    }
    let new_element = document.createElement('div');
    new_element.style = `width: ${(bar_w+1)*N*1.01}px; height: ${bar_h*max_A*1.01}px; background-color: #071a52; border: solid black 1px; position: absolute; transform: translate(${0}px,${0}px);`;
    parent_element.appendChild(new_element); 
    for(let k = 0; k < N; k++) {
        change_bar(k, sort_result1[cnt][k], sort_result_color1[cnt][k],bar_id);
    }
}
var draw_init_A = function(){
    for(let ii = 1; ii <= 1; ii++){
        let num = ii;
        let el = document.getElementById("cnt"+num.toString(10));
        el.innerHTML = 0;
        let parent_element = document.getElementById("sort_bar"+num.toString(10));
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        let new_element = document.createElement('div');
        new_element.style = `width: ${(bar_w+1)*N*1.01}px; height: ${bar_h*max_A*1.01}px; background-color: #071a52; border: solid black 1px; position: absolute; transform: translate(${0}px,${0}px);`;
        parent_element.appendChild(new_element); 
        for(let k = 0; k < N; k++) {
            change_bar(k, A0[k], 0,"sort_bar"+num.toString(10));
        }
    }
}
var init_visualizer = function(){
    reset_array_A();
    A0 = new Array(N);
    for(let i = 0; i < N; i++) A0[i] = A[i]; 
    let alg_type = pulldown_algorithm_el.value;
    let res1 = Sort_Algorithms[alg_type](A);
    sort_result1 = res1[0];
    sort_result_color1 = res1[1];
    let el = document.getElementById("alg_type_01");
    el.innerHTML = Sort_Algorithms_Name[alg_type];
    for(let i = sort_result1.length-1; i >= 0; i--){
        if(sort_result1[i][0] != -1){
            slidebar_el.max = i+2;
            break;
        }
    }

    bar_scale();
}
//var Sort_Algorithms = [bubble_sort, quick_sort, comb_sort,heap_sort,merge_sort,shell_sort,selection_sort,insertion_sort];
















init_visualizer();
draw_init_A();
var handler = {};
var step_sz = 0;
var cnt = 0;
var loopFactry = function(){
    let loop = function(){
        step_sz += 1;
        let fin = 0;

        if(step_sz % 4 == 0){
            let f1 = 0;

            if(sort_result1[cnt][0] != -1){
                f1 = 1;
                update_visualizer("cnt1","sort_bar1",cnt);
            }


            if(f1 == 1) cnt++;
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
    if(sort_result1[cnt][0] == -1){
        let cn = 0;
        for(let k = cnt; k >= 0; k--) if(sort_result1[k][0] != -1){
            cn = k;
            break;
        }
        update_visualizer("cnt1","sort_bar1",cn);
    }else{
        update_visualizer("cnt1","sort_bar1",cnt);
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
        el.value = "stop";
    }else {
        is_count = 0;
        cancelAnimationFrame(interval.id);
        el.value = "start";
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

    //interval = loopFactry();
}
