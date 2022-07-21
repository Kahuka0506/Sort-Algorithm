  
var bubble_sort = function(A){
    let N = A.length;
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


var insertion_sort = function(A){
    let N = A.length;
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


var selection_sort = function(A){
    let N = A.length;
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



var shell_sort = function(A){
    let N = A.length;
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


var merge_sort = function(A){
    let N = A.length;
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

var heap_sort = function(A){
    let N = A.length;
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
        for(let k = 0; k < i; k++) res_color[cn][k] = 1;
        res_color[cn][0] = res_color[cn][i] = 2;
        cn++;
    }

 
    res[cn][0] = -1;
    return [res,res_color];
}


var comb_sort = function(A){
    let N = A.length;
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



var quick_sort = function(A){
    let N = A.length;
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




var Sort_Algorithms = [bubble_sort, quick_sort, comb_sort,heap_sort,merge_sort,shell_sort,selection_sort,insertion_sort];