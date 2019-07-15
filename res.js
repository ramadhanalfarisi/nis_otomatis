exports.ok = function(values,meta, res) {
    var data = {
        code: 200,
        values: values,
        meta : meta,
        status : 'Success'
    };
    res.json(data);
    res.end();
  };

  exports.login = function(count,res) {
    var data = {
        code: 200,
        data : count,
        status : 'Success'
    };
    res.json(data);
    res.end();
  };

  exports.gagalNIS = function(res){
    var data = {
      code: 200,
      status : 'Failed'
    }
    res.json(data);
    res.end();
  }

  exports.gagal = function(count,res) {
    var data = {
        code: 200,
        data : count,
        status : 'Failed'
    };
    res.json(data);
    res.end();
  };