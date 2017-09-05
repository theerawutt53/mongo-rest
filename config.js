var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');

module.exports.forward = {
  'studentattend': 'http://localhost:44309',
  'obec_grade': 'http://localhost:44305',
  'earlywarning': 'http://localhost:44303',
  'edu_students': 'http://localhost:44308',
  'obec_teacher': 'http://localhost:44306',

  'admin_area': 'http://moe02.inforvation.systems:44306',
  'admin_school': 'http://moe02.inforvation.systems:44307',
  'announcement': 'http://moe02.inforvation.systems:44308',
  'school_db': 'http://moe02.inforvation.systems:44309',
  'KpiData59_1MPerArea': 'http://moe02.inforvation.systems:44310',
  'KpiData59_1MPerProvince': 'http://moe02.inforvation.systems:44311',
  'KpiData59_1PPerArea': 'http://moe02.inforvation.systems:44312',
  'KpiData59_1PPerProvince': 'http://moe02.inforvation.systems:44313',
  'pp5summarynotification': 'http://moe02.inforvation.systems:44314',
  'teacher67p': 'http://moe02.inforvation.systems:44319',
  'user_demo': 'http://moe02.inforvation.systems:44320',
  'dmc59_1': 'http://moe02.inforvation.systems:44323',
  'pp5summary': 'http://moe02.inforvation.systems:44324'
};

module.exports.ldb ={
  "teacher_db":"obec",
  "hostclassroom":"obec",
  "weightheight":"obec",
  "hostattendsummary":"obec",
  "students_care":"obec",
  "healthcare":"obec",
  "classteacher":"obec",
  "dmc_yakjon601":"obec",
  "form_template":"obec",
  "_attendance_count":"obec",
  "_attendance_all":"obec",
  "hostsystem":"obec",
  "school":"obec",
  "form_record_new":"obec",
  "morning_attendance":"obec",
  "hostclassroom_data":"obec",
  "student_data":"obec",
  "studenthouse_location":"obec",
  "homevisit_record":"obec",
  "form_record_homevisit":"obec",
  "obec_students":"obec",
  "hostsummary":"obec",
  "morning":"obec",
  "morningdetail":"obec",
  "KPI_DATA":"obec",
  "CCT_CHECKDATA_60_1_CONFIRMED":"obec",
  "CCT_CHECKDATA_60_1_NO_CONFIRMED":"obec",
  "CCT_CHECKDATA_60_1_NoScreen":"obec",
  "CCT_CHECKDATA_60_1_RESULT":"obec",
  "CCT_CHECKDATA_60_1_RESULT_PER_AREA":"obec",
  "CCT_CHECKDATA_60_1_RESULTP4M3_PER_AREA":"obec",

  "role_db":"cores",

  "attendance":"qinfo",
  "newindicator":"qinfo",
  "desirecharacteristicdata":"qinfo",
  "activity":"qinfo",
  "knowledgestructure":"qinfo",
  "readthinkwritedata":"qinfo",
  "examratio":"qinfo",
  "hostconfig":"qinfo",
  "subject_attendance":"qinfo",

  "_oosc_child_group":"oosc",
  "_oosc_agegender_count":"oosc",
  "_oosc_child_problem":"oosc",
  "_oosc_agegender_count":"oosc",
  "_oosc_report":"oosc"
};

module.exports.mongodb = [
  {
    db:'obec',
    url:"mongodb://mongodb1.inforvation.systems:27017,mongodb2.inforvation.systems:27017/obec",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "obec_students": [
        {"host_class_room": ["hostid","class","room"]},
        {"cid": ["cid"]}
      ],
      "form_record_new":[
        {"cid": ["cid"]},
        {"hostid_cid":["hostid","cid"]}
      ],
      "form_record_homevisit":[
        {"hostid_cid":["hostid","cid"]}
      ],
      "morning":[
        {"host_year_semester_class_room":["hostid","year","semester","educationclassid","room"]}
      ],
      "morningdetail":[
        {"id":["id"]}
      ],
      "weightheight":[
        {"host_year_class_room":["hostid","year","educationclass","room"]},
        {"host_year_semester_educationclass_room_cid":["hostid","year","semester","educationclass","room","cid"]},
        {"cid":["cid"]}
      ],
      "hostsummary":[
        {"area_host":["areaid","hostid"]},
        {"hostid":["hostid"]}
      ],
      "school":[
        {"areaid":["areaid"]},
        {"province":["province"]},
        {"hostid":["hostid"]}
      ],
      "hostattendsummary":[
        {"area_host":["areaid","hostid"]},
        {"hostid":["hostid"]}
      ],
      "teacher_db":[
        {"area_host":["areaid","hostid"]},
        {"hostid":["hostid",["firstname","lastname","deactive","deactive_reason"]]}
      ],
      "CCT_CHECKDATA_60_1_CONFIRMED":[
        {"hostid":["hostid"]}
      ],
      "CCT_CHECKDATA_60_1_NO_CONFIRMED":[
        {"hostid":["hostid"]}
      ],
      "CCT_CHECKDATA_60_1_NoScreen":[
        {"hostid":["hostid"]}
      ],
      "CCT_CHECKDATA_60_1_RESULT":[
        {"hostid":["hostid"]}
      ],
      "hostclassroom":[
        {"app_host_class_room":["app","host","class","room"]}
      ],
      "classteacher":[
        {"teacher":["teacher_id"]},
        {"class":["classname"]},
        {"year_semester_host_class_room":["year","semester","host","classname","room"]}
      ],
      "form_template":[
      ],
      "healthcare":[
        {"student_info_cid":["student_info.cid"]},
        {"hostid_timestamp_cid_name":["staff_info.HostID","ts","student_info.cid","student_info.name"]}
      ],
      "students_care":[
        {"cid_year_type":["doc_type","student.cid","dmc.year","form_type",["status","ts"]]},
        {"assignment":["dmc.host","dmc.level","dmc.room","status","form_type","student.cid","student.name","ts"]},
        {"assignments_by_room":["dmc.host","dmc.level","dmc.room","status","ts",["status","form_type","student.cid","student.name","ts"]]},
        {"class_info":["host","year","level","room"]},
        {"host_info":["doc_type","dmc.host"]}
      ],
      "CCT_CHECKDATA_60_1_RESULT_PER_AREA":[
        {"areaid":["areaid"]}
      ],
      "morning_attendance":[
        {"host_year_semester_class_room_recdate":["hostid","year","semester","educationclassid","room","recdate"]}
      ],
      "hostclassroom_data":[
        {"hostid_class_room":["hostid","class","room"]}
      ],
      "student_data_db":[
        {"cid":["cid"]}
      ],
      "KPI_DATA":[
        {"hostid":["hostid"]}
      ],
      "studenthouse_location_db":[
        {"cid":["cid"]}
      ],
      "cct_record_db":[
        {"cid":["cid"]}
      ],
      "homevisit_record":[
        {"cid":["cid"]}
      ]
    }
  },{
    db:'oosc',
    url:"mongodb://mongodb1.inforvation.systems:27017,mongodb2.inforvation.systems:27017/oosc",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "oosc_form":[
        {"houseid":["houseid"]}
      ],
      "oosc_plan":[
        {"cid":["cid"]}
      ],
      "oosc_assignhost":[
        {"hostid":["hostid"]}
      ]
    }
  },{
    db:'qinfo',
    url:"mongodb://mongodb1.inforvation.systems:27017,mongodb2.inforvation.systems:27017/qinfo",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "knowledgestructure":[
        {"schooltimeid":["schooltimeid"]}
      ],
      "attendance":[
        {"host_year_semester_class_room_subj":["hostid","year","semester","class","room","subject"]}
      ],
      "desirecharacteristicdata":[
        {"schooltimeid":["SchoolTimeID"]},
        {"cid":["CID"]}
      ],
      "readthinkwritedata":[
        {"schooltimeid":["SchoolTimeID"]},
        {"cid":["CID"]}
      ],
      "hostsystem":[
        {"hostid":["hostid"]}
      ],
      "hostconfig":[
        {"host_year_semester":["HostID","AcademicYear","Semester"]}
      ],
      "newindicator":[
        {"schooltimeid":["schooltimeid"]}
      ],
      "examratio":[
        {"schooltimeid":["schooltimeid"]}
      ],
      "activity":[
        {"id":["id"]}
      ],
      "_attendance_count":[
        {"id":["_id"]}
      ],
      "_attendance_all":[
        {"id":["_id"]}
      ],
      "subject_attendance":[
        {"host_year_semester_class_room_subject_recdate":['hostid','year','semester','educationclass','room','subject','recdate']}
      ]
    }
  },{
    db:'cores',
    url:"mongodb://mongodb2.inforvation.systems:27017/cores",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "role_db":[
        {"app_user":["application","user"]},
        {"app_role_area_host":["application","roles","profile.areaid","profile.hostid"]},
        {"app_province_city_tumbon":["application","profile.province","profile.city","profile.tumbon"]}
      ],
      "user_db":[
        {"user":["user"]}
      ]
    }
  }
]

module.exports.ssl_option = {
  /*---ssl certificate---*/
  key: fs.readFileSync(path.join(certsPath, 'server.key')),
  cert: [
    //fs.readFileSync(path.join(certsPath, 'server-thaiedu.crt')),
    fs.readFileSync(path.join(certsPath, 'server-maas.crt'))
  ],
  ca: [
    //fs.readFileSync(path.join(caCertsPath, 'ca-thaiedu.crt')),
    fs.readFileSync(path.join(caCertsPath, 'ca-maas.crt'))
  ],
  requestCert: false,
  rejectUnauthorized: true
  /*---ssl certificate---*/
};

module.exports.jwt = {
  key: fs.readFileSync(path.join(certsJWT, 'jwt_key.key')),
  cert: fs.readFileSync(path.join(certsJWT, 'jwt_cert.crt')),
  eexpiresIn:'1h'
};

module.exports.port = "8000";
