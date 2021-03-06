var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');

//var replicateSet = "mongodb://mongodb-query1.inforvation.systems:27017,mongodb-query2.inforvation.systems:27017,moe03.inforvation.systems:27017,moe06.inforvation.systems:27017";
var replicateSet = "mongodb://mongodb-query1.inforvation.systems:27017,mongodb-query2.inforvation.systems:27017";

module.exports.ldb ={
  "teacher_db":"obec"
};

module.exports.mongodb = [
  {
    db:'obec',
    url:replicateSet+"/obec",
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
      /*"morning":[
        {"host_year_semester_class_room":["hostid","year","semester","educationclassid","room"]}
      ],
      "morningdetail":[
        {"id":["id"]}
      ],*/
      "weightheight":[
        {"host_year_class_room":["hostid","year","educationclass","room"]},
        {"host_year_semester_educationclass_room_cid":["hostid","year","semester","educationclass","room","cid"]},
        {"cid":["cid"]}
      ],
      "weightheight2018":[
        {"host_year_class_room":["hostid","year","educationclass","room"]},
        {"host_year_semester_class_room_cid":["hostid","year","semester","educationclass","room","cid"]},
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
        {"app_host_class_room":["app","hostid","class","room"]}
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
        {"host_year_semester_class_room_recdate":["hostid","year","semester","educationclass","room","recdate"]}
      ],
      "hostclassroom_data":[
        {"host_class_room":["host","class","room"]},
        {"host":["host"]}
      ],
      "student_data_db":[
        {"cid":["cid"]},
        {"host_class_room_year":["hostid","class","room","year"]},
        {"host_class_room":["hostid","class","room"]},
        {"hostid":["hostid"]},
        {"class":["class"]}
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
      ],
      "CCT_CHECKDATA_60_1_RESULTP4M3_PER_AREA":[
        {"areaid":["areaid"]}
      ],
      "obec_grade":[
        {"host_class_room":["SCH_ID10","CLASS","ROOM"]},
        {"cid":["PP_ID"]}
      ],
      "publicholiday":[
        {"year":["year"]}
      ]
    }
  },{
    db:'oosc',
    url:replicateSet+"/oosc",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "oosc_form":[
        {"houseid":["houseid"]},
        {"city":["city"]}
      ],
      "oosc_plan":[
        {"cid":["cid"]}
      ],
      "oosc_assignhost":[
        {"hostid":["hostid"]}
      ],
      "oosc_assignment":[
        {"assignfor":["assignfor"]},
        {"village":["village"]}
      ],
      "oosc_child":[
        {"cid":["cid"]},
        {"villagecode":["villagecode"]},
        {"houseid":["houseid"]},
        {"tumboncode":["tumboncode"]},
        {"firstname":["firstname"]},
        {"tumbon_status":["tumboncode","status"]},
        {"city__issurvey":["cityname","issurvey"]},
        {"tumbon_issurvey":["tumboncode","issurvey"]}
      ],
      "oosc_province":[
        {"id":["id"]},
        {"name":["name"]}
      ],
      "oosc_city":[
        {"id":["id"]},
        {"name":["name"]}
      ],
      "oosc_tumbon":[
        {"id":["id"]},
        {"name":["name"]}
      ],
      "oosc_village":[
        {"id":["id"]},
        {"name":["name"]}
      ]
    }
  },{
    db:'qinfo',
    url:replicateSet+"/qinfo",
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
        {"host_year_semester_class_room_subject_recdate":['hostid','year','semester','educationclass','room','subject','recdate']},
        {"schooltimeid":["schooltimeid"]}
      ],
      "gpadata":[
        {"hostid_year":['hostid','year']}
      ],
      "pp5summary":[
        {"week_hostid":['week','hostid']},
        {"hostid":['hostid']}
      ],
      "school_report_summary":[
        {"hostid":['hostid']}
      ]
    }
  },{
    db:'cores',
    url:replicateSet+"/cores",
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
  cert: fs.readFileSync(path.join(certsJWT, 'jwt_cert.crt'))
};

module.exports.port = "44325";
