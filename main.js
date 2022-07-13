var is_count = 1;

var change_bar1 = function(xxx,hhh,ff){
    var parent_element = document.getElementById('sort_bar1');
    var new_element = document.createElement('div');
    if(ff == 0) new_element.style = `width: 18px; height: ${hhh*10}px; background-color: #87CEEB; border: solid black 0px; position: absolute; transform: translate(${110+20*xxx}px,${340-hhh*10-20}px);`;
    else new_element.style = `width: 16px; height: ${hhh*10}px; background-color: #66CDAA; border: solid blue 0px; position: absolute; transform: translate(${110+20*xxx}px,${340-hhh*10-20}px);`;
    parent_element.appendChild(new_element);
}

var change_bar2 = function(xxx,hhh,ff){
    var parent_element = document.getElementById('sort_bar2');
    var new_element = document.createElement('div');
    if(ff == 0) new_element.style = `width: 18px; height: ${hhh*10}px; background-color: #87CEEB; border: solid black 0px; position: absolute; transform: translate(${110+20*xxx}px,${340-hhh*10-20}px);`;
    else new_element.style = `width: 16px; height: ${hhh*10}px; background-color: #66CDAA; border: solid blue 0px; position: absolute; transform: translate(${110+20*xxx}px,${340-hhh*10-20}px);`;
    parent_element.appendChild(new_element);
}




var N = 30;
var sort_result1 = [];
var sort_result2 = [];
var A = [];

var reset_array_A = function(){
    A = new Array(N);
    for(let i = 0; i < N; i++) A[i] = i+1;
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
    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;
    for(let i = 0; i < N; i++){
        for(var j = 0; j < N-i; j++){
            if(A[j-1] > A[j]){
                var a = A[j-1];
                A[j-1] = A[j];
                A[j] = a;
            }
            for(let k = 0; k < N; k++) res[cn][k] = A[k];
            cn++;
        }
    }
    res[cn][0] = -1;
    return res;
}


var quick_sort = function(){
    let res = new Array(N*N+1);
    for(var b = 0; b < N*N+1; b++) {
      res[b] = new Array(N);
      for(var a = 0; a < N; a++) {
          res[b][a] = -1;
      }
    }
    let cn = 0;
    for(let k = 0; k < N; k++) res[cn][k] = A[k];
    cn++;

    var rec_quick_sort = function(l,r){
        //console.log(l,r)
        if(r-l <= 1) return;
        let m = 0;
        for (let i = l; i < r; i++) m += A[i];
        m /= (r-l);
        m = Math.trunc(m);

        let L = l, R = r-1;
        while(L < R){
            for (let i = L; i < r; i++) if(m <= A[i]){
                L = i;
                break;
            }
            for (let i = R; i >= l; i--) if(A[i] < m) {
                R = i;
                break;
            }
            console.log(L,R)

            if(L < R){
                let a = A[L];
                A[L] = A[R];
                A[R] = a;
                for(let k = 0; k < N; k++) res[cn][k] = A[k];
                cn++;
                if(cn >= N*N) return;
                L++;
                R--;
            }else {
                rec_quick_sort(l, L);
                rec_quick_sort(L, r);
                break;
            }
        }
        let f = 0;
        for(let i = l; i < r-1; i++) if(A[i] > A[i+1]) f = 1;
        if(f == 1) rec_quick_sort(l,r);

    }


    rec_quick_sort(0,N);
    res[cn][0] = -1;
    return res;
}




var init_visualizer = function(){
    reset_array_A();
    let res1 = bubble_sort();
    sort_result1 = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      sort_result1[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          sort_result1[b][a] = res1[b][a];
      }
    }

    reset_array_A();
    let res2 = quick_sort();
    sort_result2 = new Array(N*N+1);
    for(let b = 0; b < N*N+1; b++) {
      sort_result2[b] = new Array(N);
      for(let a = 0; a < N; a++) {
          sort_result2[b][a] = res2[b][a];
      }
    }
}



init_visualizer();
var loopFactry = function(){
    let handler = {};
    let step_sz = 0;
    let cnt = 0;

    let loop = function(){
        step_sz += 1;
        let fin = 0;

        if(step_sz % 3 == 0){
            let f1 = 0, f2 = 0;

            if(sort_result1[cnt][0] != -1){
                f1 = 1;
                let el = document.getElementById("cnt1");
                el.innerHTML = cnt;
                let parent_element = document.getElementById('sort_bar1');
                for (let i = parent_element.childNodes.length-1; i>=0; i--) {
                    parent_element.removeChild(parent_element.childNodes[i]);
                }
                for(let k = 0; k < N; k++) {
                    var ff = 0;
                    if(cnt > 0) if(sort_result1[cnt][k] != sort_result1[cnt-1][k]) ff = 1;
                    change_bar1(k, sort_result1[cnt][k], ff);
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
                    var ff = 0;
                    if(cnt > 0) if(sort_result2[cnt][k] != sort_result2[cnt-1][k]) ff = 1;
                    change_bar2(k, sort_result2[cnt][k], ff);
                }
            }

            if(f1 == 1 || f2 == 1) cnt++;
            else fin = 1;
        }

        if(step_sz >= 1000) step_sz = 0;
        if(fin == 1){
            console.log("finish");
        }else{
            handler.id = requestAnimationFrame(loop);
        }
    }
    handler.id = requestAnimationFrame(loop);
    return handler;
}








var interval = loopFactry();
window.onclick = function(){
    if(is_count == 0) {
        init_visualizer();
        console.log(is_count);
        is_count = 1;
        interval = loopFactry();
    }else{
        console.log(is_count);
        is_count = 0;
        cancelAnimationFrame(interval.id);
    }
};
