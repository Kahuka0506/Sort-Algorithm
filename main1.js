var is_count = 0;
const N = 40;
var bar_w = 20;
var bar_h = 20;
const max_A = 70;

var slidebar_el = document.getElementById("slidebar_cnt");
slidebar_el.value = 0;
var bar_scale = function(){
    bar_w = window.innerWidth*0.4*0.89/N;
    bar_h = window.innerHeight*0.4*0.5/max_A;
}
var pulldown_algorithm_el = document.getElementById("sort_algorithm_type");
var Sort_Algorithms_Name = ["Bubble Sort", "Quick Sort", "Comb Sort","Heap Sort","Merge Sort","Shell Sort","Selection Sort","Insertion Sort"];
for(let i = 0; i < Sort_Algorithms_Name.length; i++){
    let new_element = document.createElement('option');
    new_element.value = i;
    new_element.innerHTML = Sort_Algorithms_Name[i];
    pulldown_algorithm_el.appendChild(new_element); 
} 


var change_bar = function(xxx,hhh,ff,element_id){
    let parent_element = document.getElementById(element_id);
    let new_element = document.createElement('div');
    if(ff == 0) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #87CEEB; border: solid black 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else if(ff == 1) new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #20b2aa; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    else new_element.style = `width: ${bar_w}px; height: ${bar_h*hhh}px; background-color: #fa8072; border: solid blue 0px; position: absolute; transform: translate(${5+(bar_w+1)*xxx}px,${bar_h*(max_A-hhh)}px);`;
    parent_element.appendChild(new_element);
}




var sort_result1 = [];
var sort_result2 = [];
var sort_result3 = [];
var sort_result4 = [];
var sort_result_color1 = [];
var sort_result_color2 = [];
var sort_result_color3 = [];
var sort_result_color4 = [];
var A = [], A0 = [];

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

var bubble_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    for(let i = 0; i < N; i++){
        for(var j = 0; j < N-i; j++){
            res_color[cn][j] = 1;
            if(A[j-1] > A[j]){
                var a = A[j-1];
                A[j-1] = A[j];
                A[j] = a;
                //res_color[cn][j-1] = 2;
                res_color[cn][j] = 2;
            }
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            cn++;
        }
    }
    res[cn][0] = -1;
    return [res,res_color];
}


var insertion_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    for(let i = 1; i < N; i++){
        for(var j = i; j >= 0; j--){
            if(A[j-1] > A[j]){
                var a = A[j-1];
                A[j-1] = A[j];
                A[j] = a;
            }else break;
            res_color[cn][j] = 2;
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            cn++;
        }
    }
    res[cn][0] = -1;
    return [res,res_color];
}


var selection_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    for(let i = 0; i < N; i++){
        let id = i;
        let a = A[i];
        for(var j = i+1; j < N; j++){
            if(a > A[j]) a = A[j], id = j;
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            res_color[cn][j] = 1;
            if(j < N-1) cn++;
        }
        if(i != id){
            let a = A[i];
            A[i] = A[id];
            A[id] = a;
            res_color[cn][i] = 2;
            res_color[cn][id] = 2;
        }
        for(let k = 0; k < N; k++) res[cn][k] = A[k];
        cn++;
    }
    res[cn][0] = -1;
    return [res,res_color];
}



var shell_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    let h = N/2;
    while(h > 1){
        for(let ii = 0; ii < N; ii++){
            let I = [];
            for(let j = ii; j+h < N; j+=h) I.push(j);
            for(let i = 1; i < I.length; i++){
                for(let j = i; j >= 0; j--){
                    for(let k = 0; k < I.length; k++) res_color[cn][I[k]] = 1;
                    if(A[I[j-1]] > A[I[j]]){
                        var a = A[I[j-1]];
                        A[I[j-1]] = A[I[j]];
                        A[I[j]] = a;
                        res_color[cn][I[j-1]] = 2;
                    }else break;
                    res_color[cn][I[j]] = 2;
                    for(let k = 0; k < N; k++) res[cn][k] = A[k];
                    cn++;
                }
            }
        }

        h = Math.trunc(h/2);
    }
    for(let i = 1; i < N; i++){
        for(var j = i; j >= 0; j--){
            if(A[j-1] > A[j]){
                var a = A[j-1];
                A[j-1] = A[j];
                A[j] = a;
            }else break;
            res_color[cn][j] = 2;
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            cn++;
        }
    }
    res[cn][0] = -1;
    return [res,res_color];
}



var merge_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;

    var rec_merge_sort = function(l,r){
        if(r-l == 1) {
            return [A[l]];
        }
        let L = [], R = [];
        L = rec_merge_sort(l,Math.trunc((l+r)/2));
        R = rec_merge_sort(Math.trunc((l+r)/2),r);
        L.push(1000000000);
        R.push(1000000000);
        let Li = 0, Ri = 0;
        for(let i = l; i < r; i++){
            if(L[Li] < R[Ri]) A[i] = L[Li], Li++;
            else A[i] = R[Ri], Ri++;

            for(let k = l; k < r; k++) res_color[cn][k] = 1;
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            res_color[cn][i] = 2;
            cn++;
        }
        let ans = [];
        for(let i = l; i < r; i++) ans.push(A[i]);
        return ans;
    }
    rec_merge_sort(0,N);
    res[cn][0] = -1;
    return [res,res_color];
}


var heap_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;

    let max_heapify = function(array_len,i){
        let l = i*2+1;
        let r = i*2+2;
        let m = i;

        if(l < array_len && A[m] < A[l]) m = l;
        if(r < array_len && A[m] < A[r]) m = r;

        for(let k = 0; k < N; k++) res[cn][k] = A[k];
        for(let k = 0; k < array_len; k++) res_color[cn][k] = 1;
        cn++;

        if(m != i){
            let a = A[i];
            A[i] = A[m];
            A[m] = a;
            res_color[cn-1][i] = res_color[cn-1][m] = 2;
            max_heapify(array_len,m);
        }


    }
    let bulid_max_heap = function(array_len){
        for(let i = Math.floor(array_len/2); i >= 0; i--) max_heapify(array_len,i);
    }
    bulid_max_heap(N);  
    for(let i = N-1; i >= 0; i--){
        let a = A[0];
        A[0] = A[i];
        A[i] = a;
        if(A[0] == A[i]) continue;
        max_heapify(i,0);
        for(let k = 0; k < N; k++) res[cn][k] = A[k];
        res_color[cn][0] = res_color[cn][i] = 2;
        cn++;
    }

 
    res[cn][0] = -1;
    return [res,res_color];
}


var comb_sort = function(){
    let res = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    let h = Math.trunc(N/1.3-0.5);
    while(1){
        let f = 0;
        for(let i = 0; i+h < N; i++){
            res_color[cn][i] = 1;
            res_color[cn][i+h] = 1;
            if(A[i] > A[i+h]){
                var a = A[i];
                A[i] = A[i+h];
                A[i+h] = a;
                res_color[cn][i] = 2;
                res_color[cn][i+h] = 2;
                f = 1;
            }
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            cn++;
        }

        if(f == 1) h = Math.max(1,Math.trunc(h/1.3-0.5));
        else break;
    }
    res[cn][0] = -1;
    return [res,res_color];
}



var quick_sort = function(){
    let res = new Array(N*N+1);
    for(var b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(var a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let res_color = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      res_color[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          res_color[b][a] = 0;
      }
    }

    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;

    var rec_quick_sort = function(l,r){
        //if(r-l <= 1) return;
        /*
        let mm = [A[l],A[Math.trunc((l+r-1)/2)],A[r-1]];
        if(mm[0] > mm[1]) {
            let a = mm[0]; mm[0] = mm[1]; mm[1] = a;
        }
        if(mm[0] > mm[2]){
            let a = mm[0]; mm[0] = mm[2]; mm[2] = a;
        }
        if(mm[1] > mm[2]){
            let a = mm[1]; mm[1] = mm[2]; mm[2] = a;
        }
         */
        let m = A[Math.floor(Math.random()*(r-l))+l];//A[Math.trunc((l+r-1)/2)];


        let L = l, R = r-1;
        while(1){
            for (let i = L; i < r; i++) {
                L = i;
                if(m <= A[i]){
                    break;
                }else{
                    for(let k = 0; k < N; k++) res[cn][k] = A[k];
                    for(let k = l; k < r; k++) res_color[cn][k] = 1;
                    res_color[cn][i] = 0;
                    res_color[cn][R] = 1;
                    cn++;
                }
            }
            for (let i = R; i >= l; i--){
                R = i;
                if(A[i] <= m) {
                    break;
                }else{
                    for(let k = 0; k < N; k++) res[cn][k] = A[k];
                    for(let k = l; k < r; k++) res_color[cn][k] = 1;
                    res_color[cn][L] = 1;
                    res_color[cn][i] = 0;
                    cn++;
                }
            }

            if(L < R){
                let a = A[L];
                A[L] = A[R];
                A[R] = a;
                for(let k = 0; k < N; k++) res[cn][k] = A[k];
                for(let k = l; k < r; k++) res_color[cn][k] = 1;
                res_color[cn][L] = res_color[cn][R] = 2;
                cn++;
                if(cn >= N*N-10) return;
                L++;
                R--;
            }else {
                if(L-l >= 2) rec_quick_sort(l, L);
                if(r-L >= 2) rec_quick_sort(L, r);
                break;
            }
        }
        let f = 0;
        for(let i = l; i < r-1; i++) if(A[i] > A[i+1]) f = 1;
        //if(f == 1) rec_quick_sort(l,r);

    }


    rec_quick_sort(0,N);
    res[cn][0] = -1;
    return [res,res_color];
}





var draw_init_A = function(){
    for(let ii = 1; ii <= 4; ii++){
        let num = ii;
        let el = document.getElementById("cnt"+num.toString(10));
        el.innerHTML = 0;
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
    //let res1 = bubble_sort();
    //let res1 = insertion_sort();
    //let res1 = selection_sort();
    //let res1 = comb_sort();
    let res1 = shell_sort();
    sort_result1 = res1[0];
    sort_result_color1 = res1[1];

    for(let i = 0; i < N; i++) A[i] = A0[i];
    let res2 = quick_sort();
    sort_result2 = res2[0];
    sort_result_color2 = res2[1];

    for(let i = 0; i < N; i++) A[i] = A0[i];
    let res3 = merge_sort();
    sort_result3= res3[0];
    sort_result_color3 = res3[1];

    for(let i = 0; i < N; i++) A[i] = A0[i];
    let res4 = heap_sort();
    sort_result4 = res4[0];
    sort_result_color4 = res4[1];

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

        if(step_sz % 4 == 0){
            let f1 = 0, f2 = 0, f3 = 0, f4 = 0;

            if(sort_result1[cnt][0] != -1){
                f1 = 1;
                let el = document.getElementById("cnt1");
                el.innerHTML = cnt;
                let parent_element = document.getElementById('sort_bar1');
                for (let i = parent_element.childNodes.length-1; i>=0; i--) {
                    parent_element.removeChild(parent_element.childNodes[i]);
                }
                for(let k = 0; k < N; k++) {
                    change_bar(k, sort_result1[cnt][k], sort_result_color1[cnt][k],"sort_bar1");
                }
            }


            if(sort_result2[cnt][0] != -1){
                f2 = 1;
                let el = document.getElementById("cnt2");
                el.innerHTML = cnt;
                let parent_element = document.getElementById('sort_bar2');
                for (let i = parent_element.childNodes.length-1; i>=0; i--) {
                    parent_element.removeChild(parent_element.childNodes[i]);
                }
                for(let k = 0; k < N; k++) {
                    change_bar(k, sort_result2[cnt][k], sort_result_color2[cnt][k],"sort_bar2");
                }
            }

            if(sort_result3[cnt][0] != -1){
                f3 = 1;
                let el = document.getElementById("cnt3");
                el.innerHTML = cnt;
                let parent_element = document.getElementById('sort_bar3');
                for (let i = parent_element.childNodes.length-1; i>=0; i--) {
                    parent_element.removeChild(parent_element.childNodes[i]);
                }
                for(let k = 0; k < N; k++) {
                    change_bar(k, sort_result3[cnt][k], sort_result_color3[cnt][k],"sort_bar3");
                }
            }


            if(sort_result4[cnt][0] != -1){
                f4 = 1;
                let el = document.getElementById("cnt4");
                el.innerHTML = cnt;
                let parent_element = document.getElementById('sort_bar4');
                for (let i = parent_element.childNodes.length-1; i>=0; i--) {
                    parent_element.removeChild(parent_element.childNodes[i]);
                }
                for(let k = 0; k < N; k++) {
                    change_bar(k, sort_result4[cnt][k], sort_result_color4[cnt][k],"sort_bar4");
                }
            }

            if(f1 == 1 || f2 == 1 || f3 == 1 || f4 == 1) cnt++;
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
/*
window.onclick = function(){
    console.log(cnt,is_count)
    if(is_count == 0) {
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
    }else{
        is_count = 0;
        cancelAnimationFrame(interval.id);
     }
};
*/

slidebar_el.oninput = function(){
    cnt = slidebar_el.value;
    if(sort_result1[cnt][0] == -1){
        let cn = 0;
        for(let k = cnt; k >= 0; k--) if(sort_result1[k][0] != -1){
            cn = k;
            break;
        }
        let el = document.getElementById("cnt1");
        el.innerHTML = cn;
        let parent_element = document.getElementById('sort_bar1');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result1[cn][k], sort_result_color1[cn][k],"sort_bar1");
        }
    }else{
        let el = document.getElementById("cnt1");
        el.innerHTML = cnt;
        let parent_element = document.getElementById('sort_bar1');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result1[cnt][k], sort_result_color1[cnt][k],"sort_bar1");
        }
    }

    if(sort_result2[cnt][0] == -1){
        let cn = 0;
        for(let k = cnt; k >= 0; k--) if(sort_result2[k][0] != -1){
            cn = k;
            break;
        }
        let el = document.getElementById("cnt2");
        el.innerHTML = cn;
        let parent_element = document.getElementById('sort_bar2');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result2[cn][k], sort_result_color2[cn][k],"sort_bar2");
        }
    }else{
        let el = document.getElementById("cnt2");
        el.innerHTML = cnt;
        let parent_element = document.getElementById('sort_bar2');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result2[cnt][k], sort_result_color2[cnt][k],"sort_bar2");
        }
    }

    if(sort_result3[cnt][0] == -1){
        let cn = 0;
        for(let k = cnt; k >= 0; k--) if(sort_result3[k][0] != -1){
            cn = k;
            break;
        }
        let el = document.getElementById("cnt3");
        el.innerHTML = cn;
        let parent_element = document.getElementById('sort_bar3');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result3[cn][k], sort_result_color3[cn][k],"sort_bar3");
        }
    }else{
        let el = document.getElementById("cnt3");
        el.innerHTML = cnt;
        let parent_element = document.getElementById('sort_bar3');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result3[cnt][k], sort_result_color3[cnt][k],"sort_bar3");
        }
    }

    if(sort_result4[cnt][0] == -1){
        let cn = 0;
        for(let k = cnt; k >= 0; k--) if(sort_result4[k][0] != -1){
            cn = k;
            break;
        }
        let el = document.getElementById("cnt4");
        el.innerHTML = cn;
        let parent_element = document.getElementById('sort_bar4');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result4[cn][k], sort_result_color4[cn][k],"sort_bar4");
        }
    }else{
        let el = document.getElementById("cnt4");
        el.innerHTML = cnt;
        let parent_element = document.getElementById('sort_bar4');
        for (let i = parent_element.childNodes.length-1; i>=0; i--) {
            parent_element.removeChild(parent_element.childNodes[i]);
        }
        for(let k = 0; k < N; k++) {
            change_bar(k, sort_result4[cnt][k], sort_result_color4[cnt][k],"sort_bar4");
        }
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
