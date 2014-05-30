var express = require('express');
var router = express.Router();

router.get('/userevents/:id', function(req, res, next){
  var dummyData = [{ 'type': 'adobe.brackets.foo'}];
  
  res.json({
      userevents: [{
        _id: req.params.id,
        events: dummyData
      }]
    });
})

module.exports = router;