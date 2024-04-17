//https://www.baidu.com/s?wd=111
(function () {
  var searchInput = document.getElementsByClassName("J_searchInput")[0],
    wdList = document.getElementsByClassName("J_wdList")[0],
    listTpl = document.getElementById("J_listTpl").innerHTML;

  function init() {
    bindEvent();
  }

  //绑定事件处理函数
  function bindEvent() {
    searchInput.addEventListener("input", typeInput, false);
  }

  function typeInput() {
    var val = _trimSpace(this.value);
    if (val.length > 0) {
      getDates(val, "setDatas");
    }
  }

  function getDates(val, cb) {
    var oScript = document.createElement("script");
    oScript.src =
      "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=34653,31254,34550,33848,34592,34600,34584,34106,26350,34421,34470,34691,34673&wd=" +
      val +
      "&req=2&bs=111&csor=4&pwd=11%E6%8C%89&cb=" +
      cb;
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
  }

  function renderList(data) {
    var data = data.g,
      len = "",
      list = "";

    try {
      len = data.length;
    } catch (e) {
      len = 0;
    }

    if (len > 0) {
      data.forEach((item) => {
        list += listTpl.replace(/{{(.*?)}}/gim, function (node, key) {
          return {
            wd: item.q,
            wdLink: item.q,
          }[key];
        });
      });

      wdList.innerHTML = list;
    } else {
      wdList.innerHTML = "";
    }
  }

  window.setDatas = function (data) {
    renderList(data);
  };

  function _trimSpace(str) {
    return str.replace(/\s+/, "");
  }

  init();
})();
