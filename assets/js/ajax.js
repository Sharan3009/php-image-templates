class Ajax {

    timeout(val){
        this._timeout = val;
        return this;
    }

    get(url,data){
        let ajaxParam = {
            url,
            type:"GET",
            data,
            dataType:"json"
        }
        return this._ajaxCall(ajaxParam);
    }

    post(url,data){
        let ajaxParam = {
            url,
            type:"POST",
            data,
        }
        return this._ajaxCall(ajaxParam);
    }

    put(url,data){
        let ajaxParam = {
            url,
            type:"PUT",
            data,
        }
        return this._ajaxCall(ajaxParam);
    }

    delete(url){
        let ajaxParam = {
            url,
            type:"DELETE",
            data,
        }
        return this._ajaxCall(ajaxParam);
    }

    _ajaxCall(obj){
        return new Promise((resolve,reject)=>{
            let ajaxObj = {
                ...obj,
                timeout:this._timeout || 30000,
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            }
            $.ajax(ajaxObj);
        })
    }
}

ajax = new Ajax();