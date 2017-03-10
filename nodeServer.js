(function () {

var express = require('express');
//var http = require("http");
var app = express();

app.use("/", express.static(__dirname));

//var NPORT = process.env.PORT || 80;
var NPORT = 3000; //Comment it when uploading to oracle application container cloud
var server = app.listen(NPORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('ExpressServer app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
  res.sendFile('index.html',{root:__dirname});
});

app.get('/jstreetest', function (req, res) {
  res.sendFile('index.html',{root:__dirname});
});

app.get('/jstrTestAPI', function (req, res) {
    console.log("Inside get /jstrTestAPI: ");
    //console.log("req.params "+JSON.stringify(req.params));
    //Here testing using
    //http://localhost:3000/jstrTestAPI
    //http://localhost:3000/jstrTestAPI?repo=Repo1
    //http://localhost:3000/jstrTestAPI?repo=Repo2
    //http://localhost:3000/jstrTestAPI?repo=Repo3
    console.log("req.query.repo "+req.query.repo);

    var overAllRepo = {
      "data" : ['Root1',{"text":'Root2',"children": true },{"text":'Root3',"children": true },{"text":'Root4',"children": true }]
    }

    var root1ChildNode = {
      "data": []
    }

    var root2ChildNode = {
      "data" : [
        {"text":'Root2File1.txt',"type":"file"},
        {"text":'Root2File2.js',"type":"file"}
      ]
    };

    var root3ChildNode = {
      "data" : [
                    "Child 1",
                    {"text" : "Child 2",
                     "children" : [
                                    { "text" : "Root3_File1.js", "type" : "file" },
                                    { "text" : "Root3_File2.js", "type" : "file" }
                                  ]
                     }
                ]
    };

    var root4ChildNode = {
      "data" : [
                    "Child1",
                    {"text" : "Child2",
                     "children" : true
                    }
                ]
    };

    var root4Child2 = { "data" : [ { "text" : "Root4_File1.js", "type" : "file" }]};

    var respJSON = {};
    if(req.query != null && req.query.repo != undefined){
      if(req.query.repo.toLowerCase() == "root1"){
        respJSON = root1ChildNode;
      }else if(req.query.repo.toLowerCase() == "root2"){
        respJSON = root2ChildNode;
      }else if(req.query.repo.toLowerCase() == "root3"){
        respJSON = root3ChildNode;
      }else if(req.query.repo.toLowerCase() == "root4"){
        respJSON = root4ChildNode;
      }else if(req.query.repo.toLowerCase() == "root4/child2"){
        respJSON = root4Child2;
      }else {
        respJSON = [];
      }

    }else{
        respJSON = overAllRepo;
    }

    res.json(respJSON.data);
});

})();

// var overAllJSON = {"data" : [
//              'Root1',
//              {
//                'text' : 'Root2',
//                'children' : [
//                  {"text":'Child1.txt',"type":"file"},
//                  {"text":'Child2.js',"type":"file"}
//                ],
//
//             },
//             {
//               'text' : 'Root3',
//               'children' : [
//                             "Child 1",
//                             {"text" : "Child 2",
//                              "children" : [
//                                             { "text" : "File1.js", "type" : "file" }
//                                           ]
//                              }
//                            ]
//             }
//         ]
//       };
