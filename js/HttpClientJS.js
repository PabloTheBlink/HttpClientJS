export const HttpClient = (function HttpClient() {
  this.api_queue = [];
  this.api_queue_delay = 0;
  this.get = function (f, callback) {
    this.api_queue.push({
      f: f,
      type: "GET",
      data: null,
      callback: callback,
      loading: false,
    });
    execApiQueue();
  };
  this.post = function (f, data, callback) {
    this.api_queue.push({
      f: f,
      type: "POST",
      data: data,
      callback: callback,
      loading: false,
    });
    execApiQueue();
  };
  this.put = function (f, data, callback) {
    this.api_queue.push({
      f: f,
      type: "PUT",
      data: data,
      callback: callback,
      loading: false,
    });
    execApiQueue();
  };
  this.delete = function (f, callback) {
    this.api_queue.push({
      f: f,
      type: "DELETE",
      data: null,
      callback: callback,
      loading: false,
    });
    execApiQueue();
  };
  function execApiQueue() {
    if (this.api_queue.length == 0) return;
    var queue = this.api_queue[0];
    if (queue.loading) {
      setTimeout(this.execApiQueue.bind(this), this.api_queue_delay);
      return;
    }
    queue.loading = true;
    var f = queue.f;
    var type = queue.type;
    var data = queue.data;
    var callback = queue.callback;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (result) => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          try {
            var json = JSON.parse(result.currentTarget.responseText);
            if (Object.keys(result).includes("status")) {
              callback(json);
            } else {
              callback({
                status: true,
                data: json,
              });
            }
          } catch (e) {
            callback({
              status: false,
              message: "Ha habido un error",
            });
          }
        } else {
          callback({
            status: false,
            message: "Ha habido un error",
          });
        }
        this.api_queue.splice(0, 1);
        setTimeout(this.execApiQueue.bind(this), this.api_queue_delay);
      }
    });
    xhr.open(type, f);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(data));
  }
})();
