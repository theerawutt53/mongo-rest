var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/userdemo/:areaid', function(req,res) {
  var url = 'http://maas.nuqlis.com:44300/query/user_demo/areaid';
  var jwt = 'JWT eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJCb21iIiwiaWF0IjoxNDg5MDM0MTE0fQ.fv0r1vZ9B-i_AG1ogGdvumNDpnE1eowmhETO-Lqrjpyyz884_p423mH6cn-KVaZFhy9Z9Gs-0zljg6d3KUhKhDJzomJspgHiaMzrnqVs838IviD4ig-oFcSgkqCKn6aXULXoLnpb6ueKshvdHX3NIxlNPd_oPCEDOEg8ufPAnLgb78OHcwwKK_YmB7zidrs-7Ltx93lJJSF0-FO_kd3i_H4Z3vKOtKtoAnSdWQqPr2EVilxzHQwyiKrLUnzIGz6Iv3yS2qIDp8OCXVopSRwM0bnESC0tClF-7EO6J0d1NDxamuX6XHKvuujSaoynMTFtICSY0ojUYRYDDESLvXvLzg';

  if(req.params.areaid) {
    request({
      method:'POST',
      url:url,
      headers:{'Authorization':jwt},
      json:true,
      body:{"start":[req.params.areaid],"end":[req.params.areaid+"xFF"],"include_doc":true,"limit":-1}
    })
    .on('error', function(err) {
      res.json({
        'ok': false,
        'message':err
      });
    })
    .pipe(res)
  } else {
    res.json({
      'ok': false,
      'message': err
    });
  }
});

module.exports = router;
