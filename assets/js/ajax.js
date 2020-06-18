class Ajax {

    timeout(val){
        this._timeout = val;
        return this;
    }

    get(url,data){
        return this._ajaxCall(url,"GET",data);
    }

    post(url,data){
        return this._ajaxCall(url,"POST",data);
    }

    put(url,data){
        return this._ajaxCall(url,"PUT",data);
    }

    delete(url){
        return this._ajaxCall(url,"DELETE");
    }

    _ajaxCall(url,type,data){
        return new Promise((resolve,reject)=>{
            $.ajax({
                url,
                type,
                data,
                dataType:"json",
                timeout:this._timeout || 30000,
                success: function(data){
                    this._timeout = null;
                    resolve(data);
                },
                error: function(error){
                    this._timeout = null;
                    reject(error);
                }
            })
        })
    }
}

ajax = new Ajax();